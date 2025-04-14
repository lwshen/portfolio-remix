import { Avatar as AvatarWrap } from '@chakra-ui/react';
import type { LinksFunction } from '@remix-run/node';

import styles from '~/styles/components/avatar.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export type AvatarProps = {
  imgUrl: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | '2xs' | 'xs';
};

export default function Avatar({ imgUrl, fallback, size }: AvatarProps) {
  return (
    <AvatarWrap.Root size={size || 'md'}>
      <AvatarWrap.Image src={imgUrl} />
      <AvatarWrap.Fallback name={fallback} />
    </AvatarWrap.Root>
  );
}
