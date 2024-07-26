'use client';

import { Box, Button, Select, Slider, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { RichTextEditor } from '@mantine/tiptap';
import { IStudentResponse } from '@repo/services';
import { englishLevels } from '@repo/src/constants/englishLevels';
import { useEditorStore } from '@repo/store';
import {
  capitalizeFirstLetter,
  formatDate,
  getOrdinalSuffix,
} from '@repo/utils';
import Heading from '@tiptap/extension-heading';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import OpenAI from 'openai';

import React, { FC, useEffect, useState } from 'react';

interface Props {
  student?: IStudentResponse;
  lessonDate?: Date;
}

export const CreateLessonEditor: FC<Props> = ({ student, lessonDate }) => {
  const { setEditorContent } = useEditorStore();

  const [generatingLoading, setGeneratingLoading] = useState(false);
  const [wordsCount, setWordsCount] = useState(10);
  const [levelOfEnglish, setLevelOfEnglish] = useState<string | null>(
    'pre-intermediate',
  );

  const documentName = student
    ? `${student.firstName} ${student?.lastName}, ${getOrdinalSuffix(student.lessonsCount + 1)} lesson, ${formatDate(lessonDate)}`
    : '';

  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: `<h3>${documentName}</h3><p></p>`,
    onUpdate({ editor }) {
      setEditorContent(editor.getHTML());
    },
  });

  const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true,
  });

  function convertToParagraphs(input: string | null): string {
    if (!input) {
      return '';
    }

    return input
      .split('\n')
      .map((translation) => `<p>${translation.slice(3)}</p>`)
      .join('');
  }

  async function main(wordsAmount: number) {
    try {
      setGeneratingLoading(true);

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `Think of ${wordsAmount} pairs of translation words from English to Ukrainian in this format apple - яблуко. The words should have ${levelOfEnglish} level of english.`,
          },
        ],
        model: 'gpt-3.5-turbo-0125',
      });

      return convertToParagraphs(completion.choices[0].message.content);
    } catch (error) {
      notifications.show({
        title: 'Server Error',
        message: `${error}`,
      });
    } finally {
      setGeneratingLoading(false);
    }
  }

  useEffect(() => {
    if (editor && student) {
      const currentContent = editor.getHTML();
      const updatedContent = currentContent.replace(
        /<h3>.*<\/h3>/,
        `<h3>${documentName}<br></h3>`,
      );
      editor.commands.setContent(updatedContent);
    }
  }, [student, lessonDate, editor]);

  const handleGenerateWords = async () => {
    if (editor) {
      const newWords = await main(wordsCount);

      if (newWords) {
        editor.commands.insertContent(newWords);
      }
    }
  };

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>

        <Button
          h={30}
          loading={generatingLoading}
          onClick={handleGenerateWords}
        >
          Generate random words with AI
        </Button>

        <Box w={200}>
          <Slider
            color="blue"
            size="sm"
            value={wordsCount}
            min={1}
            max={50}
            onChange={setWordsCount}
          />
        </Box>

        <Text>{wordsCount} words</Text>

        <Select
          data={englishLevels.map((level) => ({
            value: level,
            label: capitalizeFirstLetter(level),
          }))}
          value={levelOfEnglish}
          onChange={setLevelOfEnglish}
        />
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content mih={300} />
    </RichTextEditor>
  );
};
