import React from 'react';

import { Field } from '../Field/Field';
import styles from './SkillsSelector.module.scss';

import { capitalize } from '@/utils/capitalize';

import { Skill, SkillModel } from '@/models/appModels';

interface Props {
  skills: SkillModel[];
  selectedSkills: SkillModel[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<SkillModel[]>>;
}

export const SkillsSelector = ({
  skills,
  selectedSkills,
  setSelectedSkills,
}: Props) => {
  const isSelected = (name: Skill) =>
    selectedSkills?.some((skill) => skill.name === name);

  return (
    <Field label="Compétences">
      <ul className={styles.skillsSelector}>
        {skills.map(({ id, name }) => (
          <li
            key={id}
            className={`${styles.skill} ${
              isSelected(name) ? styles.active : ''
            }`}
          >
            <input
              id={name}
              type="checkbox"
              checked={isSelected(name)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedSkills([...selectedSkills, { id, name }]);
                } else {
                  setSelectedSkills(
                    selectedSkills.filter((skill) => skill.id !== id)
                  );
                }
              }}
            />
            <label htmlFor={name} className={styles.label}>
              {capitalize(name.replaceAll('_', ' ').toLowerCase())}
            </label>
          </li>
        ))}
      </ul>
    </Field>
  );
};
