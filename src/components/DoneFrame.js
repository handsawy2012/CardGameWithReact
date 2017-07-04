import React, { Component } from 'react';

class DoneFrame extends React.Component{

constructor(props) {
        super(props);
    }   
    
    render(){
            return(
            <div className="text-center">
                <h2>
                    {this.props.doneStatus}
                </h2>
                {
                    (this.props.playerName)?
                    <h2>
                        {this.props.playerName} is the winner ........
                    </h2>
                    :
                    <h2>
                        No body winn ........
                    </h2>
                }
            </div>
        );
    }
}

export default DoneFrame;