import { Switch } from 'antd';
import { useRouter } from 'next/navigation';
import React, { Fragment, ReactNode, useEffect, useState } from 'react';

import styles from './CreateProjectForm.module.scss';

import { manageToken } from '@/utils/manageToken';

import { appServices } from '@/services/appServices';
import { projectServices } from '@/services/projectServices';

import { Button } from '@/components/atoms/Button/Button';
import { TextualCheckbox } from '@/components/atoms/TextualCheckbox/TextualCheckbox';
import { ErrorWidget } from '@/components/molecules/ErrorWidget/ErrorWidget';
import { Field } from '@/components/molecules/Field/Field';
import { TextField } from '@/components/molecules/Field/TextField/TextField';

import { Domain, DomainModel, Skill, SkillModel } from '@/models/appModels';
import { CreateProjectDto } from '@/models/projectModels';

interface Props {
  closeDrawer: () => void;
}

const CreateProjectForm = ({ closeDrawer }: Props) => {
  const router = useRouter();

  const reinitialize = () => {
    setCurrentStep(1);
    setError('');
    setName('');
    setShortDescription('');
    setDescription('');
    setIsPublic(false);
    setSelectedDomains([]);
    setSelectedSkills([]);
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | ReactNode>('');

  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const isFirstPartComplete = name && shortDescription;

  const [domains, setDomains] = useState<DomainModel[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);

  const isSecondPartComplete = selectedDomains.length > 0;

  const [skills, setSkills] = useState<SkillModel[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

  const isThirdPartComplete = selectedSkills.length > 0;

  const retrieveDomains = async () => {
    const response = await appServices.getDomains();

    if (response.status === 200 && response.data)
      return setDomains(response.data.domains);

    setError(
      `Une erreur inconnue est survenue (${response.status}). Veuillez contacter le support.`
    );
  };

  const retrieveSkills = async () => {
    const response = await appServices.getSkillsByDomains(selectedDomains);

    if (response.status === 200 && response.data)
      return setSkills(response.data.skills);

    setError(
      `Une erreur inconnue est survenue (${response.status}). Veuillez contacter le support.`
    );
  };

  useEffect(() => {
    retrieveDomains();
  }, []);

  useEffect(() => {
    if (currentStep !== 3) return;

    retrieveSkills();
  }, [currentStep]);

  const createProject = async () => {
    const token = manageToken.get();
    const createProjectDto: CreateProjectDto = {
      name,
      shortDescription,
      description,
      public: isPublic,
      skills: selectedSkills,
    };

    const response = await projectServices.createProject(
      token || '',
      createProjectDto
    );

    if (response.status === 201 && response.data) {
      router.push(`/projects/${response.data.project.slug}`);
      reinitialize();
      closeDrawer();
      return;
    }

    if (response.status === 409) {
      return setError(`Ce titre est déjà utilisé par un autre projet.`);
    }

    setError(
      `Une erreur inconnue est survenue (${response.status}). Veuillez contacter le support.`
    );
  };

  const mainStep = (
    <div className={styles.form}>
      <TextField
        label="Nom"
        defaultValue={name}
        onValueChange={(value) => setName(value)}
      />
      <TextField
        label="Courte description"
        defaultValue={shortDescription}
        onValueChange={(value) => setShortDescription(value)}
      />
      <TextField
        label="Description"
        defaultValue={description}
        onValueChange={(value) => setDescription(value)}
      />
      <Field label="Privé">
        <Switch onChange={(checked) => setIsPublic(!checked)} />
      </Field>
      <Button
        type="button"
        onClick={() => setCurrentStep(currentStep + 1)}
        disabled={!isFirstPartComplete}
      >
        Suivant
      </Button>
    </div>
  );

  const domainsStep = (
    <div className={styles.form}>
      <h2>Quel(s) domaine(s) traite(nt) votre projet ?</h2>
      <div className={styles.checkboxesContainer}>
        {domains.map((domain) => (
          <Fragment key={domain.id}>
            <TextualCheckbox
              domain={domain.name}
              defaultChecked={selectedDomains.some(
                (selectedDomain) => selectedDomain === domain.name
              )}
              onChange={(checked) => {
                setSkills([]);
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
        <Button
          type="button"
          color="secondary"
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Précédent
        </Button>
        <Button
          type="button"
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={!isSecondPartComplete}
        >
          Suivant
        </Button>
      </div>
    </div>
  );

  const skillsStep = (
    <div className={styles.form}>
      <h2>Quel(s) compétence(s) traite(nt) votre projet ?</h2>
      <div className={styles.checkboxesContainer}>
        {skills.map((skill) => (
          <Fragment key={skill.id}>
            <TextualCheckbox
              label={skill.name}
              defaultChecked={selectedSkills.some(
                (selectedSkill) => selectedSkill === skill.name
              )}
              onChange={(checked) => {
                if (checked) setSelectedSkills([...selectedSkills, skill.name]);
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
        <Button
          type="button"
          color="secondary"
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Précédent
        </Button>
        <Button
          type="button"
          onClick={createProject}
          disabled={!isThirdPartComplete}
        >
          Créer le projet
        </Button>
      </div>
    </div>
  );

  return (
    <form
      className={styles.createProjectForm}
      onSubmit={(e) => e.preventDefault()}
    >
      <ul className={styles.stepsIndicator}>
        {[1, 2, 3].map((step) => (
          <li
            className={`${styles.step} ${
              currentStep === step ? styles.active : ''
            }`}
            key={step}
            onClick={() => {
              if (currentStep > step) setCurrentStep(step);
            }}
            style={
              currentStep < step
                ? { opacity: '0.25', pointerEvents: 'none' }
                : undefined
            }
          >
            {step}
          </li>
        ))}
      </ul>
      {currentStep === 1
        ? mainStep
        : currentStep === 2
        ? domainsStep
        : currentStep === 3
        ? skillsStep
        : null}
      {error ? <ErrorWidget>{error}</ErrorWidget> : null}
    </form>
  );
};

export default CreateProjectForm;
