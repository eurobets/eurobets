import App from 'next/app';
import React, {useEffect} from 'react';
import '../src/styles/globals';
import { RecoilRoot } from 'recoil';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';
import awsExports from '../aws-exports';
import InitializationWrapper from '../src/components/InitializationWrapper';
import Head from 'next/head';

Amplify.configure(awsExports);

const MyApp = (props) => {
  useEffect(() => {
    const style = document.getElementById('server-side-styles')

    if (style) {
      style.parentNode.removeChild(style)
    }
  }, []);


  return (
    <>
    <Head>
      <title>Euro 2020</title>
      <meta name="viewport" content="initial-scale=0.4 width=device-width height=device-height" />
    </Head>
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            inputProps: { required: true, autocomplete: "email" },
          },
          {
            type: "given_name",
            label: "First Name",
            placeholder: "enter first name",
            hint: null,
            required: true,
          },
          {
            type: "family_name",
            label: "Last Name",
            placeholder: "enter last name",
            hint: null,
            required: true,
          },
          {
            type: "password",
            inputProps: { required: true, autocomplete: "new-password" },
          },
        ]}
      />
    </AmplifyAuthenticator>
    <RecoilRoot>
      <InitializationWrapper>
        <App {...props} />
      </InitializationWrapper>
    </RecoilRoot>
    </>
  );
}

export default MyApp;
