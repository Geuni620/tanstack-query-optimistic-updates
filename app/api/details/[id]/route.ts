import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

import { handleErrorResponse } from '@/app/api/errorHandler';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
);

export async function GET(request: Request) {
  try {
    const { pathname } = new URL(request.url);
    const segments = pathname.split('/');
    const id = segments.pop();

    if (!id) {
      throw new Error('ID parameter is missing');
    }

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      detail: data,
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
}
