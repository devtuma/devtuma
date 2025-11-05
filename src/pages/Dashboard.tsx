import React, { useState } from 'react';
import { Calculator as CalcIcon, FileText, User, History as HistoryIcon, HelpCircle, LogOut, ArrowLeftRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Calculator from '../components/Calculator';
import Proposals from '../components/Proposals';
import Profile from '../components/Profile';
import History from '../components/History';
import FAQ from '../components/FAQ';

type Tab = 'calculator' | 'proposals' | 'profile' | 'history' | 'faq';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('calculator');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSendFromCalculator = () => {
    setActiveTab('proposals');
  };

  const tabs = [
    { id: 'calculator' as Tab, name: 'Calculadora', icon: CalcIcon },
    { id: 'proposals' as Tab, name: 'Propostas', icon: FileText },
    { id: 'profile' as Tab, name: 'Perfil', icon: User },
    { id: 'history' as Tab, name: 'Histórico', icon: HistoryIcon },
    { id: 'faq' as Tab, name: 'FAQ', icon: HelpCircle },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'calculator':
        return <Calculator onSend={handleSendFromCalculator} />;
      case 'proposals':
        return <Proposals />;
      case 'profile':
        return <Profile />;
      case 'history':
        return <History />;
      case 'faq':
        return <FAQ />;
      default:
        return <Calculator />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-full">
                <ArrowLeftRight className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Painel TransKwanza</h1>
                <p className="text-sm text-gray-600">
                  Bem-vindo, {user?.name} {user?.verified && '• ✅ Verificado'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          {/* Desktop Tabs */}
          <div className="hidden md:flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* Mobile Dropdown */}
          <div className="md:hidden py-3">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as Tab)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
