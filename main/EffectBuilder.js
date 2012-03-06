(function( Dominion ) {
//Effect builder used to describe the effects of cards
Dominion.EffectBuilder = function(){
    this.effect = {
        actions : 0,
        buys : 0,
        cards : 0,
        moneys : 0,
        gain : 0
    };
    this.actions = function(count){
        this.effect.actions = count;
        return this;
    };
    this.buys = function(count){
        this.effect.buys = count;
        return this;
    };
    this.cards = function(count){
        this.effect.cards = count;
        return this;
    };
    this.moneys = function(count){
        this.effect.moneys = count;
        return this;
    };
    this.gain = function(cardMatcher){
        this.effect.gain = cardMatcher;
        return this;
    };
    /*TODO: These functions require additional matcherBuilders
     specifically a cardMatcher and a playerMatcher.  */
    this.trash = function(limit, cardMatcher){
        this.effect.trash = {};
        this.effect.trash.limit = limit;
        if(cardMatcher){this.effect.trash.bonusEffect = cardMatcher}

        return this;
    };
    this.discard = function(cardMatcher, bonusEffect){
        this.effect.discard.matcher = cardMatcher;
        if(bonusEffect){this.effect.discard.bonusEffect = bonusEffect;}

        return this;
    };
    this.duplicate = function(cardMatcher){
        this.effect.duplicate.matcher = cardMatcher;
        return this;
    };
    this.interaction = function(playerMatcher){
        this.effect.interaction.matcher = playerMatcher;
        return this;
    };
    this.build = function(){
        return this.effect;
    };
};
})( Dominion );