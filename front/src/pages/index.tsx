import HomeContent from '@/components/home/HomeContent';
import NavigationBar from '@/components/home/NavigationBar';
import MainLayout from '@/layout/Layout';

const Index = () => {
    return (
        <MainLayout>
            <NavigationBar />
            <HomeContent />
        </MainLayout>
    );
};

export default Index;
