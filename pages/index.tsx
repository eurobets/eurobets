import Head from 'next/head';
import Image from 'next/image';
import {createUseStyles} from 'react-jss';
import { materialLightBlue500, materialLightBlue900 } from '../styles/constants';
import Logo from '../components/Logo/Logo';

const useStyles = createUseStyles({
  container: {
    minHeight: '100vh',
    height: '100vh',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: `linear-gradient(135deg, ${materialLightBlue500} 0%, ${materialLightBlue900} 100%)`
  },
  logo: {
    letterSpacing: '2px',
    fontSize: '40px',
  }
});


const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Head>
        <title>Euro 2020 Bets</title>
        <meta name="description" content="The betting tool" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Logo className={classes.logo} />
    </div>
  )
}

export default Home;
