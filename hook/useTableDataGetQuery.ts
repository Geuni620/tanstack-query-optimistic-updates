import { useQuery } from '@tanstack/react-query';
import camelcaseKeys from 'camelcase-keys';

export type List = {
  id: number;
  task: string;
  statusId: number;
  statusName: string;
  notes: string;
  date: Date;
  done: boolean;
};

const getTableDataViaPOST = async ({
  searchCondition,
}: {
  searchCondition: string;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ searchCondition }),
  });

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await res.json();
  const { list } = camelcaseKeys(data, { deep: true });

  return list;
};

type TableDataProps = {
  searchCondition: string;
};

export const useTableDataGetQuery = ({ searchCondition }: TableDataProps) => {
  return useQuery<List[]>({
    queryFn: () => getTableDataViaPOST({ searchCondition }),
    queryKey: ['table', searchCondition],
  });
};
