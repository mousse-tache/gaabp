import React from 'react'
import { navigate, Router } from '@reach/router'
import { Link } from 'gatsby'
import Login, { signIn } from '../components/Login/login'

const Home = () => <p>Account Information</p>;
const Settings = () => <p>Settings</p>;

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
      <>
        <nav>
          <Link to="/">Home</Link>{' '}
          <Link to="/account">My Account</Link>{' '}
          <Link to="/account/settings">Settings</Link>{' '}
        </nav>
        <h1>My Account</h1>
        <React.Fragment>
          <p>Welcome, {this.state.user}. <button onClick={this.logout}>Logout</button></p>
        </React.Fragment>
        <Router>
          <Home path="/account"/>
          <Settings path="/account/settings"/>
        </Router>
      </>
    )
  }
}

export default Account