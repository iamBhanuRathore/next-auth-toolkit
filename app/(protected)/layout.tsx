import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import Navbar from './_components/navbar';

type Props = {
    children: React.ReactNode;
};

const ProtectedLayout = async ({ children }: Props) => {
    const session = await auth();
    console.log({ session });
    return (
        <div className='h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
            <SessionProvider session={session}>
                <Navbar />
                {children}
            </SessionProvider>
        </div>
    );
};

export default ProtectedLayout;