import {
    render as reactRender,
    unmountComponentAtNode as reactUnmount,
} from 'react-dom';

import Diaglog, { DialogProps } from '@/components/common/modal/Dialog';

type ConfigUpdate = DialogProps | ((prevConfig: DialogProps) => DialogProps);
export type ConfirmReturnType = {
    destory: (...args: any[]) => void;
    update: (props: DialogProps) => void;
};

export default function confirm(config: DialogProps): ConfirmReturnType {
    let currentConfig = { ...config, visible: true } as any;
    const container = document.createDocumentFragment();
    let close: any;

    function destory(...args: any[]) {
        if (config.handleCancelClick) {
            config.handleCancelClick(...args);
        }
        reactUnmount(container);
    }

    function render(props: DialogProps) {
        reactRender(<Diaglog handleClose={close} {...props} />, container);
    }

    function update(configUpdate: ConfigUpdate) {
        if (typeof configUpdate === 'function') {
            currentConfig = configUpdate(currentConfig);
        } else {
            currentConfig = {
                ...currentConfig,
                ...configUpdate,
            };
        }
        render(currentConfig);
    }

    close = (...args: any[]) => {
        currentConfig = {
            ...currentConfig,
            visible: false,
            afterClose: () => {
                if (typeof config.afterClose === 'function')
                    config.afterClose();
                destory(args);
            },
        };
        render(currentConfig);
    };

    render(currentConfig);

    return {
        destory: close,
        update,
    };
}
