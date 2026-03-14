'use client';
import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    oggetto: '',
    messaggio: '',
    privacy: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    setSubmitted(true);
    toast.success('Messaggio inviato!');
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-fim-primary mb-2">Messaggio inviato!</h3>
        <p className="text-gray-600 text-sm">Ti risponderemo al più presto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Il tuo nome"
          />
        </div>
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
            placeholder="la-tua@email.it"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Oggetto <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="oggetto"
          value={formData.oggetto}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fim-primary/30 focus:border-fim-primary"
          placeholder="Di cosa hai bisogno?"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Messaggio <span className="text-red-500">*</span>
        </label>
        <textarea
          name="messaggio"
          value={formData.messaggio}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fim-primary/30 focus:border-fim-primary resize-none"
          placeholder="Scrivi il tuo messaggio…"
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
          Accetto la{' '}
          <a href="/privacy" className="text-fim-primary hover:underline">
            Privacy Policy
          </a>{' '}
          <span className="text-red-500">*</span>
        </span>
      </label>
      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-fim-primary text-white font-semibold rounded-xl hover:bg-fim-light transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Invio…' : (<><Send size={16} /> Invia Messaggio</>)}
      </button>
    </form>
  );
}
