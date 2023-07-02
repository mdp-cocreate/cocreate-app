'use client';

import Link from 'next/link';
import React, { Fragment, ReactNode, useEffect, useState } from 'react';

import { RegisterCompleteDisplay } from '../RegisterCompleteDisplay/RegisterCompleteDisplay';
import styles from './RegisterForm.module.scss';

import { regex } from '@/utils/regex';

import { appServices } from '@/services/appServices';
import { authServices } from '@/services/authServices';

import { Button } from '@/components/atoms/Button/Button';
import { TextualCheckbox } from '@/components/atoms/TextualCheckbox/TextualCheckbox';
import { ErrorWidget } from '@/components/molecules/ErrorWidget/ErrorWidget';
import PasswordField from '@/components/molecules/Field/PasswordField/PasswordField';
import { TextField } from '@/components/molecules/Field/TextField/TextField';

import { Domain, DomainModel, Skill, SkillModel } from '@/models/appModels';

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | ReactNode>('');
  const [step, setStep] = useState(1);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  // First part
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // Second part
  const [domains, setDomains] = useState<DomainModel[]>([]);

  const retrieveDomains = async () => {
    const response = await appServices.getDomains();

    if (response.status === 200 && response.data)
      setDomains(response.data.domains);
  };

  useEffect(() => {
    retrieveDomains();
  }, []);

  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);

  // Third part
  const [skills, setSkills] = useState<SkillModel[]>([]);

  const retrieveSkills = async () => {
    const response = await appServices.getSkillsByDomains(selectedDomains);
    if (response.status === 200 && response.data)
      setSkills(response.data.skills);
  };

  useEffect(() => {
    setSelectedSkills([]);
    retrieveSkills();
  }, [selectedDomains]);

  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

  const registerUser = async () => {
    setIsLoading(true);
    const response = await authServices.register({
      email,
      password,
      firstName,
      lastName,
      skills: selectedSkills,
    });
    setIsLoading(false);

    if (response.status === 409) {
      return setError(
        <>
          Cette adresse email est déjà associée à un compte existant.{' '}
          <Link href="/login" className="link">
            Connectez-vous
          </Link>
        </>
      );
    }

    if (response.status === 201) setIsRegistrationComplete(true);
    else
      setError(
        `Une erreur inconnue est survenue (${response.status}). Veuillez contacter le support.`
      );
  };

  if (isRegistrationComplete) return <RegisterCompleteDisplay />;

  return (
    <form className={styles.registerForm}>
      {step === 1 ? (
        <div className={styles.firstPart}>
          <div className={styles.grid}>
            <TextField
              label="Nom"
              defaultValue={lastName}
              onValueChange={(value) => setLastName(value)}
            />
            <TextField
              label="Prénom"
              defaultValue={firstName}
              onValueChange={(value) => setFirstName(value)}
            />
          </div>
          <TextField
            label="Email"
            defaultValue={email}
            onValueChange={(value) => setEmail(value)}
            setIsValid={setIsEmailValid}
            rules={[{ name: 'Doit être un email', pattern: regex.email }]}
          />
          <PasswordField
            value={password}
            setValue={setPassword}
            setIsPasswordValid={setIsPasswordValid}
          />
          <Button
            type="submit"
            block
            disabled={!isEmailValid || !isPasswordValid}
            onClick={(e) => {
              e.preventDefault();
              setStep(2);
            }}
          >
            Suivant
          </Button>
        </div>
      ) : step === 2 ? (
        <div className={styles.secondPart}>
          <h2 className={styles.subtitle}>Vos domaines ?</h2>
          <div className={styles.domainsCheckboxes}>
            {domains.map((domain) => (
              <Fragment key={domain.id}>
                <TextualCheckbox
                  domain={domain.name}
                  onChange={(checked) => {
                    if (checked)
                      setSelectedDomains([...selectedDomains, domain.name]);
                    else
                      setSelectedDomains(
                        selectedDomains.filter(
                          (selectDomain) => selectDomain !== domain.name
                        )
                      );
                  }}
                />
              </Fragment>
            ))}
          </div>
          <div className={styles.grid}>
            <Button type="button" block onClick={() => setStep(1)}>
              Retour
            </Button>
            <Button
              type="submit"
              block
              disabled={!selectedDomains.length}
              onClick={(e) => {
                e.preventDefault();
                setStep(3);
              }}
            >
              Suivant
            </Button>
          </div>
        </div>
      ) : step === 3 ? (
        <div className={styles.thirdPart}>
          <h2 className={styles.subtitle}>Vos compétences ?</h2>
          <div className={styles.skillsCheckboxes}>
            {skills.map((skill) => (
              <Fragment key={skill.id}>
                <TextualCheckbox
                  label={skill.name}
                  onChange={(checked) => {
                    if (checked)
                      setSelectedSkills([...selectedSkills, skill.name]);
                    else
                      setSelectedSkills(
                        selectedSkills.filter(
                          (selectedSkill) => selectedSkill !== skill.name
                        )
                      );
                  }}
                />
              </Fragment>
            ))}
          </div>
          <div className={styles.grid}>
            <Button type="button" block onClick={() => setStep(2)}>
              Retour
            </Button>
            <Button
              type="submit"
              block
              disabled={!selectedSkills.length || isLoading}
              onClick={(e) => {
                e.preventDefault();
                registerUser();
              }}
            >
              Créer mon compte
            </Button>
          </div>
        </div>
      ) : null}
      {error ? <ErrorWidget>{error}</ErrorWidget> : null}
    </form>
  );
};
