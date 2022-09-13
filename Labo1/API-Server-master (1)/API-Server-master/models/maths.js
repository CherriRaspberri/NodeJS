const Model = require('./model');
module.exports = 
    class Maths extends Model {
        constructor(op, x, y) {
            super();
            this.Op = op !== undefined ? op : "";
            this.X = x !== undefined ? x : "";
            this.Y = y !== undefined ? y : "";

            this.setKey("Op");
            this.addValidator('Op', 'char')
            this.addValidator('X', 'integer');
            this.addValidator('Y', 'integer');
        }
    }