import { http } from '@repo/http';
import { ILessonResponse } from '@repo/src/services/lessons/lessons.types';
import { AxiosResponse } from 'axios';

class LessonsService {
  public async createLesson(
    lessonData: any,
  ): Promise<AxiosResponse<ILessonResponse>> {
    return await http.post<AxiosResponse<ILessonResponse>>(
      `/lessons`,
      lessonData,
    );
  }
}

export const lessonsService = new LessonsService();
