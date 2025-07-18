import React from 'react';
import styles from './TokenIcon.module.scss';
import { getCryptoIcon } from '../../utils/cryptoIcons';

interface TokenIconProps {
  symbol: string;
  name?: string;
  size?: number;
}

export const TokenIcon: React.FC<TokenIconProps> = ({ symbol, name, size = 20 }) => (
  <span className={styles.tokenWrapper}>
    <span className={styles.tokenIconWrapper}>{getCryptoIcon(symbol, size)}</span>
    {name || symbol}
  </span>
); 