import React, { Component } from 'react';
import { createHashHistory } from 'history'

const history = createHashHistory();

class NumberOfPlayersForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault()
        const noOfPlayers = event.target.elements[0].value
        const path = '/App/' + noOfPlayers;
        this.props.history.push(path)
    }

    render() {
        return (
            <div>
                <span>
                    No of players:
                </span>
                <form onSubmit={this.handleSubmit} >
                    <input type="text" 
                           value={this.state.value} 
                           onChange={this.handleChange}/>
                    <input type="submit" 
                        value="Submit" />
                </form>
            </div>
        );
    }
}

export default NumberOfPlayersForm;