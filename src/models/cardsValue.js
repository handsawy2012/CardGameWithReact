function CardsValue() {
    
    this.cards = new Array();

    this.build  = () => {

        var ranks = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9",
                                "10", "J", "Q", "K");
        
        var value = null;

        // Fill the array with cards values.
        for (var j = 0; j < ranks.length; j++){
            switch(ranks[j]){
                case "A":
                    value = 11;
                    break;
                
                case "K":
                    value = 4;
                    break;
                
                case "Q":
                    value = 3;
                    break;
                
                case "J":
                    value = 2;
                break;

                case "10":
                    value = 10;
                break;

                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    value = 0;
                break;
            }

            this.cards.push({
                key : ranks[j],
                value : value
            });
        }     
    }


    this.calculatePoint = (rank) => {
        return this.cards.find(card => card.key == rank).value;
    }
    
}

export default CardsValue;