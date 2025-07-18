export type CryptoHolding = {
  id: string;
  name: string;
  value: number;
  targetPercentage?: number;
  lastUpdated?: Date;
};

export type PortfolioState = {
  holdings: CryptoHolding[];
  totalValue: number;
  lastUpdated: Date;
};

export type RecommendationAction = 'Buy' | 'Sell' | 'No changes';

export type Recommendation = {
  asset: string;
  action: RecommendationAction;
  amount: number;
  timestamp: Date;
};