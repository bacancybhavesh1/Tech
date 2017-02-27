// const base64 = require('base-64');
const apiUrl = 'http://213.32.253.253:5005/ardWeb/ArdAdminIs.dll';
var base64 = require('base-64');
 var Users= {
	signIn: async function(username, password){
		var parmas = '?Page=UserEdit&UserID='+username;
		var auth = 'Basic ' + base64.encode(username+':'+password);
		return fetch(apiUrl+parmas,{
			method: 'GET', 
			headers: { 
				'Authorization': auth,
				'Accept': 'application/json',
    			'Content-Type': 'application/json'
			}
		});
	}
}

module.exports = Users;