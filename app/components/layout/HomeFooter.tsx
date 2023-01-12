import { useEffect, useState } from 'react';

export default function HomeFooter() {
  const [beian, setBeian] = useState('');
  useEffect(() => {
    setBeian(window.ENV.BEIAN);
  }, []);
  return (
    <div className="text-gray-400 px-4 py-16 text-center align-middle space-y-2">
      <div className="text-sm">Copyright © Slinvent</div>
      {beian.length > 0 && (
        <a href="http://beian.miit.gov.cn" className="text-xs">
          {beian}
        </a>
      )}
    </div>
  );
}
