import { Link, useLoaderData } from '@remix-run/react';

import { getPosts } from '~/utils/post';

export const loader = getPosts;

export default function Posts_index() {
  const posts = useLoaderData<typeof loader>();
  return (
    <div>
      <p className="text-3xl font-bold pb-8 jin-bu-ti">Posts</p>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.attribute.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
