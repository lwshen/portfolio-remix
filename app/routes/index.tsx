import Name from '~/components/home/Name';
import Avatar, { links as avatarLinks } from '~/components/home/Avatar';
import AvatarImage from '~/assets/image/avatar.jpeg';

export function links() {
  return [...avatarLinks()];
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <Avatar className="w-16 h-16" imgUrl={AvatarImage} fallback="Ryo" />
      <Name className="text-bold text-3xl" values={['aaa', 'bbb']} />
    </div>
  );
}
