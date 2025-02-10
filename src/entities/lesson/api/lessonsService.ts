import { AxiosResponse } from 'axios';
import { ILessonResponse } from 'entities/lesson/api/types';
import { http } from 'shared/api';

class LessonsService {
  public async getLessonById(lessonId: number): Promise<ILessonResponse> {
    return await http
      .get<AxiosResponse<ILessonResponse>>(`/lessons/${lessonId}`)
      .then((result) => result.data);
  }

  public async createLesson(lessonData: any): Promise<ILessonResponse> {
    return await http
      .post<AxiosResponse<ILessonResponse>>(`/lessons`, lessonData)
      .then((result) => result.data);
  }

  public async getLessonsCount(period: 'total' | 'month', teacherId: number) {
    return await http
      .get<
        AxiosResponse<number>
      >(`/lessons/count?period=${period}&teacherId=${teacherId}`)
      .then((result) => result.data);
  }
}

export const lessonsService = new LessonsService();
