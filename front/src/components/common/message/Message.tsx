import React, { useEffect } from 'react';

import styled from '@emotion/styled';
import tw from 'twin.macro';
import { motion } from 'framer-motion';

import { MessageTypes } from '@/stores/context/alert';

interface Props extends MessageTypes {
    handleClose: (index: number) => void;
}

const typeToColor = (type: MessageTypes['type'] = 'info'): string => {
    if (type === 'info') {
        return 'primary';
    }
    return type;
};

const MessageWrapper = styled.div<Pick<Props, 'type'>>((props) => [
    tw`font-sans-kr border-l-[4px] shadow-md rounded-sm min-h-[20px] min-w-[130px] p-2 bg-white m-2`,
    { borderColor: `rgb(var(--color-${typeToColor(props.type)}))` },
    {
        '& .message-title': {
            fontSize: '.9rem',
        },
        '& .message-content': {
            fontSize: '.8rem',
            color: '#484848',
        },
        '& .message-title + .message-content': {
            marginLeft: '5px',
        },
    },
]);

function MessageComponent(props: Props): JSX.Element {
    const { index, content, duration, title, type, handleClose } = props;

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            handleClose(index);
        }, duration);

        return () => {
            clearTimeout(timeoutID);
        };
    }, []);

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                duration: 0.1,
                ease: 'easeInOut',
            }}
        >
            <MessageWrapper type={type}>
                <div>
                    {title && <div className="message-title">{title}</div>}
                    <div className="message-content">{content}</div>
                </div>
            </MessageWrapper>
        </motion.div>
    );
}

export default MessageComponent;
