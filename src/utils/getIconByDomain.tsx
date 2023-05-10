import { ArtIcon } from '@/components/atoms/icons/ArtIcon/ArtIcon';
import { ChartIcon } from '@/components/atoms/icons/ChartIcon/ChartIcon';
import { CodeIcon } from '@/components/atoms/icons/CodeIcon/CodeIcon';
import { DataIcon } from '@/components/atoms/icons/DataIcon/DataIcon';
import { DevicesIcon } from '@/components/atoms/icons/DevicesIcon/DevicesIcon';
import { LockIcon } from '@/components/atoms/icons/LockIcon/LockIcon';
import { PaintIcon } from '@/components/atoms/icons/PaintIcon/PaintIcon';

import { Domain } from '@/models/AppModels';

export const getIconByDomain = (
  domain: Domain
): React.SVGProps<SVGSVGElement> => {
  switch (domain) {
    case Domain.UXUI_DESIGN:
      return <DevicesIcon />;
    case Domain.DEVELOPMENT:
      return <CodeIcon />;
    case Domain.GRAPHIC_DESIGN:
      return <PaintIcon />;
    case Domain.WEBMARKETING:
      return <ChartIcon />;
    case Domain.CYBERSECURITY:
      return <LockIcon />;
    case Domain.DATA:
      return <DataIcon />;
    case Domain.AUDIOVISUAL:
      return <ArtIcon />;
  }
};
