import React from 'react'
import AppAuthenticated from '../AppAuthenticated'


const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAuthenticated') === 'true';
  } else {
    return false;
  }
};

const Account = () => {

  /* const logout = () => {
    signIn.authClient.signOut().catch((error) => {
      console.error('Sign out error: ' + error)
    }).then(() => {
      localStorage.setItem('isAuthenticated', 'false');
      this.setState({user: false});
      navigate('/');
    });
  }
  */

  return (
    <AppAuthenticated />
  )
};

export default Account