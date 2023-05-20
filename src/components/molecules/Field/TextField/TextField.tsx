import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { Field } from '../Field';
import styles from './TextField.module.scss';

import { RuleMessage } from '@/components/atoms/RuleMessage/RuleMessage';

interface Rule {
  name: string;
  pattern: RegExp;
}

interface Props {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'url';
  minLength?: number;
  maxLength?: number;
  rules?: Rule[];
  setIsValid?: Dispatch<SetStateAction<boolean>>;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const TextField = ({
  label,
  placeholder,
  type = 'text',
  minLength,
  maxLength,
  rules,
  setIsValid,
  defaultValue = '',
  onValueChange,
}: Props) => {
  const [value, setValue] = useState(defaultValue);
  const [isFocus, setIsFocus] = useState(false);

  const displayRules = (): ReactNode => {
    if (!rules || !rules.length) return null;

    return (
      <ul className={styles.rulesList}>
        {rules.map(({ name, pattern }) => (
          <li key={name}>
            <RuleMessage
              message={name}
              active={isFocus}
              isRespected={new RegExp(pattern).test(value)}
            />
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    if (!setIsValid) return;

    if (!rules?.length) return setIsValid(true);

    const areAllRulesRespected = !rules.some(
      ({ pattern }) => !pattern.test(value)
    );

    if (areAllRulesRespected) setIsValid(true);
    else setIsValid(false);
  }, [rules, value]);

  return (
    <Field label={label}>
      <input
        placeholder={placeholder}
        id={label}
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        className={styles.textField}
        value={value}
        onChange={({ target }) => {
          setValue(target.value);
          onValueChange && onValueChange(target.value);
        }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {displayRules()}
    </Field>
  );
};
