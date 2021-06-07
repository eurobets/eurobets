import App from 'next/app';
import React, {useEffect} from 'react';
import { RecoilRoot } from 'recoil';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';
import blue from '@material-ui/core/colors/lightBlue';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import Head from 'next/head';

import awsExports from '../aws-exports';
import InitializationWrapper from '../src/components/InitializationWrapper';
import '../src/styles/globals';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[800],
    },
  },
});

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
      <link rel="shortcut icon" href="../favicon.png" />
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
            label: "First Name *",
            placeholder: "Enter first name",
            hint: null,
            inputProps: { required: true },
          },
          {
            type: "family_name",
            label: "Last Name",
            placeholder: "Enter last name",
            hint: null,
          },
          {
            type: "password",
            inputProps: { required: true, autocomplete: "new-password" },
          },
        ]}
      />
    </AmplifyAuthenticator>
      <ThemeProvider theme={theme}>
      <RecoilRoot>
        <InitializationWrapper>
          <App {...props} />
        </InitializationWrapper>
      </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
