import { useServerUser } from '@/hooks/user-current-user-server';
import React from 'react';

const ServerPage = async () => {
    const session = await useServerUser();
    return (
        <div>
            {JSON.stringify(session)}
        </div>
    );
};

export default ServerPage;