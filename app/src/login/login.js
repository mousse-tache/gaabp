import React from 'react';
import { navigate } from "gatsby";
import OktaSignIn from '@okta/okta-signin-widget';
import Logo from "../images/Logo_AABP.gif";
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

const redirectUri = typeof window !== 'undefined' && window.location.href.toString().includes("localhost") ? "http://localhost:8000/app" : process.env.GATSBY_SIGNIN_REDIRECT;

const config = {
  baseUrl: 'https://dev-132704.okta.com',
  clientId: '0oa5i1e8aXo6JNxOx4x6',
  logo: Logo,
  redirectUri: redirectUri,
  el: '#osw-container',
  authParams: {
    pkce: true,
    responseType: ['token', 'id_token']
  },
  features: {
    registration: true
  }
};

export const signIn = typeof window !== 'undefined' && new OktaSignIn(config);

export const logout = () => {
  signIn.authClient.signOut().catch((error) => {
    console.error('Sign out error: ' + error);
  }).then(() => {
    localStorage.setItem('isAuthenticated', 'false');
    this.setState({user: false});
    navigate('/');
  });
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false
    };

    this.signIn = signIn;
  }

  async componentDidMount() {
    const authClient = this.signIn.authClient;
    const session = await authClient.session.get();
    
    if (session.status === 'ACTIVE') {
      window.location.hash = '';
      this.setState({user: session.login});
      localStorage.setItem('isAuthenticated', 'true');
      authClient.token.getWithoutPrompt({
        scopes: ['openid', 'email', 'profile'],
      }).then((tokens) => {
          if (tokens.tokens.idToken) {
            authClient.tokenManager.add('idToken', tokens.tokens.idToken);
          }
          if (tokens.tokens.accessToken) {
            authClient.tokenManager.add('accessToken', tokens.tokens.accessToken);
          }
      }).catch(error => console.error(error) && window.location.reload());
      return;
    } else {
      this.signIn.remove();
    }
    this.signIn.showSignInToGetTokens({el: '#osw-container'}).then((tokens) => {
      if (tokens.idToken) {
        authClient.tokenManager.add('idToken', tokens.idToken);
      }
      if (tokens.accessToken) {
        authClient.tokenManager.add('accessToken', tokens.accessToken);
      }

      authClient.tokenManager.get('idToken').then(() => {
        window.location.reload();
      });
    }).catch(error => console.error(error) && window.location.reload());
    return;
  }

  render() {
    return (
      <div id="osw-container"/>
    );
  }
}