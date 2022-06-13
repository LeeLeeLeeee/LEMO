import { useEffect } from 'react';

import HomeContent from '@/components/home/HomeContent';
import NavigationBar from '@/components/home/NavigationBar';
import MainLayout from '@/layout/Layout';
import useAuthDispatch from '@/stores/auth/hook';

const Index = () => {
    const { getSelfAsync } = useAuthDispatch();
    useEffect(() => {
        getSelfAsync();
    }, []);
    return (
        <MainLayout>
            <NavigationBar />
            <HomeContent />
        </MainLayout>
    );
};

export default Index;
