import React, { useEffect, useState, FC } from 'react';
import { useRecoilState } from 'recoil';
import { onAuthUIStateChange } from '@aws-amplify/ui-components';

import Spinner from '../../components/Spinner';
import { gamesState, userState } from '../../recoil/states';
import Layout from '../Layout';
import { getUser, createUser, getGames } from '../../api';

type AuthData = {
  username: string;
  attributes: {
    sub: string;
    given_name: string;
    family_name: string;
    email: string;
  }
}

// to bypass double signedin state
// https://github.com/aws-amplify/amplify-js/issues/7635
let signedIn = false;

const InitializationWrapper: FC = ({ children }) => {
  const [loadingGames, setLoadingGames] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [, setGames] = useRecoilState(gamesState);

  async function fetchUser(authData: AuthData) {
    try {
      const user = await getUser(authData.username);
      if (user) {
        return user;
      }
      return await createUser(authData);

    } catch (err) { console.log('error fetching user', err) }
  }

  useEffect(() => {
    if (user) {
      setLoadingGames(true);
      getGames()
        .then((games) => {
          setGames(games);
          setLoadingGames(false);
        })
        .catch(error => {
          console.error('error fetching footballData', error);
          setLoadingGames(false);
        })
    }
  }, [user]);

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      if (nextAuthState === 'signedin' && !signedIn) {
        signedIn = true;
        setLoadingUser(true);
        fetchUser(authData as AuthData)
          .then(setUser)
          .finally(() => setLoadingUser(false));
        // todo: catch case with error
      }
    });
  }, []);

  if (loadingUser) {
    return <Spinner />
  }
  if (!user) {
    return null;
  }
  return (
    <Layout>
      {loadingGames && <Spinner />}
      {children}
    </Layout>
  );
}

export default InitializationWrapper;
