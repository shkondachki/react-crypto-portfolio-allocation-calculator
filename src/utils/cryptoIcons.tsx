import { ReactNode } from 'react';
import * as Web3Icons from '@web3icons/react';

export function getCryptoIcon(symbol: string, size = 22): ReactNode {
  const TokenEURS = (Web3Icons as any).TokenEURS;
  if (!symbol) {
    return TokenEURS ? <TokenEURS size={size} /> : null;
  }
  const key = symbol.trim().toLowerCase();

  // console.log(Object.keys(Web3Icons));
  const iconKey = Object.keys(Web3Icons).find(
    k =>
      k.toLowerCase() === key + 'icon' ||
      k.toLowerCase() === key ||
      k.toLowerCase() === 'w3i' + key ||
      k.toLowerCase() === 'token' + key
  );

  const IconComponent = iconKey
    ? (Web3Icons as any)[iconKey]
    : TokenEURS;

  return IconComponent ? <IconComponent size={size} /> : null;
} 