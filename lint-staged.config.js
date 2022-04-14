const micromatch = require('micromatch');

function containsInPath(pattern, list) {
    return list.filter((item) => micromatch.contains(item, pattern));
}

function makePattern(extension) {
    return `**/*.${extension}`;
}

module.exports = (stagedFiles) => {
    const eslintExtensions = ['ts', 'tsx', 'js'].map(makePattern);
    const eslintFiles = micromatch(stagedFiles, eslintExtensions);

    const front = containsInPath('/front/', eslintFiles);
    const core = containsInPath('/core/', eslintFiles);
    const server = containsInPath('/server/', eslintFiles);

    const mapping = {};
    const commands = [];
    mapping['npm run precommit:front -- '] = front.join(' ');
    mapping['npm run precommit:core -- '] = core.join(' ');
    mapping['npm run precommit:server -- '] = server.join(' ');

    for (const command of Object.keys(mapping)) {
        const files = mapping[command];
        if (files.length) {
            commands.push(`${command} ${files}`);
        }
    }

    return commands;
};