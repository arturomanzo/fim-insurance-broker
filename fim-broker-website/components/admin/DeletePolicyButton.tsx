'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props { id: string; tipo: string }

export default function DeletePolicyButton({ id, tipo }: Props) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/polizze/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.ok) {
        router.refresh()
      } else {
        alert('Errore durante l\'eliminazione.')
        setLoading(false)
        setConfirming(false)
      }
    } catch {
      alert('Errore di rete.')
      setLoading(false)
      setConfirming(false)
    }
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs font-bold text-red-600 hover:underline disabled:opacity-50"
        >
          {loading ? 'Eliminazione…' : 'Conferma'}
        </button>
        <span className="text-gray-200">·</span>
        <button onClick={() => setConfirming(false)} className="text-xs text-gray-400 hover:text-gray-600">
          Annulla
        </button>
      </span>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      title={`Elimina polizza ${tipo}`}
      className="text-xs text-red-400 hover:text-red-600 hover:underline transition-colors"
    >
      Elimina
    </button>
  )
}
