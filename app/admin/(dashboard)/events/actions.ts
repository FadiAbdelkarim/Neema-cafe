'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addEvent(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const title_ar = formData.get('title_ar') as string
  const description = formData.get('description') as string
  const description_ar = formData.get('description_ar') as string
  const event_date = formData.get('event_date') as string
  const event_time = formData.get('event_time') as string
  const image = formData.get('image') as File

  let image_url: string | null = null

  if (image && image.size > 0) {
    const fileName = `events/${Date.now()}-${image.name}`
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, image)

    if (!uploadError) {
      const { data: publicUrl } = supabase.storage.from('images').getPublicUrl(fileName)
      image_url = publicUrl.publicUrl
    }
  }

  await supabase.from('events').insert({
    title,
    title_ar,
    description,
    description_ar,
    event_date,
    event_time: event_time || null,
    image_url,
  })

  revalidatePath('/admin/events')
}

export async function updateEvent(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const title_ar = formData.get('title_ar') as string
  const description = formData.get('description') as string
  const description_ar = formData.get('description_ar') as string
  const event_date = formData.get('event_date') as string
  const event_time = formData.get('event_time') as string
  const image = formData.get('image') as File

  const updateData: Record<string, unknown> = {
    title,
    title_ar,
    description,
    description_ar,
    event_date,
    event_time: event_time || null,
    updated_at: new Date().toISOString(),
  }

  if (image && image.size > 0) {
    const fileName = `events/${Date.now()}-${image.name}`
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, image)

    if (!uploadError) {
      const { data: publicUrl } = supabase.storage.from('images').getPublicUrl(fileName)
      updateData.image_url = publicUrl.publicUrl
    }
  }

  await supabase.from('events').update(updateData).eq('id', id)

  revalidatePath('/admin/events')
}

export async function deleteEvent(id: string) {
  const supabase = await createClient()
  await supabase.from('events').delete().eq('id', id)
  revalidatePath('/admin/events')
}
