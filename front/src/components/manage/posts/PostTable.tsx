import { TableContextProvider } from '@/components/common/TableContextProvider';

function PostTableComponent(): JSX.Element {
    return <div>aaa</div>;
}

function PostTableWithProvider() {
    return (
        <TableContextProvider>
            <PostTableComponent />
        </TableContextProvider>
    );
}

export { PostTableWithProvider as PostTable };
