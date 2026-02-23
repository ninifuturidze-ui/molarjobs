import { createClient } from '@supabase/supabase-js'

// These values come from your .env.local file
const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// ─── TYPE DEFINITIONS ───────────────────────────────────────────
// These mirror your Supabase database tables

export type Vacancy = {
  id: string
  title: string
  clinic_id: string
  clinic_name: string
  type: 'full-time' | 'part-time'
  salary_min: number
  salary_max: number
  city: string
  district: string
  tags: string[]
  created_at: string
}

export type Clinic = {
  id: string
  name: string
  address: string
  city: string
  lat: number
  lng: number
  verified: boolean
  logo_initials: string
}

export type DentistProfile = {
  id: string
  user_id: string
  full_name: string
  title: string
  bio: string
  city: string
  experience_years: number
  specialties: string[]
  promotion_tier: 'free' | 'basic' | 'pro' | 'featured'
  promotion_expires_at: string | null
  verified: boolean
  cv_url: string | null
  views: number
  created_at: string
}

export type Review = {
  id: string
  reviewer_name: string
  reviewer_type: 'worker' | 'patient'
  target_type: 'clinic' | 'dentist'
  target_id: string
  target_name: string
  rating: number
  text: string
  rating_management: number | null
  rating_equipment: number | null
  rating_salary: number | null
  rating_worklife: number | null
  verified_worker: boolean
  helpful_count: number
  clinic_reply: string | null
  created_at: string
}

export type Event = {
  id: string
  title: string
  description: string
  type: 'open-day' | 'conference' | 'workshop' | 'webinar' | 'cpd'
  host_name: string
  host_clinic_id: string | null
  date: string
  time_start: string
  time_end: string
  location: string
  city: string
  is_online: boolean
  price: number
  slots_total: number | null
  slots_remaining: number | null
  is_featured: boolean
  created_at: string
}