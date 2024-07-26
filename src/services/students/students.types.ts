export interface IStudentResponse {
  id: number;
  firstName: string;
  lastName: string;
  age?: number;
  teacherId: number;
  lessonsCount: number;
  lastLessonDate: Date;
  price: number;
  currency: 'USD' | 'UAH';
  isPrivate: boolean;
  lessons: any[];
}
