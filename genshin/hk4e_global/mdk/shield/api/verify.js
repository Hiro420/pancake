
module.exports = {
    execute(req, res) {
        var ret = {
            "retcode": "0",
            "message": "OK",
            "data": {
                "account": {
                    "apple_name": "",
                    "country": "",
                    "email": "ceo@hoyolab.com",
                    "facebook_name": "",
                    "game_center_name": "",
                    "google_name": "",
                    "identity_card": "",
                    "is_email_verify": "0",
                    "mobile": "",
                    "name": "Ceo",
                    "realname": "",
                    "safe_mobile": "",
                    "sony_name": "",
                    "tap_name": "",
                    "token": "Fake-token-hahaha",
                    "twitter_name": "",
                    "uid": "175674314"
                },
                "device_grant_required": "false",
                "realperson_required": "false",
                "safe_moblie_required": "false"
            }
        }
        res.end(JSON.stringify(ret));
    }
}