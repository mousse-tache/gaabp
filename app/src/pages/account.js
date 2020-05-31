import React from 'react'
import { navigate } from '@reach/router'
import Login, { signIn } from './login'
import AppAuthenticated from '../AppAuthenticated'


const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAuthenticated') === 'true';
  } else {
    return false;
  }
};

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {user: false};
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    const token = await signIn.authClient.tokenManager.get('idToken');
    if (token) {
      this.setState({user: token.claims.name});
      console.log(token.claims);
    } else {
      // Token has expired
      this.setState({user: false});
      localStorage.setItem('isAuthenticated', 'false');
    }
  }

  logout() {
    signIn.authClient.signOut().catch((error) => {
      console.error('Sign out error: ' + error)
    }).then(() => {
      localStorage.setItem('isAuthenticated', 'false');
      this.setState({user: false});
      navigate('/');
    });
  }

  render() {
    if (!isAuthenticated()) {
      return (
        <Login/>
      );
    }
    
    return (
      <AppAuthenticated username={this.state.user}>
      </ AppAuthenticated>
    )
  }
}

export default Account