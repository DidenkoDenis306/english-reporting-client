import { http } from '@repo/http';
import { IStudentResponse } from '@repo/src/services';
import { AxiosResponse } from 'axios';

class StudentsService {
  public async getStudents(): Promise<AxiosResponse<IStudentResponse[]>> {
    return await http.get<AxiosResponse<IStudentResponse[]>>(`/students`);
  }

  public async getStudent(
    id: number,
    filter: string | null,
  ): Promise<AxiosResponse<IStudentResponse>> {
    return await http.get<AxiosResponse<IStudentResponse>>(
      `/students/${id}?filter=${filter || ''}`,
    );
  }
}

export const studentsService = new StudentsService();
