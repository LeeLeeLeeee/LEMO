import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';
import Image from 'next/image';
import tw from 'twin.macro';

import { ImageUploadIcon } from '@/icons';

const CircleWrapper = styled.span<{
    width: number;
    height: number;
    scale: number;
}>`
    display: inline-flex;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border-radius: 100px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    ${tw`shadow-lg`}
    & > svg {
        stroke: gray;
        transform: scale(${(props) => props.scale});
    }
`;

interface Props extends HTMLAttributes<HTMLSpanElement> {
    imagePath?: string;
    width?: number;
    height?: number;
}

const DEFAULT_SCALE = 1.5;
const DEFAULT_SIZE = 100;
function CircleImage(props: Props) {
    const {
        imagePath,
        width = DEFAULT_SIZE,
        height = DEFAULT_SIZE,
        ...rest
    } = props;
    if (!imagePath) {
        const svgScale = Math.max(
            +(DEFAULT_SCALE * (width / DEFAULT_SIZE)).toFixed(1),
            0.8
        );
        return (
            <CircleWrapper
                {...rest}
                scale={svgScale}
                width={width}
                height={height}
            >
                <ImageUploadIcon />
            </CircleWrapper>
        );
    }

    return (
        <CircleWrapper
            {...rest}
            scale={DEFAULT_SCALE}
            width={width}
            height={height}
        >
            <Image src={imagePath} width={width} height={height} alt="image" />
        </CircleWrapper>
    );
}

export default CircleImage;
