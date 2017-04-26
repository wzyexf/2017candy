var Candy = cc.Sprite.extend({
    type: 0,
    column: 0,
    row:0,
    ctor: function (type,column,row) {
        this._super("res/" + type + ".png");
        console.log(type);
        this.init(type, column, row);

    },
    init: function (type,column,row) {

        this.type = type;
        this.row = row;
        this.column = column;
    }


})