import React, { useState } from 'react';
import { Search, FileText, Download, CheckCircle, Clock, XCircle } from 'lucide-react';
import { mockTransactions } from '../data/mockData';

const History: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'cancelled'>('all');
  const [searchId, setSearchId] = useState('');

  const filteredTransactions = mockTransactions.filter(tx => {
    if (filter !== 'all' && tx.status !== filter) return false;
    if (searchId && !tx.id.toLowerCase().includes(searchId.toLowerCase())) return false;
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'pending':
        return 'Pendente';
      case 'matched':
        return 'Conectada';
      case 'payment_sent':
        return 'Pagamento Enviado';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Histórico de Transações</h2>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Buscar por ID da transação..."
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas</option>
            <option value="completed">Concluídas</option>
            <option value="pending">Pendentes</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhuma transação encontrada</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {getStatusIcon(transaction.status)}
                    <span className="font-bold text-gray-900">#{transaction.id}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      transaction.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : transaction.status === 'cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {getStatusText(transaction.status)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(transaction.createdAt).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-gray-900">
                      {transaction.fromCurrency === 'BRL' ? 'R$' : 'Kz'} {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} → {transaction.toCurrency === 'BRL' ? 'R$' : 'Kz'} {transaction.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-sm text-gray-600">
                      Taxa 3%: {transaction.toCurrency === 'BRL' ? 'R$' : 'Kz'} {transaction.fee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-sm text-gray-600">
                      {transaction.sender.id !== transaction.receiver.id ? (
                        <>
                          Para: {transaction.receiver.name} ({transaction.receiver.country === 'BR' ? '🇧🇷' : '🇦🇴'})
                        </>
                      ) : (
                        <>
                          De: {transaction.sender.name} ({transaction.sender.country === 'BR' ? '🇧🇷' : '🇦🇴'})
                        </>
                      )}
                    </div>
                  </div>

                  {transaction.status === 'pending' && (
                    <div className="mt-3 flex items-center gap-2 text-yellow-700">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        Expira em: {Math.floor((new Date(transaction.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60))}h
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Detalhes
                  </button>
                  {transaction.status === 'completed' && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Comprovante
                    </button>
                  )}
                  {transaction.status === 'pending' && (
                    <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-all">
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
