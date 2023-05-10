import { Domain } from '@/models/AppModels';

export const getLabelByDomain = (domain: Domain): string => {
  switch (domain) {
    case Domain.UXUI_DESIGN:
      return 'UX/UI design';
    case Domain.DEVELOPMENT:
      return 'Développement';
    case Domain.GRAPHIC_DESIGN:
      return 'Graphisme';
    case Domain.WEBMARKETING:
      return 'Webmarketing';
    case Domain.CYBERSECURITY:
      return 'Cybersécurité';
    case Domain.DATA:
      return 'Data';
    case Domain.AUDIOVISUAL:
      return 'Audiovisuel';
    default:
      return domain;
  }
};
