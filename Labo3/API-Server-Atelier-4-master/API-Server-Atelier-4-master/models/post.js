const Model = require('./model');
module.exports =
    class Post extends Model {
        constructor() {
            super();
            this.Category = '';
            this.Title = '';
            this.Text = '';
            this.ImgUrl = '';
            this.Date = 0;

            this.addValidator('Category', 'string');
            this.addValidator('Title', 'string');
            this.addValidator('Text', 'string');
            this.addValidator('ImgUrl', 'string');
            this.addValidator('Date', 'integer');
        }
    }