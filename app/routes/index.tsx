import { Name } from '~/components/Name';

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <p>Slinvent</p>
      <p className="text-blue-700">Slinvent</p>
      <Name className="text-bold text-4xl" values={['aaa', 'bbb']} />
    </div>
  );
}
