import { http } from '@repo/http';
import { IStudentResponse } from '@repo/src/services';
import { AxiosResponse } from 'axios';

class StudentsService {
  public async getStudents(teacherId: number): Promise<AxiosResponse<IStudentResponse[]>> {
    return await http.get<AxiosResponse<IStudentResponse[]>>(`/students/teacher/${teacherId}`);
  }

  public async getStudent(
    id: number,
    filter?: string | null,
  ): Promise<AxiosResponse<IStudentResponse>> {
    return await http.get<AxiosResponse<IStudentResponse>>(
      `/students/${id}?filter=${filter || ''}`,
    );
  }
}

export const studentsService = new StudentsService();
