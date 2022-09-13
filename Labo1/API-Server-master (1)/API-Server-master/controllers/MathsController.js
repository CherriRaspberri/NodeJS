const MathModel = require('../models/maths');
const Repository = require('../models/repository');

module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
            this.repository = new Repository(new MathModel());
        }

        get (id) {
            if (this.repository != null) {

            }
            else 
                this.HttpContext.response.notImplemented();
        }
    }