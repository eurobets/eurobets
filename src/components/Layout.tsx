import React from 'react';
import Link from 'next/link';
import { createUseStyles } from 'react-jss';
import blue from '@material-ui/core/colors/lightBlue';

import Logo from '../components/Logo';
import User from '../components/User';

interface Props {
  children: React.ReactNode;
  message?: string;
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
    display: 'flex',
    flexDirection: 'column',
    padding: [20, 40],
    flexGrow: 1
  },
  header: {
    background: `linear-gradient(135deg, ${blue[900]} 0%, ${blue[500]} 100%)`,
    height: 60,
    minHeight: 60,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: [0, 40],
  },
  logoWrapper: {
    fontSize: '24px',
    letterSpacing: '.7px',
    textTransform: 'uppercase',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
});

const Layout = ({ children, message }: Props) => {
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
        <User />
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default Layout;
