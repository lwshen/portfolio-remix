import type { LinksFunction } from '@remix-run/node';
import * as AvatarWrap from '@radix-ui/react-avatar';
import styles from '~/styles/components/avatar.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ];
};

export type AvatarProps = {
  className?: string;
  imgUrl: string;
  fallback?: string;
};

export default function Avatar({ className, imgUrl, fallback }: AvatarProps) {
  return (
    <AvatarWrap.Root className={`AvatarRoot ${className || ''}`}>
      <AvatarWrap.Image className="AvatarImage" src={imgUrl} alt="Avatar Image" />
      <AvatarWrap.Fallback className="AvatarFallback" delayMs={600}>
        {fallback || ''}
      </AvatarWrap.Fallback>
    </AvatarWrap.Root>
  );
}
