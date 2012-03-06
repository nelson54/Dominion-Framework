(function( Dominion ) {
//Turn Object
Dominion.Turn = function(player, game){
    this.player = player;
    this.player.piles.inPlay = [];
    //this.phases = {0: "Action", 1: "Buy", 2: "Cleanup"};

    this.currentPhase = 0;
    this.game = game;

    this.state = {
        actions: 1,
        cards: 0,
        buys: 1
    };

    this.cycle = function(){
        player.draw(this.state.cards);

        if ( this.state.actions == 0 && this.currentPhase == 0 ) this.currentPhase = 1;
        if ( this.state.buys == 0 && this.currentPhase == 1) this.currentPhase = 2;
        if ( this.player.moneyInHand == 0 && this.currentPhase == 1 ) this.currentPhase = 3;

    };

    this.endPhase = function(){
        if (this.currentPhase > 2){
            this.currentPhase++;
            return this.currentPhase;
        } else {
            this.done();
            return false;
        }
    };

    this.buy = function(cardName){
        var card = _.find(this.game.cards, function(card){ return card.name === cardName; });
        if(this.state.buys > 0 && this.player.moneyInHand >= card.cost){
            this.player.addCard(card);
            this.player.moneyInHand -= card.cost;
            this.state.buys--;
            return true;
        }
        this.cycle();
        return false;
    };

    this.action = function(card){
        var cardId = card.id;
        if (this.state.actions > 0){
            this.state.buys += card.effect.buys;
            this.state.actions += card.effect.actions;
            this.state.cards += card.effect.cards;
            this.player.moneyInHand += card.effect.moneys;
            this.state.actions--;
            this.player.piles.hand = _.filter(this.player.piles.hand, function(handCard){return handCard.id !== cardId});
            this.player.piles.inPlay.push(card);
            this.cycle();
            return true;
        }else{
            this.cycle();
            return false;
        }
    };

    this.done = function(){
        this.player.discard();
        this.player.moneyInHand = 0;
        this.player.draw(this.game.cardsPerHand);
        this.game.nextTurn();
    };
};
})( Dominion );