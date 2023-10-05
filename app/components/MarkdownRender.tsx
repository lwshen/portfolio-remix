import { useEffect, useState } from 'react';

import { renderMarkdown } from '~/utils/markdown';

export type RenderProps = {
  markdown?: string;
};

export default function MarkdownRender({ markdown }: RenderProps) {
  const [content, setContent] = useState('');
  useEffect(() => {
    renderMarkdown(markdown ?? '').then(res => setContent(res));
  }, [markdown]);

  return <div className="prose prose-p:my-2" dangerouslySetInnerHTML={{ __html: content }} />;
}
