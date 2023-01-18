import type { LinksFunction } from '@remix-run/node';
import { Avatar as AvatarWrap } from '@chakra-ui/react';
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
  size?: string;
};

export default function Avatar({ imgUrl, fallback, size }: AvatarProps) {
  return <AvatarWrap size={size || 'md'} name={fallback || ''} src={imgUrl} />;
}
