import HomeHeader from '~/components/HomeHeader';
import HomeFooter from '~/components/HomeFooter';
import Name from '~/components/Name';
import Avatar, { links as avatarLinks } from '~/components/Avatar';
import AvatarImage from '~/assets/image/avatar.jpeg';

export function links() {
  return [...avatarLinks()];
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <HomeHeader />
      <Avatar className="w-16 h-16" imgUrl={AvatarImage} fallback="Ryo" />
      <Name className="text-bold text-3xl" values={['aaa', 'bbb']} />
      <HomeFooter />
    </div>
  );
}
