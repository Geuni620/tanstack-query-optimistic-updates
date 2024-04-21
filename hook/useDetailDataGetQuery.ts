import { useQuery } from '@tanstack/react-query';
import camelcaseKeys from 'camelcase-keys';

type DetailDataProps = {
  id: string | string[];
};

export type DetailData = {
  id: number;
  task: string;
  statusId: number;
  sttausName: string;
  notes: string;
  date: Date;
  done: boolean;
};

const getDetailData = async ({ id }: DetailDataProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/details/${id}`,
  );

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await res.json();
  const { detail } = camelcaseKeys(data, { deep: true });

  return detail;
};

export const useDetailDataGetQuery = ({ id }: DetailDataProps) => {
  return useQuery<DetailData>({
    queryFn: () => getDetailData({ id }),
    queryKey: ['detail', id],
  });
};
