import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';

import {
  EyeInvisibleOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Field } from '../Field';
import styles from './PasswordField.module.scss';

import { regex } from '@/utils/regex';

const showIcon = <EyeOutlined />;
const hideIcon = <EyeInvisibleOutlined />;

interface PasswordRules {
  isLengthRuleOk: boolean;
  isLetterRuleOk: boolean;
  isSpecialRuleOk: boolean;
}

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setIsPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading?: boolean;
}

const PasswordField = ({
  value,
  setValue,
  setIsPasswordValid,
  isLoading,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordRules, setPasswordRules] = useState<PasswordRules>({
    isLengthRuleOk: false,
    isLetterRuleOk: false,
    isSpecialRuleOk: false,
  });

  const rulesIndicator = Object.values(passwordRules).sort((a, b) => {
    if (a === b) {
      return 0;
    } else if (a) {
      return -1;
    } else {
      return 1;
    }
  });
  const countRulesRespected: number = rulesIndicator.filter(
    (rule) => rule
  ).length;

  useEffect(() => {
    setIsPasswordValid(countRulesRespected === rulesIndicator.length);
  }, [countRulesRespected]);

  const {
    hasACorrectLength,
    containAtLeastOneUpperCaseLetterAndOneLowerCaseLetter,
    containAtLeastOneNumberOrSpecialCharacter,
  } = regex.password;

  const handleChange = (password: string) => {
    setValue(password);

    if (password.match(hasACorrectLength)) {
      !passwordRules.isLengthRuleOk &&
        setPasswordRules((prev) => ({ ...prev, isLengthRuleOk: true }));

      if (
        password.match(containAtLeastOneUpperCaseLetterAndOneLowerCaseLetter)
      ) {
        !passwordRules.isLetterRuleOk &&
          setPasswordRules((prev) => ({ ...prev, isLetterRuleOk: true }));
      } else
        passwordRules.isLetterRuleOk &&
          setPasswordRules((prev) => ({ ...prev, isLetterRuleOk: false }));

      if (password.match(containAtLeastOneNumberOrSpecialCharacter)) {
        !passwordRules.isSpecialRuleOk &&
          setPasswordRules((prev) => ({ ...prev, isSpecialRuleOk: true }));
      } else
        passwordRules.isSpecialRuleOk &&
          setPasswordRules((prev) => ({ ...prev, isSpecialRuleOk: false }));
    } else
      passwordRules.isLengthRuleOk &&
        setPasswordRules({
          isLengthRuleOk: false,
          isLetterRuleOk: false,
          isSpecialRuleOk: false,
        });
  };

  const getPasswordStrengthAdjective = (): string => {
    switch (countRulesRespected) {
      case 1:
        return 'faible';
      case 2:
        return 'moyen';
      case 3:
        return 'fort';
      default:
        return 'faible';
    }
  };

  const getColorToDisplay = () => {
    switch (countRulesRespected) {
      case 1:
        return styles.red;
      case 2:
        return styles.orange;
      case 3:
        return styles.green;
      default:
        return styles.red;
    }
  };

  useEffect(function initRules() {
    handleChange(value);
  }, []);

  return (
    <Field label="Mot de passe">
      <div
        className={`${styles.inputContainer} ${
          isLoading ? styles.loading : ''
        }`}
      >
        <input
          className={styles.input}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => handleChange(e.target.value)}
          value={value}
          maxLength={32}
        />
        <button
          type="button"
          className={styles.showPasswordIconContainer}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? hideIcon : showIcon}
        </button>
      </div>
      <div className={`${styles.rules} ${getColorToDisplay()}`}>
        <div className={styles.rulesIndicatorContainer}>
          {rulesIndicator.map((rule, index) => (
            <div
              key={index}
              className={`${styles.indicator} ${rule ? styles.valid : ''}`}
            />
          ))}
        </div>
        <span
          className={`${styles.passwordStrengthText} ${
            !value ? styles.hidden : ''
          }`}
        >
          <Tooltip
            placement="bottom"
            title="Votre mot de passe doit contenir entre 8 et 32 caractères, au moins une majuscule, une minuscule et un chiffre ou caractère spécial."
          >
            <QuestionCircleOutlined />
          </Tooltip>{' '}
          Mot de passe {getPasswordStrengthAdjective()}
        </span>
      </div>
    </Field>
  );
};

export default PasswordField;
