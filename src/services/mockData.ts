import { FraudProject } from '../types';

export const mockProjects: FraudProject[] = [
  {
    id: '1',
    project_name: 'BitConnect',
    fraud_type: 'crypto_ponzi',
    category: 'Crypto',
    country: 'Global',
    launch_year: 2016,
    collapse_year: 2018,
    damage_estimate: '2 billion USD',
    victims: 500000,
    fraud_method: 'High-yield investment program using a pyramid structure and BCC token.',
    related_token: 'BCC',
    risk_score: 100,
    status: 'collapsed'
  },
  {
    id: '2',
    project_name: 'OneCoin',
    fraud_type: 'ponzi_scheme',
    category: 'Crypto',
    country: 'Global',
    launch_year: 2014,
    collapse_year: 2019,
    damage_estimate: '4 billion USD',
    victims: 3000000,
    fraud_method: 'Multi-level marketing scheme selling educational packages and fake cryptocurrency.',
    related_token: 'ONE',
    risk_score: 100,
    status: 'collapsed'
  },
  {
    id: '3',
    project_name: 'PlusToken',
    fraud_type: 'crypto_ponzi',
    category: 'Crypto',
    country: 'China/Global',
    launch_year: 2018,
    collapse_year: 2019,
    damage_estimate: '2.2 billion USD',
    victims: 2000000,
    fraud_method: 'Crypto wallet promising high returns through arbitrage trading.',
    risk_score: 100,
    status: 'collapsed'
  },
  {
    id: '4',
    project_name: 'V Global',
    fraud_type: 'crypto_fraud',
    category: 'Exchange',
    country: 'South Korea',
    launch_year: 2020,
    collapse_year: 2021,
    damage_estimate: '2.2 trillion KRW',
    victims: 52000,
    fraud_method: 'Fake crypto exchange promising 300% returns on V-Cash.',
    related_token: 'V-Cash',
    risk_score: 100,
    status: 'collapsed'
  },
  {
    id: '5',
    project_name: 'IDS Holdings',
    fraud_type: 'investment_fraud',
    category: 'Investment',
    country: 'South Korea',
    launch_year: 2011,
    collapse_year: 2016,
    damage_estimate: '1 trillion KRW',
    victims: 12000,
    fraud_method: 'FX margin trading scam promising high monthly returns.',
    risk_score: 100,
    status: 'collapsed'
  }
];

export const getFraudTrends = () => {
  return [
    { date: '2025-01', count: 120 },
    { date: '2025-02', count: 150 },
    { date: '2025-03', count: 280 },
    { date: '2025-04', count: 420 },
    { date: '2025-05', count: 390 },
    { date: '2025-06', count: 510 },
  ];
};
