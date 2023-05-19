import React from 'react';

import styles from './UserInformations.module.scss';

import { dateToMonthYearString } from '@/utils/dateToMonthYearString';

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
      <ul>
        <h3>Domaines</h3>
        {domains.map((domain) => (
          <li key={domain}>{domain}</li>
        ))}
      </ul>
      <ul>
        <h3>Skills</h3>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};
