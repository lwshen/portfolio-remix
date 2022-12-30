import type { LinksFunction } from '@remix-run/node';
import * as Avatar from '@radix-ui/react-avatar';

import { Name } from '~/components/Name';
import AvatarImage from '~/assets/image/avatar.jpeg';
import stylesUrl from '~/styles/components/avatar.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: stylesUrl
    }
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <Avatar.Root className="AvatarRoot">
        <Avatar.Image className="AvatarImage" src={AvatarImage} alt="Avatar Image" />
        <Avatar.Fallback className="AvatarFallback" delayMs={600}>
          Ryo
        </Avatar.Fallback>
      </Avatar.Root>
      <p>Slinvent</p>
      <p className="text-blue-700">Slinvent</p>
      <Name className="text-bold text-4xl" values={['aaa', 'bbb']} />
    </div>
  );
}
