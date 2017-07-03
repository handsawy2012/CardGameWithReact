import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import _ from 'underscore';

import Game from './Game';


class Home extends React.Component{

    constructor(props) {
      super(props);
    }

    render(match){
        return(
            <Game noOfPlayers={this.props.match.params.noOfPlayers}/>
        );
    }
}

export default Home;
