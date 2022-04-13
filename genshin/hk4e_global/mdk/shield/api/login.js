
module.exports = {
    execute(req, res) {
        var ret = {"retcode":0,"message":"OK","data":{"account":{"uid":"202","name":"Diana","email":"","mobile":"","is_email_verify":"1","realname":"","token":"75f431a1b5c0aff4065efb19550fa0e9854d6fae","country":"null","areaCode":"null"},"device_grant_required":false,"safe_moblie_required":false,"realperson_required":false,"reactivate_required":false,"realname_operation":"None"}}
        
        res.end(JSON.stringify(ret));
    }
}
