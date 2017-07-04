import React, { Component } from 'react';

const PlayerInfo = (props) => {

    const playerClassName = () => {
        if(props.activePlayerIndex != props.playerIndex)
            return 'notActive';
        else
            return 'activePlayer';
    }

    return(
            <div className={playerClassName()}>
                <span>
                    {props.name}: {props.points}
                </span>
                <br/>
                <hr/>
                <br/>
            </div>
    );
}

export default PlayerInfo; 