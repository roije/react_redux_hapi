/**
 * Created by roije on 2/5/17.
 */
import React, { Component } from 'react';
import Greetings from './Greetings';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList'

class App extends Component {
  render() {
    return(
      <div className="container">
        <NavigationBar />
        <FlashMessagesList />
        {this.props.children}
      </div>
    )
  }
};

export default App;