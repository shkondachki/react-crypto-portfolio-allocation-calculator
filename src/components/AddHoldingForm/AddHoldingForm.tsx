import { useState } from 'react';
import { CryptoHolding } from '../../types/types';
import { Card } from '../Card/Card';
import styles from './AddHoldingForm.module.scss';
import {Tooltip} from "../Tooltip/Tooltip.tsx";

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

  const [errors, setErrors] = useState({
    name: false,
    value: false,
    targetPercentage: false
  });

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'value' | 'targetPercentage') => {
    const value = e.target.value;

    // Allow empty string, digits, and decimal point, but block + and - characters
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setNewHolding({ ...newHolding, [field]: value });

      // Clear error if user starts typing
      if (value !== '') {
        setErrors(prev => ({ ...prev, [field]: false }));
      }
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setNewHolding({ ...newHolding, name: value });

    // Clear error if user starts typing
    if (value !== '') {
      setErrors(prev => ({ ...prev, name: false }));
    }
  };

  const handleSubmit = () => {
    // Check for empty fields
    const newErrors = {
      name: newHolding.name.trim() === '',
      value: newHolding.value.trim() === '',
      targetPercentage: newHolding.targetPercentage.trim() === ''
    };

    setErrors(newErrors);

    // If any field is empty, don't submit
    if (newErrors.name || newErrors.value || newErrors.targetPercentage) {
      return;
    }

    // All fields are filled, proceed with submission
    onAddHolding({
      ...newHolding,
      value: Number(newHolding.value) || 0,
      targetPercentage: Number(newHolding.targetPercentage) || 0,
      id: Date.now().toString()
    });

    setNewHolding({ id: '', name: '', value: '', targetPercentage: '' });
    setErrors({ name: false, value: false, targetPercentage: false });
  };

  return (
      <Card title="Add New Holding" icon="➕">
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <div className={styles.labelWithTooltip}>
              <label className={styles.inputLabel}>Crypto Name</label>
              <Tooltip text="Enter the cryptocurrency symbol (e.g., BTC, ETH, ADA)" />
            </div>
            <input
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                type="text"
                value={newHolding.name}
                onChange={handleNameChange}
                placeholder="BTC"
                maxLength={10}
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.labelWithTooltip}>
              <label className={styles.inputLabel}>Value (€)</label>
              <Tooltip text="Enter the current value of your holding in Euros (e.g., 1500.50)" />
            </div>
            <input
                className={`${styles.input} ${errors.value ? styles.inputError : ''}`}
                type="text"
                value={newHolding.value}
                onChange={e => handleValueChange(e, 'value')}
                placeholder="0"
                inputMode="decimal"
                maxLength={15}
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.labelWithTooltip}>
              <label className={styles.inputLabel}>Target %</label>
              <Tooltip text="Enter your desired portfolio allocation percentage for this cryptocurrency (e.g., 25 for 25%)" />
            </div>
            <input
                className={`${styles.input} ${errors.targetPercentage ? styles.inputError : ''}`}
                type="text"
                value={newHolding.targetPercentage}
                onChange={e => handleValueChange(e, 'targetPercentage')}
                placeholder="0"
                inputMode="decimal"
                maxLength={3}
            />
          </div>
        </div>
        <button className={`${styles.button} ${styles.main}`} onClick={handleSubmit}>
          Add Holding
        </button>
      </Card>
  );
};