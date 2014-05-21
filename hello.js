var follow = require('follow'),
	http=require('http');
var feed = new follow.Feed();
feed.db = "https://mobileraj.cloudant.com/places";

feed.on('change', function(change) {
  console.log('Doc ' + change.id + ' in change ' + change.seq + ' is neither stinky nor ugly.');
  var options2 ={
					host: 'mobileraj.cloudant.com',
					post: 80,
					path: '/places/'+change.id,
					method: 'GET'
				};
				var docReq = http.request(options2,function(docResp) {
					console.log('in docReq ' + change.id);
					var resp = '';
					docResp.on('data', function (doc) {
						resp += doc;
						console.log('in response on');
					});
					docResp.on('end',function(){
						console.log(resp);
      					var responseObject = JSON.parse(resp);
      					console.log(responseObject.twitterId);
					});
				});
				docReq.end();
})

feed.on('error', function(er) {
  console.error('Since Follow always retries on errors, this must be serious');
  throw er;
})

feed.follow();
