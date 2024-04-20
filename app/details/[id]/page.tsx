'use client';

import { format } from 'date-fns';
import { useParams } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useDetailDataGetQuery } from '@/hook/useDetailDataGetQuery';

const DetailPage = () => {
  const { id } = useParams();
  const detail = useDetailDataGetQuery({ id });
  console.log('detail', detail.data);

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
              />
              <Label htmlFor="complete">Mark as Complete</Label>
            </div>
          </div>

          <p className="mt-2 text-gray-500">{detail.data.notes}</p>

          <Badge className="text-end">
            {format(detail.data.date, 'yyyy-MM-dd HH:mm:ss')}
          </Badge>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-medium">Comments</h2>
          <div className="space-y-4">
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <div className="flex items-start">
                <img
                  alt="User Avatar"
                  className="mr-3 rounded-full"
                  height={40}
                  src="https://avatars.githubusercontent.com/u/56650238?v=4"
                  style={{
                    aspectRatio: '40/40',
                    objectFit: 'cover',
                  }}
                  width={40}
                />
                <div>
                  <h3 className="font-medium">Geuni620</h3>
                  <p className="text-sm text-gray-500">2 days ago</p>
                  <p className="mt-2">
                    Don't forget to pick up some fresh produce as well!
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <div className="flex items-start">
                <img
                  alt="User Avatar"
                  className="mr-3 rounded-full"
                  height={40}
                  src="https://avatars.githubusercontent.com/u/56650238?v=4"
                  style={{
                    aspectRatio: '40/40',
                    objectFit: 'cover',
                  }}
                  width={40}
                />
                <div>
                  <h3 className="font-medium">Geuni620</h3>
                  <p className="text-sm text-gray-500">1 week ago</p>
                  <p className="mt-2">
                    Make sure to get some snacks too, like chips or cookies.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="mb-2 text-lg font-medium">Add a Comment</h3>
            <Textarea
              className="w-full rounded-lg border border-gray-300 p-2 dark:border-gray-700"
              placeholder="Write your comment here..."
            />
            <Button className="mt-2">Submit</Button>
          </div>
        </div>
      </div>
    );

  return <div>Loading...</div>;
};

export default DetailPage;
