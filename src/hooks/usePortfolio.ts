import { useState, useCallback, useMemo, useEffect } from 'react';
import { CryptoHolding, Recommendation, PortfolioState } from '../types/types';
import { storage } from '../utils/storage';

const PORTFOLIO_CACHE_KEY = 'crypto_portfolio_cache';

export const usePortfolio = () => {
  // Initialize state from cache if available
  const [holdings, setHoldings] = useState<CryptoHolding[]>(() => {
    const cachedState = storage.get<PortfolioState>(PORTFOLIO_CACHE_KEY);
    return cachedState?.holdings || [];
  });

  const totalValue = useMemo(() => 
    holdings.reduce((sum, holding) => sum + holding.value, 0),
    [holdings]
  );

  const portfolioState: PortfolioState = useMemo(() => ({
    holdings,
    totalValue,
    lastUpdated: new Date()
  }), [holdings, totalValue]);

  const addHolding = useCallback((holding: CryptoHolding) => {
    setHoldings(prev => {
      const normalizedIncomingName = holding.name.trim().toUpperCase();
      const existingIndex = prev.findIndex(h => h.name.trim().toUpperCase() === normalizedIncomingName);

      let newHoldings: CryptoHolding[];
      if (existingIndex !== -1) {
        const existing = prev[existingIndex];

        const updated: CryptoHolding = {
          ...existing, // Keep all existing properties
          value: holding.value ?? existing.value, // Use new value OR keep existing
          targetPercentage: holding.targetPercentage ?? existing.targetPercentage,
          lastUpdated: new Date()
        };

        newHoldings = [...prev];
        newHoldings[existingIndex] = updated;
      }
      else {
        newHoldings = [...prev, {
          ...holding,
          id: Date.now().toString(),
          lastUpdated: new Date()
        }];
      }

      // Save to cache immediately after state update
      storage.set(PORTFOLIO_CACHE_KEY, {
        holdings: newHoldings,
        totalValue: newHoldings.reduce((sum, h) => sum + h.value, 0),
        lastUpdated: new Date()
      });
      return newHoldings;
    });
  }, []);

  const deleteHolding = useCallback((id: string) => {
    setHoldings(prev => {
      const newHoldings = prev.filter(holding => holding.id !== id);
      // Save to cache immediately after state update
      storage.set(PORTFOLIO_CACHE_KEY, {
        holdings: newHoldings,
        totalValue: newHoldings.reduce((sum, h) => sum + h.value, 0),
        lastUpdated: new Date()
      });
      return newHoldings;
    });
  }, []);

  const calculateRecommendations = useCallback((): Recommendation[] => {
    return holdings.map(holding => {
      const currentValue = holding.value;
      const targetValue = (holding.targetPercentage || 0) * totalValue / 100;
      const difference = targetValue - currentValue;

      return {
        asset: holding.name,
        action: Math.abs(difference) < 1 ? 'No changes' : difference > 0 ? 'Buy' : 'Sell',
        amount: Math.abs(difference),
        timestamp: new Date()
      };
    });
  }, [holdings, totalValue]);

  // Save to cache whenever portfolio state changes
  useEffect(() => {
    storage.set(PORTFOLIO_CACHE_KEY, portfolioState);
  }, [portfolioState]);

  return {
    holdings,
    totalValue,
    addHolding,
    deleteHolding,
    calculateRecommendations
  };
}; 