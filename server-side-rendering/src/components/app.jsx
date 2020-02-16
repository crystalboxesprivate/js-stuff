import React from 'react'

export default class App extends React.Component {
  constructor() {
    super()
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleReset = this.handleReset.bind(this)

    this.state = {
      name: "",
      msg: ""
    }
  }


  handleButtonClick = e => {
    const nameLen = this.state.name.length
    if (nameLen > 0) {
      this.setState({
        msg: `you have ${nameLen} chars including space `
      })
    }
  }

  handleTextChange = e => {
    this.setState({ name: e.target.value })
  }

  handleReset = () => {
    this.setState({ name: "", msg: "" })
  }

  render() {
    let msg

    if (this.state.msg !== "") {
      msg = <p>{this.state.msg}</p>
    } else {
      msg = ""
    }
    return (
      <div>
        <label>Your name </label>
        <input
          type="text"
          id="txtName"
          name="txtName"
          value={this.state.name}
          onChange={this.handleTextChange}
        ></input>
        <button id='btnSubmit' onClick={this.handleButtonClick}>Calculate Name length</button>
        <button id='btnReset' onClick={this.handleReset}>Reset all</button>
        <hr />
        {msg}
      </div>
    )
  }
}
