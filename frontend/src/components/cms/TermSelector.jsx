import React, { useEffect, useState } from 'react'
import api from '../../utils/api'

export default function TermSelector({ name, value = [], setValue }) {
  const [terms, setTerms] = useState([])

  useEffect(() => {
    let mounted = true
    api.get('/admin/cms/terms').then(res => {
      if (mounted) setTerms(res.data || [])
    }).catch(() => setTerms([]))
    return () => (mounted = false)
  }, [])

  function toggle(id) {
    const arr = Array.isArray(value) ? [...value] : []
    const idx = arr.indexOf(id)
    if (idx === -1) arr.push(id)
    else arr.splice(idx, 1)
    setValue(name, arr)
  }

  return (
    <div className="space-y-2">
      {terms.map(t => (
        <label key={t.id} className="flex items-center space-x-2">
          <input type="checkbox" checked={(value || []).includes(t.id)} onChange={() => toggle(t.id)} />
          <span className="text-sm">{t.name}</span>
        </label>
      ))}
    </div>
  )
}
