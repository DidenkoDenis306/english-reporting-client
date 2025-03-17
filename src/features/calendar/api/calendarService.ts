import { http } from 'shared/api';
import { AxiosResponse } from 'axios';
import { ICalendarResponse } from 'features/calendar/api/types';

class CalendarService {
  public async getCalendarLessons(
    startDate: string,
    endDate: string,
    hiddenStudents: number[] = [],
  ) {
    return await http
      .get<
        AxiosResponse<ICalendarResponse>
      >(`/calendar?startDate=${startDate}&endDate=${endDate}&hiddenStudents=${hiddenStudents.join(',')}`)
      .then((result) => result.data);
  }
}

export const calendarService = new CalendarService();
