import React from 'react';

import styled from '@emotion/styled';
import tw from 'twin.macro';
import ReactDOM from 'react-dom';

import { SizeType } from '@/components/interface';
import { CloseIcon } from '@/icons';

import IconButton from '../button/IconButton';

interface Props {
    dialogID: string;
    title?: string;
    closeable?: boolean;
    visible?: boolean;
    footer?: React.ReactNode;
    children: React.ReactNode;
    animateTime?: number;
    size?: SizeType;
    afterClose?: () => void;
    handleOkClick?: (...args: any[]) => any;
    handleCancelClick?: (...args: any[]) => any;
    handleClose?: () => void;
}

interface State {
    ownVisible: boolean;
}

const calculateWidth = (size?: SizeType) => {
    switch (size) {
        case 'small':
            return '300px';
        case 'medium':
            return '450px';
        case 'large':
            return '600px';
        default:
            return '250px';
    }
};

const calculateHeight = (size?: SizeType) => {
    switch (size) {
        case 'small':
            return '200px';
        case 'medium':
            return '300px';
        case 'large':
            return '400px';
        default:
            return '250px';
    }
};

const DialogWrapper = styled.div<Partial<Props>>((props) => [
    tw`bg-white shadow-md absolute inline-flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 rounded-md font-sans-kr`,
    {
        width: calculateWidth(props.size),
        height: calculateHeight(props.size),
        '& > div': {
            padding: '0px 10px',
        },
        '& > .dialog-header': {
            paddingTop: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            '& > span': {
                fontWeight: 'bold',
            },
        },
    },
]);

class Diaglog extends React.Component<Props, State> {
    static defaultProps: Partial<Props> = { animateTime: 500, size: 'medium' };

    private renderHeader() {
        if (this.props.title === undefined) return <></>;

        return (
            <div className="dialog-header">
                <span>{this.props.title}</span>
                <IconButton
                    onClick={this.props.handleClose}
                    iconNode={<CloseIcon />}
                />
            </div>
        );
    }

    componentDidUpdate() {
        if (!this.props.visible) {
            if (typeof this.props.afterClose === 'function')
                this.props.afterClose();
        }
    }

    render() {
        if (!this.props.visible) return <></>;

        return ReactDOM.createPortal(
            <DialogWrapper size={this.props.size}>
                {this.renderHeader()}
                {this.props.children}
                {this.props.footer}
            </DialogWrapper>,
            document.body
        );
    }
}

export default Diaglog;
export type { Props as DialogProps };
