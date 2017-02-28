const apiUrl = 'http://213.32.253.253:5005/ardWeb/ArdAdminIs.dll';
var base64 = require('base-64');
 var refillVouchers= {
    refillVoucher: async function(voucherData, username, password){
        var parmas = 
            '?Page:OfferPurchaseByVoucher'
            +'&Update:1'
            +'&VoucherName:'+ voucherData
            +'&PIN:0'
            +'&UserID='+username
            +'&Password:'+password
            +'&ConfirmPassword:'+password
        ;
        var auth = 'Basic ' + base64.encode(username+':'+password);
        return fetch(apiUrl+parmas,{
            method: 'POST', 
            headers: { 
                'Authorization': auth,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}

module.exports = refillVouchers;