import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const MUTATION_KEY = 'toggle-checkbox';

type ChangeToggle = {
  id: number;
  done: boolean;
};

const changeToggle = async ({ id, done }: ChangeToggle) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/toggle/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, done }),
    },
  );

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await res.json();

  return data;
};

export const useToggleOptimistic = () => {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: changeToggle,
    onSuccess: () => {
      toast.success('성공적으로 업데이트 하였습니다!');
    },
    onSettled: () => {
      // 해당부분은 return으로 처리해야함
      return queryClient.invalidateQueries({
        queryKey: ['detail'],
      });
    },
  });

  return toggleMutation;
};
