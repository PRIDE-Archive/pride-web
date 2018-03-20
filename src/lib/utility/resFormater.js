module.exports = function(req, res, next){
	res.formateReply = function(msg, data){
		//console.log('formateReply');
		var data = data || {};
		var msgMap = {
			'OK': {code:200, msg:'OK'},
			'Forbidden': {code:403, msg:'Forbidden'},
			'NotFound': {code:404, msg:'NotFound'},
			'InternalServerError': {code:500, msg:'InternalServerError'}
		};
		var httpCode = msgMap[msg].code || 403;
		var replyObj={code:httpCode, msg:msg, data: data};
		this.status(httpCode).send(replyObj);
	};

	next();
}