const uploadBase = import.meta.env.DEV ? 'http://localhost:5000' : 'https://a1.sunsysweb.co.in'

export function resolveMediaUrl(value) {
  if (!value) return ''
  const trimmed = String(value).trim()
  if (!trimmed) return ''
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed
  }
  if (/^(https?:)?\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed, uploadBase)
      if (!import.meta.env.DEV && ['localhost', '127.0.0.1'].includes(url.hostname)) {
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
