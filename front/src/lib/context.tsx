/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-restricted-syntax */
import React, { createContext, useContext } from 'react';

interface Props {
    children: React.ReactChild;
}

export type UseProviderType = {
    useProvider: () => (props: {
        children: React.ReactElement[];
    }) => JSX.Element;
};

function create<T extends object, P extends keyof T>(
    hookMap: T
): Pick<T, P> & UseProviderType {
    const ctx: any = {};
    let BoProvider: any = null;
    for (const [hookKey, useValue] of Object.entries(hookMap)) {
        const OneContext = createContext({});
        ctx[hookKey] = () => useContext(OneContext);
        const AppProvider = BoProvider;
        const OneProvider = ({ children }: Props) => (
            <OneContext.Provider value={useValue()}>
                {children}
            </OneContext.Provider>
        );
        OneContext.displayName = `${hookKey}Context`;
        OneProvider.displayName = hookKey;
        if (AppProvider === null) {
            BoProvider = ({ children }: Props) => (
                <OneProvider>{children}</OneProvider>
            );
        } else {
            BoProvider = ({ children }: Props) => (
                <OneProvider>
                    <AppProvider>{children}</AppProvider>
                </OneProvider>
            );
        }
    }
    ctx.useProvider = () => BoProvider;
    return ctx as Pick<T, P> & UseProviderType;
}

export default create;
