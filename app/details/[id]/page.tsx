'use client';

import { useMutationState } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';

import { Comment } from '@/components/comment';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useDetailDataGetQuery } from '@/hook/useDetailDataGetQuery';
import { MUTATION_KEY } from '@/hook/useToggleOptimistic';
import { useToggleOptimistic } from '@/hook/useToggleOptimistic';

const DetailPage = () => {
  const { id } = useParams();
  const detail = useDetailDataGetQuery({ id });
  const toggleMutation = useToggleOptimistic();
  const pendingData = useMutationState({
    filters: { mutationKey: [MUTATION_KEY], status: 'pending' },
    select: (mutation) => {
      return mutation.state.variables;
    },
  });

  if (detail.data)
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{detail.data.task}</h1>
            <div className="flex items-center">
              <Checkbox
                checked={detail.data.done}
                className="mr-2"
                id="complete"
                onCheckedChange={(checked: boolean) => {
                  toggleMutation.mutate({
                    id: detail.data.id,
                    done: checked,
                  });
                }}
              />
              <Label htmlFor="complete">Mark as Complete</Label>
            </div>
          </div>
          <p className="mt-2 text-gray-500">{detail.data.notes}</p>
          <Badge className="text-end">
            {format(detail.data.date, 'yyyy-MM-dd HH:mm:ss')}
          </Badge>
        </div>
        <Comment />
      </div>
    );

  return <div>Loading...</div>;
};

export default DetailPage;
