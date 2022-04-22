import create from '@/lib/context';
import useAlert from '@/hooks/useAlert';

export const rootContext = create({
    useAlert,
});
