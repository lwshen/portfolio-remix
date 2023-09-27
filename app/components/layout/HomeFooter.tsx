import { useRootData } from '~/hooks/useRootData';

export default function HomeFooter() {
  const rootData = useRootData();
  const year = new Date().getFullYear();
  return (
    <div className="text-gray-400 px-4 py-16 text-center align-middle space-y-2">
      <div className="text-sm">Copyright 2022-{year} © Made With ❤ by Slinvent</div>
      {rootData.env.BEIAN.length > 0 && (
        <a href="http://beian.miit.gov.cn" className="text-xs">
          {rootData.env.BEIAN}
        </a>
      )}
    </div>
  );
}
