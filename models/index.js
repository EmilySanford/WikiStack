var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack');
mongoose.Promise = require('bluebird');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var pageSchema = new mongoose.Schema({
  title:    {type: String, required: true},
  urlTitle: {type: String, required: true},
  content:  {type: String, required: true},
  status:   {type: String, enum: ['open', 'closed']},
  date:     {type: Date, default: Date.now},
  author:   {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true}
});

userSchema.statics.findOrCreate = function (props) {
  var self = this;
  return self.findOne({email: props.email}).exec().then(function(user){
    if (user) return user;
    else return self.create({
      email: props.email,
      name:  props.name
    });
  });
};

pageSchema.pre("validate", function (next){
	this.urlTitle = generateUrl(this.title);
	next();
});

function generateUrl(str){
	if (typeof str !== 'undefined' && str !== ''){
		return str.replace(/[\s+]/g, "_").replace(/[^a-z0-9\_]/gmi, "");
	} else {
		return Math.random().toString(36).substring(2, 7);
	}

}

pageSchema.virtual('route').get(function(){
	return '/wiki/' + this.urlTitle;
});


var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);


module.exports = {
  Page: Page,
  User: User
};
