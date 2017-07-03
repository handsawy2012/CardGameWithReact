import React, { Component } from 'react';

const StackedCards = (props) => {

    const cardClassName = (card) => {
        if(props.selectedCards.find(selectedCard => selectedCard.id === card.id) || card.suit != props.activeCard.suit)
            return 'selected';
    }

    return(
        <div>
            {
                props.cardsOnHand?
                    props.cardsOnHand.map((card, i) =>
                            <div className={"card" + " player " + card.suit + " "+ cardClassName(card)} 
                                 key={i}
                                 onClick={()=>props.selectCard(card, props.playerIndex)}
                                 disabled={props.activePlayerIndex != props.playerIndex || (props.played)}>
                                <p>{card.rank}</p>
                            </div>
                    )
                    :
                    <p/>
            }

            <div>
                <button onClick={() => props.passPlay(props.playerIndex)}
                        disabled={props.played || props.activePlayerIndex != props.playerIndex}>
                    Pass....
                </button>
            </div>
        </div>
    );
}

export default StackedCards; 