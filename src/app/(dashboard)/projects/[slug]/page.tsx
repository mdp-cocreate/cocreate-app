import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import styles from './page.module.scss';

import { getTokenServerSide } from '@/utils/getTokenServerSide';

import { projectServices } from '@/services/projectServices';

import { DomainTag } from '@/components/atoms/DomainTag/DomainTag';
import { SkillTag } from '@/components/atoms/SkillTag/SkillTag';
import { AskToJoinSection } from '@/components/molecules/AskToJoinSection/AskToJoinSection';
import { Section } from '@/components/molecules/Section/Section';

import { Domain, Role, Skill } from '@/models/appModels';

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
  const { project, currentUserRole } = await getProjectBySlug(params.slug);

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
    <div className={styles.projectPage}>
      <div className={styles.head}>
        <h1 className={styles.title}>{project.name}</h1>
        <p>{project.shortDescription}</p>
      </div>
      <span>
        {!currentUserRole ? <AskToJoinSection projectId={project.id} /> : null}
      </span>
      <Section title="Domaines et compétences">
        <div className={styles.domainsAndSkills}>
          <div className={styles.tags}>
            <DomainTag domain={Domain.DEVELOPMENT} />
            <DomainTag domain={Domain.UXUI_DESIGN} />
          </div>
          <div className={styles.tags}>
            <SkillTag skill={Skill.FRONTEND_DEVELOPMENT} />
            <SkillTag skill={Skill.BACKEND_DEVELOPMENT} />
            <SkillTag skill={Skill.LAYOUT_DESIGN} />
            <SkillTag skill={Skill.USER_RESEARCH} />
          </div>
        </div>
      </Section>
      <Section title="Description détaillée">
        <p>{project.description}</p>
      </Section>
      <Section title="Membres">
        <div className={styles.members}>
          {project.members.map((member) => (
            <article key={member.user.id} className={styles.member}>
              <h4>
                {member.user.firstName} {member.user.lastName}
              </h4>
              <span>{getLabelByRole(member.role)}</span>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
