import Avatar from '~/components/home/Avatar';
import AvatarImage from '~/assets/image/avatar.jpeg';
import Name from '~/components/home/Name';

export default function Home() {
  const names = ['Slinvent', 'Ryo Shen', 'Lingwei Shen'];

  return (
    <div className="flex flex-row items-center space-x-8">
      <Avatar className="w-16 h-16" imgUrl={AvatarImage} fallback="Ryo" />
      <Name className="text-bold text-3xl" values={names} />
    </div>
  );
}
