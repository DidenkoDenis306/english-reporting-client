'use client';

import { Button, Stack } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import Heading from '@tiptap/extension-heading';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import React, { FC, forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import { formatDate, getOrdinalSuffix } from 'shared/utils';
import { IStudent } from 'entities/student/model';

export type TipTapEditorRef = {
  clickButton: () => void;
};

interface Props {
  student: IStudent;
  lesson: any;
}

export const EditLessonEditor: FC<Props> = forwardRef(
  ({ student, lesson }, ref: Ref<TipTapEditorRef>) => {
    const documentName = `${student.firstName} ${student?.lastName}, ${getOrdinalSuffix(lesson.lessonNumber)} lesson, ${formatDate(lesson.lessonDate)}`;

    const editor = useEditor({
      extensions: [
        StarterKit.configure({}),
        Heading.configure({ levels: [1, 2, 3] }),
      ],
      content: `

             ${lesson.lessonContent}
    `,
    });

    const exportToDocx = async () => {
      if (!editor) return;

      // @ts-ignore
      const paragraphs = editor.getJSON().content.map((block) => {
        if (block.type === 'heading') {
          const text =
            block.content?.map((textBlock) => textBlock.text).join('') || '';

          return new Paragraph({
            children: [
              new TextRun({
                text: text,
                size: 48,
              }),
            ],
          });
        } else if (block.type === 'paragraph') {
          const text =
            block.content?.map((textBlock) => textBlock.text).join('') || '';
          return new Paragraph({
            children: [
              new TextRun({
                text: text,
                size: 28,
              }),
            ],
            spacing: {
              line: 360,
            },
          });
        } else {
          return new Paragraph('');
        }
      });

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: paragraphs,
          },
        ],
      });

      const buffer = await Packer.toBuffer(doc);
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      saveAs(blob, `${documentName}.docx`);
    };

    return (
      <Stack gap="md">
        <RichTextEditor editor={editor}>
          <RichTextEditor.Toolbar>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
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
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
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
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor>

        <Button onClick={exportToDocx} w={150}>
          Export to .docx
        </Button>
      </Stack>
    );
  },
);
