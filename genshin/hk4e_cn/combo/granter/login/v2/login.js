// {"retcode":0,"message":"OK","data":{"combo_id":"89858023","open_id":"129399082","combo_token":"580729acc024f02927c94ab18a88bf171c40e0fc","data":"{\"guest\":false}","heartbeat":false,"account_type":1}}

module.exports = {
    execute(req, res) {
        var ret = {
            "retcode": "0",
            "message": "OK",
            "data": {
                "account_type": "1",
                "combo_id": "17185",
                "combo_token": "Fake-token-hehehe",
                "data": {"guest": "false"},
                "heartbeat": "false",
                "open_id": "4660"
            }
        }
        res.end(JSON.stringify(ret));
    }
}
