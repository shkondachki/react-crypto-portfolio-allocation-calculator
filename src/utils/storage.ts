interface StorageItem<T> {
  value: T;
  timestamp: number;
}

const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const storage = {
  set: <T>(key: string, value: T): void => {
    try {
      const item: StorageItem<T> = {
        value,
        timestamp: Date.now()
      };
      const serialized = JSON.stringify(item);
      localStorage.setItem(key, serialized);
      // console.log(`[Storage] Saved data for key: ${key}`, value);
    } catch (error) {
      // console.error('[Storage] Error saving data:', error);
    }
  },

  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      if (!item) {
        console.log(`[Storage] No data found for key: ${key}`);
        return null;
      }

      const { value, timestamp }: StorageItem<T> = JSON.parse(item);
      const isExpired = Date.now() - timestamp > EXPIRATION_TIME;

      if (isExpired) {
        console.log(`[Storage] Data expired for key: ${key}`);
        localStorage.removeItem(key);
        return null;
      }

      // console.log(`[Storage] Retrieved data for key: ${key}`, value);
      return value;
    } catch (error) {
      console.error('[Storage] Error retrieving data:', error);
      return null;
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
      // console.log(`[Storage] Removed data for key: ${key}`);
    } catch (error) {
      console.error('[Storage] Error removing data:', error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
      console.log('[Storage] Cleared all data');
    } catch (error) {
      console.error('[Storage] Error clearing data:', error);
    }
  }
}; 