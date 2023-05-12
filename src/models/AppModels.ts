export interface DomainModel {
  id: number;
  name: Domain;
}

export enum Domain {
  UXUI_DESIGN = 'UXUI_DESIGN',
  DEVELOPMENT = 'DEVELOPMENT',
  GRAPHIC_DESIGN = 'GRAPHIC_DESIGN',
  WEBMARKETING = 'WEBMARKETING',
  CYBERSECURITY = 'CYBERSECURITY',
  DATA = 'DATA',
  AUDIOVISUAL = 'AUDIOVISUAL',
}

export enum Role {
  OWNER = 'OWNER',
  EDITOR = 'EDITOR',
  READER = 'READER',
}
