/* eslint-disable no-param-reassign */
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import markdown from 'highlight.js/lib/languages/markdown';
import golang from 'highlight.js/lib/languages/go';
import plaintext from 'highlight.js/lib/languages/plaintext';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('go', golang);
hljs.registerLanguage('plaintext', plaintext);

export const highligher = (editor: HTMLElement) => {
    const code: string = editor.textContent || '';
    editor.innerHTML = hljs.highlightAuto(code, ['markdown']).value;
};

export const createImageMarkDownSymbol = (fileLink: string) =>
    `![](http://localhost:3000/${fileLink})`;

export { hljs };
