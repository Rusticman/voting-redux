import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from './header';
import Footer from './footer';
import config from '../../config';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      lock:null
    }
  }

  componentWillMount(){

  const newURL = window.location.protocol + "/" + window.location.host  + window.location.pathname;
   console.log(newURL)
    const options = {
  allowedConnections: ['twitter', 'facebook'],
  auth: {
     redirectUrl: 'http://localhost:8080/viewpolls',
     responseType: 'token'
}
}

    const lock = new Auth0Lock( //initiates new lock. Passed down to header
        config.authO_id,
        config.authO_domain,
        options
    );
     this.lock = lock;

    lock.on("authenticated", function(authResult) {

  // Use the token in authResult to getProfile() and save it to localStorage
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
    return console.log('problem authenticating user')
  }
      this.props.authSignin(profile.user_id,profile.name,profile.identities[0].provider)
      sessionStorage.setItem('name', profile.name.split(' ')[0]);
 }.bind(this));
}.bind(this));

this.setState({lock:this.lock})
  }



  render() {

    const childrenWithProps = React.cloneElement(this.props.children, this.state);
    //this allows state to be passed to homepage, like lock for example

    return (
      <div className="appContainer1">
          <div className="page-wrap">
          <Header lock={this.lock} />
          {childrenWithProps}
          </div>
          <Footer />
      </div>
    );
  }
}

export default connect(null,actions)(App);
