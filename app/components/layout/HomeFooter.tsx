import { useEffect, useState } from 'react';

export default function HomeFooter() {
  const [beian, setBeian] = useState('');
  useEffect(() => {
    setBeian(window.ENV.BEIAN);
  }, []);
  return (
    <div className="text-gray-400 pt-8 p-4 text-center align-middle space-y-2">
      <div className="text-sm">Copyright © Slinvent</div>
      {beian.length > 0 && (
        <a href="http://beian.miit.gov.cn" className="text-xs">
          {beian}
        </a>
      )}
    </div>
  );
}
