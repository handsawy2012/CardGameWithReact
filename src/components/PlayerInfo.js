import React, { Component } from 'react';

const PlayerInfo = (props) => {

    const playerClassName = () => {
        if(props.activePlayerIndex != props.playerIndex)
            return 'notActive';
        else
            return 'activePlayer';
    }

    return(
            <div className={"row " + playerClassName()}>
                <span>
                    Points Collected: {props.points}</span>
                <br/>
                <span>
                    Player Name: {props.name}
                </span>

                <br/>
                                                <hr/>
                                                <br/>
            </div>
    );
}

export default PlayerInfo; 