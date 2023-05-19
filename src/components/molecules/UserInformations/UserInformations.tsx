import React from 'react';

import styles from './UserInformations.module.scss';

import { dateToMonthYearString } from '@/utils/dateToMonthYearString';

import { DomainTag } from '@/components/atoms/DomainTag/DomainTag';
import { SkillTag } from '@/components/atoms/SkillTag/SkillTag';
import { CalendarIcon } from '@/components/atoms/icons/CalendarIcon/CalendarIcon';

import { Domain, Skill } from '@/models/appModels';

type Props = {
  registeredAt: Date;
  domains: Domain[];
  skills: Skill[];
};

export const UserInformations = ({ registeredAt, domains, skills }: Props) => {
  return (
    <div className={styles.userInformations}>
      <ul className={styles.contextInformations}>
        <li>
          <CalendarIcon />A rejoint Cocreate en{' '}
          {dateToMonthYearString(new Date(registeredAt))}
        </li>
      </ul>
      <div>
        <ul>
          <h3 className={styles.heading}>Domaines</h3>
          <div className={styles.items}>
            {domains.map((domain) => (
              <li key={domain}>
                <DomainTag domain={domain} />
              </li>
            ))}
          </div>
        </ul>
        <ul>
          <h3 className={styles.heading}>Skills</h3>
          <div className={styles.items}>
            {skills.map((skill) => (
              <li key={skill}>
                <SkillTag skill={skill} />
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};
