(function( Dominion ) {
//Main Object
Dominion.Sets = {};

Dominion.Game = function(){
    this.cardsPerHand = 5;
    this.currentPlayer = -1;
    this.gameCardCount = 5;
    this.players = [];
    this.playSet = 'base';
    this.cardsInPlay = [];
    this.cards = {};

    this.randomizePlayCards = function(){
        //this.cardsInPlay = [];
        var set = this.playSet;
        var cards = this.cards;
        var shuffledCards = _.shuffle(Object.keys(this.cards));
        var filteredPlaySet = _.filter(shuffledCards, function(card){return cards[card]['set'] === set});

        var inPlayUnordered = [];

        for(var i = 0; i < this.gameCardCount; i++){
            inPlayUnordered.push( this.cards[filteredPlaySet.pop()] );
        }

        this.cardsInPlay = _.sortBy(inPlayUnordered, function(card){ return card.cost; });

    };

    this.startingCards = {};

    this.addStartingCard = function(title, count){
        this.startingCards[title.toLowerCase()] = count;
    };

    this.addCard = function(card){
        if( card.name !== undefined ){
            this.cards[card.name.toLowerCase()] = card;
        }
    };

    this.addPlayer = function(player){
        //var card = undefined;
        for( var card in this.startingCards ){
            for(var i=0;i < this.startingCards[card];i++){
                player.addCard(this.cards[card]);
            }
        }

        player.shuffle();
        player.draw(this.cardsPerHand);

        this.players.push(player);
    };

    this.start = function(){
        this.nextTurn();
    };

    this.nextTurn = function(){
        var playerId = this.currentPlayer + 1;
        if (playerId >= this.players.length){
            playerId = 0;
        }

        this.currentPlayer = playerId;
        this.currentTurn = new Dominion.Turn(this.players[this.currentPlayer], this);
    };
};
})( Dominion );