import { Link, useLoaderData } from '@remix-run/react';

import { motion } from 'framer-motion';

import Title from '~/components/Title';
import { FADE_DOWN_ANIMATION_VARIANTS } from '~/utils/constants';
import { getPosts } from '~/utils/post.server';

export const loader = getPosts;

export default function Posts_index() {
  const posts = useLoaderData<typeof loader>();
  return (
    <div>
      <Title>Posts</Title>
      <motion.div
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {posts.map(post => (
          <motion.p key={post.slug} variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <Link to={post.slug}>{post.attribute.title}</Link>
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}
