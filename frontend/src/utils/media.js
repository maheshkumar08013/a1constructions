import { getApiBaseURL } from './api'

function getUploadBase() {
  const apiBase = getApiBaseURL()

  if (import.meta.env.DEV) {
    return import.meta.env.VITE_UPLOAD_BASE_URL || 'http://localhost:5000'
  }

  if (apiBase.startsWith('/')) {
    if (typeof window === 'undefined') return ''
    return window.location.origin
  }

  try {
    return new URL(apiBase).origin
  } catch {
    if (typeof window === 'undefined') return ''
    return window.location.origin
  }
}

export function resolveMediaUrl(value) {
  if (!value) return ''
  const trimmed = String(value).trim()
  const uploadBase = getUploadBase()
  if (!trimmed) return ''
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed
  }
  if (/^(https?:)?\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed, uploadBase || window.location.origin)
      if (['localhost', '127.0.0.1'].includes(url.hostname)) {
        return `${uploadBase}${url.pathname}${url.search}`
      }
      return url.toString()
    } catch {
      return trimmed
    }
  }
  if (trimmed.startsWith('/uploads/')) return `${uploadBase}${trimmed}`
  if (trimmed.startsWith('uploads/')) return `${uploadBase}/${trimmed}`
  if (/\.(jpg|jpeg|png|gif|webp|svg|avif)(\?.*)?$/i.test(trimmed) && !trimmed.includes('/')) {
    return `${uploadBase}/uploads/${trimmed}`
  }
  return trimmed
}

export function parseGallery(value) {
  if (!value) return []
  if (Array.isArray(value)) return value.map(resolveMediaUrl).filter(Boolean)

  const trimmed = String(value).trim()
  if (!trimmed) return []

  try {
    const parsed = JSON.parse(trimmed)
    if (Array.isArray(parsed)) return parsed.map(resolveMediaUrl).filter(Boolean)
  } catch {
    // Fall through to newline/comma parsing
  }

  return trimmed
    .split(/\r?\n|,/)
    .map(item => resolveMediaUrl(item))
    .filter(Boolean)
}
