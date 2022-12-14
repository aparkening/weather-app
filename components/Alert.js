import React, { Component } from 'react'

export default class Alert extends Component {

  constructor(props) {
    super(props);

    this.state = { isActive: false } 
  }

  // Hide/show extra statement
  toggleDisplay = () => {
    this.setState((prevState) => {
      return { isActive: !prevState.isActive };
    });
  }

  render () {
    const toggleStatement = this.state.isActive ? <div>{this.props.statement}</div> : null

    return (
      <div role="alert" className="text-red-700 px-5 py-2.5 dark:border-neutral-700 border-b cursor-pointer" onClick={this.toggleDisplay}>
        <div className="flex items-center">
          <span className="pr-1 font-semibold">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.75 4.75C9.75 5.30228 9.30229 5.75 8.75 5.75C8.19771 5.75 7.75 5.30228 7.75 4.75C7.75 4.19772 8.19771 3.75 8.75 3.75C9.30229 3.75 9.75 4.19772 9.75 4.75Z" fill="#CE2929"></path><path d="M8.99244 7.85607C9.05101 7.44602 8.76609 7.06612 8.35604 7.00754C7.94599 6.94896 7.56609 7.23389 7.50751 7.64394L7.00751 11.1439C6.94893 11.554 7.23386 11.9339 7.64391 11.9925C8.05396 12.051 8.43386 11.7661 8.49244 11.3561L8.99244 7.85607Z" fill="#CE2929"></path><path fillRule="evenodd" clipRule="evenodd" d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5Z" fill="#CE2929"></path></svg>
          </span>
          {this.props.title}
        </div>
        {toggleStatement}
      </div>
    )
  }
}