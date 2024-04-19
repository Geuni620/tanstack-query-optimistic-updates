'use client';

import { useParams } from 'next/navigation';

import { useDetailDataGetQuery } from '@/hook/useDetailDataGetQuery';

const DetailPage = () => {
  const { id } = useParams();
  const detail = useDetailDataGetQuery({ id });

  if (detail.data)
    return (
      <div>
        <h1>Detail Page</h1>
        <p>id: {id}</p>
      </div>
    );

  return <div>Loading...</div>;
};

export default DetailPage;
