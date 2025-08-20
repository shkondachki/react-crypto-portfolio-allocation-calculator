import { useState } from 'react';
import styles from './Tooltip.module.scss';

interface TooltipProps {
    text: string;
    icon?: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
}

export const Tooltip = ({
      text,
      icon = 'ℹ️',
      position = 'top',
      delay = 0
  }: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<null | number>(null);

    const showTooltip = () => {
        if (timeoutId) clearTimeout(timeoutId);

        if (delay > 0) {
            const id = setTimeout(() => setIsVisible(true), delay)
            setTimeoutId(id);
        }
        else {
            setIsVisible(true)
        }
    }

    const hideTooltip = () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
            setTimeoutId(null)
        }
        setIsVisible(false);
    }

    return (
        <div
            className={styles.tooltipContainer}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
            tabIndex={0}
            role="button"
            aria-label={`Help: ${text}`}
        >
            <span className={styles.tooltipIcon}>{icon}</span>
            {isVisible && (
                <div
                    className={`${styles.tooltipText} ${styles[`tooltip--${position}`]}`}
                    role="tooltip"
                >
                    {text}
                </div>
            )}
        </div>
    );
};