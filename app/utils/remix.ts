import type { useLoaderData } from '@remix-run/react';

export type LoaderData<T> = ReturnType<typeof useLoaderData<T>>;
