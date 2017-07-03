import React, { Component } from 'react';

const WildCard = (props) => {

    if(!props.activeCard)
        return null;
    
    var cardClassName="card " + props.activeCard.suit;  

    return(
        <div className={cardClassName}>
            <p>{props.activeCard.rank}</p>
        </div>
    );
}

export default WildCard;