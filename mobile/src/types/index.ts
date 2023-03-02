import { ReactNode } from 'react';

export interface SignUpFormData {
  name: string,
  email: string,
  password: string,
};

export interface SignInFormData {
  email: string,
  password: string,
};

export interface TransactionFormData {
  amount: number,
  description: string,
  day: string,
  nature_id: string,
};

export interface UserData {
  id: string,
  avatar: string,
  name: string,
  email: string,
};

export interface AuthContextData {
  loading: boolean,
  user: UserData | null,
  signed: boolean,
  signIn: (data: SignInFormData) => Promise<void>,
  signUp: (data: SignUpFormData) => Promise<void>,
  signOut: () => Promise<void>;
};

export interface AuthProviderProps {
  children: ReactNode
}

export interface WalletContextData {
  wallet: WalletData | undefined,
  transactions: TransactionData[] | [],
  loading: boolean,
  handleCreateTransaction: (data: TransactionFormData) => Promise<void>,
};

export interface WalletProviderProps {
  children: ReactNode
}

export type AuthStackProps = {
  SignIn: undefined,
  SignUp: undefined
};

export interface WalletData {
  day: string,
  wallet_total: number,
  receipts_total: number,
  expenses_total: number,
}

export interface ReportData {
  id: string,
  amount: number,
  description: string,
  day: string,
  created_at: Date,
  updated_at: Date,
  nature_id: string,
  user_id: string,
  nature: {
    id: string,
    name: string
  }
}

export interface NatureData {
  id: string,
  name: string,
}

export interface PickerProps {
  handleSelectNature: (data: NatureData) => void;
}

export interface TransactionData {
  id: string,
  amount: number,
  description: string,
  day: string,
  nature?: {
    id: string,
    name: string
  }
}

export interface TransactionItemProps {
  data: TransactionData
}
