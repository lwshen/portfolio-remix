import Home from '~/components/home/Home';
import { links as avatarLinks } from '~/components/home/Avatar';

export function links() {
  return [...avatarLinks()];
}

export default function Index() {
  return <Home />;
}
