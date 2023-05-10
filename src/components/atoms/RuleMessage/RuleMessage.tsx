import { ErrorIcon } from '../icons/ErrorIcon/ErrorIcon';
import { SuccessIcon } from '../icons/SuccessIcon/SuccessIcon';
import styles from './RuleMessage.module.scss';

interface Props {
  message: string;
  active?: boolean;
  isRespected?: boolean;
}

export const RuleMessage = ({
  message,
  active = false,
  isRespected = false,
}: Props) => {
  const icon = isRespected ? <SuccessIcon /> : <ErrorIcon />;

  return (
    <span
      className={`small ${styles.ruleMessage} ${
        !isRespected ? styles.error : ''
      } ${!active ? styles.inactive : ''}`}
    >
      <div className={styles.iconContainer}>{icon}</div>
      {message}
    </span>
  );
};
