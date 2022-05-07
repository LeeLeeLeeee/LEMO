import { ArticleJsonLd } from 'next-seo';
import Head from 'next/head';

type IMetaProps = {
    title: string;
    url: string;
    images: string[];
    datePublished: string;
    dateModified: string;
    authorName: string;
    description: string;
    canonical?: string;
};

const Meta = (props: IMetaProps) => {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" key="charset" />
            </Head>
            <ArticleJsonLd type="Blog" {...props} />
        </>
    );
};

export { Meta };
