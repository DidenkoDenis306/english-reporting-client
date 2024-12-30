import { useMediaQuery } from '@mantine/hooks';
import { MOBILE_MAX_WIDTH } from 'shared/config';

export function useMobile() {
  return useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
}
