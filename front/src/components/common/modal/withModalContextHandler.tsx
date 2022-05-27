import { useCallback } from 'react';

import { rootContext } from '@/components/rootContext';

import { DialogProps } from './Dialog';

export default function withModalContextHandler<T extends DialogProps>(
    WrappedComponent: React.ComponentType<T>
): React.ComponentType<T> {
    return (props: T) => {
        const { setModalClose, state } = rootContext.useModal();
        const { visible, ...rest } = props;
        const handleModalClose = useCallback(() => {
            setModalClose(props.dialogID);
        }, []);
        const modalVisible =
            visible !== undefined ? visible : state.modalID.has(props.dialogID);

        return (
            <WrappedComponent
                visible={modalVisible}
                handleClose={handleModalClose}
                {...(rest as any)}
            />
        );
    };
}
