import { AxiosResponse } from 'axios';
import { IStudentResponse } from 'entities/student/api/types';
import { http } from 'shared/api';

class StudentsService {
  public async getStudents(teacherId: number): Promise<IStudentResponse[]> {
    return await http
      .get<AxiosResponse<IStudentResponse[]>>(`/students/teacher/${teacherId}`)
      .then((result) => result.data);
  }

  public async getStudent(
    id: number,
    filter?: string | null,
  ): Promise<IStudentResponse> {
    return await http
      .get<
        AxiosResponse<IStudentResponse>
      >(`/students/${id}?filter=${filter || ''}`)
      .then((result) => result.data);
  }
}

export const studentsService = new StudentsService();
