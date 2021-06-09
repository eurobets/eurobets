import React, {MouseEvent, useRef, useState} from 'react';
import { Avatar, MenuItem, Menu } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import { useRecoilValue } from 'recoil';

import { userState } from '../../recoil/states';

const User = () => {
  const user = useRecoilValue(userState);
  const [open, setMenuOpen] = useState(false);
  const avatarRef = useRef(null);

  if (!user) {
    return null;
  }
  return (
    <>
      <Avatar
        component="a"
        href="#"
        onClick={(e: MouseEvent<HTMLElement>) => {
          e.preventDefault();
          setMenuOpen(true)
        }}
        ref={avatarRef}
      >
        {
          `${user.firstName[0].toUpperCase()}${user.lastName ? user.lastName[0].toUpperCase() : ''}`
        }
      </Avatar>
      <Menu
        anchorEl={avatarRef.current}
        onClose={() => setMenuOpen(false)}
        open={open}
      >
        <MenuItem
          value="logout"
          onClick={() => Auth.signOut().then(() => window.location.reload(true))}
        >
          Log out
        </MenuItem>
      </Menu>
    </>
  );
};

export default User;
