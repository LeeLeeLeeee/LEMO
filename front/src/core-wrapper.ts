import _core from 'core/src/index';

const core = _core;
(globalThis as any).core = core;
export default function getCore() {
    return core;
}
