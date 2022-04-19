import React from 'react';

import tw from 'twin.macro';
import styled from '@emotion/styled';
import { Control, useController } from 'react-hook-form';

import { InputAttributeProps, SizeType } from '@/components/interface';

interface Props extends InputAttributeProps {
    inputSize?: SizeType;
    label?: string;
    type?: string;
    control?: Control;
    name?: string;
}

const FONT_SIZE: Record<SizeType, string> = {
    small: '.8rem',
    medium: '1rem',
    large: '1.2rem',
};

const PADDING: Record<SizeType, any> = {
    small: '2px 6px',
    medium: '4px 8px',
    large: '8px 10px',
};

const InputLabel = styled.label<Props>`
    font-size: ${(props) => FONT_SIZE[props.inputSize || 'medium']};
    padding: ${(props) => PADDING[props.inputSize || 'medium']};
    box-sizing: border-box;
    margin-bottom: 20px;
    ${tw`
        relative
        bg-white
        rounded-sm
        border
        border-gray-200
        disabled:bg-gray-300
    `}

    &:focus-within,
    &.input-has-value {
        ${tw`border-transparent`}
        & > span {
            top: 20%;
            ${tw`text-primary`}
        }
        box-shadow: rgba(var(--color-primary) / 90) 0px 4px 8px -2px,
            rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    }

    &.input-has-error {
        border: 1px solid rgb(var(--color-error));
        box-shadow: rgba(var(--color-error) / 90) 0px 4px 8px -2px,
            rgba(var(--color-error)) 0px 0px 0px 1px;
    }

    & > span {
        ${tw`text-sm text-gray-500 absolute`}
        top: 50%;
        left: 20px;
        transform: translate(-50%, -50%);
        transition: top 0.1s ease-in-out;
    }

    &.input-has-error > span {
        ${tw`text-red-500`}
    }

    & > input {
        padding-top: ${(props) => FONT_SIZE[props.inputSize || 'medium']};
        ${tw`w-full`}
    }
`;

const InputElement = tw.input`
    bg-transparent
    focus-visible:outline-none
`;

const InputErrorTextElement = tw.div`
    h-5
    leading-5
    text-red-500
    text-sm
    absolute
    left-[5px]
    bottom-[-22px]
`;

function HookFormInput(props: Omit<Props, 'placeholder'>): JSX.Element {
    const {
        label,
        inputSize = 'medium',
        style,
        type = 'text',
        name = '',
        control,
        defaultValue = '',
        ...rest
    } = props;

    const {
        field: { value, ref, onChange, onBlur },
        fieldState: { error },
    } = useController({
        name,
        control,
        defaultValue,
    });

    return (
        <>
            <InputLabel
                className={`${value && !error && 'input-has-value'} ${
                    error && 'input-has-error'
                }`}
                style={style}
                inputSize={inputSize}
            >
                {label && <span>{label}</span>}
                <InputElement
                    type={type}
                    value={value}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                />
                {error && (
                    <InputErrorTextElement>
                        {error.message}
                    </InputErrorTextElement>
                )}
            </InputLabel>
        </>
    );
}

export default React.memo(HookFormInput);
