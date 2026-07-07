import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export default function MenuManager() {
  const qc = useQueryClient()
  const [menus, setMenus] = useState([])
  const [editingIndex, setEditingIndex] = useState(null)
  const [name, setName] = useState('')

  const { data: settings = [] } = useQuery({ queryKey: ['admin-settings'], queryFn: () => api.get('/admin/cms/settings').then(r => r.data) })

  useEffect(() => {
    const menuSetting = (settings || []).find(s => s.key === 'menus')
    if (menuSetting && menuSetting.value) {
      try { setMenus(JSON.parse(menuSetting.value)) } catch { setMenus([]) }
    } else {
      setMenus([])
    }
  }, [settings])

  const saveMutation = useMutation({
    mutationFn: ({ id, payload }) => id ? api.put(`/admin/cms/settings/${id}`, payload) : api.post('/admin/cms/settings', payload),
    onSuccess: () => { qc.invalidateQueries(['admin-settings']); toast.success('Menus saved') }
  })

  function addMenu() {
    if (!name) return toast.error('Enter menu name')
    setMenus([...menus, { name, items: [] }])
    setName('')
  }

  function addItem(menuIdx) {
    const newMenus = [...menus]
    newMenus[menuIdx].items.push({ title: 'New Item', url: '/' })
    setMenus(newMenus)
  }

  function updateItem(menuIdx, itemIdx, updates) {
    const newMenus = [...menus]
    newMenus[menuIdx].items[itemIdx] = { ...newMenus[menuIdx].items[itemIdx], ...updates }
    setMenus(newMenus)
  }

  function removeItem(menuIdx, itemIdx) {
    const newMenus = [...menus]
    newMenus[menuIdx].items.splice(itemIdx, 1)
    setMenus(newMenus)
  }

  function moveItem(menuIdx, itemIdx, dir) {
    const newMenus = [...menus]
    const items = newMenus[menuIdx].items
    const swap = itemIdx + dir
    if (swap < 0 || swap >= items.length) return
    const tmp = items[swap]
    items[swap] = items[itemIdx]
    items[itemIdx] = tmp
    setMenus(newMenus)
  }

  function saveAll() {
    const payload = { key: 'menus', value: JSON.stringify(menus), autoload: 1 }
    const menuSetting = (settings || []).find(s => s.key === 'menus')
    if (menuSetting) saveMutation.mutate({ id: menuSetting.id, payload })
    else saveMutation.mutate({ id: null, payload })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-montserrat font-bold text-navy text-2xl">Menus</h1>
        <div className="flex items-center gap-2">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="New menu name" className="px-3 py-2 border rounded" />
          <button onClick={addMenu} className="bg-blue-brand text-white px-4 py-2 rounded">Add Menu</button>
          <button onClick={saveAll} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>

      <div className="space-y-4">
        {menus.map((m, mi) => (
          <div key={mi} className="bg-white rounded-xl p-4 border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{m.name}</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => { setMenus(menus.filter((_,i)=>i!==mi)) }} className="text-red-500 text-sm">Delete</button>
                <button onClick={() => addItem(mi)} className="text-sm bg-blue-brand text-white px-3 py-1 rounded">Add Item</button>
              </div>
            </div>
            {m.items.length === 0 && <div className="text-sm text-gray-400">No items</div>}
            <div className="space-y-2">
              {m.items.map((it, ii) => (
                <div key={ii} className="flex items-center gap-2">
                  <input value={it.title} onChange={e => updateItem(mi, ii, { title: e.target.value })} className="px-2 py-1 border rounded flex-1" />
                  <input value={it.url} onChange={e => updateItem(mi, ii, { url: e.target.value })} className="px-2 py-1 border rounded w-56" />
                  <button onClick={() => moveItem(mi, ii, -1)} className="px-2">↑</button>
                  <button onClick={() => moveItem(mi, ii, 1)} className="px-2">↓</button>
                  <button onClick={() => removeItem(mi, ii)} className="text-red-500">Remove</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
