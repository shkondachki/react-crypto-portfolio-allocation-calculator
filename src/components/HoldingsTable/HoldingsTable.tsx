import { CryptoHolding } from '../../types/types';
import { Table, Column } from '../Table/Table';
import { Card } from '../Card/Card';
import { TokenIcon } from '../TokenIcon/TokenIcon';
import styles from './HoldingsTable.module.scss';

interface HoldingsTableProps {
  holdings: CryptoHolding[];
  totalValue: number;
  onDeleteHolding: (id: string) => void;
}

export const HoldingsTable = ({ holdings, totalValue, onDeleteHolding }: HoldingsTableProps) => {
  const columns: Column<CryptoHolding>[] = [
    {
      header: 'Asset',
      accessor: (holding: CryptoHolding) => <TokenIcon symbol={holding.name} />
    },
    { 
      header: 'Value (€)', 
      accessor: (holding: CryptoHolding) => `€${holding.value.toFixed()}` 
    },
    { 
      header: '% of Portfolio', 
      accessor: (holding: CryptoHolding) => `${((holding.value / totalValue) * 100).toFixed()}%` 
    },
    { 
      header: 'Target %', 
      accessor: (holding: CryptoHolding) => {
        const percent = holding.targetPercentage ?? 0;
        if (!percent) return '€0';
        const targetValue = ((percent / 100) * totalValue) || 0;
        return (
          <>
            {percent}% <span className={styles.divider}>/</span> €{targetValue.toFixed()}
          </>
        );
      }
    },
    {
      header: 'Actions',
      accessor: (holding: CryptoHolding) => (
        <button
          className={`${styles.button} ${styles.link} ${styles.error} ${styles.sm}`}
          onClick={() => onDeleteHolding(holding.id)}
        >
          Delete
        </button>
      )
    }
  ];

  const totalTargetPercent = holdings.reduce((sum, h) => sum + (h.targetPercentage ?? 0), 0);

  return (
    <Card 
      title={`Current Holdings (Total: €${totalValue.toFixed(2)}, Target: ${totalTargetPercent}%)`}
      icon="💼"
    >
      <Table data={holdings} columns={columns} />
    </Card>
  );
}; 