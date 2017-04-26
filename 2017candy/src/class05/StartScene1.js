var StartScene1 = cc.Scene.extend({

    onEnter: function () {
        this._super();
        var size = cc.director.getWinSize();
        var bg = new cc.Sprite("res/background.png");
        bg.x = size.width / 2;
        bg.y = size.height / 2;
        this.addChild(bg);

        var menuLayer = new MenuLayer();
        this.addChild(menuLayer);




    }


});

var MenuLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        var item = new cc.MenuItemImage(
                "res/start_N.png",
                "res/start_S.png",
                function () {
                    // cc.log("Menu is clicked!");
                    cc.director.runScene(new PlayerScene1());
                }, this

            );
        item.attr({
            x: size.width / 2,
            y: size.height / 2,
            anchorX: 0.5,
            anchorY: 0.5
        });
        var menu = new cc.Menu(item);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu);
    }


});