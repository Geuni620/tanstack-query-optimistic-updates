import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { NextResponse } from 'next/server';

import { handleErrorResponse } from '@/app/api/errorHandler';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
);

export async function POST(request: Request) {
  try {
    const { id, done } = await request.json();
    console.log('id', id, 'done', done);
    const now = format(new Date(), 'yyyy-MM-dd HH:mm:ss', { locale: ko });

    // throw new Error('일시적 오류 발생!!!');

    const { data, error } = await supabase
      .from('tasks')
      .update({ done, date: now })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    // console.log('data', data);

    return NextResponse.json({ message: 'Update successful' });
  } catch (error) {
    return handleErrorResponse(error);
  }
}
