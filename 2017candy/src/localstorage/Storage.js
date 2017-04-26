var StorageScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var size = cc.director.getWinSize();
        var bg = new cc.LayerColor(cc.color(0, 0, 0), size.width, size.height);
        this.addChild(bg);
        var label = new cc.LabelTTF("Storage 测试", "Arial", 50);
        label.setColor(cc.color(255, 255, 255));
        label.x = 200;
        label.y = size.height - 100;
        this.addChild(label);
        var layer = new StorageLayer1();
        this.addChild(layer);
    }



})
var StorageLayer1 = cc.Layer.extend({

    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();

        var item = new cc.MenuItemFont("写", this._set, this);
        item.fontSize = 32;
        item.fontName = "Arial";
        var item2 = new cc.MenuItemFont("读", this._get, this);
        item2.fontSize = 32;
        item2.fontName = "Arial";
        
        var menu = new cc.Menu(item, item2);
        menu.alignItemsVertically();
        menu.alignItemsHorizontally();
        this.addChild(menu);

    },
    _set: function () {
        localStorage.lastname = "Smith";
    },
    _set1: function () {
        cc.sys.localStorage.getItem("level");
    },
    _get: function () {
        console.log(localStorage.lastname);
    },
    _get1: function () {
        cc.sys.localStorage.setItem("level",1);
    }
})