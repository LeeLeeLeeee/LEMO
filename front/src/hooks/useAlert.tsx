import { useCallback, useReducer } from 'react';

import {
    reducer,
    actions,
    initialState,
    MessageTypes,
    ConfirmTypes,
} from '@/stores/context/alert';
import { SECOND } from '@/const/variable';

type MessageProps = Omit<MessageTypes, 'types' | 'index'> | string;
type ConfirmProps = Omit<ConfirmTypes, 'types'>;

const defaultDuration = SECOND * 3;

function createMessage(
    type: MessageTypes['type'],
    content: string,
    title?: string,
    duration?: number,
    position?: MessageTypes['position']
) {
    return {
        type,
        content,
        title: title ?? '',
        duration: duration ?? defaultDuration,
        position: position ?? 'top-right',
    };
}

function createConfirm(
    type: MessageTypes['type'],
    content: string,
    callOkFunc: () => void,
    title?: string
) {
    return {
        type,
        content,
        title: title ?? '',
        callOkFunc,
    };
}

function useAlert() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const callMessage = useCallback(
        (type: MessageTypes['type']) => (props: MessageProps) => {
            let message: Omit<MessageTypes, 'index'> | undefined;
            if (typeof props === 'string') {
                message = createMessage(type, props);
            } else {
                message = createMessage(
                    type,
                    props.content,
                    props.title,
                    props?.duration,
                    props?.position
                );
            }
            dispatch(actions.insertMessage(message));
        },
        []
    );

    const removeMessage = useCallback((index: number) => {
        dispatch(actions.deleteMessage(index));
    }, []);

    const removeConfirm = useCallback(() => {
        dispatch(actions.closeConfirm());
    }, []);

    const callConfirm = useCallback(
        (type: MessageTypes['type']) => (props: Omit<ConfirmProps, 'type'>) => {
            let confirm: Omit<ConfirmProps, 'type'> | undefined;
            if (typeof props === 'string') {
                confirm = createConfirm(type, props, removeConfirm);
            } else {
                confirm = createConfirm(
                    type,
                    props.content,
                    props.callOkFunc,
                    props.title
                );
            }
            dispatch(actions.openConfirm(confirm));
        },
        []
    );

    return {
        state,
        message: {
            info: callMessage('info'),
            error: callMessage('error'),
            success: callMessage('success'),
            warning: callMessage('warning'),
            remove: removeMessage,
        },
        confirm: {
            info: callConfirm('info'),
            error: callConfirm('error'),
            success: callConfirm('success'),
            warning: callConfirm('warning'),
            remove: removeConfirm,
        },
    };
}

export default useAlert;
