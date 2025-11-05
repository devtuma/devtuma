import React, { useState } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { getCurrentExchangeRate, mockProposals } from '../data/mockData';
import type { Currency } from '../types';

interface CalculatorProps {
  onSend?: (amount: number, currency: Currency) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onSend }) => {
  const [sendAmount, setSendAmount] = useState('1000');
  const [sendCurrency, setSendCurrency] = useState<Currency>('BRL');
  const [lastUpdate, setLastUpdate] = useState(new Date());
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

  const { converted, fee, rate } = calculateConversion();
  const receiveCurrency: Currency = sendCurrency === 'BRL' ? 'AOA' : 'BRL';

  const handleRefresh = () => {
    setLastUpdate(new Date());
  };

  const handleSend = () => {
    if (onSend) {
      onSend(parseFloat(sendAmount) || 0, sendCurrency);
    }
  };

  const filteredProposals = mockProposals.filter(p => p.fromCurrency !== sendCurrency);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculadora de Câmbio</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                onChange={(e) => setSendCurrency(e.target.value as Currency)}
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
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700"
              />
              <div className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg min-w-[100px] text-center">
                {receiveCurrency === 'BRL' ? '🇧🇷 BRL' : '🇦🇴 AOA'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            <span>Taxa: {rate.toFixed(5)}</span>
            <span>Taxa 3%: {fee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} {receiveCurrency}</span>
            <span>Atualizado: {lastUpdate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Atualizar taxa
          </button>
          <button
            onClick={handleSend}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            Enviar este valor <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Available Proposals */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Propostas Disponíveis</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredProposals.map((proposal) => (
            <div key={proposal.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      {proposal.user.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{proposal.user.name}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        {proposal.user.country === 'BR' ? '🇧🇷' : '🇦🇴'}
                        <span className="text-yellow-500">★ {proposal.user.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  {proposal.status === 'active' ? 'Ativa' : 'Conectada'}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Envia:</span>
                  <span className="font-semibold">
                    {proposal.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} {proposal.fromCurrency}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Recebe:</span>
                  <span className="font-semibold">
                    {proposal.convertedAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} {proposal.toCurrency}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Match:</span>
                  <span className="text-green-600 font-semibold">98%</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                Conectar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
