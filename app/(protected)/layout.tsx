import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

const ProtectedLayout = async ({ children }: Props) => {
    const session = await auth();
    return (
        <div>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </div>
    );
};

export default ProtectedLayout;