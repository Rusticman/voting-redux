import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';

export default class App extends Component {
  render() {
    return (
      <div className="appContainer1">
          <div className="page-wrap">
          <Header />
          {this.props.children}
        
          </div>
          <Footer />
      </div>
    );
  }
}
