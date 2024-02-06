'use client';
import { logout } from '@/actions/logout';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import React from 'react';

const SettingsPage = () => {
  const user = useCurrentUser();
  const onClick = async () => {
    // it is useful when we want to some server stuff before logout like removing the session and also some analytics for the data
    await logout();
  };
  return (
    <div className='p-10 bg-white rounded-lg'>
      <Button onClick={onClick}>Sign Out</Button>
    </div>
  );
};

export default SettingsPage;