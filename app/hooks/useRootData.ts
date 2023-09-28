import { useRouteLoaderData } from '@remix-run/react';

import type { loader } from '~/root';
import type { LoaderData } from '~/utils/remix';

export const useRootData = () => {
  const rootData = useRouteLoaderData('root') as LoaderData<typeof loader>;

  return rootData;
};
