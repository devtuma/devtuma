import React from 'react';
import { Mail, Phone, MapPin, Calendar, Star, TrendingUp, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Meu Perfil</h2>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold">
              {user.name[0]}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-5 h-5 fill-yellow-500" />
                  <span className="font-semibold">{user.rating || 'Novo'}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{user.totalTransactions} transações</span>
                <span className="text-gray-400">•</span>
                {user.verified && (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    Verificado
                  </span>
                )}
              </div>
            </div>
          </div>

          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all">
            Editar
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-5 h-5 text-gray-400" />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="w-5 h-5 text-gray-400" />
            <span>{user.phone}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span>{user.country === 'BR' ? '🇧🇷 Brasil' : '🇦🇴 Angola'}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span>Membro desde {new Date(user.createdAt).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Estatísticas</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-1">{user.totalTransactions}</div>
            <div className="text-sm text-gray-600">Transações</div>
          </div>

          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-3xl font-bold text-yellow-600 mb-1">{user.rating || '-'}</div>
            <div className="text-sm text-gray-600">Avaliação</div>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-1">2</div>
            <div className="text-sm text-gray-600">Pendentes</div>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-1">98%</div>
            <div className="text-sm text-gray-600">Taxa de Sucesso</div>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      {!user.verified && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-yellow-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-yellow-900 mb-2">Complete sua verificação</h3>
              <p className="text-yellow-800 mb-4">
                Para aumentar sua credibilidade e ter acesso a todas as funcionalidades, complete a verificação da sua conta.
              </p>
              <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition-all">
                Iniciar Verificação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
