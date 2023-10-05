import hljs from 'highlight.js';
import katex from 'katex';
import { Marked } from 'marked';
// @ts-ignore
import markedKatex from 'marked-katex-extension';
// @ts-ignore: 1479
import rehypeStringify from 'rehype-stringify';
// @ts-ignore: 1479
import remarkParse from 'remark-parse';
// @ts-ignore: 1479
import remarkRehype from 'remark-rehype';
// @ts-ignore: 1479
import { unified } from 'unified';

function highlight(code: string, lang: string) {
  const language = hljs.getLanguage(lang) ? lang : 'plaintext';
  return hljs.highlight(code, { language }).value;
}

export async function renderMarkdown(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);
  return result.value.toString();
}

export function renderMarkdownOld(content: string) {
  const marked = new Marked();

  var renderer = new marked.Renderer();

  renderer.link = function (href, title, text) {
    return `<a href="${href}" title="${title || text}" target="_blank">${text}</a>`;
  };
  renderer.code = function (code, language) {
    const lang = getLang(language);
    if (lang === 'math' || lang === 'latex' || lang === 'katex') {
      return (
        '<p class="katex">' +
        katex.renderToString(code, {
          output: 'html',
          throwOnError: false,
          displayMode: true,
        }) +
        '</p>'
      );
    } else if (lang === 'seq' || lang === 'sequence') {
      return '<pre class="sequence-diagram">' + code + '</pre>';
    } else if (lang === 'flow') {
      return '<pre class="flowchart">' + code + '</pre>';
    } else {
      const hlCode = highlight(code, lang);
      return `<pre><code class="hljs language-${escape(lang, false)}">${hlCode}</code></pre>`;
    }
  };

  marked.use(
    {
      pedantic: false,
      gfm: true,
      renderer: renderer,
    },
    markedKatex({
      output: 'html',
      throwOnError: false,
    })
  );

  return marked.parse(content);
}

/**
 * Extracts the first non-whitespace character from a language string.
 * @param lang - The language string.
 * @returns The first non-whitespace character from the language string.
 */
function getLang(lang: string | undefined): string {
  return (lang || '').match(/\S*/)?.[0] || '';
}

// copied from marked helpers
const escapeTest: RegExp = /[&<>"']/;
const escapeReplace: RegExp = new RegExp(escapeTest.source, 'g');
const escapeTestNoEncode: RegExp = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode: RegExp = new RegExp(escapeTestNoEncode.source, 'g');
const escapeReplacements: { [key: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const getEscapeReplacement = (ch: string): string => escapeReplacements[ch];

/**
 * Escapes HTML characters in a string.
 *
 * @param html - The input string to escape.
 * @param encode - Whether to encode special characters or not.
 * @returns The escaped HTML string.
 */
function escape(html: string, encode: boolean): string {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }

  return html;
}
