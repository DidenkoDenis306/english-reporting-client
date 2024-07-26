import { AuthorizedLayout } from '@repo/src/components/layouts';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <AuthorizedLayout>{children}</AuthorizedLayout>;
}
