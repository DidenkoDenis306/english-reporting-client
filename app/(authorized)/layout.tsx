import { PropsWithChildren } from 'react';
import { AuthorizedLayout } from 'app/layouts';

export default function Layout({ children }: PropsWithChildren) {
  return <AuthorizedLayout>{children}</AuthorizedLayout>;
}
