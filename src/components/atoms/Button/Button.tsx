import { PropsWithChildren } from 'react';

import styles from './Button.module.scss';

interface Props {
  color?: 'primary' | 'secondary' | 'alert';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  block?: boolean;
  focusable?: boolean;
}

export const Button = ({
  color = 'primary',
  type = 'button',
  disabled,
  isLoading,
  onClick,
  children,
  block = false,
  focusable = true,
}: PropsWithChildren<Props>) => {
  const getColor = (): string => {
    switch (color) {
      case 'secondary':
        return styles.secondary;
      case 'alert':
        return styles.alert;
      default:
        return '';
    }
  };

  return (
    <button
      className={`${styles.button} ${getColor()} ${
        isLoading ? styles.loading : ''
      } ${block ? styles.block : ''}`}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      tabIndex={focusable ? 0 : -1}
    >
      {isLoading && <>Loading...</>}
      {children}
    </button>
  );
};
