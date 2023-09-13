import hljs from 'highlight.js';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

export function renderMarkdown(content: string) {
  const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
    })
  );

  var rendererMD = new marked.Renderer();

  rendererMD.link = function (href, title, text) {
    return `<a href="${href}" title="${title || text}" target="_blank">${text}</a>`;
  };

  marked.use({
    pedantic: false,
    gfm: true,
    renderer: rendererMD,
  });

  return marked.parse(content);
}
