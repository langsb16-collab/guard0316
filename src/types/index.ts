export interface FraudProject {
  id: string;
  project_name: string;
  fraud_type: string;
  category: string;
  country: string;
  launch_year: number;
  collapse_year?: number;
  damage_estimate: string;
  victims: number;
  fraud_method: string;
  related_token?: string;
  related_wallet?: string;
  related_domains?: string[];
  risk_score: number;
  status: 'active' | 'collapsed' | 'under-investigation';
}

export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
  translation?: string;
  room: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
