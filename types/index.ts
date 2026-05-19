export interface Match {
  id: number;

  league: string;

  isLive: boolean;

  isActive?: boolean;

  time: string;

  score: {
    a: number;
    b: number;
  };

  teamA: {
    name: string;
    logo: string;
  };

  teamB: {
    name: string;
    logo: string;
  };
}

export interface ChatMessage {
  id: string;

  user: string;

  avatar: string;

  message: string;

  time: string;
}

export interface PaymentMethod {
  id: string;

  type: 'Card' | 'Mobile Money';

  provider: string;

  last4: string;

  expiry: string;

  isPrimary?: boolean;

  holderName?: string;
}

export interface User {
  name: string;

  email: string;

  avatar: string;

  isPremium: boolean;
}

export interface Plan {
  id: string;

  name: string;

  price: string;

  features: string[];
}