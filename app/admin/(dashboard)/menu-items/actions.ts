'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addMenuItem(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const name_ar = formData.get('name_ar') as string
  const description = formData.get('description') as string
  const description_ar = formData.get('description_ar') as string
  const price = formData.get('price') as string
  const category_id = formData.get('category_id') as string
  const image = formData.get('image') as File

  let image_url: string | null = null

  if (image && image.size > 0) {
    const fileName = `menu/${Date.now()}-${image.name}`
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, image)

    if (uploadError) {
      console.error('MENU IMAGE UPLOAD ERROR:', uploadError)
    }

    if (!uploadError) {
      const { data: publicUrl } = supabase.storage.from('images').getPublicUrl(fileName)
      image_url = publicUrl.publicUrl
    }
  }

  await supabase.from('menu_items').insert({
    name,
    name_ar,
    description,
    description_ar,
    price: parseFloat(price),
    category_id: category_id || null,
    image_url,
    is_available: true,
  })

  revalidatePath('/admin/menu-items')
}

export async function updateMenuItem(id: string, formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const name_ar = formData.get('name_ar') as string
  const description = formData.get('description') as string
  const description_ar = formData.get('description_ar') as string
  const price = formData.get('price') as string
  const category_id = formData.get('category_id') as string
  const image = formData.get('image') as File

  const updateData: Record<string, unknown> = {
    name,
    name_ar,
    description,
    description_ar,
    price: parseFloat(price),
    category_id: category_id || null,
    updated_at: new Date().toISOString(),
  }

  if (image && image.size > 0) {
    const fileName = `menu/${Date.now()}-${image.name}`
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, image)

    if (uploadError) {
      console.error('MENU IMAGE UPLOAD ERROR:', uploadError)
    }

    if (!uploadError) {
      const { data: publicUrl } = supabase.storage.from('images').getPublicUrl(fileName)
      updateData.image_url = publicUrl.publicUrl
    }
  }

  await supabase.from('menu_items').update(updateData).eq('id', id)

  revalidatePath('/admin/menu-items')
}

export async function toggleAvailability(id: string, current: boolean) {
  const supabase = await createClient()
  await supabase.from('menu_items').update({ is_available: !current }).eq('id', id)
  revalidatePath('/admin/menu-items')
}

export async function deleteMenuItem(id: string) {
  const supabase = await createClient()
  await supabase.from('menu_items').delete().eq('id', id)
  revalidatePath('/admin/menu-items')
}
