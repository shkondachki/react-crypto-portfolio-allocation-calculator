import { useState } from 'react';
import { CryptoHolding } from '../../types/types';
import { Card } from '../Card/Card';
import styles from './AddHoldingForm.module.scss';

interface AddHoldingFormProps {
  onAddHolding: (holding: CryptoHolding) => void;
}

// Use a separate type for form state to allow string values
interface HoldingFormState {
  id: string;
  name: string;
  value: string;
  targetPercentage: string;
}

export const AddHoldingForm = ({ onAddHolding }: AddHoldingFormProps) => {
  const [newHolding, setNewHolding] = useState<HoldingFormState>({
    id: '',
    name: '',
    value: '',
    targetPercentage: ''
  });

  const handleSubmit = () => {
    if (newHolding.name && newHolding.value !== '') {
      onAddHolding({
        ...newHolding,
        value: Number(newHolding.value) || 0,
        targetPercentage: Number(newHolding.targetPercentage) || 0,
        id: Date.now().toString()
      });
      setNewHolding({ id: '', name: '', value: '', targetPercentage: '' });
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
            value={newHolding.name}
            onChange={e => setNewHolding({ ...newHolding, name: e.target.value.toUpperCase() })}
            placeholder="BTC"
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Value (€)</label>
          <input
            className={styles.input}
            type="number"
            value={newHolding.value}
            onChange={e => setNewHolding({ ...newHolding, value: e.target.value })}
            placeholder="0"
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Target %</label>
          <input
            className={styles.input}
            type="number"
            value={newHolding.targetPercentage}
            onChange={e => setNewHolding({ ...newHolding, targetPercentage: e.target.value })}
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