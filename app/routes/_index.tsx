import Home, { links as homeLinks } from '~/components/home/Home';

export function links() {
  return [...homeLinks()];
}

export default function index() {
  return <Home />;
}
