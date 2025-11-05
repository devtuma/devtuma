import React, { useState } from 'react';
import { ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { faqData } from '../data/mockData';

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Perguntas Frequentes</h2>

      {/* Support Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <MessageCircle className="w-12 h-12 mb-3 mx-auto md:mx-0" />
            <h3 className="text-2xl font-bold mb-2">Precisa de ajuda?</h3>
            <p className="text-blue-100">
              Nossa equipe está disponível no WhatsApp de segunda a sexta, das 8h às 18h
            </p>
          </div>
          <a
            href="https://wa.me/5511934366623"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Falar no WhatsApp
          </a>
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {faqData.map((faq) => (
          <div key={faq.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-all"
            >
              <span className="font-semibold text-gray-900 text-left">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openId === faq.id ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            {openId === faq.id && (
              <div className="px-6 pb-5 pt-0">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Info */}
      <div className="bg-gray-50 rounded-xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Outras formas de contato</h3>
        <div className="space-y-3 text-gray-700">
          <div>
            <span className="font-semibold">E-mail:</span>{' '}
            <a href="mailto:suporte@transkwanza.com" className="text-blue-600 hover:underline">
              suporte@transkwanza.com
            </a>
          </div>
          <div>
            <span className="font-semibold">Horário de atendimento:</span> Segunda a Sexta, 8h às 18h (horário de Brasília)
          </div>
          <div>
            <span className="font-semibold">Tempo de resposta:</span> Até 24 horas
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
