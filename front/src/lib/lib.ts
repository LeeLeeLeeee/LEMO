/* eslint-disable no-param-reassign */
import { marked } from 'marked';

import { hljs } from './editor';
import { escape } from './escape';

marked.setOptions({
    highlight(code: string, lang: string) {
        const highlightedCode = hljs.highlight(code, {
            language: lang || 'plaintext',
        }).value;
        return highlightedCode;
    },
});

const renderer: { code: any; options?: any } = {
    code(code: string, infostring: string, escaped?: boolean) {
        const lang = (infostring || '').match(/\S*/)![0] || '';
        if (this.options.highlight) {
            if (['javascript', 'markdown', 'go', 'plaintext'].includes(lang)) {
                const out = this.options.highlight(code, lang);
                if (out != null && out !== code) {
                    escaped = true;
                    code = out;
                }
            }
        }

        code = `${code.replace(/\n$/, '')}\n`;

        if (!lang) {
            return `<pre data-lang="text" class='codeblock'${
                escaped ? code : escape(code, true)
            }</pre>\n`;
        }
        return `<pre data-lang="${escape(lang, true)}" class="codeblock ${
            this.options.langPrefix
        }${escape(lang, true)}">${escaped ? code : escape(code, true)}</pre>\n`;
    },
};

marked.use({ renderer });

export default marked;
