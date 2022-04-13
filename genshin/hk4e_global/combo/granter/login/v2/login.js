// {"retcode":0,"message":"OK","data":{"combo_id":"89858023","open_id":"129399082","combo_token":"580729acc024f02927c94ab18a88bf171c40e0fc","data":"{\"guest\":false}","heartbeat":false,"account_type":1}}

module.exports = {
    execute(req, res) {
        var ret = {"retcode":0,"message":"OK","data":{"data":"{\"guest\":false}","combo_id":"202","open_id":"202","combo_token":"75f431a1b5c0aff4065efb19550fa0e9854d6fae","heartbeat":false,"account_type":1}}
        
        res.end(JSON.stringify(ret));
    }
}
