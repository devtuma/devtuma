import React from 'react';
import { ArrowLeft, ArrowLeftRight, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SupportPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-full">
              <ArrowLeftRight className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Central de Suporte</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Main Support Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 md:p-12 text-white mb-8">
          <MessageCircle className="w-16 h-16 mb-4" />
          <h2 className="text-3xl font-bold mb-4">Como podemos ajudar?</h2>
          <p className="text-blue-100 text-lg mb-6">
            Nossa equipe de suporte está pronta para resolver suas dúvidas e problemas
          </p>
          <a
            href="https://wa.me/5511934366623"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all"
          >
            <Phone className="w-5 h-5" />
            Falar no WhatsApp
          </a>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
            <p className="text-gray-600 mb-4">Atendimento prioritário via WhatsApp</p>
            <p className="text-gray-900 font-semibold mb-2">+55 11 9343-6623</p>
            <p className="text-sm text-gray-600 mb-4">
              Segunda a Sexta: 8h às 18h<br />
              (Horário de Brasília)
            </p>
            <a
              href="https://wa.me/5511934366623"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold"
            >
              Iniciar conversa →
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">E-mail</h3>
            <p className="text-gray-600 mb-4">Para questões mais detalhadas</p>
            <p className="text-gray-900 font-semibold mb-2">suporte@transkwanza.com</p>
            <p className="text-sm text-gray-600 mb-4">
              Resposta em até 24 horas<br />
              Todos os dias da semana
            </p>
            <a
              href="mailto:suporte@transkwanza.com"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Enviar e-mail →
            </a>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-8 h-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">Horários de Atendimento</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">🇧🇷 Brasil (Horário de Brasília)</h4>
              <div className="space-y-2 text-gray-700">
                <p><strong>Segunda a Sexta:</strong> 8h às 18h</p>
                <p><strong>Sábado:</strong> 9h às 13h</p>
                <p><strong>Domingo:</strong> Fechado</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">🇦🇴 Angola (Horário de Luanda)</h4>
              <div className="space-y-2 text-gray-700">
                <p><strong>Segunda a Sexta:</strong> 12h às 22h</p>
                <p><strong>Sábado:</strong> 13h às 17h</p>
                <p><strong>Domingo:</strong> Fechado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Topics */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Tipos de Problemas Atendidos</h3>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-600 pl-4">
              <h4 className="font-semibold text-gray-900 mb-1">Problemas com Transações</h4>
              <p className="text-gray-600">Atrasos, valores incorretos, problemas com pagamentos</p>
            </div>

            <div className="border-l-4 border-green-600 pl-4">
              <h4 className="font-semibold text-gray-900 mb-1">Verificação de Conta</h4>
              <p className="text-gray-600">Dúvidas sobre documentos, processo de verificação</p>
            </div>

            <div className="border-l-4 border-purple-600 pl-4">
              <h4 className="font-semibold text-gray-900 mb-1">Questões Técnicas</h4>
              <p className="text-gray-600">Problemas com login, bugs na plataforma</p>
            </div>

            <div className="border-l-4 border-yellow-600 pl-4">
              <h4 className="font-semibold text-gray-900 mb-1">Dúvidas Gerais</h4>
              <p className="text-gray-600">Como funciona, taxas, prazos, procedimentos</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-8">
          <h3 className="text-xl font-bold text-red-900 mb-2">🚨 Emergência</h3>
          <p className="text-red-800 mb-4">
            Em caso de suspeita de fraude ou atividade não autorizada, entre em contato imediatamente via WhatsApp.
            Nossa equipe está disponível 24/7 para emergências de segurança.
          </p>
          <a
            href="https://wa.me/5511934366623"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all"
          >
            <Phone className="w-5 h-5" />
            Contato de Emergência
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
