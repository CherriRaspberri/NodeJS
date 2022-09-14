const MathModel = require('../models/maths');

module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
            this.params = HttpContext.path.params;
        }

        factorial(n) {
            if (n === 0 || n === 1) {
                return 1;
            }
            return n * factorial(n - 1);
        }

        isPrime(value) {
            for (var i = 2; i < value; i++) {
                if (value % i === 0) {
                    return false;
                }
            }
            return value > 1;
        }

        findPrime(n) {
            let primeNumer = 0;
            for (let i = 0; i < n; i++) {
                primeNumer++;
                while (!isPrime(primeNumer)) {
                    primeNumer++;
                }
            }
            return primeNumer;
        }

        checkParamCount(nbParams) {
            if (Object.keys(this.params).length > nbParams) {
                return this.error("too many parameters");
            }
            return true;
        }

        operate(x, y, op) {
            let result = 0;
            switch (op) {
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
                    result = this.factorial(x);
                    break;
                case 'p':
                    result = this.isPrime(x);
                    break;
                case 'np':
                    result = this.findPrime(x);
                    break;
            }
            return result;
        }

        get() {

            if (this.params != null) {
                this.HttpContext.response.JSON(this.params);
            }
            else {
                this.help();
            }
        }

        help() {
            this.HttpContext.response.HTML();
        }
    }