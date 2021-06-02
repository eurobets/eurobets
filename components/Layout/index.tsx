import React from 'react';
import Link from 'next/link';
import { createUseStyles } from 'react-jss';

import Notification from '../Notification';

import Logo from '../Logo';
import User from '../Logo';
import { materialLightBlue900, materialLightBlue500, headerHeight, pageIndent } from '../../styles/constants';

interface Props {
  children: React.ReactNode;
  message?: string;
  user?: {
    authenticated: boolean;
  };
}

const useStyles = createUseStyles({
  root: {
    minHeight: '100vh',
    height: '100vh',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
  content: {
    padding: [20, pageIndent],
    flexGrow: 1
  },
  header: {
    background: `linear-gradient(135deg, ${materialLightBlue900} 0%, ${materialLightBlue500} 100%)`,
    height: headerHeight,
    minHeight: headerHeight,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: [0, pageIndent],
  },
  logoWrapper: {
    fontFamily: 'Oswald',
    fontSize: '24px',
    letterSpacing: '.7px',
    textTransform: 'uppercase',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
});

const Layout = ({ children, message, user }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.logoWrapper}>
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </div>
        {user && user.authenticated && <User />}
      </div>

      {message && <Notification message={message} type="SUCCESS" />}
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default Layout;
