import styles from './IconButton.module.scss';

interface Props {
  icon: React.SVGProps<SVGSVGElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  active?: boolean;
  focusable?: boolean;
}

export const IconButton = ({
  icon,
  type = 'button',
  disabled = false,
  active = false,
  focusable = true,
}: Props) => {
  return (
    <button
      className={`${styles.iconButton} ${active ? styles.active : ''}`}
      type={type}
      disabled={disabled}
      tabIndex={focusable ? 0 : -1}
    >
      <>{icon}</>
    </button>
  );
};
