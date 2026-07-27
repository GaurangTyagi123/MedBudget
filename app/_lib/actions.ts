'use server'

/**
 * Server actions for creating and updating MedBudget records.
 */

import { notFound, redirect } from 'next/navigation'
import { supabase } from './supabase'

export async function storeUser(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  try {
    const { data: user, error: userError } = await supabase
      .from('Patient')
      .select('*')
      .eq('email', data.email)
      .maybeSingle()
    if (userError) {
      return notFound()
    }
    if (!user) {
      const { error } = await supabase.from('Patient').insert([data])
      if (error) {
        return notFound()
      }
    } else {
      const { error } = await supabase
        .from('Patient')
        .update({ email: data.email })
        .eq('id', user.id)
      if (error) {
        return notFound()
      }
    }
  } catch (error: unknown) {
    console.log(error instanceof Error ? error?.message : 'There was an error')
  }

  redirect('/order')
}
export async function storeOrderDetails(
  days: number,
  email: string,
  patientName: string,
) {
  const orderDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
  try {
    const { data: user, error: userError } = await supabase
      .from('Patient')
      .select('*')
      .eq('email', email)
      .maybeSingle()

    if (userError) {
      return notFound()
    } else if (!user) {
      const { error } = await supabase.from('Patient').insert([
        {
          patientName,
          email,
          nextOrder: orderDate,
        },
      ])
      if (error) {
        return notFound()
      }
    } else {
      const { error } = await supabase
        .from('Patient')
        .update({ nextOrder: orderDate })
        .eq('id', user.id)
      if (error) {
        return notFound()
      }
    }
  } catch {
    console.log('there was an error')
  }
}
