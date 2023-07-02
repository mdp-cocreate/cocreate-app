import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import styles from './page.module.scss';

import { getTimeElapsedSinceDate } from '@/utils/getTimeElapsedSinceDate';
import { getTokenServerSide } from '@/utils/getTokenServerSide';

import { projectServices } from '@/services/projectServices';

import { Button } from '@/components/atoms/Button/Button';
import { DomainTag } from '@/components/atoms/DomainTag/DomainTag';
import { SkillTag } from '@/components/atoms/SkillTag/SkillTag';
import { AskToJoinSection } from '@/components/molecules/AskToJoinSection/AskToJoinSection';
import { Section } from '@/components/molecules/Section/Section';

import { Role } from '@/models/appModels';

interface Params {
  params: { slug: string };
}

async function getProjectMetadata(slug: string) {
  const response = await projectServices.getProjectMetadata(slug);

  if (response.status === 404) notFound();
  if (response.status === 200 && response.data) return response.data;
  else throw new Error('Failed to fetch project metadata');
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { metadata } = await getProjectMetadata(params.slug);

  const { name, shortDescription } = metadata;

  const thisPageMetadata: Metadata = {
    title: name,
    description: shortDescription,
  };

  return thisPageMetadata;
}

async function getProjectBySlug(slug: string) {
  const token = await getTokenServerSide();
  const response = await projectServices.getProjectBySlug(token || '', slug);

  if (response.status === 401) redirect('/login');
  if (response.status === 404) notFound();
  if (response.status === 200 && response.data) return response.data;
  else throw new Error('Failed to fetch project by slug');
}

export default async function Project({ params }: Params) {
  const { project, currentUserRole, hasRequestedToJoin } =
    await getProjectBySlug(params.slug);

  const domains = Array.from(
    new Set(project.skills.map((skill) => skill.domain.name))
  );

  const getLabelByRole = (role: Role): string => {
    switch (role) {
      case Role.OWNER:
        return 'Propriétaire';
      case Role.EDITOR:
        return 'Éditeur';
      case Role.READER:
        return 'Spectateur';
      default:
        return 'Spectateur';
    }
  };

  return (
    <>
      {project.coverImage ? (
        <figure className={styles.coverImageContainer}>
          <Image
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            src={project.coverImage}
            alt={`Image de couverture du projet ${project.name}`}
          />
        </figure>
      ) : null}
      <div className={styles.projectPage}>
        <div className={styles.head}>
          <h1 className={styles.title}>{project.name}</h1>
          <p>{project.shortDescription}</p>
        </div>
        <span>
          {!currentUserRole ? (
            <AskToJoinSection
              projectId={project.id}
              hasRequestedToJoin={hasRequestedToJoin}
            />
          ) : null}
          {currentUserRole === Role.OWNER ? (
            <Link href={`/projects/${project.slug}/edit`}>
              <Button focusable={false}>Modifier le projet</Button>
            </Link>
          ) : null}
        </span>
        <Section title="Domaines et compétences">
          <div className={styles.domainsAndSkills}>
            <div className={styles.tags}>
              {domains.map((domain) => (
                <DomainTag key={domain} domain={domain} />
              ))}
            </div>
            <div className={styles.tags}>
              {project.skills.map((skill) => (
                <SkillTag key={skill.id} skill={skill.name} />
              ))}
            </div>
          </div>
        </Section>
        <Section title="Description détaillée">
          <p className={styles.longText}>{project.description}</p>
        </Section>
        <Section title="Membres">
          <div className={styles.members}>
            {project.members.map((member) => (
              <article key={member.user.id} className={styles.member}>
                <Link
                  href={`/users/${member.user.slug}`}
                  className={`${styles.flex}`}
                >
                  {member.user.profilePicture ? (
                    <figure className={styles.profilePictureContainer}>
                      <Image
                        src={member.user.profilePicture}
                        alt={`Photo de profil de ${member.user.firstName} ${member.user.lastName}`}
                        fill
                        style={{ objectPosition: 'center', objectFit: 'cover' }}
                      />
                    </figure>
                  ) : null}
                  {member.user.firstName} {member.user.lastName}
                </Link>
                <span>{getLabelByRole(member.role)}</span>
              </article>
            ))}
          </div>
        </Section>
        <Section title="Activités">
          <ul className={styles.actions}>
            {project.actions.map((action) => (
              <li key={action.createdAt} className={styles.action}>
                <p>
                  <Link href={action.author.slug} className="link">
                    {action.author.firstName} {action.author.lastName}
                  </Link>
                  {` `}
                  {action.name}
                  {` `}
                  <span className="small">
                    {getTimeElapsedSinceDate(action.createdAt)}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </>
  );
}
