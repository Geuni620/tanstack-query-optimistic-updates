'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useParams } from 'next/navigation';

import { Comment } from '@/components/comment';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useDetailDataGetQuery } from '@/hook/useDetailDataGetQuery';
import { useToggleOptimisticCache } from '@/hook/useToggleOptimistic';

const DetailPage = () => {
  const { id } = useParams();
  const detail = useDetailDataGetQuery({ id });
  const toggleMutation = useToggleOptimisticCache();

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
                  const now = new Date();
                  toggleMutation.mutate({
                    id: detail.data.id,
                    done: checked,
                    date: now,
                  });
                }}
              />

              {toggleMutation.isPending ? (
                <Label className="opacity-20" htmlFor="complete">
                  Mark as Complete
                </Label>
              ) : (
                <Label htmlFor="complete">Mark as Complete</Label>
              )}
            </div>
          </div>
          <p className="mt-2 text-gray-500">{detail.data.notes}</p>
          <Badge className="text-end">
            {format(detail.data.date, 'yyyy-MM-dd HH:mm:ss', {
              locale: ko,
            })}
          </Badge>
        </div>
        <Comment />
      </div>
    );

  return <div>Loading...</div>;
};

export default DetailPage;
