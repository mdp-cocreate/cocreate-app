import { Domain } from '@/models/AppModels';

export const getHrefByDomain = (domain: Domain): string => {
  switch (domain) {
    case Domain.UXUI_DESIGN:
      return '/uxui-design';
    case Domain.DEVELOPMENT:
      return '/development';
    case Domain.GRAPHIC_DESIGN:
      return '/graphic-design';
    case Domain.WEBMARKETING:
      return '/webmarketing';
    case Domain.CYBERSECURITY:
      return '/cybersecurity';
    case Domain.DATA:
      return '/data';
    case Domain.AUDIOVISUAL:
      return '/audiovisual';
    default:
      return '';
  }
};
