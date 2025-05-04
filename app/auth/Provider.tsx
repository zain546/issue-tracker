'use client';
import { SessionProvider } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';

// propswithchildren is a type from react that allows us to pass children to a component
const AuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
