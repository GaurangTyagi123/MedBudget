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
        data.forEach((patient) => {
            const today = new Date(Date.now()).toLocaleDateString();
            const lastOrderedDate = new Date(
                patient.nextOrder,
            ).toLocaleDateString();
            if (today == lastOrderedDate) {
                new Email(patient.email).sendMail();
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
