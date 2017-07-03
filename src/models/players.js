function players(noOfPlayers){
    
    this.players = [];

    for (var i = 0; i < noOfPlayers; i++) {
        this.players.push({
            name: "PLAYER" + (i+1),
            points: 0, 
            cardsOnHand : null,
            tempPoints : 0,
            pass : false});
    }

    return this.players;
}

export default players;