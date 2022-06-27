import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';

import { ResizableBox } from 'react-resizable';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import ContainerFlex from '@/components/common/ContainerFlex';
import { CombinedState } from '@/stores/interface';

import MarkDownPreview from './MarkDownPreview';
import MarkDownEditor from './MarkDownEditor';

const ResizeHandler = styled.span`
    position: absolute;
    height: 100%;
    right: -7px;
    top: 0px;
    cursor: e-resize;
    border: 2px solid gray;
    border-radius: 5px;
`;

function MarkDown(): JSX.Element {
    const wrapperElement = useRef<any>();
    const [size, setSize] = useState({
        width: 1000,
        height: 0,
    });

    const preview = useSelector(
        (state: CombinedState) => state.posting.setting.preview
    );

    const onResize = (event: any) => {
        const { left } = wrapperElement.current?.getBoundingClientRect() || {
            left: 0,
        };
        const { clientX } = event;
        setSize((_size) => ({
            ..._size,
            width: Math.min(clientX - left, 1000),
        }));
    };

    useEffect(() => {
        const { height } = wrapperElement.current?.getBoundingClientRect() || {
            height: 0,
        };
        setSize((_size) => ({ ..._size, height }));
    }, []);

    return (
        <>
            <ContainerFlex
                $gap={3}
                ref={wrapperElement}
                className="flex-1 w-full"
            >
                {preview ? (
                    <ResizableBox
                        className="relative !h-full"
                        width={size.width}
                        height={size.height}
                        maxConstraints={[1000, Infinity]}
                        axis="x"
                        handle={preview ? <ResizeHandler /> : <></>}
                        onResize={(e: SyntheticEvent) => onResize(e)}
                    >
                        <MarkDownEditor resizeMode width={size.width} />
                    </ResizableBox>
                ) : (
                    <MarkDownEditor />
                )}

                {preview && <MarkDownPreview />}
            </ContainerFlex>
        </>
    );
}

export default React.memo(MarkDown);
