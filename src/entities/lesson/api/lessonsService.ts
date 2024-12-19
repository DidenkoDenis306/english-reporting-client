import { AxiosResponse } from 'axios';
import { ILessonResponse } from 'entities/lesson/api/types';
import { http } from 'shared/api';

class LessonsService {
  public async createLesson(lessonData: any): Promise<ILessonResponse> {
    return await http
      .post<AxiosResponse<ILessonResponse>>(`/lessons`, lessonData)
      .then((result) => result.data);
  }
}

export const lessonsService = new LessonsService();
