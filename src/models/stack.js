import Card from './card';

function Stack() {
    
    this.cards = new Array();
    this.makeDeck  = (n) => {

        var ranks = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9",
                                "10", "J", "Q", "K");
        var suits = new Array("suitdiamonds", "suithearts", "suitclubs", "suitspades");
        var i, j, k;
        var m;
        var id = 0;
        m = ranks.length * suits.length;

        // Set array of cards.
        this.cards = new Array(n * m);

        // Fill the array with 'n' packs of cards.
        for (i = 0; i < n; i++)
            for (j = 0; j < suits.length; j++)
                for (k = 0; k < ranks.length; k++)
                    this.cards[i * m + j * ranks.length + k] = new Card(ranks[k], suits[j], ++id);
        }

    this.shuffle   = (n) => {

        var i, j, k;
        var temp;

        // Shuffle the stack 'n' times.
        for (i = 0; i < n; i++)
            for (j = 0; j < this.cards.length; j++) {
                k = Math.floor(Math.random() * this.cards.length);
                temp = this.cards[j];
                this.cards[j] = this.cards[k];
                this.cards[k] = temp;
        }
        }

    this.deal = () => {
        if (this.cards.length > 0)
            return this.cards.shift();
        else
            return null;
        }

    this.addCard   = (card) => {
            this.cards.push(card);
        }

    this.cardCount = () => {
        return this.cards.length;
        };
}

export default Stack;