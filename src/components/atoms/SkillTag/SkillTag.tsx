import React from 'react';

import styles from './SkillTag.module.scss';

import { Skill } from '@/models/appModels';

type Props = {
  skill: Skill;
};

export const SkillTag = ({ skill }: Props) => {
  const getLabelBySkill = (): string => skill.replace('_', ' ').toLowerCase();

  return <div className={styles.skillTag}>{getLabelBySkill()}</div>;
};
