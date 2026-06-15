'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Upload, Trash } from '@/components/icons'

export interface ImageSlot {
  id?: string          // existing DB image id
  url?: string         // already-uploaded URL
  file?: File          // new file to upload
  preview: string      // blob URL or remote URL for display
  isPrimary: boolean
  sortOrder: number
}

interface Props {
  value: ImageSlot[]
  onChange: (slots: ImageSlot[]) => void
}

export default function ImageUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  function addFiles(files: FileList | null) {
    if (!files) return
    const next = [...value]
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return
      next.push({
        file,
        preview: URL.createObjectURL(file),
        isPrimary: next.length === 0,
        sortOrder: next.length,
      })
    })
    onChange(next)
  }

  function remove(idx: number) {
    const next = value.filter((_, i) => i !== idx)
    // if removed was primary, make first the new primary
    if (value[idx].isPrimary && next.length > 0) next[0].isPrimary = true
    onChange(next.map((s, i) => ({ ...s, sortOrder: i })))
  }

  function setPrimary(idx: number) {
    onChange(value.map((s, i) => ({ ...s, isPrimary: i === idx })))
  }

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files) }}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragOver ? 'border-brand-500 bg-brand-50' : 'border-gray-300 hover:border-brand-400'
        }`}
      >
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600">
          <span className="font-medium text-brand-600">Click to upload</span> or drag & drop
        </p>
        <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP — up to 5 MB each</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={e => addFiles(e.target.files)}
        />
      </div>

      {/* Previews */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {value.map((slot, idx) => (
            <div
              key={idx}
              className={`relative group rounded-lg overflow-hidden aspect-square border-2 cursor-pointer ${
                slot.isPrimary ? 'border-brand-500' : 'border-gray-200'
              }`}
              onClick={() => setPrimary(idx)}
            >
              <Image
                src={slot.preview}
                alt={`Image ${idx + 1}`}
                fill
                className="object-cover"
                sizes="120px"
                unoptimized={slot.preview.startsWith('blob:')}
              />
              {slot.isPrimary && (
                <span className="absolute bottom-0 left-0 right-0 bg-brand-500 text-white text-[9px] text-center py-0.5 font-medium">
                  PRIMARY
                </span>
              )}
              <button
                type="button"
                onClick={e => { e.stopPropagation(); remove(idx) }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
      {value.length > 0 && (
        <p className="text-xs text-gray-500">Click an image to set it as the primary (cover) photo.</p>
      )}
    </div>
  )
}
