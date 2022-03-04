
module.exports = {
    execute(req, res) {
        var ret = {
            "retcode": 0,
            "message": "OK",
            "data": {
                "account": {
                    "uid": "175674314",
                    "name": "",
                    "email": "시진핑핑이",
                    "mobile": "",
                    "is_email_verify": "0",
                    "realname": "**英",
                    "identity_card": "320************839",
                    "token": "gvl46YSa1iKClQ9gbJXuUpHMPdCJ35hX",
                    "safe_mobile": "170****0969",
                    "facebook_name": "",
                    "google_name": "",
                    "twitter_name": "",
                    "game_center_name": "",
                    "apple_name": "",
                    "sony_name": "",
                    "tap_name": "",
                    "country": "",
                    "reactivate_ticket": "",
                    "area_code": "",
                    "device_grant_ticket": "",
                    "steam_name": ""
                },
                "device_grant_required": false,
                "safe_moblie_required": false,
                "realperson_required": false,
                "reactivate_required": false,
                "realname_operation": "None"
            }
        }
        res.end(JSON.stringify(ret));
    }
}
