import { useState } from 'react';
import { CryptoHolding } from '../../types/types';
import { Card } from '../Card/Card';
import styles from './AddHoldingForm.module.scss';

interface AddHoldingFormProps {
  onAddHolding: (holding: CryptoHolding) => void;
}

export const AddHoldingForm = ({ onAddHolding }: AddHoldingFormProps) => {
  const [newHolding, setNewHolding] = useState<CryptoHolding>({
    id: '',
    name: '',
    value: 0,
    targetPercentage: 0
  });

  const handleSubmit = () => {
    if (newHolding.name && newHolding.value >= 0) {
      onAddHolding({ ...newHolding, id: Date.now().toString() });
      setNewHolding({ id: '', name: '', value: 0, targetPercentage: 0 });
    }
  };

  return (
    <Card title="Add New Holding" icon="➕">
      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Crypto Name</label>
          <input
            className={styles.input}
            type="text"
            value={(newHolding.name)}
            onChange={(e) => setNewHolding({ ...newHolding, name: (e.target.value).toUpperCase() })}
            placeholder="e.g., BTC"
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Value (€)</label>
          <input
            className={styles.input}
            type="number"
            value={newHolding.value}
            onChange={(e) => setNewHolding({ ...newHolding, value: Number(e.target.value) })}
            placeholder="0.00"
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Target %</label>
          <input
            className={styles.input}
            type="number"
            value={newHolding.targetPercentage}
            onChange={(e) => setNewHolding({ ...newHolding, targetPercentage: Number(e.target.value) })}
            placeholder="0"
          />
        </div>
      </div>
      <button className={`${styles.button} ${styles.main}`} onClick={handleSubmit}>
        Add Holding
      </button>
    </Card>
  );
}; 