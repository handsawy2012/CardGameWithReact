import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import _ from 'underscore';
import StackedCards from './StackedCards';
import WildCard from './WildCard';
import DoneFrame from './DoneFrame';
import Card from '../models/card';
import Stack from '../models/stack';
import CardsValue from '../models/cardsValue';
import Button from './Button';
import players from '../models/players';
import PlayerInfo from './PlayerInfo';
import {NavLink} from 'react-router-dom'

// Game component
class Game extends React.Component{

    static randomNumber = ( no ) => Math.floor(Math.random()*no);

    static stars = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    
    static cardSuits = ["suitdiamonds", "suithearts", "suitclubs", "suitspades"];
    
    static cardsValue = new CardsValue();
    
    players = [];

    usedCards = 0;

    gameCards = new Stack();

    players = new players(this.props.noOfPlayers);

    state = {
        randomNumberOfStars : Game.randomNumber(),
        usedCards :0,
        answerIsCorrect: null,
        redraws : 5,
        doneStatus : null,
        players : [],
        activeCard : null,
        selectedCards : new Array()
    };

    constructor(props) {
        super(props);

        this.selectCard = this.selectCard.bind(this);
        this.GetTheWinnerName = this.GetTheWinnerName.bind(this);
        this.passPlay = this.passPlay.bind(this);
        this.checkForDeal = this.checkForDeal.bind(this);
        this.activePlayer = this.activePlayer.bind(this);
    }   

    componentDidMount() {

        this.gameCards.makeDeck(1);
        
        this.gameCards.shuffle(10);

        Game.cardsValue.build();
        
        this.Deal();
    }

    activePlayer = () => {
        return (this.state.players && this.state.players[this.state.activePlayerIndex])?
            this.state.players[this.state.activePlayerIndex] : null;
    }

    getCardsForPlayer(noOfCards, player){
        var hand = new Stack();
        if(player.cardsOnHand){
            for(i = 0; i < player.cardsOnHand.length; i++ )
            {
                if(this.state.selectedCards.find( card => card.id == player.cardsOnHand[i].id))
                {
                    player.cardsOnHand[i] = (this.gameCards.deal());
                    this.usedCards ++;            
                }
            } 
        }
        else
        {
            player.cardsOnHand = [];

            for (var i = 0; i < noOfCards; i++)
            {
                player.cardsOnHand.push(this.gameCards.deal());
            }

            this.usedCards += noOfCards;
        }
        
        return hand.cards;
    }

    Deal(){
        if(this.gameCards.cardCount() >= ((this.usedCards > 0)? 
            (((this.state.selectedCards)? this.state.selectedCards.length : 0) + 1) : ((this.props.noOfPlayers) * 5) + 1 ) )
        {
            this.activeCard = this.gameCards.deal();
            this.usedCards++;

            for (var i = 0; i < this.props.noOfPlayers; i++)
            {
                this.getCardsForPlayer(5, this.players[i]);
                this.players[i].hasMaxPoints = false;
                this.players[i].played = false;
                this.players[i].pass = false;
            }

            var activePlayerIndex = 0;

            this.state.selectedCards = [];
        
            this.setState(prevState => ({
                players: this.players,
                activeCard : this.activeCard,
                usedCards : this.usedCards,
                activePlayerIndex : activePlayerIndex}));

        }
    }

    checkForDeal = () =>{
        var allPass = true;
        
        var activeCardSuit = this.state.activeCard.suit;

        for(var i = 0; i < this.players.length; i++)
        {
            if(!this.players[i].pass)
            {
                allPass = false;
                break;
            }
        }
        
        if(allPass)
            this.redraw();
    }

    updatePlayersPoints(player, playerIndex, prevTempPoints){
        var indexOfPlayerWithMaxPoints = 0;
        var maxPoints = 0;

        //get index of player with max points
        for (var i = 0; i < this.props.noOfPlayers; i++) {
            if(this.players[i].tempPoints > maxPoints){
                maxPoints = this.players[i].tempPoints;
                indexOfPlayerWithMaxPoints = i;
            }
        }

        //update points for the player with max points
        for (var i = 0; i < this.props.noOfPlayers; i++) {
            if(i == playerIndex){
                if(i == indexOfPlayerWithMaxPoints ){ //The selected player is player with max points
                    this.players[i].points += this.players[i].tempPoints;
                    this.players[i].hasMaxPoints = true;
                }
            }
            else
                if(i != indexOfPlayerWithMaxPoints && this.players[i].hasMaxPoints){
                        this.players[i].points -= this.players[i].tempPoints;
                        this.players[i].hasMaxPoints = false;
                    }
        }
    }

    passPlay = (playerIndex) => {

        this.SetPlayerPlayed(playerIndex);

        this.players[playerIndex].pass = true;

        var activePlayerIndex = (this.state.activePlayerIndex + 1) % this.props.noOfPlayers;
            
        this.setState(prevState => ({
            players: this.players,
            activePlayerIndex : activePlayerIndex
        }), ()=>{
            this.checkForDeal();
        });

    };

    selectCard = (card, playerIndex) => {

        if( this.state.activeCard.suit === card.suit && playerIndex == this.state.activePlayerIndex)
        {
            if(this.state.selectedCards.find(selectedCard => selectedCard.id === card.id))
                return;
            
            if(this.players[playerIndex].played)
                return;

            this.players = this.state.players;

            var cardPoint = Game.cardsValue.calculatePoint(card.rank) * 2;
            
            if(cardPoint > 0){
                // var prevTempPoints = this.players[playerIndex].tempPoints;

                this.players[playerIndex].points += cardPoint;
                
                // this.updatePlayersPoints(this.players[playerIndex], playerIndex, prevTempPoints);
            }

            this.SetPlayerPlayed(playerIndex);
            
            var activePlayerIndex = (this.state.activePlayerIndex + 1) % this.props.noOfPlayers; 

            this.setState(prevState => ({
                players: this.players,
                selectedCards: prevState.selectedCards.concat(card),
                activePlayerIndex : activePlayerIndex
            }), ()=>{
                    this.checkForDeal();
                }
            );
        }
    };

    SetPlayerPlayed(playerIndex){
        this.players.forEach(function(element){
                element.played = false;
            });
        this.players[playerIndex].played = true;
    }

    GetTheWinnerName = () => {

        var winnerPlayer = null;

        this.state.players.forEach(function(element) {
            winnerPlayer = (!winnerPlayer || element.points > winnerPlayer.points)? element : winnerPlayer;
        });
        
        return (winnerPlayer.points > 0)? winnerPlayer.name : null;
    };

    updateDoneStatus(callback) {
        this.setState( prevState =>{

            if(this.gameCards.cardCount() < ((this.usedCards > 0)? 
                (((this.state.selectedCards)? this.state.selectedCards.length : 0) + 1) : ((this.props.noOfPlayers) * 5) + 1 ) )
                return {doneStatus : 'Done. Nice' };
                
       },callback?()=>callback() : {});
    };

    redraw = () => {
        this.updateDoneStatus(()=>{
            
            if(this.state.doneStatus)
                return;

            this.Deal();
        });
    };

    render(){
        return(
            <table>
            <tbody>
                <tr>
                    <td>
                    {
                        !this.state.doneStatus?
                            <div>
                                <h3>Card Game </h3>
                                <h3>Remaining Cards : {this.gameCards.cardCount()}</h3>
                                <h3>Used Cards : {this.usedCards}</h3>
                            </div>
                            :
                            <p/>
                    }
                    </td>
                </tr>
                <tr>
                    <td>
                        {
                            this.state.doneStatus?
                            <DoneFrame doneStatus={this.state.doneStatus}
                                    playerName={this.GetTheWinnerName()}/> :
                                    <WildCard activeCard = {this.activeCard}/>
                        }
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </td>
                    <td rowSpan="2">
                    {
                        this.state.doneStatus?
                        <p/> :
                            <div className="playersInfo" >
                            {
                                this.state.players.map((player,i) =>
                                    <div>
                                    <PlayerInfo selectedCards={this.state.selectedCards}
                                                cardsOnHand={player.cardsOnHand}
                                                points={player.points}
                                                name={player.name}
                                                selectCard={this.selectCard}
                                                passPlay={this.passPlay}
                                                playerIndex = {i}
                                                key = {i}
                                                activePlayerIndex = {this.state.activePlayerIndex}
                                                activeCard = {this.activeCard}/>
                                                
                                    </div>
                                    )
                            }
                            </div>
                    }
                    </td>
                </tr>
                <tr colSpan="2">
                    <td>
                        <div>
                        {
                            !this.state.doneStatus?
                                <StackedCards selectedCards = {this.state.selectedCards}
                                                cardsOnHand = {this.activePlayer()? this.activePlayer().cardsOnHand : null}
                                                points = {this.activePlayer()? this.activePlayer().points : null}
                                                selectCard = {this.selectCard}
                                                passPlay = {this.passPlay}
                                                playerIndex = {this.state.activePlayerIndex}
                                                key = {this.state.activePlayerIndex}
                                                activePlayerIndex = {this.state.activePlayerIndex}
                                                activeCard = {this.activeCard}/>
                                :
                                <NavLink to="/" className="playAgainLink">
                                    Play again...
                                </NavLink>
                        }
                        </div>                        
                    </td>
                </tr>
            </tbody>
            </table>
        );
    }
}

export default Game;
