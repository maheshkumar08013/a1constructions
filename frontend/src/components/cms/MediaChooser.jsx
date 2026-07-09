import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { resolveMediaUrl } from '../../utils/media'

export default function MediaChooser({ open, onClose, onSelect }) {
  const [media, setMedia] = useState([])

  useEffect(() => {
    if (!open) return
    let mounted = true
    api.get('/admin/cms/media').then(res => {
      if (mounted) setMedia(res.data || [])
    }).catch(() => setMedia([]))
    return () => (mounted = false)
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
      <div className="bg-white rounded shadow-lg p-4 max-w-3xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Choose Media</h3>
          <button onClick={onClose} className="text-sm text-gray-600">Close</button>
        </div>
        <div className="grid grid-cols-4 gap-3 max-h-96 overflow-auto">
          {media.map(m => (
            <div key={m.id} className="border p-2 flex flex-col items-center">
              <img src={resolveMediaUrl(m.url)} alt={m.filename || ''} className="h-20 object-cover mb-2" />
              <button className="text-sm bg-blue-500 text-white px-2 py-1 rounded" onClick={() => { onSelect(m); onClose(); }}>Select</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
