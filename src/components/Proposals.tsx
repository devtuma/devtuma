import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Clock, CreditCard } from 'lucide-react';
import type { Currency, Country } from '../types';

const Proposals: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'BRL' as Currency,
    recipientName: '',
    recipientEmail: '',
    recipientPhone: '',
    recipientDocument: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating proposal:', formData);
    setShowForm(false);
    setFormData({
      amount: '',
      currency: 'BRL' as Currency,
      recipientName: '',
      recipientEmail: '',
      recipientPhone: '',
      recipientDocument: '',
    });
  };

  const mockProposals = [
    {
      id: 'PROP001',
      amount: 500,
      currency: 'BRL',
      recipient: 'Maria Santos',
      country: 'AO' as Country,
      status: 'active',
      views: 12,
      daysLeft: 6,
    },
    {
      id: 'PROP002',
      amount: 100000,
      currency: 'AOA',
      recipient: 'João Silva',
      country: 'BR' as Country,
      status: 'connected',
      views: 8,
      daysLeft: 4,
    },
  ];

  const targetCurrency = formData.currency === 'BRL' ? 'AOA' : 'BRL';
  const targetCountry = formData.currency === 'BRL' ? 'AO' : 'BR';
  const amount = parseFloat(formData.amount) || 0;
  const rate = formData.currency === 'BRL' ? 168.50 : 0.00594;
  const converted = amount * rate;
  const fee = converted * 0.03;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Minhas Propostas</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nova Proposta
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Nova Proposta</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Moeda
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="BRL">🇧🇷 BRL</option>
                  <option value="AOA">🇦🇴 AOA</option>
                </select>
              </div>
            </div>

            {amount > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  Conversão: {converted.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} {targetCurrency} (Taxa 3%: {fee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
                </p>
              </div>
            )}

            <div className="border-t pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">
                Dados do Destinatário ({targetCountry === 'BR' ? '🇧🇷 Brasil' : '🇦🇴 Angola'})
              </h4>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nome do destinatário"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="recipientPhone"
                    value={formData.recipientPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={targetCountry === 'BR' ? '+55 11 99999-9999' : '+244 923 456 789'}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Documento ({targetCountry === 'BR' ? 'CPF' : 'BI'})
                  </label>
                  <input
                    type="text"
                    name="recipientDocument"
                    value={formData.recipientDocument}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={targetCountry === 'BR' ? '000.000.000-00' : '000000000XX000'}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Criar Proposta
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List of Proposals */}
      <div className="space-y-4">
        {mockProposals.map((proposal) => (
          <div key={proposal.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-gray-900">{proposal.id}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    proposal.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {proposal.status === 'active' ? 'Ativa' : 'Conectada'}
                  </span>
                  <div className="flex items-center gap-1 text-gray-600 text-sm">
                    <Eye className="w-4 h-4" />
                    {proposal.views} views
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 text-sm">
                    <Clock className="w-4 h-4" />
                    {proposal.daysLeft} dias
                  </div>
                </div>

                <div className="text-lg text-gray-900">
                  {proposal.currency === 'BRL' ? 'R$' : 'Kz'} {proposal.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} → {proposal.recipient} ({proposal.country === 'BR' ? '🇧🇷' : '🇦🇴'})
                </div>
              </div>

              <div className="flex gap-2">
                {proposal.status === 'active' ? (
                  <>
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                    <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-all flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Excluir
                    </button>
                  </>
                ) : (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Ver Pagamento
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Proposals;
