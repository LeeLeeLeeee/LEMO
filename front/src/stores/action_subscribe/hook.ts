import { useEffect, useRef } from 'react';

import { useStore } from 'react-redux';

import { ActionState } from '../interface';

export function useReduxAction(
    effect: (props: Partial<ActionState>) => void,
    type: string | string[],
    deps = []
) {
    const currentValue = useRef(null);
    const store = useStore();

    const handleChange = () => {
        const state = store.getState();
        const { action } = state;
        const previousValue = currentValue.current;
        currentValue.current = action.type;
        const targetTypes = Array.isArray(type) ? type : [type];
        if (
            previousValue !== action.type &&
            targetTypes.includes(action.type)
        ) {
            effect(action);
        }
    };

    useEffect(() => {
        const unsubscribe = store.subscribe(handleChange);
        return () => unsubscribe();
    }, deps);
}
