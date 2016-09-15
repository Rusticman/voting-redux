import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component{

renderLinks(){
  const helper = true;
  if (this.props.authenticated) {//remember to replace with authentication state
    // show a link to sign out
    return [<li className="nav-item" key={5}>
      <Link className="nav-link" to="/myPolls">my polls</Link>
    </li>,
    <li className="nav-item" key={4}>
      <Link className="nav-link" to="/newPoll">new poll</Link>
    </li>,
    <li className="nav-item" key={3}>
      <Link className="nav-link" to="/signout">sign out</Link>
    </li>
  ]
  } else {
    // show a link to sign in or sign up
    return [
      <li className="nav-item" key={1}>
        <Link className="nav-link" to="/signin">sign in</Link>
      </li>,
      <li className="nav-item" key={2}>
        <Link className="nav-link" to="/signup">sign up</Link>
      </li>
    ];
  }
}

  render(){
    return(
      <nav className="navbar navbar-default">
        <ul className="nav nav-pills">
        <li className="nav-item" key={7}>
          <Link className="nav-link" to="/">home page</Link>
        </li>
          <li className="nav-item" key={6}>
            <Link className="nav-link" to="/viewPolls">view polls</Link>
          </li>
          {this.renderLinks()}
        </ul>
      </nav>
    )

  }
}


function mapStateToProps(state){
  return{
    authenticated:state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header);
