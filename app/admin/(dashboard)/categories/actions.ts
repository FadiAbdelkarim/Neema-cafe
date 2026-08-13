'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addCategory(formData: FormData) {
  const name = formData.get('name') as string
  const name_ar = formData.get('name_ar') as string

  const supabase = await createClient()
  await supabase.from('categories').insert({ name, name_ar })

  revalidatePath('/admin/categories')
}

export async function updateCategory(id: string, formData: FormData) {
  const name = formData.get('name') as string
  const name_ar = formData.get('name_ar') as string

  const supabase = await createClient()
  await supabase.from('categories').update({ name, name_ar }).eq('id', id)

  revalidatePath('/admin/categories')
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()
  await supabase.from('categories').delete().eq('id', id)

  revalidatePath('/admin/categories')
}
