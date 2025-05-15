import { ReactNode } from 'react';
import styles from './Table.module.scss';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

export const Table = <T extends object>({ columns, data, className }: TableProps<T>) => {
  return (
      <div className={styles.tableWrapper}>
    <table className={`${styles.table} ${className || ''}`}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td 
                key={colIndex}
                className={column.className}
              >
                {typeof column.accessor === 'function' 
                  ? column.accessor(item)
                  : item[column.accessor] as ReactNode}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
      </div>
  );
}; 