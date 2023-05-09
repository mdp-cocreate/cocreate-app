import { PropsWithChildren } from 'react';

import styles from './Button.module.scss';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  type = 'button',
  disabled,
  isLoading,
  onClick,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <button
      className={`${styles.button} ${isLoading ? styles.loading : ''}`}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading && <>Loading...</>}
      {children}
    </button>
  );
};
