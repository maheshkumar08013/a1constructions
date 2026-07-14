import React, { useState } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../utils/api'
import ImageUploader from '../components/cms/ImageUploader'
import WysiwygEditor from '../components/cms/WysiwygEditor'
import TermSelector from '../components/cms/TermSelector'
import MediaChooser from '../components/cms/MediaChooser'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { parseGallery, resolveMediaUrl } from '../utils/media'
import logo from '../assets/logo.png'
import {
  LayoutDashboard, Image, Briefcase, Settings, MessageSquare,
  LogOut, Menu, X, Plus, Trash2, Edit3, Save, ChevronRight
} from 'lucide-react'
import MenuManager from '../components/cms/MenuManager'

// ── Sidebar ──────────────────────────────────────────
const navItems = [
  { path: '/admin', label: 'Dashboard', Icon: LayoutDashboard, exact: true },
  { path: '/admin/posts', label: 'Posts', Icon: LayoutDashboard },
  { path: '/admin/pages', label: 'Pages', Icon: LayoutDashboard },
  { path: '/admin/menus', label: 'Menus', Icon: Menu },
  { path: '/admin/terms', label: 'Terms', Icon: Settings },
  { path: '/admin/media', label: 'Media', Icon: Image },
  { path: '/admin/slides', label: 'Hero Slides', Icon: Image },
  { path: '/admin/projects', label: 'Projects', Icon: Briefcase },
  { path: '/admin/services', label: 'Services', Icon: Settings },
  { path: '/admin/enquiries', label: 'Enquiries', Icon: MessageSquare },
]

function Sidebar({ open, setOpen }) {
  const { pathname } = useLocation()
  const { logout } = useAuth()
  const nav = useNavigate()

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-navy z-40 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-5 border-b border-white/8">
          <img src={logo} alt="A1" className="h-10 w-auto brightness-0 invert" />
          <p className="text-white/30 text-xs mt-2 font-inter">CMS Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ path, label, Icon, exact }) => {
            const active = exact ? pathname === path : pathname.startsWith(path) && path !== '/admin'
            const isExact = exact && pathname === path
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active || isExact
                    ? 'bg-blue-brand text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/8">
          <button
            onClick={() => { logout(); nav('/admin/login') }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all w-full"
          >
            <LogOut size={16} />Logout
          </button>
        </div>
      </aside>
    </>
  )
}

// ── Dashboard ────────────────────────────────────────
function Dashboard() {
  const stats = [
    { label: 'Slides', key: 'slides' },
    { label: 'Projects', key: 'projects' },
    { label: 'Services', key: 'services' },
    { label: 'Enquiries', key: 'enquiries' },
  ]
  return (
    <div>
      <h1 className="font-montserrat font-bold text-navy text-2xl mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.key} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">{s.label}</p>
            <p className="font-montserrat font-black text-navy text-3xl">—</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-poppins font-semibold text-navy mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {navItems.slice(1).map(({ path, label, Icon }) => (
            <Link key={path} to={path} className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-blue-brand hover:bg-blue-brand/4 transition-all group">
              <Icon size={18} className="text-blue-brand" />
              <span className="text-navy text-sm font-medium">{label}</span>
              <ChevronRight size={14} className="ml-auto text-gray-300 group-hover:text-blue-brand" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function GalleryUploader({ name, setValue, value, onChooseFromLibrary }) {
  const [uploading, setUploading] = useState(false)
  const images = parseGallery(value)

  const updateImages = (nextImages) => {
    setValue(name, JSON.stringify(nextImages), { shouldDirty: true })
  }

  const uploadFiles = async (event) => {
    const files = Array.from(event.target.files || [])
    if (!files.length) return

    setUploading(true)

    try {
      const uploadedUrls = []

      for (const file of files) {
        const fd = new FormData()
        fd.append('file', file)
        const { data } = await api.post('/admin/cms/media', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        uploadedUrls.push(data.url || `/uploads/${data.filename}`)
      }

      updateImages([...images, ...uploadedUrls])
      toast.success(`${uploadedUrls.length} image${uploadedUrls.length > 1 ? 's' : ''} uploaded`)
      event.target.value = ''
    } catch (error) {
      console.error(error)
      toast.error('Gallery upload failed')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (imageUrl) => {
    updateImages(images.filter((item) => item !== imageUrl))
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <input type="file" accept="image/*" multiple onChange={uploadFiles} className="text-sm" />
        <button
          type="button"
          onClick={onChooseFromLibrary}
          className="text-sm text-gray-600 underline"
        >
          Add from media library
        </button>
      </div>
      {uploading && <div className="text-xs text-gray-400">Uploading gallery images...</div>}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((imageUrl, index) => (
            <div key={`${imageUrl}-${index}`} className="rounded-xl border border-gray-100 overflow-hidden bg-white">
              <img
                src={resolveMediaUrl(imageUrl)}
                alt={`Gallery ${index + 1}`}
                className="w-full h-28 object-cover"
              />
              <div className="p-2">
                <button
                  type="button"
                  onClick={() => removeImage(imageUrl)}
                  className="text-xs text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {images.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-200 px-4 py-6 text-sm text-gray-400">
          Upload multiple project gallery images or add them from the media library.
        </div>
      )}
    </div>
  )
}

// ── Generic List Manager ─────────────────────────────
function CMSList({ title, queryKey, endpoint, fields, createLabel, listFn, initialValues, modalWidth = 'max-w-lg' }) {
  const qc = useQueryClient()
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, setValue, getValues, watch } = useForm()
  const [mediaChooserOpen, setMediaChooserOpen] = useState(false)
  const [mediaTargetField, setMediaTargetField] = useState(null)

  const { data: items = [], isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => (listFn ? listFn() : api.get(endpoint).then(r => r.data))
  })

  const saveMutation = useMutation({
    mutationFn: data => editing?.id
      ? api.put(`${endpoint}/${editing.id}`, data)
      : api.post(endpoint, data),
    onSuccess: () => {
      qc.invalidateQueries([queryKey])
      toast.success(editing?.id ? 'Updated!' : 'Created!')
      setEditing(null); reset()
    },
    onError: (error) => toast.error(error?.response?.data?.error || 'Save failed')
  })

  const deleteMutation = useMutation({
    mutationFn: id => api.delete(`${endpoint}/${id}`),
    onSuccess: () => { qc.invalidateQueries([queryKey]); toast.success('Deleted!') },
    onError: () => toast.error('Delete failed')
  })

  const openEdit = item => {
    setEditing(item)
    fields.forEach(f => setValue(f.name, item[f.name] || ''))
  }

  const openNew = () => { setEditing(initialValues || {}); reset(initialValues || {}) }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-montserrat font-bold text-navy text-2xl">{title}</h1>
        <button onClick={openNew} className="flex items-center gap-2 bg-blue-brand text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-dark transition-colors">
          <Plus size={15} />{createLabel || 'New'}
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-blue-brand border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {items.length === 0 ? (
            <div className="text-center py-16 text-gray-400">No {title.toLowerCase()} yet. Create one!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {fields.filter(f => f.list !== false).map(f => (
                      <th key={f.name} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{f.label}</th>
                    ))}
                    <th className="sticky right-0 bg-gray-50 px-5 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {items.map(item => (
                    <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                      {fields.filter(f => f.list !== false).map(f => (
                        <td key={f.name} className="px-5 py-3.5 text-gray-600 max-w-xs">
                          {f.type === 'gallery' ? (
                            parseGallery(item[f.name]).length ? (
                              <div className="flex items-center gap-1.5">
                                {parseGallery(item[f.name]).slice(0, 4).map((url, idx) => (
                                  <img key={idx} src={url} alt="" className="w-9 h-9 rounded object-cover border border-gray-100 flex-shrink-0" />
                                ))}
                                {parseGallery(item[f.name]).length > 4 && (
                                  <span className="text-xs text-gray-400">+{parseGallery(item[f.name]).length - 4}</span>
                                )}
                              </div>
                            ) : '—'
                          ) : f.type === 'file' || f.name === 'image' || f.name === 'featured_image' ? (
                            item[f.name] ? (
                              <img src={resolveMediaUrl(item[f.name])} alt="" className="w-9 h-9 rounded object-cover border border-gray-100" />
                            ) : '—'
                          ) : (
                            <span className="truncate block">{item[f.name] || '—'}</span>
                          )}
                        </td>
                      ))}
                      <td className="sticky right-0 bg-white group-hover:bg-gray-50/50 px-5 py-3.5">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-blue-brand hover:bg-blue-brand/8 rounded transition-all">
                            <Edit3 size={14} />
                          </button>
                          <button onClick={() => { if(window.confirm('Delete?')) deleteMutation.mutate(item.id) }} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {editing !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto p-4 sm:p-6">
          <div className={`bg-white rounded-2xl w-full ${modalWidth} shadow-2xl mx-auto my-4 max-h-[calc(100vh-2rem)] flex flex-col`}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
              <h2 className="font-poppins font-semibold text-navy">{editing.id ? 'Edit' : 'New'} {title.slice(0,-1)}</h2>
              <button onClick={() => { setEditing(null); reset() }} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit(d => saveMutation.mutate(d))} className="p-6 space-y-4 overflow-y-auto">
              <div className={title === 'Projects' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : 'space-y-4'}>
              {fields.map(f => (
                <div key={f.name}>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea {...register(f.name)} rows={f.name === 'content' ? 8 : 4} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-brand text-gray-700 resize-none" />
                  ) : f.type === 'wysiwyg' || f.name === 'content' ? (
                    <div>
                      <input type="hidden" {...register(f.name)} />
                      <WysiwygEditor name={f.name} value={editing ? (editing[f.name] || '') : ''} setValue={setValue} />
                    </div>
                  ) : f.type === 'select' ? (
                    <select {...register(f.name)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-brand text-gray-700 bg-white">
                      {f.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : f.type === 'terms' || f.name === 'term_ids' || f.name === 'terms' ? (
                    <div>
                      <input type="hidden" {...register(f.name)} />
                      <TermSelector name={f.name} value={editing ? (editing[f.name] || []) : []} setValue={setValue} />
                    </div>
                  ) : f.type === 'gallery' ? (
                    <div>
                      <input type="hidden" {...register(f.name)} />
                      <GalleryUploader
                        name={f.name}
                        setValue={setValue}
                        value={watch(f.name) || ''}
                        onChooseFromLibrary={() => { setMediaTargetField(f.name); setMediaChooserOpen(true) }}
                      />
                    </div>
                  ) : f.type === 'file' || f.name === 'image' || f.name === 'featured_image' || (f.name && f.name.toLowerCase().includes('image')) ? (
                    <div>
                      <input type="hidden" {...register(f.name)} />
                      <div className="flex items-center gap-3">
                        <ImageUploader name={f.name} setValue={setValue} value={watch(f.name) || ''} />
                        <button type="button" onClick={() => { setMediaTargetField(f.name); setMediaChooserOpen(true) }} className="text-sm text-gray-600 underline">Choose from library</button>
                      </div>
                    </div>
                  ) : (
                    <input type={f.type || 'text'} {...register(f.name)} placeholder={f.placeholder} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-brand text-gray-700" />
                  )}
                </div>
              ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setEditing(null); reset() }} className="flex-1 border border-gray-200 text-gray-500 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" disabled={saveMutation.isPending} className="flex-1 flex items-center justify-center gap-2 bg-blue-brand text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-dark transition-colors disabled:opacity-50">
                  <Save size={14} />{saveMutation.isPending ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
            <MediaChooser open={mediaChooserOpen} onClose={() => { setMediaChooserOpen(false); setMediaTargetField(null) }} onSelect={m => {
              if (!mediaTargetField) return
              const currentValue = getValues(mediaTargetField) || ''
              const targetField = fields.find(f => f.name === mediaTargetField)
              if (targetField?.type === 'gallery') {
                const galleryItems = parseGallery(currentValue)
                const nextValue = JSON.stringify(Array.from(new Set([...galleryItems, m.url])))
                setValue(mediaTargetField, nextValue, { shouldDirty: true })
                return
              }
              setValue(mediaTargetField, m.url, { shouldDirty: true })
            }} />
          </div>
        </div>
      )}
    </div>
  )
}

// ── Enquiries ────────────────────────────────────────
// ── Media Manager (placed before Enquiries) ──────────
function MediaManager() {
  const qc = useQueryClient()
  const [file, setFile] = useState(null)
  const { data: items = [], isLoading } = useQuery({ queryKey: ['admin-media'], queryFn: () => api.get('/admin/cms/media').then(r => r.data) })

  const uploadMutation = useMutation({
    mutationFn: (file) => {
      const fd = new FormData()
      fd.append('file', file)
      return api.post('/admin/cms/media', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    onSuccess: () => { qc.invalidateQueries(['admin-media']); toast.success('Uploaded') },
    onError: () => toast.error('Upload failed')
  })

  const deleteMutation = useMutation({ mutationFn: id => api.delete(`/admin/cms/media/${id}`), onSuccess: () => { qc.invalidateQueries(['admin-media']); toast.success('Deleted') } })

  const onSubmit = e => {
    e.preventDefault()
    if (!file) return toast.error('Choose a file')
    uploadMutation.mutate(file)
    setFile(null)
    e.target.reset()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-montserrat font-bold text-navy text-2xl">Media</h1>
        <form onSubmit={onSubmit} className="flex items-center gap-3">
          <input onChange={e => setFile(e.target.files[0])} type="file" className="text-sm" />
          <button type="submit" className="bg-blue-brand text-white px-4 py-2.5 rounded-lg text-sm">Upload</button>
        </form>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-blue-brand border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map(m => (
            <div key={m.id} className="bg-white rounded-xl border border-gray-100 p-3 text-sm">
              <div className="mb-2 h-36 bg-gray-50 flex items-center justify-center overflow-hidden">
                {m.type?.startsWith('image') ? (
                  <img src={m.url} alt={m.alt_text || m.filename} className="max-h-full" />
                ) : (
                  <div className="text-gray-400">{m.filename}</div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <a href={m.url} target="_blank" rel="noreferrer" className="text-blue-brand text-xs">Open</a>
                <button onClick={() => deleteMutation.mutate(m.id)} className="text-red-500 text-xs">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
function Enquiries() {
  const { data: enquiries = [], isLoading } = useQuery({
    queryKey: ['admin-enquiries'],
    queryFn: () => api.get('/admin/enquiries').then(r => r.data)
  })

  return (
    <div>
      <h1 className="font-montserrat font-bold text-navy text-2xl mb-6">Enquiries</h1>
      {isLoading ? (
        <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-blue-brand border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="space-y-3">
          {enquiries.length === 0 && <div className="bg-white rounded-xl border border-gray-100 p-10 text-center text-gray-400">No enquiries yet.</div>}
          {enquiries.map(e => (
            <div key={e.id} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-poppins font-semibold text-navy text-sm">{e.name}</p>
                  <p className="text-gray-400 text-xs">{e.email} · {e.phone}</p>
                </div>
                <span className="bg-blue-brand/10 text-blue-brand text-xs font-semibold px-2.5 py-1 rounded-full">{e.type || 'General'}</span>
              </div>
              {e.organisation && <p className="text-xs text-gray-400 mb-2">🏢 {e.organisation}</p>}
              {e.message && <p className="text-gray-500 text-sm">{e.message}</p>}
              <p className="text-gray-300 text-xs mt-3">{new Date(e.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main Admin Page ───────────────────────────────────
export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center gap-4 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
            <Menu size={20} />
          </button>
          <span className="font-montserrat font-semibold text-navy text-sm ml-auto">
            👤 {user?.name || 'Admin'}
          </span>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="slides" element={
              <CMSList
                title="Hero Slides"
                queryKey="admin-slides"
                endpoint="/admin/slides"
                createLabel="New Slide"
                fields={[
                  { name: 'eyebrow', label: 'Eyebrow Text' },
                  { name: 'title', label: 'Title' },
                  { name: 'subtitle', label: 'Subtitle', type: 'textarea' },
                  { name: 'image', label: 'Image URL' },
                  { name: 'sort_order', label: 'Order', type: 'number' },
                ]}
              />
            } />
            <Route path="projects" element={
              <CMSList
                title="Projects"
                queryKey="admin-projects"
                endpoint="/admin/projects"
                createLabel="New Project"
                modalWidth="max-w-5xl"
                fields={[
                  { name: 'name', label: 'Project Name' },
                  { name: 'category', label: 'Category', type: 'select', options: ['Government','Healthcare','Education','Railway','Industrial','Urban Development','Commercial'] },
                  { name: 'status', label: 'Status', type: 'select', options: ['Upcoming','Ongoing','Completed'] },
                  { name: 'location', label: 'Location' },
                  // { name: 'desc', label: 'Description', type: 'textarea' },
                  // { name: 'content', label: 'Project Content', type: 'textarea' },
                  { name: 'image', label: 'Image URL' },
                  { name: 'gallery', label: 'Gallery Images', type: 'gallery' },
                  { name: 'year', label: 'Year' },
                  { name: 'sort_order', label: 'Order', type: 'number' },
                  { name: 'active', label: 'Visible', type: 'select', options: [1, 0] },
                ]}
              />
            } />
            <Route path="services" element={
              <CMSList
                title="Services"
                queryKey="admin-services"
                endpoint="/admin/services"
                createLabel="New Service"
                fields={[
                  { name: 'icon', label: 'Emoji Icon' },
                  { name: 'name', label: 'Service Name' },
                  { name: 'desc', label: 'Description', type: 'textarea' },
                  { name: 'sort_order', label: 'Order', type: 'number' },
                ]}
              />
            } />
            <Route path="enquiries" element={<Enquiries />} />

            <Route path="posts" element={
              <CMSList
                title="Posts"
                queryKey="admin-posts"
                endpoint="/admin/cms/posts"
                createLabel="New Post"
                fields={[
                  { name: 'title', label: 'Title' },
                  { name: 'slug', label: 'Slug' },
                  { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
                  { name: 'content', label: 'Content', type: 'wysiwyg' },
                  { name: 'type', label: 'Type', type: 'select', options: ['page','post'] },
                  { name: 'status', label: 'Status', type: 'select', options: ['draft','published','archived'] },
                  { name: 'menu_order', label: 'Order', type: 'number' },
                ]}
              />
            } />

            <Route path="pages" element={
              <CMSList
                title="Pages"
                queryKey="admin-pages"
                endpoint="/admin/cms/posts"
                createLabel="New Page"
                initialValues={{ type: 'page' }}
                listFn={() => api.get('/admin/cms/posts').then(r => (r.data || []).filter(p => p.type === 'page'))}
                fields={[
                  { name: 'title', label: 'Title' },
                  { name: 'slug', label: 'Slug' },
                  { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
                  { name: 'content', label: 'Content', type: 'wysiwyg' },
                  { name: 'status', label: 'Status', type: 'select', options: ['draft','published','archived'] },
                  { name: 'menu_order', label: 'Menu Order', type: 'number' },
                ]}
              />
            } />

            <Route path="terms" element={
              <CMSList
                title="Terms"
                queryKey="admin-terms"
                endpoint="/admin/cms/terms"
                createLabel="New Term"
                fields={[
                  { name: 'name', label: 'Name' },
                  { name: 'slug', label: 'Slug' },
                  { name: 'description', label: 'Description', type: 'textarea' },
                  { name: 'taxonomy', label: 'Taxonomy' },
                  { name: 'parent', label: 'Parent', type: 'number' },
                ]}
              />
            } />

            <Route path="media" element={<MediaManager />} />

            <Route path="menus" element={<MenuManager />} />

            <Route path="settings" element={
              <CMSList
                title="Settings"
                queryKey="admin-settings"
                endpoint="/admin/cms/settings"
                createLabel="New Setting"
                fields={[
                  { name: 'key', label: 'Key' },
                  { name: 'value', label: 'Value', type: 'textarea' },
                  { name: 'autoload', label: 'Autoload', type: 'select', options: [1,0] },
                ]}
              />
            } />
          </Routes>
        </main>
      </div>
    </div>
  )
}
