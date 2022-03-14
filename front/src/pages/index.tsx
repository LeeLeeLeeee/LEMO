import HomeContent from '@/components/home/HomeContent';
import NavigationBar from '@/components/home/NavigationBar';
import MainLayout from '@/layout/Layout';
import { Meta } from '@/layout/Meta';

const Index = () => {
    return (
        <MainLayout
            meta={
                <Meta
                    title="GoGo Dev"
                    description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
                />
            }
        >
            <NavigationBar />
            <HomeContent />
        </MainLayout>
    );
};

export default Index;
