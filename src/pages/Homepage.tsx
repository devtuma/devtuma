import React, { useState } from 'react';
import { ArrowLeftRight, Shield, Clock, Users, DollarSign, ArrowRight, Star, Globe, PhoneCall } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCurrentExchangeRate } from '../data/mockData';

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [sendAmount, setSendAmount] = useState('1000');
  const [sendCurrency, setSendCurrency] = useState<'BRL' | 'AOA'>('BRL');
  const rates = getCurrentExchangeRate();

  const calculateConversion = () => {
    const amount = parseFloat(sendAmount) || 0;
    if (sendCurrency === 'BRL') {
      const converted = amount * rates.BRL_to_AOA;
      const fee = converted * 0.03;
      return { converted, fee, rate: rates.BRL_to_AOA };
    } else {
      const converted = amount * rates.AOA_to_BRL;
      const fee = converted * 0.03;
      return { converted, fee, rate: rates.AOA_to_BRL };
    }
  };

  const { converted, fee } = calculateConversion();
  const receiveCurrency = sendCurrency === 'BRL' ? 'AOA' : 'BRL';

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
              <ArrowLeftRight className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            TransKwanza
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-4">
            Transferência Segura
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Plataforma de remessas cruzadas Segura
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all"
            >
              Começar agora
            </button>
            <button
              onClick={() => navigate('/login')}
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all"
            >
              Já tenho conta
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-1">1000+</div>
              <div className="text-sm text-gray-600">Usuários</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-1">R$ 2M+</div>
              <div className="text-sm text-gray-600">Transacionado</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-1">4.9★</div>
              <div className="text-sm text-gray-600">Avaliação</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-1">24h</div>
              <div className="text-sm text-gray-600">Tempo médio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Por que escolher a TransKwanza?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Segurança Total</h3>
              <p className="text-gray-600">
                Valores seguros até confirmação. Verificação de identidade para todos os usuários.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Rápido e Eficiente</h3>
              <p className="text-gray-600">
                Transações em até 24h. Confirmação em tempo real com nossa equipe dedicada.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 p-4 rounded-full">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Comunidade Confiável</h3>
              <p className="text-gray-600">
                Sistema de avaliações. Usuários verificados com histórico transparente.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-100 p-4 rounded-full">
                  <DollarSign className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Taxa Transparente</h3>
              <p className="text-gray-600">
                Apenas 3% de taxa. Câmbio em tempo real sem surpresas ou taxas ocultas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Simule sua transação
        </h2>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Você envia
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1000"
                />
                <select
                  value={sendCurrency}
                  onChange={(e) => setSendCurrency(e.target.value as 'BRL' | 'AOA')}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="BRL">🇧🇷 BRL</option>
                  <option value="AOA">🇦🇴 AOA</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destinatário recebe
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={(converted - fee).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  readOnly
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg"
                />
                <div className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                  {receiveCurrency === 'BRL' ? '🇧🇷 BRL' : '🇦🇴 AOA'}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex flex-wrap gap-4 text-sm">
              <span>Taxa: {sendCurrency === 'BRL' ? rates.BRL_to_AOA : rates.AOA_to_BRL}</span>
              <span>Taxa 3%: {fee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} {receiveCurrency}</span>
              <span>Atualizado: {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/register')}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            Enviar este valor <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Como funciona?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Cadastre-se</h3>
              <p className="text-gray-600">Crie sua conta e verifique sua identidade de forma rápida e segura</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Encontre um usuário</h3>
              <p className="text-gray-600">Use nossa plataforma para conectar com usuários compatíveis</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Faça o pagamento</h3>
              <p className="text-gray-600">Envie via PIX ou Multicaixa Express para nossa conta oficial</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Receba o valor</h3>
              <p className="text-gray-600">Após confirmação, liberamos os pagamentos simultaneamente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          O que nossos usuários dizem
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-3">M</div>
              <div>
                <div className="font-semibold">Maria Silva</div>
                <div className="text-sm text-gray-600">🇧🇷 Brasil</div>
              </div>
            </div>
            <div className="flex mb-3">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-gray-600">"Excelente plataforma! Consegui enviar dinheiro para Angola de forma rápida e com taxa muito melhor que os bancos."</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-3">J</div>
              <div>
                <div className="font-semibold">João António</div>
                <div className="text-sm text-gray-600">🇦🇴 Angola</div>
              </div>
            </div>
            <div className="flex mb-3">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-gray-600">"Muito melhor que bancos tradicionais. O suporte é excelente e o processo é transparente do início ao fim."</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-3">A</div>
              <div>
                <div className="font-semibold">Ana Costa</div>
                <div className="text-sm text-gray-600">🇧🇷 Brasil</div>
              </div>
            </div>
            <div className="flex mb-3">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-gray-600">"Uso há 6 meses e nunca tive problemas. Sempre consigo fazer minhas remessas com segurança e rapidez."</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de usuários que já descobriram a forma mais inteligente de trocar valores entre países
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all"
            >
              Criar conta grátis
            </button>
            <button
              onClick={() => navigate('/login')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all"
            >
              Fazer login
            </button>
          </div>

          <div className="flex flex-wrap gap-6 justify-center text-white">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span>Disponível 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>100% seguro</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full mb-3">
              <ArrowLeftRight className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-1">TransKwanza</h3>
            <p className="text-gray-400">Transferência Segura</p>
          </div>

          <div className="flex flex-wrap gap-6 justify-center mb-8 text-gray-400">
            <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">Termos</button>
            <button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors">Privacidade</button>
            <button onClick={() => navigate('/support')} className="hover:text-white transition-colors">Suporte</button>
            <a href="https://wa.me/5511934366623" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <PhoneCall className="w-4 h-4" /> WhatsApp
            </a>
          </div>

          <div className="text-center text-gray-400 text-sm">
            <p className="mb-2">© 2025 TransKwanza. Todos os direitos reservados.</p>
            <p>TransKwanza é uma plataforma de intermediação de remessas cruzadas.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
