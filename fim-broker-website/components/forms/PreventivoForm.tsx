'use client';
import { useState } from 'react';
import { services } from '@/lib/services';
import { Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface FormData {
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  servizio: string;
  messaggio: string;
  privacy: boolean;
}

export default function PreventivoForm({ preselect }: { preselect?: string }) {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    servizio: preselect || '',
    messaggio: '',
    privacy: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      toast.error('Accetta la privacy policy per procedere');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/preventivo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      toast.success('Richiesta inviata! Ti contatteremo presto.');
    } catch {
      toast.error('Errore nell\'invio. Riprova o contattaci direttamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-fim-primary mb-2">Richiesta inviata!</h3>
        <p className="text-gray-600">
          Il nostro team ti contatterà entro 24 ore lavorative per fornirti il preventivo personalizzato.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fim-primary/30 focus:border-fim-primary"
            placeholder="Mario"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cognome <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="cognome"
            value={formData.cognome}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fim-primary/30 focus:border-fim-primary"
            placeholder="Rossi"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fim-primary/30 focus:border-fim-primary"
            placeholder="mario@esempio.it"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefono
          </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fim-primary/30 focus:border-fim-primary"
            placeholder="+39 333 1234567"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo di assicurazione <span className="text-red-500">*</span>
        </label>
        <select
          name="servizio"
          value={formData.servizio}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fim-primary/30 focus:border-fim-primary bg-white"
        >
          <option value="">Seleziona un servizio…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.icona} {s.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Messaggio
        </label>
        <textarea
          name="messaggio"
          value={formData.messaggio}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fim-primary/30 focus:border-fim-primary resize-none"
          placeholder="Descrivi brevemente le tue esigenze assicurative…"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="privacy"
          checked={formData.privacy}
          onChange={handleChange}
          className="mt-0.5 w-4 h-4 rounded border-gray-300 text-fim-primary focus:ring-fim-primary"
        />
        <span className="text-sm text-gray-600">
          Ho letto e accetto la{' '}
          <a href="/privacy" className="text-fim-primary hover:underline">
            Privacy Policy
          </a>{' '}
          e autorizzo il trattamento dei miei dati per ricevere il preventivo richiesto.{' '}
          <span className="text-red-500">*</span>
        </span>
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-fim-accent text-fim-primary font-bold text-base rounded-xl hover:bg-yellow-400 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Invio in corso…
          </span>
        ) : (
          <>
            <Send size={18} />
            Invia Richiesta Preventivo
          </>
        )}
      </button>
    </form>
  );
}
