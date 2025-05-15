import { CryptoHolding } from '../../types/types';
import { Table, Column } from '../Table/Table';
import { Card } from '../Card/Card';
import styles from './HoldingsTable.module.scss';

interface HoldingsTableProps {
  holdings: CryptoHolding[];
  totalValue: number;
  onDeleteHolding: (id: string) => void;
}

export const HoldingsTable = ({ holdings, totalValue, onDeleteHolding }: HoldingsTableProps) => {
  const columns: Column<CryptoHolding>[] = [
    { header: 'Asset', accessor: 'name' },
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
      accessor: (holding: CryptoHolding) => `${holding.targetPercentage}%` 
    },
    {
      header: 'Actions',
      accessor: (holding: CryptoHolding) => (
        <button
          className={`${styles.button} ${styles.delete} ${styles.sm}`}
          onClick={() => onDeleteHolding(holding.id)}
        >
          Delete
        </button>
      )
    }
  ];

  return (
    <Card 
      title={`Current Holdings (Total: €${totalValue.toFixed(2)})`}
      icon="💼"
    >
      <Table data={holdings} columns={columns} />
    </Card>
  );
}; 