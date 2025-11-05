# TransKwanza - Plataforma de Remessas Cruzadas

**TransKwanza** é uma plataforma inovadora de remessas cruzadas P2P que conecta pessoas no Brasil e Angola para trocar valores entre Real Brasileiro (BRL) e Kwanza Angolano (AOA).

## 🎯 Conceito

Ao invés de fazer transferências internacionais tradicionais caras e burocráticas, a TransKwanza:
- ✅ Conecta usuários com necessidades opostas
- ✅ Elimina taxas bancárias abusivas (apenas 3% de taxa)
- ✅ Processa transações em até 24h (vs 3-5 dias dos bancos)
- ✅ Garante segurança total através de intermediação

## 🚀 Tecnologias

- **React 18** - Framework frontend
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **React Router** - Navegação

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🔐 Dados de Teste

### Usuário Brasileiro
- **E-mail:** joao@email.com
- **Senha:** 123456

### Usuário Angolano
- **E-mail:** maria@email.com
- **Senha:** 123456

## 📱 Funcionalidades

### Homepage
- Hero section com CTAs
- Seção de benefícios (Segurança, Rapidez, Comunidade, Taxas)
- Calculadora de câmbio integrada
- Como funciona (4 passos)
- Depoimentos de usuários
- CTA final e footer

### Autenticação
- Login com e-mail e senha
- Cadastro completo com validação
- Persistência de sessão (localStorage)
- Rotas protegidas

### Dashboard
- **Calculadora:** Conversão BRL ↔ AOA em tempo real
- **Propostas:** Criar e gerenciar propostas de remessa
- **Perfil:** Dados pessoais e estatísticas
- **Histórico:** Todas as transações realizadas
- **FAQ:** Perguntas frequentes e suporte

### Páginas Legais
- **Termos de Uso:** 8 seções completas
- **Política de Privacidade:** Conformidade com LGPD
- **Central de Suporte:** Canais de atendimento

## 🎨 Design

- **Mobile-first:** Responsivo para todos os dispositivos
- **Paleta de Cores:** Azul/Índigo (primárias), Verde/Amarelo/Vermelho (secundárias)
- **Componentes Reutilizáveis:** Cards, botões, formulários, badges
- **Animações Suaves:** Transições e hover states

## 📊 Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
│   ├── Calculator.tsx
│   ├── Proposals.tsx
│   ├── Profile.tsx
│   ├── History.tsx
│   └── FAQ.tsx
├── context/          # Context API
│   └── AuthContext.tsx
├── data/             # Dados mockados
│   └── mockData.ts
├── pages/            # Páginas da aplicação
│   ├── Homepage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── Dashboard.tsx
│   ├── TermsPage.tsx
│   ├── PrivacyPage.tsx
│   └── SupportPage.tsx
├── types/            # Definições TypeScript
│   └── index.ts
├── App.tsx           # Componente principal
└── main.tsx          # Ponto de entrada
```

## 💡 Como Funciona

1. **Usuário A** (Brasil) quer enviar R$ 1.000 para Angola
2. **Usuário B** (Angola) quer enviar Kz 168.500 para Brasil
3. **TransKwanza** conecta os dois usuários
4. **Ambos** fazem pagamentos locais para contas da TransKwanza
5. **Após confirmação**, valores são liberados simultaneamente

## 🔒 Segurança

- Verificação de identidade obrigatória
- Sistema de avaliações entre usuários
- Intermediação total dos pagamentos
- Contas oficiais verificadas em ambos países

## 📞 Suporte

- **WhatsApp:** +55 11 9343-6623
- **E-mail:** suporte@transkwanza.com
- **Horário:** Segunda a Sexta, 8h às 18h (Brasília)

## 📈 Métricas

- **1000+** usuários ativos
- **R$ 2M+** transacionados
- **4.9★** avaliação média
- **24h** tempo médio de transação
- **98%** taxa de sucesso

## 🎯 Diferenciais

| TransKwanza | Bancos Tradicionais |
|------------|---------------------|
| Taxa de 3% | Taxa de 8-15% |
| 24h | 3-5 dias úteis |
| Sem burocracia | Muita burocracia |
| Suporte dedicado | Suporte limitado |
| Interface moderna | Interface complexa |

## 🚀 Próximos Passos

- [ ] App mobile nativo (iOS/Android)
- [ ] Backend real com banco de dados
- [ ] Integração bancária direta
- [ ] KYC automatizado com IA
- [ ] Expansão para mais países (Portugal, Moçambique)
- [ ] Suporte a criptomoedas

## 📝 Licença

© 2025 TransKwanza. Todos os direitos reservados.

## 👥 Contribuindo

Este é um projeto de demonstração. Para contribuir ou reportar problemas, entre em contato através do e-mail: dev@transkwanza.com

---

**Desenvolvido com ❤️ para conectar Brasil e Angola**
