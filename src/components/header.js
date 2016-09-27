import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component{
  constructor(props){
    super(props);
    this.state = {hover:false};
  }

  toggleHover(){
    this.setState({hover:!this.state.hover});
  }

renderLinks(navStyle){

  if (this.props.authenticated) {//remember to replace with authentication state
    // show a link to sign out
    return [<li className="nav-item" key={5}>
      <Link style={navStyle} className="nav-link" to="/mypolls">my polls</Link>
    </li>,
    <li className="nav-item" key={4}>
      <Link style={navStyle} className="nav-link" to="/createpoll">create poll</Link>
    </li>,
    <li className="nav-item" key={3}>
      <Link style={navStyle} className="nav-link" to="/signout">sign out</Link>
    </li>
  ]
  } else {
    // show a link to sign in or sign up
    return [
      <li className="nav-item" key={1}>
        <Link style={navStyle} className="nav-link" to="/signin">sign in</Link>
      </li>,
      <li className="nav-item" key={2}>
        <Link style={navStyle} className="nav-link" to="/signup">sign up</Link>
      </li>
    ];
  }
}

  render(){


    const navStyle = {
      color:"white",
      "textDecoration":"line-through"
    }
      if(this.state.hover){

      }
    return(

        <nav className="header navbar navbar-default">
          <a className="pull-left"><img className="three_voters" alt="Brand" src="../../style/img/3_voters.png"/></a>
            <div className="container-fluid">
              <div className="navbar-header">
                <ul className="nav navbar-nav pull-md-right">
                <li className="nav-item" key={7}>
                  <Link style={navStyle} className="nav-link" to="/">home page</Link>
                </li>
                  <li className="nav-item" key={6}>
                    <Link style={navStyle} className="nav-link" to="/viewpolls">view polls</Link>
                  </li>
                  {this.renderLinks(navStyle)}
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

export default connect(mapStateToProps)(Header);
