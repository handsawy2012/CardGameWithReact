import React, { Component } from 'react';

const DoneFrame = (props) => {
    return(
        <div className="text-center">
            <h2>
                {props.doneStatus}
            </h2>
            {
                (props.playerName)?
                <h2>
                    {props.playerName} is the winner ........
                </h2>
                :
                <h2>
                    No body winn ........
                </h2>
            }
        </div>

    );
}

export default DoneFrame;