import * as React from "react"
import "./App.css"

import logo from "./logo.svg"

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={this.clickHandler}>Click Me</button>
      </div>
    )
  }

  // tslint:disable-next-line:no-console
  private clickHandler = () =>
    fetch("http://localhost:3001/api")
      .then(r => r.json())
      .then(console.log)
}

export default App
