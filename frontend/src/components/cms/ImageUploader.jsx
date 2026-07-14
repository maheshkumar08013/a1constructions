import React, { useState, useEffect } from 'react'
import api from '../../utils/api'
import toast from 'react-hot-toast'
import { resolveMediaUrl } from '../../utils/media'

export default function ImageUploader({ name, setValue, value }) {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(value || '')

  useEffect(() => { setPreview(value || '') }, [value])

  const onFile = async e => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', f)
      const { data } = await api.post('/admin/cms/media', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      const url = data.url || (`/uploads/${data.filename}`)
      setValue(name, url)
      setPreview(url)
      toast.success('Uploaded')
    } catch (err) {
      console.error(err)
      toast.error('Upload failed')
    } finally { setUploading(false) }
  }

  const removeImage = () => {
    setValue(name, '')
    setPreview('')
    setFile(null)
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{name}</label>
        <input type="file" onChange={onFile} className="text-sm" />
      </div>
      {uploading && <div className="text-xs text-gray-400 mt-2">Uploading…</div>}
      {preview && (
        <div className="mt-3">
          {preview.match(/\.(jpeg|jpg|gif|png|svg|webp)(\?|$)/i) ? (
            <img src={resolveMediaUrl(preview)} alt="preview" className="max-h-40 rounded-md border" />
          ) : (
            <a href={resolveMediaUrl(preview)} target="_blank" rel="noreferrer" className="text-sm text-blue-brand">{preview}</a>
          )}
          <div>
            <button type="button" onClick={removeImage} className="mt-2 text-xs text-red-500">Remove</button>
          </div>
        </div>
      )}
    </div>
  )
}
