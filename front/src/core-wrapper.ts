import _core from 'core/src/index';
import { CoreInstanceInterface } from 'core/src/interface';

const core: CoreInstanceInterface = _core;
(globalThis as any).core = core;
export default function getCore(): CoreInstanceInterface {
    return core;
}
