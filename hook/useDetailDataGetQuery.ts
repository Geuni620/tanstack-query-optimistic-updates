import { useQuery } from '@tanstack/react-query';

type DetailDataProps = {
  id: string | string[];
};

const getDetailData = async ({ id }: DetailDataProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/details/${id}`,
  );

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await res.json();
  return data;
};

export const useDetailDataGetQuery = ({ id }: DetailDataProps) => {
  return useQuery({
    queryFn: () => getDetailData({ id }),
    queryKey: ['detail', id],
  });
};
