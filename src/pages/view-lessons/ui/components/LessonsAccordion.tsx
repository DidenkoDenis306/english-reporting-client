import { Accordion, Title } from '@mantine/core';
import { formatMonthDayYear, getOrdinalSuffix } from 'shared/utils';
import { IStudent } from 'entities/student/model';
import { EditLessonEditor } from 'features/editor/ui';
import { ILesson } from 'entities/lesson/model';
interface Props {
  student: IStudent;
}

export function LessonsAccordion({ student }: Props) {
  console.log(student);

  if (!student.lessons) {
    return <Title>No lessons</Title>;
  }

  const renderLessons = () =>
    student?.lessons.map((lesson: ILesson) => (
      <Accordion.Item key={lesson.id} value={String(lesson.id)}>
        <Accordion.Control>
          {`${formatMonthDayYear(lesson.lessonDate)} ${getOrdinalSuffix(lesson.lessonNumber)} lesson`}
        </Accordion.Control>
        <Accordion.Panel>
          <EditLessonEditor student={student} lesson={lesson} />
        </Accordion.Panel>
      </Accordion.Item>
    ));

  return <Accordion variant="filled">{renderLessons()}</Accordion>;
}
