import { Recommendation } from '../../types/types';
import { Table, Column } from '../Table/Table';
import { Card } from '../Card/Card';
import styles from './RecommendationsTable.module.scss';

interface RecommendationsTableProps {
  recommendations: Recommendation[];
}

export const RecommendationsTable = ({ recommendations }: RecommendationsTableProps) => {
  const columns: Column<Recommendation>[] = [
    { header: 'Asset', accessor: 'asset' },
    {
      header: 'Action',
      accessor: (rec: Recommendation) => (
        <span className={`${styles.recommendationBox} ${styles[rec.action.toLowerCase()]}`}>
          {rec.action}
        </span>
      ),
      className: styles.recommendation
    },
    {
      header: 'Amount (€)',
      accessor: (rec: Recommendation) => rec.action !== '—' ? `€${rec.amount.toFixed()}` : '—'
    }
  ];

  return (
    <Card 
      title="Buy/Sell Recommendations"
      icon="🔄"
    >
      <Table data={recommendations} columns={columns} />
    </Card>
  );
}; 