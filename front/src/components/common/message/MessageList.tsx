/* eslint-disable no-param-reassign */
import React, { useEffect, useRef } from 'react';

import ReactDOM from 'react-dom';
import tw from 'twin.macro';

import { rootContext } from '@/components/rootContext';

import MessageComponent from './Message';

const MessageListWrapper = tw.div`
    fixed
    top-4
    right-4
    z-10
    flex-col
`;

function MessageList(): JSX.Element {
    const {
        state: { message },
    } = rootContext.useAlert();
    const messageListTarget = useRef<any>();
    const { list: messageList } = message;
    const {
        message: { remove },
    } = rootContext.useAlert();

    useEffect(() => {
        messageListTarget.current = document.getElementById('tailwind-wrapper');
    }, []);

    return (
        <>
            {messageList.length > 0 &&
                ReactDOM.createPortal(
                    <>
                        <MessageListWrapper>
                            {messageList.map((_message) => (
                                <MessageComponent
                                    content={_message.content}
                                    index={_message.index}
                                    duration={_message.duration}
                                    title={_message.title}
                                    key={_message.index}
                                    type={_message.type}
                                    handleClose={remove}
                                />
                            ))}
                        </MessageListWrapper>
                    </>,
                    messageListTarget.current
                )}
        </>
    );
}

export default React.memo(MessageList);
