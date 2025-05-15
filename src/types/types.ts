// export type CryptoAsset = {
//   id: string;
//   name: string;
//   symbol: string;
//   currentPrice: number;
// };

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

export type RecommendationAction = 'Buy' | 'Sell' | '—';

export type Recommendation = {
  asset: string;
  action: RecommendationAction;
  amount: number;
  timestamp: Date;
};

// export type AddHoldingFormData = Omit<CryptoHolding, 'id'>;
//
// export type TableColumn<T> = {
//   header: string;
//   accessor: keyof T | ((item: T) => React.ReactNode);
//   className?: string;
// };