var UILayer = cc.Layer.extend({
    playerLayer: null,
    label:null,
    ctor: function (playerLayer) {
        this._super();
        this.playerLayer = playerLayer;
        var size=cc.director.getWinSize();
        this.label = new cc.LabelTTF("分数:0", "Arial", 100);
        this.label.x = 300;
        this.label.y = size.height - 50;

        this.addChild(this.label);
        this.scheduleUpdate();

    },
    update: function () {
        // console.log("111");
        this.label.setString("分数:" + this.playerLayer.score);
    }


});