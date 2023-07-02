'use client';

import { message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';

import styles from './ProfileForm.module.scss';

import { manageToken } from '@/utils/manageToken';

import { appServices } from '@/services/appServices';
import { userServices } from '@/services/userServices';

import { Button } from '@/components/atoms/Button/Button';
import { ErrorWidget } from '@/components/molecules/ErrorWidget/ErrorWidget';
import { TextField } from '@/components/molecules/Field/TextField/TextField';
import { SkillsSelector } from '@/components/molecules/SkillsSelector/SkillsSelector';

import { Skill, SkillModel } from '@/models/appModels';
import { RegisterDto } from '@/models/authModels';
import { User, UserProfile } from '@/models/userModels';

export const ProfileForm = () => {
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const [skills, setSkills] = useState<SkillModel[]>([]);

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<SkillModel[]>(
    userProfile?.skills.map((skill) => ({ id: skill.id, name: skill.name })) ||
      []
  );

  useEffect(() => {
    setSelectedSkills(
      userProfile?.skills.map((skill) => ({
        id: skill.id,
        name: skill.name,
      })) || []
    );
  }, [userProfile?.skills]);

  const [updatedUserProfile, setUpdatedUserProfile] =
    useState<Partial<User> | null>(null);
  const [error, setError] = useState<ReactNode | string>('');

  const fetchCurrentUserProfile = async () => {
    const token = manageToken.get();
    const response = await userServices.getCurrentUserProfile(token || '');
    if (response.status === 401) {
      router.push('/login');
      return;
    }

    if (response.status === 200 && response.data)
      return setUserProfile(response.data.user);

    setError(
      `Une erreur inconnue est survenue (${response.status}). Veuillez contacter le support.`
    );
  };

  const fetchSkills = async () => {
    const response = await appServices.getSkillsByDomains([]);
    if (response.status === 200 && response.data)
      setSkills(response.data.skills);
  };

  useEffect(() => {
    fetchCurrentUserProfile();
    fetchSkills();
  }, []);

  const hasTheUserEditedHisProfile = (): boolean => {
    if (!updatedUserProfile || !userProfile) return false;

    type User2 = {
      [key: string]: unknown;
    } & User;

    for (const [key, value] of Object.entries(updatedUserProfile)) {
      if ((userProfile as User2)[key] !== value) return true;
    }

    return false;
  };

  const hasTheUserEditedHisSkills = (): boolean => {
    const userSkills: Skill[] =
      userProfile?.skills.map((skill) => skill.name) || [];

    const skillsSelected: Skill[] = selectedSkills.map((skill) => skill.name);

    const diff1 = userSkills.filter((item) => !skillsSelected.includes(item));
    const diff2 = skillsSelected.filter((item) => !userSkills.includes(item));
    const haveDifferentItem = diff1.length > 0 || diff2.length > 0;
    return haveDifferentItem;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hasTheUserEditedHisProfile() && !hasTheUserEditedHisSkills()) return;

    const token = manageToken.get();

    const updateUserDto: Partial<RegisterDto> = {
      ...updatedUserProfile,
      skills: selectedSkills.map((skill) => skill.name),
      profilePicture: undefined,
    };

    const response = await userServices.updateUserProfile(
      token || '',
      updateUserDto
    );

    if (response.status === 200 && response.data) {
      fetchCurrentUserProfile();
      return messageApi.success('Votre profil a été modifié avec succès !');
    }

    setError(
      `Une erreur inconnue est survenue (${response.status}). Veuillez contacter le support.`
    );
  };

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit} className={styles.profileForm}>
        {userProfile?.lastName && userProfile.firstName ? (
          <div className={styles.grid}>
            <TextField
              label="Nom"
              defaultValue={userProfile?.lastName}
              onValueChange={(value) =>
                setUpdatedUserProfile({
                  ...updatedUserProfile,
                  lastName: value.trim(),
                })
              }
            />
            <TextField
              label="Prénom"
              defaultValue={userProfile?.firstName}
              onValueChange={(value) =>
                setUpdatedUserProfile({
                  ...updatedUserProfile,
                  firstName: value.trim(),
                })
              }
            />
          </div>
        ) : null}
        {userProfile?.email ? (
          <TextField label="Email" defaultValue={userProfile?.email} disabled />
        ) : null}

        <div>
          <SkillsSelector
            skills={skills}
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
          />
        </div>

        <div className={styles.buttonsContainer}>
          <Button
            disabled={
              !hasTheUserEditedHisProfile() && !hasTheUserEditedHisSkills()
            }
            type="submit"
          >
            Enregistrer
          </Button>
        </div>
        {error ? <ErrorWidget>{error}</ErrorWidget> : null}
      </form>
    </>
  );
};
