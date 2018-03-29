import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  render() {

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <ul className="pure-menu-list navbar-right">
            <span>
              <li className="pure-menu-item">
                <Link to="/" className="pure-menu-link">Home</Link>
              </li>
              <li className="pure-menu-item">
                <Link to="/allMessages" className="pure-menu-link">Old Messages</Link>
              </li>
            </span>
         </ul>
        <Link to="/" className="pure-menu-heading pure-menu-link">King of hill</Link>
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App
