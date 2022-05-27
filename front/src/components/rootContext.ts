import create from '@/lib/context';
import useAlert from '@/hooks/useAlert';
import useModal from '@/hooks/useModal';

export const rootContext = create({
    useAlert,
    useModal,
});
