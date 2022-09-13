const Model = require('./model');
module.exports = 
    class Maths extends Model {
        constructor(x, y) {
            super();
            this.X = x !== undefined ? x : "";
            this.Y = y !== undefined ? y : "";

            this.setKey();
            this.addValidator('X', '');
            this.addValidator('Y', '');
        }
    }