const MathModel = require('../models/maths');

module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
            this.params = HttpContext.path.params;
        }

        checkParamCount(nbParams) {
            if (Object.keys(this.params).length > nbParams) {
                return this.error("too many parameters");
            }
            return true;
        }

        operate(x, y, op) {
            let result = 0;
            switch(op) {
                case '+': 
                    result = x + y;
                    break;
                case '-':
                    result = x - y;
                    break;
                case '*':
                    result = x * y;
                    break;
                case '/':
                    result = x / y;
                    break;
                case '%':
                    result = x % y;
                    break;
                case '!':
                    result = x;
                    break;
                case 'p':
                    result = x;
                    break;
                case 'np':
                    result = x;
                    break;
            }
            return result;
        }

        get() {
            this.HttpContext.response.JSON(params);
        }

        help() {

        }
    }