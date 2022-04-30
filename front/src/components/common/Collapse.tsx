import React, { useState } from 'react';

import styled from '@emotion/styled';
import { motion, Variants } from 'framer-motion';

import { ArrowDownIcon } from '@/icons';

import ContainerFlex from './ContainerFlex';

interface Props {
    children: React.ReactNode | React.ReactNode[];
}

const CollapseWrapper = styled(ContainerFlex)`
    width: 100%;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    overflow-y: hidden;
    & > div:first-child {
        align-self: stretch;
        padding: 5px;
        display: inline-flex;
        align-items: : center;
        & > svg {
            cursor: pointer;
        }
    }

    & > .collapse-children {
        align-self: stretch;
    }
`;

const OPEN_STATUS = {
    IS_OPEN: '1',
    IS_CLOSED: '2',
};

const motionDivVariants: Variants = {
    [OPEN_STATUS.IS_OPEN]: { height: '100%', visibility: 'visible' },
    [OPEN_STATUS.IS_CLOSED]: { height: '0px', visibility: 'hidden' },
};

const motionButtonVariants: Variants = {
    [OPEN_STATUS.IS_OPEN]: { rotate: 180 },
    [OPEN_STATUS.IS_CLOSED]: { rotate: 0 },
};

function Collapse(props: Props): JSX.Element {
    const { children } = props;
    const [isOpen, setIsOpen] = useState(OPEN_STATUS.IS_OPEN);

    const handleCollapseClick = () => {
        if (OPEN_STATUS.IS_OPEN === isOpen) {
            setIsOpen(OPEN_STATUS.IS_CLOSED);
            return;
        }
        setIsOpen(OPEN_STATUS.IS_OPEN);
    };

    return (
        <CollapseWrapper $padding={0} $direction="column">
            <div>
                <motion.button
                    animate={isOpen}
                    variants={motionButtonVariants}
                    transition={{
                        ease: 'easeOut',
                    }}
                    onClick={handleCollapseClick}
                >
                    <ArrowDownIcon />
                </motion.button>
            </div>
            <motion.div
                animate={isOpen}
                variants={motionDivVariants}
                transition={{
                    ease: 'easeOut',
                    duration: 0.3,
                    visibility: { duration: 0, delay: 0.3 },
                }}
                className={`collapse-children`}
            >
                <div>{children}</div>
            </motion.div>
        </CollapseWrapper>
    );
}

export default React.memo(Collapse);
