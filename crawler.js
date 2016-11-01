var casper = require('casper').create();
var objectPosts;

var sortJson = function sortResults(json, prop, asc) {
    json = json.sort(function(a, b) {
		if (asc) {
			return (String(a[prop]).toLowerCase() > String(b[prop]).toLowerCase()) ? 1 : ((String(a[prop]).toLowerCase() < String(b[prop]).toLowerCase()) ? -1 : 0);
		} else {
			return (String(b[prop]).toLowerCase() > String(a[prop]).toLowerCase()) ? 1 : ((String(b[prop]).toLowerCase() < String(a[prop]).toLowerCase()) ? -1 : 0);
		}
    });
	return json;
}

function getPosts() {
    var posts = document.querySelectorAll('.postLink');
	var objectPosts = [];

	Array.prototype.map.call(posts, function (e) {
		objectPosts.push({'name' : e.innerHTML, 'url' : e.getAttribute('href')})
    });

	return objectPosts;
}
				   
casper.start('http://listatelegram.github.io/');

casper.then(function(){
	objectPosts = sortJson(this.evaluate(getPosts), 'name', true);
});

casper.run(function(){
	//for(var i in objectPosts) {
	//	console.log(objectPosts[i].name +" - "+ objectPosts[i].url);
	//}

	console.log(JSON.stringify(objectPosts));

	casper.done();
});
