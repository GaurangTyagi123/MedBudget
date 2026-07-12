import Email from '@/app/_lib/email';
import { supabase } from '@/app/_lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data, error } = await supabase.from('Patient').select('*');
  if (error)
    return NextResponse.json({
      status: 400,
      data: {
        message: 'Bad Request',
      },
    });
  else {
    data.forEach(async (patient) => {
      const today = new Date(Date.now()).toLocaleDateString();
      const lastOrderedDate = new Date(patient.nextOrder).toLocaleDateString();
      if (today == lastOrderedDate) {
        try {
          await new Email(patient.email).sendMail();
        } catch (error: unknown) {
          console.log(error);
        }
      }
    });
    return NextResponse.json({
      status: 200,
      data: {
        message: 'Notified successfully',
      },
    });
  }
}
