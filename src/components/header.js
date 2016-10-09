import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';

class Header extends Component{
  constructor(props){
    super(props);
    this.state = {hover:false};
}

  showLock(){
    this.props.lock.show();
  }

  toggleHover(){
    this.setState({hover:!this.state.hover});
  }


renderLinks(){

  if (this.props.authenticated) {//remember to replace with authentication state
    // show a link to sign out
    return [<li className="nav-item" key={5}>
      <Link  className="nav-link" to="/mypolls">my polls</Link>
    </li>,
    <li className="nav-item" key={4}>
      <Link  className="nav-link" to="/createpoll">create poll</Link>
    </li>,
    <li className="nav-item" key={3}>
      <Link  className="nav-link" to="/signout">sign out</Link>
    </li>
  ]
  } else {
    // show a link to sign in or sign up
    return [
      <li className="nav-item" key={1}>
        <a  className="signin nav-link" onClick={this.showLock.bind(this)}>sign in</a>
      </li>
    ];
  }
}

  render(){
      if(this.props.authenticated){
        var message = <span className="welcomeNote"> Welcome to Vote, {sessionStorage.getItem('name')}</span>;
      }
      else{
        var message = <span className="welcomeNote"></span>;
      }

      if(this.state.hover){

      }
    return(

        <nav className="header navbar navbar-default">
          <a className="pull-left"><img className="three_voters" alt="Brand" src="../../style/img/3_voters.png"/></a>
            {message}
              <div className="container-fluid">
                <div className="navbar-header">
                  <ul className="nav navbar-nav pull-md-right">
                  <li className="nav-item" key={7}>
                    <Link  className="nav-link" to="/">home page</Link>
                  </li>
                    <li className="nav-item" key={6}>
                      <Link className="nav-link" to="/viewpolls">view polls</Link>
                    </li>
                    {this.renderLinks()}
                  </ul>
                </div>
              </div>
        </nav>

    )

  }
}


function mapStateToProps(state){
  return{
    authenticated:state.auth.authenticated
  }
}

export default connect(mapStateToProps,actions)(Header);
