import React from 'react';
import { ArrowLeft, ArrowLeftRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
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
            <h1 className="text-3xl font-bold text-gray-900">Política de Privacidade</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <p className="text-gray-600 mb-8">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introdução</h2>
            <p className="text-gray-700 leading-relaxed">
              A TransKwanza está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD) brasileira.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Informações que Coletamos</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Coletamos as seguintes informações:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Informações de Cadastro:</strong> Nome, e-mail, telefone, país, documento (CPF/BI)</li>
              <li><strong>Informações de Transação:</strong> Valores, moedas, dados de destinatários</li>
              <li><strong>Informações Financeiras:</strong> Comprovantes de pagamento</li>
              <li><strong>Informações Técnicas:</strong> Endereço IP, tipo de navegador, dispositivo</li>
              <li><strong>Informações de Uso:</strong> Como você interage com nossa plataforma</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Como Usamos suas Informações</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Utilizamos suas informações para:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Processar e facilitar suas transações</li>
              <li>Verificar sua identidade e prevenir fraudes</li>
              <li>Conectar você com outros usuários para remessas cruzadas</li>
              <li>Enviar notificações sobre suas transações</li>
              <li>Melhorar nossos serviços e experiência do usuário</li>
              <li>Cumprir obrigações legais e regulatórias</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Compartilhamento de Informações</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Compartilhamos suas informações apenas quando necessário:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Com outros usuários:</strong> Compartilhamos nome, país e avaliação para facilitar conexões</li>
              <li><strong>Prestadores de serviços:</strong> Empresas que nos ajudam a operar a plataforma</li>
              <li><strong>Autoridades legais:</strong> Quando exigido por lei ou para proteger direitos</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Nunca vendemos</strong> suas informações pessoais a terceiros para fins de marketing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Segurança dos Dados</h2>
            <p className="text-gray-700 leading-relaxed">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações, incluindo:
              criptografia de dados sensíveis, acesso restrito a informações pessoais, monitoramento contínuo de atividades suspeitas,
              e backups regulares de dados.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Seus Direitos (LGPD)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Você tem direito a:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Confirmar se processamos seus dados pessoais</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
              <li>Solicitar a portabilidade de seus dados</li>
              <li>Revogar consentimento a qualquer momento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Retenção de Dados</h2>
            <p className="text-gray-700 leading-relaxed">
              Mantemos suas informações pelo tempo necessário para fornecer nossos serviços e cumprir obrigações legais.
              Dados de transações são mantidos por pelo menos 5 anos para fins fiscais e regulatórios.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Utilizamos cookies e tecnologias similares para melhorar sua experiência, lembrar suas preferências e
              analisar o uso da plataforma. Você pode gerenciar cookies através das configurações do seu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contato</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Para exercer seus direitos ou esclarecer dúvidas sobre privacidade:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>E-mail:</strong> privacidade@transkwanza.com</p>
              <p><strong>WhatsApp:</strong> +55 11 9343-6623</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
