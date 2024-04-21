import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { type DetailData } from '@/hook/useDetailDataGetQuery';

// export const MUTATION_KEY = 'detail';

type ChangeToggle = {
  id: number;
  done: boolean;
  date: Date;
};

const changeToggle = async ({ id, done, date }: ChangeToggle) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/toggle/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, done, date }),
    },
  );

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await res.json();

  return data;
};

// export const useToggleOptimisticUi = () => {
//   const queryClient = useQueryClient();

//   const toggleMutation = useMutation({
//     mutationFn: changeToggle,
//     onSuccess: () => {
//       toast.success('성공적으로 업데이트 하였습니다!');
//     },
//     onSettled: () => {
//       // 해당부분은 return으로 처리해야함
//       return queryClient.invalidateQueries({
//         queryKey: ['detail'],
//       });
//     },
//     mutationKey: [MUTATION_KEY],
//   });

//   return toggleMutation;
// };

export const useToggleOptimisticCache = () => {
  const queryClient = useQueryClient();
  const toggleMutation = useMutation({
    mutationFn: changeToggle,
    onMutate: async (newData) => {
      const newDataId = newData.id.toString();

      await queryClient.cancelQueries({ queryKey: ['detail', newDataId] });
      await queryClient.cancelQueries({ queryKey: ['table'] });

      const previousDetail = queryClient.getQueryData<DetailData>([
        'detail',
        newDataId,
      ]);

      const updatedDetail = {
        ...previousDetail,
        done: newData.done,
        date: newData.date,
      };

      queryClient.setQueryData(['detail', newDataId], updatedDetail);
      queryClient.setQueryData(['table', ''], (oldData: DetailData[]) => {
        return oldData.map((item) => {
          if (item.id === newData.id) {
            return { ...item, done: newData.done, date: newData.date };
          }

          return item;
        });
      });

      return {
        previousDetail,
        newData,
      };
    },

    onError: (error, newData, context) => {
      queryClient.setQueryData(
        ['detail', context?.newData.id.toString()],
        context?.previousDetail,
      );

      queryClient.setQueryData(['table'], (oldTable: DetailData[]) => {
        return oldTable.map((item) => {
          return item.id === context?.newData.id
            ? context?.previousDetail
            : item;
        });
      });
    },

    onSuccess: () => {
      toast.success('성공적으로 업데이트 하였습니다!');
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['detail'],
      });

      queryClient.invalidateQueries({
        queryKey: ['table'],
      });
    },
  });
  return toggleMutation;
};
