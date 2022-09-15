const path = require('path');
const fs = require('fs');
let hasError = false;

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
            return n * this.factorial(n - 1);
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
                while (!this.isPrime(primeNumer)) {
                    primeNumer++;
                }
            }
            return primeNumer;
        }

        checkParamCount(nbParams) {
            if (Object.keys(this.params).length > nbParams) {
                return false;
            }
            return true;
        }

        operate(x, y, n, op) {
            let X = parseInt(x);
            let Y = parseInt(y);
            let result = 0;

            switch (op) {
                case '+':
                    result = X + Y;
                    break;
                case '-':
                    result = X - Y;
                    break;
                case '*':
                    result = X * Y;
                    break;
                case '/':
                    result = X / Y;
                    break;
                case '%':
                    result = X % Y;
                    break;
                case '!':
                    result = this.factorial(n);
                    break;
                case 'p':
                    result = this.isPrime(n);
                    break;
                case 'np':
                    result = this.findPrime(n);
                    break;
            }
            return result;
        }

        //treats the errors and sends response
        get() {
            hasError = false;
            //redirects to help page
            if (this.HttpContext.path.queryString == '?') {
                //fetches the html document
                let helpPagePath = path.join(process.cwd(), "wwwroot/helpPages/mathsServiceHelp.html");
                //reads the document
                let htmlContent = fs.readFileSync(helpPagePath);
                //sends response as html
                this.HttpContext.response.HTML(htmlContent);
            }
            //shows answers
            else {
                //checks if param op exists
                if (this.params.op != null) {
                    //switches blank spaces to a '+' symbol
                    if (this.params.op == ' ') {
                        this.params.op = '+';
                    }
                    //checks what symbol param op uses; will determine if x/y or n is needed
                    if (this.params.op == '+' || this.params.op == '-' || this.params.op == '*' || this.params.op == '/' || this.params.op == '%') {
                        //checks parameter count
                        if (this.checkParamCount(3)) {
                            /*
                            //checks specifically if param op is a /
                            if (this.params.op == '/') {
                                //checks if param x or y is 0; if yes, send error
                                if (this.params.x == 0 || this.params.y == 0) {
                                    hasError = true;
                                    this.params.error = "Values cannot be 0 with parameter /";
                                    this.HttpContext.response.JSON(this.params);
                                }
                            }
                            //checks specifically if param op is a %
                            if (this.params.op == '%') {
                                //checks if param x or y is 0; if yes, send error
                                if (this.params.x == 0 || this.params.y == 0) {
                                    hasError = true;
                                    this.params.error = "Values cannot be 0 with parameter %";
                                    this.HttpContext.response.JSON(this.params);
                                }
                            }
                            */

                            if (!hasError) {
                                //checks if param x exists
                                if (this.params.x != undefined) {
                                    //checks if param x is a number
                                    if (!isNaN(this.params.x)) {
                                        //checks if param y exists
                                        if (this.params.y != undefined) {
                                            //checks if param y is a number
                                            if (!isNaN(this.params.y)) {
                                                //sends response
                                                this.params.value = this.operate(this.params.x, this.params.y, null, this.params.op);
                                                this.HttpContext.response.JSON(this.params);
                                            }
                                            //if param y NaN sends error
                                            else {
                                                this.params.error = "Parameter 'y' is not a number";
                                                this.HttpContext.response.JSON(this.params);
                                            }
                                        }
                                        //if param y missing sends error
                                        else {
                                            this.params.error = "Parameter 'y' missing";
                                            this.HttpContext.response.JSON(this.params);
                                        }
                                    }
                                    //if param x NaN sends error
                                    else {
                                        this.params.error = "Parameter 'x' is not a number";
                                        this.HttpContext.response.JSON(this.params);
                                    }
                                }
                                //if param x missing sends error
                                else {
                                    this.params.error = "Parameter 'x' missing";
                                    this.HttpContext.response.JSON(this.params);
                                }
                            }
                        }
                        //if param number more than 3, send error
                        else {
                            this.params.error = "Too many parameters";
                            this.HttpContext.response.JSON(this.params);
                        }

                    }
                    else if (this.params.op == '!' || this.params.op == 'p' || this.params.op == 'np') {
                        //checks param count
                        if (this.checkParamCount(2)) {
                            //checks if param n exists
                            if (this.params.n != undefined) {
                                //checks if param n is a number
                                if (!isNaN(this.params.n)) {
                                    //sends response
                                    this.params.value = this.operate(null, null, this.params.n, this.params.op);
                                    this.HttpContext.response.JSON(this.params);
                                }
                                //if param n NaN sends error
                                else {
                                    this.params.error = "Parameter 'n' is not a number";
                                    this.HttpContext.response.JSON(this.params);
                                }
                            }
                            //if param n missing, sends error
                            else {
                                this.params.error = "Parameter 'n' missing";
                                this.HttpContext.response.JSON(this.params);
                            }
                        }
                        //if nb of param more than 2, send error
                        else {
                            this.params.error = "Too many parameters";
                            this.HttpContext.response.JSON(this.params);
                        }
                    }
                    //if symbol not recognized send error
                    else {
                        this.params.error = "Parameter 'op' not valid";
                        this.HttpContext.response.JSON(this.params);
                    }
                }
                //if op missing sends error
                else {
                    this.params.error = "Parameter 'op' missing";
                    this.HttpContext.response.JSON(this.params);
                }
            }
        }
    }