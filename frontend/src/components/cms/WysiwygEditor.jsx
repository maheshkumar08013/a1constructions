import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import api from '../../utils/api'
import MediaChooser from './MediaChooser'

export default function WysiwygEditor({ name, value, setValue }) {
  const [content, setContent] = useState(value || '')
  const [chooserOpen, setChooserOpen] = useState(false)
  const quillRef = useRef(null)

  useEffect(() => setContent(value || ''), [value])

  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
      const file = input.files[0]
      if (!file) return
      const fd = new FormData()
      fd.append('file', file)
      try {
        const res = await api.post('/admin/cms/media', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        const url = res.data?.url || res.data?.path || (res.data && typeof res.data === 'string' ? res.data : null)
        if (url && quillRef.current) {
              const editor = quillRef.current.getEditor()
              const range = editor.getSelection(true) || { index: editor.getLength() }
              editor.insertEmbed(range.index, 'image', url)
          // update content state and form value
          const html = editor.root.innerHTML
          setContent(html)
          setValue(name, html)
        }
      } catch (err) {
        console.error('Upload failed', err)
      }
    }
  }

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button type="button" className="text-sm px-3 py-1 border rounded" onClick={() => setChooserOpen(true)}>Insert from library</button>
      </div>
      <ReactQuill ref={quillRef} theme="snow" value={content} onChange={val => { setContent(val); setValue(name, val) }} modules={modules} />
      <MediaChooser open={chooserOpen} onClose={() => setChooserOpen(false)} onSelect={m => {
        if (m && m.url && quillRef.current) {
          const editor = quillRef.current.getEditor()
          const range = editor.getSelection(true) || { index: editor.getLength() }
          editor.insertEmbed(range.index, 'image', m.url)
          const html = editor.root.innerHTML
          setContent(html)
          setValue(name, html)
        }
        setChooserOpen(false)
      }} />
    </div>
  )
}
