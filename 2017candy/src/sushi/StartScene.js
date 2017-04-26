var StartScene = cc.Scene.extend({

    onEnter: function () {
        this._super();
        var size = cc.director.getWinSize();
        // add bg
        this.bgSprite = new cc.Sprite("res/background.png");
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.addChild(this.bgSprite, 0);
        //add start menu
        var startItem = new cc.MenuItemImage(
                "res/start_N.png",
                "res/start_S.png",
                function () {
                    // cc.log("Menu is clicked!");
                    cc.director.runScene(new PlayScene());
                }, this);
        startItem.attr({
            x: size.width / 2,
            y: size.height / 2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(startItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
    }


});