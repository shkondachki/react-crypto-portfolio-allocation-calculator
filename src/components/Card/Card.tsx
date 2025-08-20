import { ReactNode } from 'react';
import styles from './Card.module.scss';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  icon?: string;
}

export const Card = ({ children, className, title, icon }: CardProps) => {
  return (
    <div className={`${styles.card} ${className || ''}`}>
      {title && (
        <h2 className={styles.title}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}; 