import App from 'next/app';
import '../styles/globals';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';
import awsExports from '../aws-exports';
Amplify.configure(awsExports);


class MyApp extends App {
  componentDidMount() {
    const style = document.getElementById('server-side-styles')

    if (style) {
      style.parentNode.removeChild(style)
    }
  }
}

export default withAuthenticator(MyApp);
