'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';

const Provider: FC<Props> = ({ children, session }): JSX.Element => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

type Props = {
  children: ReactNode;
  session?: Session;
};

export default Provider;
