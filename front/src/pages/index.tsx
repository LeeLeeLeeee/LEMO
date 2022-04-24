import HomeContent from '@/components/home/HomeContent';
import NavigationBar from '@/components/home/NavigationBar';
import getCore from '@/core-wrapper';
import MainLayout from '@/layout/Layout';
import { Meta } from '@/layout/Meta';

const core = getCore();
const Index = ({ data }: any) => {
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
            <HomeContent feeds={data} />
        </MainLayout>
    );
};

export async function getServerSideProps() {
    const { data } = await core.post.getList({});
    return { props: { data } };
}

export default Index;
