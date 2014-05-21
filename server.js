var ioreq = require('socket.io'),
	http = require('http'),
	fs = require('fs');

var server = http.createServer(function(req, resp) {
	fs.readFile(__dirname + '/index.html', function(err, data) {
		if(err) {
			resp.writeHead(500);
			resp.end('An error occurred!');
		} else {
			resp.writeHead(200);
			resp.end(data);
		}
	});
});

var io = ioreq.listen(server);
io.sockets.on('connection', function (socket) {
	var options1 ={
		host: 'demo201402.cloudant.com',
		post: 80,
		path: '/users/_changes?feed=continuous',
		method: 'GET'
	};
	
	var req = http.request(options1, function(response) {
		response.useChunkedEncodingByDefault = false;
		response.on('data', function(chunk) {
			var update = JSON.parse(chunk);
			if(update.id) {
				console.log('in main req id - ' + update.id);
				var options2 ={
					host: 'demo201402.cloudant.com',
					post: 80,
					path: '/users/'+update.id,
					method: 'GET'
				};
				var docReq = http.request(options2,function(docResp) {
					console.log('in docReq ' + update.id);
					docResp.setEncoding('ascii');
					docResp.on('data', function (doc) {
						socket.emit('update', doc);		
					});
				});
				docReq.end();
			}

		});
	});
	req.end();
});

server.listen(8080);
console.log('listening on 8080');