'use client';
import { Button } from '@/components/ui/button';
import { useSession, signOut } from 'next-auth/react';
import React from 'react';

const HomePage = () => {
    const { data, status, update } = useSession();
    console.log({ data, status, update });
    const onClick = () => {
        signOut();
    };
    return (
        <div>{JSON.stringify(data)}
            <Button onClick={onClick}>Sign Out</Button>
        </div>
    );
};

export default HomePage;