import Home from '~/components/home/Home';
import { links as avatarLinks } from '~/components/home/Avatar';

export function links() {
  return [...avatarLinks()];
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <Home />
    </div>
  );
}
