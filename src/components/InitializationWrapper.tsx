import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import Spinner from '../components/Spinner';
import { gamesState, userState } from '../recoil/states';
import Layout from './Layout';
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { getUser, createUser, getGames } from '../../src/api';

interface Props {
  children: React.ReactNode;
}

type AuthData = {
  username: string;
  attributes: {
    sub: string;
    given_name: string;
    family_name: string;
    email: string;
  }
}
const InitializationWrapper = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);
  const [, setUser] = useRecoilState(userState);
  const [, setGames] = useRecoilState(gamesState);


  async function fetchUser(authData: AuthData) {
    try {
      const user = await getUser(authData.attributes.sub);
      if (user) {
        return user;
      }
      return await createUser(authData);

    } catch (err) { console.log('error fetching user', err) }
  }

  useEffect(() => {
    setLoading(true);
    getGames()
      .then((games) => {
        setGames(games);
        setLoading(false);
      })
      .catch(error => {
        console.error('error fetching footballData', error);
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      fetchUser(authData as AuthData).then(setUser);
    });
  }, []);

  return (
    <Layout>
      {loading ? <Spinner /> : children}
    </Layout>
  );
}

export default InitializationWrapper;
