import { Tooltip } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from './ProjectMembersPreview.module.scss';

import { Role } from '@/models/appModels';
import { ProjectMemberPreview } from '@/models/projectModels';

const MEMBERS_TO_DISPLAY_COUNT = 3;

interface Props {
  membersPreview: ProjectMemberPreview[];
}

export const ProjectMembersPreview = ({ membersPreview }: Props) => {
  const sortedMembersPreview = [...membersPreview].sort((a, b) => {
    if (a.role === Role.OWNER) {
      return -1;
    } else if (b.role === Role.OWNER) {
      return 1;
    } else if (a.role === Role.EDITOR && b.role !== Role.EDITOR) {
      return -1;
    } else if (a.role !== Role.EDITOR && b.role === Role.EDITOR) {
      return 1;
    } else {
      return 0;
    }
  });

  const additionalMembersCount =
    membersPreview.length - MEMBERS_TO_DISPLAY_COUNT;

  return (
    <div className={styles.projectMembersPreview}>
      <div className={styles.membersContainer}>
        {sortedMembersPreview
          .slice(0, MEMBERS_TO_DISPLAY_COUNT)
          .map((member) => (
            <Link
              href={`/users/${member.user.slug}`}
              key={member.user.id}
              className={styles.profilePictureContainer}
            >
              <Tooltip
                title={`${member.user.firstName} ${member.user.lastName}`}
                mouseEnterDelay={0.3}
              >
                <Image
                  src={member.user.profilePicture || '/defaultAvatar.png'}
                  alt={`Photo de profil`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Tooltip>
            </Link>
          ))}
      </div>
      {additionalMembersCount > 0 ? (
        <span className={`small ${styles.additionalMembersCount}`}>
          +{additionalMembersCount}
        </span>
      ) : null}
    </div>
  );
};
