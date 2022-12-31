import Name from '~/components/Name';
import Avatar, { links as avatarLinks } from '~/components/Avatar';
import AvatarImage from '~/assets/image/avatar.jpeg';

export function links() {
  return [...avatarLinks()];
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <Avatar className="w-16 h-16" imgUrl={AvatarImage} fallback="Ryo" />
      <p>Slinvent</p>
      <p className="text-blue-700">Slinvent</p>
      <Name className="text-bold text-4xl" values={['aaa', 'bbb']} />
    </div>
  );
}
