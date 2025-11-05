import React from 'react';
import { ArrowLeft, ArrowLeftRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsPage: React.FC = () => {
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
            <h1 className="text-3xl font-bold text-gray-900">Termos de Uso</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <p className="text-gray-600 mb-8">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
            <p className="text-gray-700 leading-relaxed">
              Ao acessar e usar a plataforma TransKwanza, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve usar nossa plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Descrição do Serviço</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A TransKwanza é uma plataforma de intermediação de remessas cruzadas entre Brasil e Angola. Nós:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Conectamos usuários que desejam trocar valores entre BRL e AOA</li>
              <li>Atuamos como intermediários seguros para garantir a proteção de ambas as partes</li>
              <li>Não somos uma instituição financeira ou casa de câmbio</li>
              <li>Cobramos uma taxa de 3% sobre cada transação realizada</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Elegibilidade</h2>
            <p className="text-gray-700 leading-relaxed">
              Para usar a TransKwanza, você deve:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-2">
              <li>Ter pelo menos 18 anos de idade</li>
              <li>Fornecer informações verdadeiras e completas durante o cadastro</li>
              <li>Ter um documento válido (CPF no Brasil ou BI em Angola)</li>
              <li>Concordar em verificar sua identidade quando solicitado</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Responsabilidades do Usuário</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Você é responsável por:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Manter suas credenciais de login seguras e confidenciais</li>
              <li>Fornecer informações precisas e atualizadas</li>
              <li>Cumprir os prazos de pagamento estabelecidos</li>
              <li>Verificar os dados dos destinatários antes de criar propostas</li>
              <li>Enviar comprovantes de pagamento válidos e legíveis</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Processo de Transação</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              As transações seguem este processo:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Usuário cria uma proposta com dados do destinatário</li>
              <li>Sistema conecta usuários com necessidades compatíveis</li>
              <li>Ambos os usuários têm 12 horas para fazer pagamentos locais (prorrogáveis por mais 12h)</li>
              <li>Comprovantes são verificados pela nossa equipe</li>
              <li>Valores são liberados simultaneamente após confirmação</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Taxas e Pagamentos</h2>
            <p className="text-gray-700 leading-relaxed">
              A TransKwanza cobra uma taxa fixa de 3% sobre o valor convertido. Esta taxa cobre custos operacionais, verificação de segurança e suporte ao cliente. As taxas de câmbio são baseadas em cotações em tempo real do Google Finance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cancelamentos e Reembolsos</h2>
            <p className="text-gray-700 leading-relaxed">
              Propostas ativas podem ser canceladas a qualquer momento. Após conexão com outro usuário, cancelamentos só são permitidos se nenhum pagamento tiver sido feito. Em caso de problemas técnicos ou fraudes comprovadas, analisaremos cada caso individualmente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitações de Responsabilidade</h2>
            <p className="text-gray-700 leading-relaxed">
              A TransKwanza não se responsabiliza por: variações cambiais após a confirmação da transação, atrasos causados por instituições financeiras, informações incorretas fornecidas pelos usuários, ou problemas decorrentes de força maior.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contato</h2>
            <p className="text-gray-700 leading-relaxed">
              Para dúvidas sobre estes termos, entre em contato:
            </p>
            <div className="mt-4 space-y-2 text-gray-700">
              <p><strong>E-mail:</strong> suporte@transkwanza.com</p>
              <p><strong>WhatsApp:</strong> +55 11 9343-6623</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
