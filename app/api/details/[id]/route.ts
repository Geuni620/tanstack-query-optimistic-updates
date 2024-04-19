import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

import { handleErrorResponse } from '@/app/api/errorHandler';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
);

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    // /TODO: pathname

    if (!id) {
      throw new Error('ID parameter is missing');
    }

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();

    console.log('data', data);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      data,
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
}
