import { AddHoldingForm } from './components/AddHoldingForm/AddHoldingForm';
import { HoldingsTable } from './components/HoldingsTable/HoldingsTable';
import { RecommendationsTable } from './components/RecommendationsTable/RecommendationsTable';
import { usePortfolio } from './hooks/usePortfolio';
import styles from './App.module.scss';

function App() {
  const {
    holdings,
    totalValue,
    addHolding,
    deleteHolding,
    calculateRecommendations
  } = usePortfolio();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crypto Portfolio Allocation</h1>

      <div className={styles.inner}>
        <div className={styles.form}>
          <AddHoldingForm onAddHolding={addHolding} />
        </div>
      
        <div className={styles.tables}>
          <HoldingsTable
            holdings={holdings}
            totalValue={totalValue}
            onDeleteHolding={deleteHolding}
          />
          
          <RecommendationsTable recommendations={calculateRecommendations()} />
        </div>
      </div>
    </div>
  );
}

export default App;
