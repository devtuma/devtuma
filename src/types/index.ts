export type Currency = 'BRL' | 'AOA';

export type Country = 'BR' | 'AO';

export type TransactionStatus = 'pending' | 'matched' | 'payment_sent' | 'completed' | 'cancelled';

export type ProposalStatus = 'active' | 'connected' | 'completed' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: Country;
  document: string; // CPF or BI
  verified: boolean;
  rating: number;
  totalTransactions: number;
  createdAt: Date;
}

export interface Recipient {
  name: string;
  email: string;
  phone: string;
  document: string;
  country: Country;
}

export interface Proposal {
  id: string;
  userId: string;
  user: User;
  amount: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  recipient: Recipient;
  status: ProposalStatus;
  views: number;
  createdAt: Date;
  expiresAt: Date;
  exchangeRate: number;
  convertedAmount: number;
  fee: number;
}

export interface Transaction {
  id: string;
  proposalId: string;
  senderId: string;
  sender: User;
  receiverId: string;
  receiver: User;
  amount: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  exchangeRate: number;
  fee: number;
  totalAmount: number;
  status: TransactionStatus;
  paymentProof?: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

export interface ExchangeRate {
  rate: number;
  lastUpdated: Date;
  source: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<boolean>;
  isAuthenticated: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  country: Country;
  document: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}
