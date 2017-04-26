var SushiSprite1 = cc.Sprite.extend({
    touchListener:null,
    ctor: function () {
        this._super("res/sushi_1n.png");
        this.addTouchEventListenser();
    },
    addTouchEventListenser: function () {
        this.touchListener = cc.EventListener.create(
            {
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
                swallowTouches: true,
                //onTouchBegan event callback function                      
                onTouchBegan: function (touch, event) {
                    var pos = touch.getLocation();
                    var target = event.getCurrentTarget();
                    if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                        cc.log("touched");

                        //target.removeTouchEventListenser();
                       // target.getParent().removeSushiByindex(target.index - 1);
                        //target.getParent().addScore();
                        target.removeFromParent();
                        return true;
                    }
                    return false;
                }
            });
        cc.eventManager.addListener(this.touchListener, this);
    },


});