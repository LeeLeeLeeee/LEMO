import React from 'react';

import { motion } from 'framer-motion';

interface Props {
    styles?: React.CSSProperties;
}

function withHoverAnime<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    props: Props = {}
): React.FC<P> {
    const { styles = {} } = props;
    return (hocProps: P): JSX.Element => (
        <motion.div
            whileHover={{
                x: -2,
                y: -2,
                boxShadow: '5px 5px 3px -1px rgba(0, 0, 0, .5)',
            }}
            style={{ ...styles }}
        >
            <WrappedComponent {...hocProps} />
        </motion.div>
    );
}

export default withHoverAnime;
