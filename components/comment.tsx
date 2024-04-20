import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const Comment = () => {
  return (
    <div>
      <h2 className="mb-4 text-lg font-medium">Comments</h2>
      <div className="space-y-4">
        <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <div className="flex items-start">
            <Image
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
                Don&apos;t forget to pick up some fresh produce as well!
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <div className="flex items-start">
            <Image
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
  );
};
