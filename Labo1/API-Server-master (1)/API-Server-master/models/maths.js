const Model = require('./model');
module.exports = 
    class Maths extends Model {
        constructor(op, x, y, n) {
            super();
            this.Op = op !== undefined ? op : "";
            this.X = x !== undefined ? x : null;
            this.Y = y !== undefined ? y : null;

            this.setKey("Op");
            this.addValidator('Op', 'string');
            this.addValidator('X', 'integer');
            this.addValidator('Y', 'integer');
        }
    }