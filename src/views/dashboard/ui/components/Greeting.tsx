import { Title } from '@mantine/core';
import { useCurrentUser } from 'entities/user/model';
import { useMobile } from 'shared/hooks';

export const Greeting = () => {
  const { currentUser } = useCurrentUser();
  const isMobile = useMobile();

  return (
    <Title fw={900} lh="45px" fz={isMobile ? 20 : 32}>
      Good morning, {currentUser?.firstName}!
    </Title>
  );
};
