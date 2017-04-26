var Motion = cc.Scene.extend({

    onEnter: function () {
        this._super();
        var layer = new SequenceLayer2();
        this.addChild(layer);
    }


});

var MotionLayer1 = cc.Layer.extend({

    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        var item = new cc.Sprite("res/1.png")
        item.x = size.width / 2;
        item.y = size.height/2;

        //var action = cc.moveTo(2, cc.p(0, 0));
        // var action = cc.moveBy(2, cc.p(-100, -100));
        // var action = cc.scaleTo(1, 2, 2);
        // var action = cc.scaleTo(1, 2, -2);
         //var action = cc.fadeTo(2, 0);
        //var action = cc.fadeOut(2);
      //  var action = cc.blink(2, 10);
        var action = cc.tintTo(2, 255, 0, 0);
        item.runAction(action);
        this.addChild(item);

        

    }

});
var SequenceLayer2 = cc.Layer.extend({

    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        var item = new cc.Sprite("res/1.png")
        item.x = size.width / 2;
        item.y = size.height / 2;

        //var action = cc.moveTo(2, cc.p(300, 300));
         var action = cc.moveBy(2, cc.p(-100, -100));
        var action1 = cc.scaleTo(2, 2, 2);
        // var action = cc.scaleTo(1, 2, -2);
        //var action = cc.fadeTo(2, 0);
        //var action = cc.fadeOut(2);
        //  var action = cc.blink(2, 10);
        var action2 = cc.tintTo(2, 255, 0, 0);
        var funaction = cc.callFunc(this.callback, this, "action结束");
        var funaction1 = cc.callFunc(this.callback, this, "action1结束");

        var seq1 = cc.sequence(action,funaction, action1,funaction1, action2);
        var seq2 = cc.spawn(action, action1, action2);
        var seq3 = cc.repeat(action, 3);
        item.runAction(seq1);
        this.addChild(item);



    },

    callback: function (obj, data) {
        console.log(data);
    }

});