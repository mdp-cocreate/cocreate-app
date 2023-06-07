import { Drawer } from 'antd';
import React from 'react';

import CreateProjectForm from '../CreateProjectForm/CreateProjectForm';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateProjectDrawer = ({ open, setOpen }: Props) => {
  return (
    <Drawer
      title="Créer un projet"
      placement="right"
      onClose={() => setOpen(false)}
      open={open}
    >
      <CreateProjectForm closeDrawer={() => setOpen(false)} />
    </Drawer>
  );
};
