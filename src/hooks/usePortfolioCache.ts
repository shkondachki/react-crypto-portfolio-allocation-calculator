import { useEffect } from 'react';
import { PortfolioState } from '../types/types';
import { storage } from '../utils/storage';

const PORTFOLIO_CACHE_KEY = 'crypto_portfolio_cache';

export const usePortfolioCache = (
  portfolioState: PortfolioState,
  onLoadCache: (state: PortfolioState) => void
) => {
  // Load cached data on mount
  useEffect(() => {
    const cachedState = storage.get<PortfolioState>(PORTFOLIO_CACHE_KEY);
    if (cachedState) {
      onLoadCache(cachedState);
    }
  }, [onLoadCache]);

  // Save to cache whenever portfolio state changes
  useEffect(() => {
    storage.set(PORTFOLIO_CACHE_KEY, portfolioState);
  }, [portfolioState]);
}; 