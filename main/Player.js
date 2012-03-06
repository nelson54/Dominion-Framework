(function( Dominion ) {
Dominion.Player = function(name){
    this.name = '';

    if (name !== undefined) this.name = name;

    this.moneyInHand = 0;

    this.piles = {
        discard: [],
        deck: [],
        hand: [],
        inPlay: []
    };

    this.addCard = function(card){
        var newCard = _.clone(card);
        newCard.id = _.uniqueId('card_');
        this.piles.discard.push(newCard);
    };

    this.draw = function(count){
        if(this.piles.deck.length === 0){
            this.shuffle();
        }

        for(var i=0;i<count;i++){
            var card = this.piles.deck.pop();

            if (card.value !== undefined){
                this.moneyInHand = this.moneyInHand + card.value;
            }

            this.piles.hand.push(
                card
            );
        }
    };

    this.discard = function(){
        this.piles.discard = this.piles.discard.concat(this.piles.hand);

        this.piles.hand = [];
    };

    this.shuffle = function(){
        //TODO: Actually shuffle cards
        //Returns clone of array
        this.piles.deck = _.shuffle(
            this.piles.discard
        );
        this.piles.discard = [];
    };
};
})( Dominion );