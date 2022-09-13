const MathModel = require('../models/maths');

module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
            this.params = HttpContext.path.params;
        }

        get() {
            
        }

        help() {

        }
    }