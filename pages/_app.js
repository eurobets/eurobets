import App from 'next/app';
import React, {useEffect, useState} from 'react';
import '../src/styles/globals';
import { RecoilRoot } from 'recoil';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';
import awsExports from '../aws-exports';
import InitializationWrapper from '../src/components/InitializationWrapper';

Amplify.configure(awsExports);

const MyApp = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const style = document.getElementById('server-side-styles')

    if (style) {
      style.parentNode.removeChild(style)
    }
  }, []);


  return (
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
      <RecoilRoot>
        <InitializationWrapper>
          <App {...props} />
        </InitializationWrapper>
      </RecoilRoot>
    </AmplifyAuthenticator>
  );
}

export default MyApp;
