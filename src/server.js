// File reading
const fs = require("fs")
const protobuf = require("protobufjs");

// Util
const dataUtil = require("../util/dataUtil");
const sqlite3 = require('sqlite3').verbose();
const handshake = require("../util/handshake");
const c = require("../util/colog");

// Networking
const dgram = require("dgram");
const kcp = require("node-kcp");
const { objToProtobuffer, getPacketIDByProtoName } = require("../util/dataUtil");

var clients = {};

// Recorded Uid is 624263971
var temp_entityid = 12345678

// Time
var epochTime = Date.now();

// SceneId
// 3 BigWorld
// 4 GAA
// 5 Enka
// 6 Chasm
var sceneIdSelect = 3

// i hardcoded this so bad lmao
var seedKey = undefined; // Hardcoding is no more :crab:
var token = 0x00000000;

var server = dgram.createSocket("udp4");

var posScene = {
    "X": 1996.01,
    "Y": 250.01,
    "Z": -673.01
}


var AvatarDataNotify = {
    "avatarList": [
        {
            "avatarId": 10000007,
            "guid": "2664326143951241217",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "75249",
                    "val": "75249"
                },
                "1002": {
                    "type": 1002,
                    "ival": "4",
                    "val": "4"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "60",
                    "val": "60"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951373049"
            ],
            "talentIdList": [
                91,
                92,
                93,
                94,
                95,
                96
            ],
            "fightPropMap": {
                "1": 7648.4521484375,
                "4": 550.0421142578125,
                "6": 0.11999999731779099,
                "7": 480.02520751953125,
                "20": 0.05000000074505806,
                "21": 0,
                "22": 0.5,
                "23": 1.5586652755737305,
                "26": 0,
                "27": 0,
                "28": 0,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "76": 60,
                "1006": 60,
                "1010": 7648.4521484375,
                "2000": 7648.4521484375,
                "2001": 616.0471801757812,
                "2002": 480.02520751953125,
                "2003": 0
            },
            "skillDepotId": 706,
            "fetterInfo": {
                "expLevel": 1,
                "fetterList": [
                    {
                        "fetterId": 2123,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2122,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2121,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2120,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2119,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2118,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2117,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2116,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2115,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2114,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2113,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2112,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2111,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2110,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2109,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2108,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2107,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2106,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2105,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2104,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2103,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2102,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2101,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2045,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2044,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2019,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2018,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2017,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2016,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2015,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2014,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2013,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2012,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2011,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2010,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2009,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2207,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 2008,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2200,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 2001,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2098,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 2002,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2099,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 2003,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2100,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2203,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 2004,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2403,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2204,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 2005,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2205,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 2006,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2206,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 2007,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2020,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2021,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2022,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2036,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2037,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2038,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2039,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2040,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2043,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2035,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2032,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2079,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2033,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2042,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2041,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2034,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2078,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2031,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2030,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2029,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2028,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2027,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2026,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2025,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2024,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2023,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2046,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2047,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2048,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2049,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2050,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2051,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2052,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2053,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2054,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2055,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2056,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2057,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2058,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2059,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2060,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2061,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2062,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2063,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2064,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2065,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2066,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2067,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2068,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2069,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2070,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2071,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2072,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2073,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2074,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2075,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2076,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2077,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2080,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2081,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2084,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2085,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2086,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2087,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2088,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2089,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2090,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2091,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2092,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2093,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 105,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 2095,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2096,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 2097,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                92101,
                92201
            ],
            "skillLevelMap": {
                "10077": 1,
                "10078": 2,
                "100555": 1
            },
            "proudSkillExtraLevelMap": {
                "932": 3,
                "939": 3
            },
            "avatarType": 1,
            "wearingFlycloakId": 140006,
            "bornTime": 1612730395,
            "pendingPromoteRewardList": [
                5
            ],
            "excelInfo": {
                "prefabPathHash": "217316872338",
                "prefabPathRemoteHash": "681809261527",
                "controllerPathHash": "664801677487",
                "controllerPathRemoteHash": "980732318872",
                "combatConfigHash": "1052021163257"
            }
        },
        {
            "avatarId": 10000021,
            "guid": "2664326143951241370",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "6",
                    "val": "6"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "90",
                    "val": "90"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951471510",
                "2664326143951466349",
                "2664326143951610992",
                "2664326143951660665",
                "2664326143951588458",
                "2664326143951408904"
            ],
            "talentIdList": [
                211
            ],
            "fightPropMap": {
                "1": 9461.17578125,
                "2": 4989.1298828125,
                "3": 0.093299999833107,
                "4": 732.623046875,
                "5": 371.30999755859375,
                "6": 1.5917600393295288,
                "7": 600.6189575195312,
                "8": 55.54999923706055,
                "9": 0.11659999936819077,
                "20": 0.193900004029274,
                "21": 0,
                "22": 1.4562000036239624,
                "23": 1.2655000686645508,
                "26": 0,
                "27": 0,
                "28": 173.25,
                "29": 0,
                "30": 0,
                "40": 0.4659999907016754,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "70": 40,
                "1000": 40,
                "1010": 11359.5224609375,
                "2000": 15333.033203125,
                "2001": 2270.09326171875,
                "2002": 726.2011108398438,
                "2003": 0
            },
            "skillDepotId": 2101,
            "fetterInfo": {
                "expNumber": 1045,
                "expLevel": 6,
                "fetterList": [
                    {
                        "fetterId": 10401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10207,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 10110,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10206,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 10109,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10203,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 10106,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 10105,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10151,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10150,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10149,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10147,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10146,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10145,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10144,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10143,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10142,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10141,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10140,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10139,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10138,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10135,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10102,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10134,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 110,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 10101,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10133,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10100,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10132,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10123,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10120,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10167,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10164,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10117,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10121,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10168,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10169,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10122,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10124,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10171,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10170,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10131,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10136,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10125,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10172,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10148,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10137,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10130,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10127,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10174,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10173,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10126,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10175,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10128,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10129,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10163,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10116,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10119,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10162,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10115,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10118,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10161,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10114,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10160,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10113,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10159,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10403,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10112,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10156,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10155,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10205,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 10108,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10208,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 10111,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10153,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10152,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10154,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10204,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 10107,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10103,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 10201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 10104,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                212101,
                212201,
                212301
            ],
            "skillLevelMap": {
                "10017": 7,
                "10032": 6,
                "10041": 10
            },
            "avatarType": 1,
            "wearingFlycloakId": 140004,
            "bornTime": 1612731933,
            "excelInfo": {
                "prefabPathHash": "1049031694485",
                "prefabPathRemoteHash": "1053359340965",
                "controllerPathHash": "336094165345",
                "controllerPathRemoteHash": "822233630114",
                "combatConfigHash": "152079964069"
            }
        },
        {
            "avatarId": 10000034,
            "guid": "2664326143951241527",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "4",
                    "val": "4"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "70",
                    "val": "70"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951568623",
                "2664326143951614012",
                "2664326143951614020",
                "2664326143951597143",
                "2664326143951614483",
                "2664326143951348946"
            ],
            "talentIdList": [
                341
            ],
            "fightPropMap": {
                "1": 9324.7548828125,
                "2": 2748.300048828125,
                "3": 0.11659999936819077,
                "4": 678.7298583984375,
                "5": 61.45000076293945,
                "6": 0.15150000154972076,
                "7": 616.8659057617188,
                "8": 94.9000015258789,
                "9": 1.1119999885559082,
                "20": 0.17909999191761017,
                "21": 0,
                "22": 0.647599995136261,
                "23": 1.1101000308990479,
                "26": 0,
                "27": 0,
                "28": 14.920000076293945,
                "29": 0,
                "30": 0.31453073024749756,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "76": 60,
                "1006": 20.300819396972656,
                "1010": 13160.3203125,
                "2000": 13160.3212890625,
                "2001": 843.0074462890625,
                "2002": 1397.7208251953125,
                "2003": 0
            },
            "skillDepotId": 3401,
            "fetterInfo": {
                "expNumber": 1835,
                "expLevel": 9,
                "fetterList": [
                    {
                        "fetterId": 21202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 21201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 21027,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21026,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21025,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21024,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21023,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21022,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21021,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21020,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21019,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21018,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21017,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21016,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21403,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21015,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21208,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 21014,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21207,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 21013,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21206,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 21012,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21205,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 21011,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21033,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21034,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21035,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21036,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21037,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21038,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21039,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21040,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21041,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21042,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21043,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21044,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21051,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 21052,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21053,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21055,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21054,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21050,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21049,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21048,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21047,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21046,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21045,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21032,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21031,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21030,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21029,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21028,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21071,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21070,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21069,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21068,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21065,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21064,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21063,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21062,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21061,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21060,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21059,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21058,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21057,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21204,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 21010,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21056,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21203,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 21009,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 122,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 21074,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21073,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 21072,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                342101,
                342201,
                342301
            ],
            "skillLevelMap": {
                "10341": 2,
                "10342": 3,
                "10343": 1
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1612757090,
            "pendingPromoteRewardList": [
                5
            ],
            "excelInfo": {
                "prefabPathHash": "22349600604",
                "prefabPathRemoteHash": "692977971194",
                "controllerPathHash": "948368036966",
                "controllerPathRemoteHash": "434341084296",
                "combatConfigHash": "915171630220"
            }
        },
        {
            "avatarId": 10000023,
            "guid": "2664326143951241529",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "3",
                    "val": "3"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "60",
                    "val": "60"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951544418"
            ],
            "talentIdList": [
                231,
                232,
                233
            ],
            "fightPropMap": {
                "1": 7164.47412109375,
                "4": 386.6690368652344,
                "7": 440.6572265625,
                "20": 0.05000000074505806,
                "21": 0,
                "22": 0.5,
                "23": 1,
                "26": 0,
                "27": 0,
                "28": 190.99200439453125,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "70": 80,
                "1000": 80,
                "1010": 5046.177734375,
                "2000": 7164.47412109375,
                "2001": 386.6690368652344,
                "2002": 440.6572265625,
                "2003": 0
            },
            "skillDepotId": 2301,
            "fetterInfo": {
                "expNumber": 2075,
                "expLevel": 4,
                "fetterList": [
                    {
                        "fetterId": 12166,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12165,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12164,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12163,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12162,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12161,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12160,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12159,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12158,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12155,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12154,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12153,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12152,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12151,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12150,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12149,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12148,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12147,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12100,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 12105,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12203,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 12106,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12204,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 12107,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12205,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 12108,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12206,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 12109,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12207,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 12110,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12208,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 12111,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12403,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12112,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12113,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12114,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 12124,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12125,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 12104,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12127,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12116,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12121,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12126,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12115,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12120,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12119,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12118,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12117,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12101,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12102,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12103,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12128,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12129,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12130,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12131,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 12122,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12123,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12132,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 12133,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12134,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12135,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12136,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12137,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12138,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12139,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 112,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 12140,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 12141,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 12142,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12143,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12144,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12145,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 12146,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                232101,
                232301
            ],
            "skillLevelMap": {
                "10231": 3,
                "10232": 3,
                "10235": 4
            },
            "proudSkillExtraLevelMap": {
                "2339": 3
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1612757090,
            "pendingPromoteRewardList": [
                5
            ],
            "excelInfo": {
                "prefabPathHash": "825477684262",
                "prefabPathRemoteHash": "643526266627",
                "controllerPathHash": "826471660822",
                "controllerPathRemoteHash": "308460462696",
                "combatConfigHash": "335468469250"
            }
        },
        {
            "avatarId": 10000015,
            "guid": "2664326143951241725",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "3",
                    "val": "3"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "50",
                    "val": "50"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951372981"
            ],
            "fightPropMap": {
                "1": 6860.1279296875,
                "4": 397.3356628417969,
                "6": 0.2681100070476532,
                "7": 466.76348876953125,
                "20": 0.05000000074505806,
                "21": 0,
                "22": 0.5,
                "23": 1.1333000659942627,
                "26": 0,
                "27": 0,
                "28": 0,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "75": 60,
                "1010": 150,
                "2000": 6860.1279296875,
                "2001": 503.8653564453125,
                "2002": 466.76348876953125,
                "2003": 0
            },
            "skillDepotId": 1501,
            "fetterInfo": {
                "expNumber": 510,
                "expLevel": 1,
                "fetterList": [
                    {
                        "fetterId": 107,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 7100,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7101,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7102,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7103,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 7104,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7202,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7105,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7203,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7106,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7204,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7107,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7205,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7108,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7206,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7109,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7207,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7110,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7402,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7208,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7111,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7403,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7112,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7113,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7114,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7115,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7116,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7117,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7118,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7119,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7147,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7148,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7149,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7150,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7151,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7152,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7154,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7155,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7156,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7165,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7166,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7144,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7167,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7120,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7146,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7169,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7122,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7158,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7145,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7168,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7121,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7157,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7164,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7163,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7162,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7159,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7143,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7142,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7141,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7140,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7139,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7138,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7137,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7136,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7135,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7134,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7133,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7132,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7131,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7130,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 7129,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7128,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7127,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7126,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7125,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7124,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 7123,
                        "fetterState": 1
                    }
                ]
            },
            "inherentProudSkillList": [
                152101,
                152301
            ],
            "skillLevelMap": {
                "10073": 1,
                "10074": 1,
                "10075": 1
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1612759194,
            "pendingPromoteRewardList": [
                5
            ],
            "excelInfo": {
                "prefabPathHash": "443859521324",
                "prefabPathRemoteHash": "105192364260",
                "controllerPathHash": "533295279660",
                "controllerPathRemoteHash": "744256261197",
                "combatConfigHash": "936334819121"
            }
        },
        {
            "avatarId": 10000006,
            "guid": "2664326143951241978",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "5",
                    "val": "5"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "80",
                    "val": "80"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951395730"
            ],
            "talentIdList": [
                41
            ],
            "fightPropMap": {
                "1": 8481.26171875,
                "3": 0.07660000026226044,
                "4": 243.9175567626953,
                "7": 508.09808349609375,
                "20": 0.05000000074505806,
                "21": 0,
                "22": 0.5,
                "23": 1,
                "26": 0,
                "27": 0,
                "28": 72,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "71": 80,
                "1010": 9130.92578125,
                "2000": 9130.92578125,
                "2001": 243.9175567626953,
                "2002": 508.09808349609375,
                "2003": 0
            },
            "skillDepotId": 601,
            "fetterInfo": {
                "expNumber": 420,
                "expLevel": 2,
                "fetterList": [
                    {
                        "fetterId": 5167,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5166,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5165,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5164,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5114,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5139,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5203,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5106,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5113,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5138,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 5105,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5403,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5112,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5137,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 5104,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5208,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5111,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5136,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5103,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5207,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5110,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5135,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5102,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5141,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5142,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5143,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5144,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5145,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5146,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5147,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5100,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 104,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 5148,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5101,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5149,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5150,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5160,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5161,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5140,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5163,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5116,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5152,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5157,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5162,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5115,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5151,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5156,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5206,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5109,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5155,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5205,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5108,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5154,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5204,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5107,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5153,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5127,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5126,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5125,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5124,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5123,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5122,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5118,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5117,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5119,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5120,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5121,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5128,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5129,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 5130,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5131,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5132,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5133,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 5134,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                42101,
                42201,
                42301
            ],
            "skillLevelMap": {
                "10060": 6,
                "10061": 8,
                "10062": 4
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1612760584,
            "excelInfo": {
                "prefabPathHash": "362726709520",
                "prefabPathRemoteHash": "55333124409",
                "controllerPathHash": "158014433758",
                "controllerPathRemoteHash": "1081081079811",
                "combatConfigHash": "893237700425"
            }
        },
        {
            "avatarId": 10000031,
            "guid": "2664326143951244729",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "12376",
                    "val": "12376"
                },
                "1002": {
                    "type": 1002,
                    "ival": "3",
                    "val": "3"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "51",
                    "val": "51"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951547210",
                "2664326143951587863",
                "2664326143951243214"
            ],
            "talentIdList": [
                311,
                312,
                313,
                314
            ],
            "fightPropMap": {
                "1": 5480.75537109375,
                "2": 4780,
                "3": 0.05249999836087227,
                "4": 411.5368957519531,
                "5": 87.86000061035156,
                "6": 0.2249000072479248,
                "7": 354.1550598144531,
                "9": 0.050999999046325684,
                "20": 0.1550000011920929,
                "21": 0,
                "22": 0.5544000267982483,
                "23": 1.103600025177002,
                "26": 0,
                "27": 0,
                "28": 107.24400329589844,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "71": 60,
                "1001": 60,
                "1010": 1507.210205078125,
                "2000": 10548.4951171875,
                "2001": 591.9515380859375,
                "2002": 372.21697998046875,
                "2003": 0
            },
            "skillDepotId": 3101,
            "fetterInfo": {
                "expNumber": 2480,
                "expLevel": 4,
                "fetterList": [
                    {
                        "fetterId": 19202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 19201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 19027,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19026,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 19025,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 19024,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 19023,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19022,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19021,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19020,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19019,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19018,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19017,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19016,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19403,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19015,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19208,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 19014,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19207,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 19013,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19206,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 19012,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19037,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19036,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19035,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 119,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 19034,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19033,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19049,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 19048,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 19047,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19045,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19046,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19032,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19055,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19044,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19031,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19054,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19043,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19052,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19029,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19030,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19053,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19051,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19028,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19050,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19038,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 19039,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 19040,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19041,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19042,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19056,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19203,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 19009,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19057,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19204,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 19010,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19058,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19205,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 19011,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19059,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19060,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19061,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19062,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19063,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19064,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19067,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19068,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19069,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19070,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19072,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19073,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 19074,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                312101,
                312301
            ],
            "skillLevelMap": {
                "10311": 2,
                "10312": 4,
                "10313": 1
            },
            "proudSkillExtraLevelMap": {
                "3132": 3
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1612902243,
            "pendingPromoteRewardList": [
                5
            ],
            "excelInfo": {
                "prefabPathHash": "837258450988",
                "prefabPathRemoteHash": "379666065639",
                "controllerPathHash": "866604873684",
                "controllerPathRemoteHash": "785800102101",
                "combatConfigHash": "760350024768"
            }
        },
        {
            "avatarId": 10000014,
            "guid": "2664326143951250713",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "62382",
                    "val": "62382"
                },
                "1002": {
                    "type": 1002,
                    "ival": "3",
                    "val": "3"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "54",
                    "val": "54"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951546542",
                "2664326143951701785",
                "2664326143951616055",
                "2664326143951685161",
                "2664326143951449994",
                "2664326143951542147"
            ],
            "talentIdList": [
                141,
                142,
                143,
                144
            ],
            "fightPropMap": {
                "1": 6041.0029296875,
                "2": 6094.509765625,
                "3": 0.21329998970031738,
                "4": 444.9748840332031,
                "5": 47,
                "6": 0.6525200009346008,
                "7": 412.8412780761719,
                "20": 0.20170000195503235,
                "21": 0,
                "22": 0.9194999933242798,
                "23": 1.3174999952316284,
                "26": 0,
                "27": 0,
                "28": 170.60000610351562,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0.07000000029802322,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "72": 80,
                "1002": 80,
                "1010": 13424.05859375,
                "2000": 13424.05859375,
                "2001": 782.3298950195312,
                "2002": 412.8412780761719,
                "2003": 0
            },
            "skillDepotId": 1401,
            "fetterInfo": {
                "expNumber": 65,
                "expLevel": 1,
                "fetterList": [
                    {
                        "fetterId": 6166,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6165,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6164,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6163,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6162,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6161,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6160,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6159,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6134,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6133,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6132,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6131,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6130,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6129,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6128,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6127,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6126,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6125,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6100,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6147,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6101,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6148,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6102,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6149,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6103,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6150,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 6104,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6151,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6402,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6208,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6111,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6403,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6112,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6113,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6115,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6114,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6156,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6206,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6109,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6207,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6110,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6155,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6205,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6108,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6154,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6204,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6107,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6153,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6203,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6106,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6152,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6202,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6105,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6146,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6145,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6144,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6143,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6142,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6141,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6140,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6139,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6138,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6137,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6136,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6135,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6122,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6121,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 106,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 6120,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6119,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6118,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6117,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 6116,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6123,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 6124,
                        "fetterState": 1
                    }
                ]
            },
            "inherentProudSkillList": [
                142101,
                142301
            ],
            "skillLevelMap": {
                "10070": 1,
                "10071": 4,
                "10072": 1
            },
            "proudSkillExtraLevelMap": {
                "1439": 3
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1613852838,
            "pendingPromoteRewardList": [
                5
            ],
            "costumeId": 201401,
            "excelInfo": {
                "prefabPathHash": "269693068810",
                "prefabPathRemoteHash": "133154589734",
                "controllerPathHash": "495771146562",
                "controllerPathRemoteHash": "216786570977",
                "combatConfigHash": "476518862698"
            }
        },
        {
            "avatarId": 10000065,
            "guid": "2664326143951252776",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "6",
                    "val": "6"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "90",
                    "val": "90"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951435645",
                "2664326143951377150",
                "2664326143951419033",
                "2664326143951354599",
                "2664326143951423493",
                "2664326143951244698"
            ],
            "talentIdList": [
                651,
                652,
                653,
                654,
                655,
                656
            ],
            "fightPropMap": {
                "1": 12397.404296875,
                "2": 5825.6396484375,
                "3": 0.17489999532699585,
                "4": 755.9412231445312,
                "5": 349.42999267578125,
                "6": 0.8614000082015991,
                "7": 771.2493286132812,
                "8": 57.869998931884766,
                "9": 0.06560000032186508,
                "20": 0.14329999685287476,
                "21": 0,
                "22": 0.8341000080108643,
                "23": 1.998400092124939,
                "26": 0,
                "27": 0,
                "28": 109.56999969482422,
                "29": 0,
                "30": 0.344857782125473,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "71": 60, // 71 electro
                // 70 pyro
                // 72 hydro
                // and.. more
                "1010": 13479.236328125,
                "1001": 100,

                // 1001 electro
                // 1000 pyro
                // 1002 hydro
                
                
                
                "2000": 20391.3515625,
                "2001": 1756.5390625,
                "2002": 879.7133178710938,
                "2003": 0
            },
            "skillDepotId": 6501,
            "fetterInfo": {
                "expLevel": 10,
                "rewardedFetterLevelList": [
                    10
                ],
            },
            "inherentProudSkillList": [
                652101,
                652201,
                652301
            ],
            "skillLevelMap": {
                "10651": 4,
                "10652": 4,
                "10653": 9,
                "10654": 9,
                "10655": 9,
                "10656": 9,
                "10657": 9,
                "10658": 9,
                "10659": 9
            },
            "proudSkillExtraLevelMap": {
                "6531": 3,
                "6532": 3,
                "6539": 3
            },
            "avatarType": 1,
            "wearingFlycloakId": 140004,
            "bornTime": 1614097370,
            "excelInfo": {}
        },
        {
            "avatarId": 10000025,
            "guid": "2664326143951256400",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "5",
                    "val": "5"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "80",
                    "val": "80"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951441501",
                "2664326143951478008",
                "2664326143951419304",
                "2664326143951325515",
                "2664326143951473286",
                "2664326143951381790"
            ],
            "talentIdList": [
                251,
                252,
                253,
                254,
                255,
                256
            ],
            "fightPropMap": {
                "1": 9059.529296875,
                "2": 5526.8798828125,
                "3": 0.3089999854564667,
                "4": 622.098388671875,
                "5": 405.5299987792969,
                "6": 0.7193999886512756,
                "7": 671.415283203125,
                "8": 16.200000762939453,
                "9": 0.2842000126838684,
                "20": 0.27160000801086426,
                "21": 0,
                "22": 1.6036999225616455,
                "23": 1.7098984718322754,
                "26": 0,
                "27": 0,
                "28": 80,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0.6980000138282776,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "72": 80,
                "1002": 80,
                "1010": 5635.44091796875,
                "2000": 17385.8046875,
                "2001": 1475.166015625,
                "2002": 878.4314575195312,
                "2003": 0
            },
            "skillDepotId": 2501,
            "fetterInfo": {
                "expNumber": 3165,
                "expLevel": 5,
                "fetterList": [
                    {
                        "fetterId": 13201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 13202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 13063,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13062,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13061,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13060,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13059,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13058,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13057,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13056,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13055,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 13054,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13053,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13052,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13051,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13050,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13049,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13048,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13047,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13046,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13045,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 13044,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13043,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13042,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13041,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13016,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13403,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 114,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 13015,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13208,
                        "fetterState": 1,
                        "condIndexList": [
                            2
                        ]
                    },
                    {
                        "fetterId": 13014,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13207,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 13013,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13206,
                        "fetterState": 1,
                        "condIndexList": [
                            2
                        ]
                    },
                    {
                        "fetterId": 13012,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13205,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 13011,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13080,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13033,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13064,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13017,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13065,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13018,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13066,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13019,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13075,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13028,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13076,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13029,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13077,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13030,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13204,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 13010,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13079,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13032,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13068,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13021,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13203,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 13009,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13078,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13031,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13067,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13020,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13074,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13027,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13073,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13026,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13072,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13025,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 13069,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13022,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13023,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13024,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13034,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13035,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13036,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13037,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13038,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 13039,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 13040,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                252101,
                252201,
                252301
            ],
            "skillLevelMap": {
                "10381": 2,
                "10382": 7,
                "10385": 7
            },
            "proudSkillExtraLevelMap": {
                "2532": 3,
                "2539": 3
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1614382328,
            "excelInfo": {
                "prefabPathHash": "60295706774",
                "prefabPathRemoteHash": "174079047914",
                "controllerPathHash": "1092330510148",
                "controllerPathRemoteHash": "169787480951",
                "combatConfigHash": "529772651469"
            }
        },
        {
            "avatarId": 10000041,
            "guid": "2664326143951265546",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "5",
                    "val": "5"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "80",
                    "val": "80"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951456668",
                "2664326143951682295",
                "2664326143951466034",
                "2664326143951595475",
                "2664326143951249905"
            ],
            "fightPropMap": {
                "1": 9183.6455078125,
                "2": 5180.6298828125,
                "3": 0.14569999277591705,
                "4": 701.908935546875,
                "5": 95.6300048828125,
                "6": 0.290800005197525,
                "7": 576.3662109375,
                "8": 46.29999923706055,
                "20": 0.84270000047683716,
                "21": 0,
                "22": 1.3370000123977661,
                "23": 1.8810999393463135,
                "26": 0,
                "27": 0,
                "28": 0,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0.4659999907016754,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "72": 60,
                "1002": 60,
                "1010": 6101.8681640625,
                "2000": 15702.33203125,
                "2001": 1001.654052734375,
                "2002": 622.6661987304688,
                "2003": 0
            },
            "skillDepotId": 4101,
            "fetterInfo": {
                "expLevel": 10,
                "rewardedFetterLevelList": [
                    10
                ],
                "fetterList": [
                    {
                        "fetterId": 30202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 30201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 128,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 30073,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30072,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30056,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30058,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30059,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30060,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30061,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30062,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30063,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30066,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30067,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30068,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30069,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30070,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30071,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30033,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30034,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30035,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30036,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30037,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30038,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30039,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30040,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30041,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30042,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30043,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30044,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30051,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30052,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30053,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30055,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30054,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30050,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30049,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 30048,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30047,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30046,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30045,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30032,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30031,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30030,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30029,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30028,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30027,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30026,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30025,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30024,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30023,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30022,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30021,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30020,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30019,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30018,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30017,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30016,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30403,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30015,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30208,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 30014,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30207,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 30013,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30206,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 30012,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30205,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 30011,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30204,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 30010,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 30203,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 30009,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                412101,
                412201,
                412301
            ],
            "skillLevelMap": {
                "10411": 4,
                "10412": 4,
                "10413": 1,
                "10415": 7
            },
            "avatarType": 1,
            "wearingFlycloakId": 140004,
            "bornTime": 1614701411,
            "excelInfo": {
                "prefabPathHash": "1081945137365",
                "prefabPathRemoteHash": "269134172119",
                "controllerPathHash": "637483250546",
                "controllerPathRemoteHash": "706255866929",
                "combatConfigHash": "985941251525"
            }
        },
        {
            "avatarId": 10000036,
            "guid": "2664326143951268193",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "533",
                    "val": "533"
                },
                "1002": {
                    "type": 1002,
                    "ival": "3",
                    "val": "3"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "50",
                    "val": "50"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951373091"
            ],
            "talentIdList": [
                361,
                362,
                363
            ],
            "fightPropMap": {
                "1": 6475.44775390625,
                "4": 170.22152709960938,
                "6": 0.19659999012947083,
                "7": 382.26324462890625,
                "20": 0.05000000074505806,
                "21": 0,
                "22": 0.5,
                "23": 1,
                "26": 0,
                "27": 0,
                "28": 0,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "75": 40,
                "1005": 40,
                "1010": 6475.44775390625,
                "2000": 6475.44775390625,
                "2001": 203.68707275390625,
                "2002": 382.26324462890625,
                "2003": 0
            },
            "skillDepotId": 3601,
            "fetterInfo": {
                "expNumber": 270,
                "expLevel": 4,
                "fetterList": [
                    {
                        "fetterId": 22202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 22201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 22027,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22026,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22025,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22024,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22023,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 22022,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22021,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22020,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22019,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22018,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22017,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22028,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22203,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 22009,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22029,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22034,
                        "fetterState": 1,
                        "condIndexList": [
                            1
                        ]
                    },
                    {
                        "fetterId": 22035,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22036,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22037,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22038,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 22039,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 22040,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22041,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22042,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22043,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22044,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22051,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22052,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22053,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22055,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22054,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22050,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22049,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22071,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22048,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 22047,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 124,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 22046,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22045,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22070,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22069,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22068,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22067,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22066,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22065,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22062,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22403,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22015,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22061,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22208,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 22014,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22060,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22207,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 22013,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22059,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22206,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 22012,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22058,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22205,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 22011,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22057,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22204,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 22010,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22056,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22016,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22033,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22032,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22031,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 22030,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                362101,
                362301
            ],
            "skillLevelMap": {
                "10401": 1,
                "10402": 1,
                "10403": 1
            },
            "proudSkillExtraLevelMap": {
                "3639": 3
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1614726364,
            "pendingPromoteRewardList": [
                5
            ],
            "excelInfo": {
                "prefabPathHash": "342300179735",
                "prefabPathRemoteHash": "81062867606",
                "controllerPathHash": "161686199643",
                "controllerPathRemoteHash": "1054630840221",
                "combatConfigHash": "1023058155484"
            }
        },
        {
            "avatarId": 10000027,
            "guid": "2664326143951334210",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "4",
                    "val": "4"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "70",
                    "val": "70"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951697270",
                "2664326143951696654",
                "2664326143951696256",
                "2664326143951602118",
                "2664326143951696109",
                "2664326143951291384"
            ],
            "talentIdList": [
                271,
                272,
                273,
                274
            ],
            "fightPropMap": {
                "1": 7560.611328125,
                "2": 2300.39990234375,
                "4": 753.9234619140625,
                "5": 361.58001708984375,
                "6": 1.1348799467086792,
                "7": 442.8780822753906,
                "8": 16.200000762939453,
                "9": 0.12389999628067017,
                "20": 0.45820000767707825,
                "21": 0,
                "22": 0.8184999823570251,
                "23": 1.2267000675201416,
                "26": 0,
                "27": 0,
                "28": 109.55999755859375,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0.5859999656677246,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "76": 40,
                "81": 0.3499999940395355,
                "1006": 40,
                "1010": 9861.01171875,
                "2000": 9861.01171875,
                "2001": 1971.1162109375,
                "2002": 513.9506225585938,
                "2003": 0
            },
            "skillDepotId": 2701,
            "fetterInfo": {
                "expNumber": 320,
                "expLevel": 2,
                "fetterList": [
                    {
                        "fetterId": 15169,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15168,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15167,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15166,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15165,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15164,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15163,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15162,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15161,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15158,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15157,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15156,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15155,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15154,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15153,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15152,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 116,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 15151,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15150,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15149,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15148,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15147,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15102,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15103,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 15104,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 15105,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15203,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15106,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15204,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15107,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15205,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15108,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15206,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15109,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15207,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15110,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15208,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15111,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15120,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15121,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15122,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15101,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15124,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15113,
                        "fetterState": 1,
                        "condIndexList": [
                            2
                        ]
                    },
                    {
                        "fetterId": 15100,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15123,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15403,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15112,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15119,
                        "fetterState": 1,
                        "condIndexList": [
                            2
                        ]
                    },
                    {
                        "fetterId": 15118,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15115,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15114,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15116,
                        "fetterState": 1,
                        "condIndexList": [
                            2
                        ]
                    },
                    {
                        "fetterId": 15117,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15125,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15126,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15127,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15128,
                        "fetterState": 1,
                        "condIndexList": [
                            2
                        ]
                    },
                    {
                        "fetterId": 15129,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15130,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15131,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15132,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15133,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15134,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15135,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15136,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15137,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 15138,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15139,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15140,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15141,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15142,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15143,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15144,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15145,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 15146,
                        "fetterState": 1
                    }
                ]
            },
            "inherentProudSkillList": [
                272101,
                272201,
                272301
            ],
            "skillLevelMap": {
                "10271": 6,
                "10272": 1,
                "10274": 4
            },
            "proudSkillExtraLevelMap": {
                "2739": 3
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1616717116,
            "pendingPromoteRewardList": [
                5
            ],
            "excelInfo": {
                "prefabPathHash": "408919319478",
                "prefabPathRemoteHash": "281715524542",
                "controllerPathHash": "1034176675621",
                "controllerPathRemoteHash": "256343594697",
                "combatConfigHash": "160533559706"
            }
        },
        {
            "avatarId": 10000045,
            "guid": "2664326143951372979",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "8859",
                    "val": "8859"
                },
                "1002": {
                    "type": 1002,
                    "ival": "3",
                    "val": "3"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "52",
                    "val": "52"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951324379"
            ],
            "talentIdList": [
                451,
                452,
                453,
                454,
                455,
                456
            ],
            "fightPropMap": {
                "1": 7414.8115234375,
                "4": 423.27191162109375,
                "6": 0.11999999731779099,
                "7": 428.29742431640625,
                "20": 0.05000000074505806,
                "21": 0,
                "22": 0.5,
                "23": 1,
                "26": 0,
                "27": 0,
                "28": 0,
                "29": 0,
                "30": 0.47757306694984436,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "75": 60,
                "1005": 60,
                "1010": 5582.6513671875,
                "2000": 7414.8115234375,
                "2001": 474.0645446777344,
                "2002": 428.29742431640625,
                "2003": 0
            },
            "skillDepotId": 4501,
            "fetterInfo": {
                "expNumber": 2625,
                "expLevel": 5,
                "fetterList": [
                    {
                        "fetterId": 37202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 37201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 133,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 37303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37206,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 37012,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37207,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 37013,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37208,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 37014,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37403,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37015,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37016,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37017,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37018,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37019,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37020,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37021,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37022,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37023,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37024,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 37025,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 37026,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37027,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37028,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37053,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37054,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37058,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37205,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 37011,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37059,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37060,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37061,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37062,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37063,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37064,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37055,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37203,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 37009,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37056,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37204,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 37010,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37057,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37073,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37072,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37074,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37071,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37070,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37069,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37068,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37067,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37052,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 37051,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 37050,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37049,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37048,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37047,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37046,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37045,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37044,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37043,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 37042,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37041,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37040,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37039,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37038,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37037,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37036,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37035,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37034,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37033,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37032,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37031,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37030,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 37029,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                452101,
                452301
            ],
            "skillLevelMap": {
                "10451": 4,
                "10452": 4,
                "10453": 4
            },
            "proudSkillExtraLevelMap": {
                "4532": 3,
                "4539": 3
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1617750142,
            "pendingPromoteRewardList": [
                5
            ],
            "excelInfo": {
                "prefabPathHash": "18323678429",
                "prefabPathRemoteHash": "110684845547",
                "controllerPathHash": "486263233140",
                "controllerPathRemoteHash": "979725649350",
                "combatConfigHash": "579463256291"
            }
        },
        {
            "avatarId": 10000060,
            "guid": "2664326143951372989",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "6",
                    "val": "6"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "90",
                    "val": "90"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951380870",
                "2664326143951381046",
                "2664326143951368326",
                "2664326143951564072",
                "2664326143951367207",
                "2664326143951246184"
            ],
            "talentIdList": [
                601,
                602,
                603,
                604,
                605,
                606
            ],
            "fightPropMap": {
                "1": 13103.125,
                "2": 4780,
                "3": 0.43719998002052307,
                "4": 810.970703125,
                "5": 384.92999267578125,
                "6": 0.8794599771499634,
                "7": 814.6676025390625,
                "8": 34.720001220703125,
                "9": 0.12389999628067017,
                "20": 0.4116000235080719,
                "21": 0,
                "22": 1.7125999927520752,
                "23": 1.051800012588501,
                "26": 0,
                "27": 0,
                "28": 18.649999618530273,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0.9039999842643738,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "72": 60,
                "1002":100,  // Yelan Q
                "1010": 21250.62890625,
                "2000": 23611.810546875,
                "2001": 1909.116943359375,
                "2002": 950.3248291015625,
                "2003": 0
            },
            "skillDepotId": 6001,
            "fetterInfo": {
                "expLevel": 10,
                "rewardedFetterLevelList": [
                    10
                ],
            },
            "inherentProudSkillList": [
                602101,
                602201,
                602301
            ],
            "skillLevelMap": {
                "10601": 10,
                "10602": 10,
                "10603": 10,
                "10604": 10,
                "10605": 10,
                "10606": 10,
                "10607": 10,
                "10608": 10,
                "10609": 10,
                "10610": 10
            },
            "proudSkillExtraLevelMap": {
                "6031": 1
            },
            "avatarType": 1,
            "wearingFlycloakId": 140006,
            "bornTime": 1617750142,
            "excelInfo": {
            }
        },
        {
            "avatarId": 10000016,
            "guid": "2664326143951388445",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "5",
                    "val": "5"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "80",
                    "val": "80"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951390169",
                "2664326143951456954",
                "2664326143951491814",
                "2664326143951331819",
                "2664326143951427466",
                "2664326143951259998"
            ],
            "talentIdList": [
                161,
                162
            ],
            "fightPropMap": {
                "1": 11452.546875,
                "2": 5317.75,
                "3": 0.1608000099658966,
                "4": 792.1538696289062,
                "5": 311,
                "6": 0.7450999617576599,
                "7": 691.639404296875,
                "8": 110.16999816894531,
                "9": 0.2915000021457672,
                "20": 0.31449997425079346,
                "21": 0,
                "22": 1.4951000213623047,
                "23": 1.2202000617980957,
                "26": 0,
                "27": 0,
                "28": 75.52999877929688,
                "29": 0,
                "30": 0,
                "40": 0.6159999966621399,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "70": 40,
                "1000": 29.973041534423828,
                "1010": 15406.62109375,
                "2000": 18611.8671875,
                "2001": 1693.3876953125,
                "2002": 1003.4222412109375,
                "2003": 0
            },
            "skillDepotId": 1601,
            "fetterInfo": {
                "expLevel": 10,
                "rewardedFetterLevelList": [
                    10
                ],
                "fetterList": [
                    {
                        "fetterId": 8100,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8101,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8102,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8103,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 8104,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 8105,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8203,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 8106,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8204,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 8107,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8205,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 8108,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8206,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 8109,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8207,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 8110,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8208,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 8111,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8138,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8139,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 8140,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8141,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8142,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8143,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8144,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8145,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8146,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8147,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8156,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8157,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8158,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8137,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8160,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8113,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8149,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8136,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 108,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 8159,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8403,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8112,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8148,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8155,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8154,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8151,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8150,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8135,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8134,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8133,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8132,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8131,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8130,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8129,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8128,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8127,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8126,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8125,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8124,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8123,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8122,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8121,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8120,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8119,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8118,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8117,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8116,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8115,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 8114,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                162101,
                162201,
                162301
            ],
            "skillLevelMap": {
                "10160": 5,
                "10161": 4,
                "10165": 4
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1618079084,
            "excelInfo": {
                "prefabPathHash": "740849332019",
                "prefabPathRemoteHash": "965355449239",
                "controllerPathHash": "376120390116",
                "controllerPathRemoteHash": "932003163944",
                "combatConfigHash": "182507267808"
            }
        },
        {
            "avatarId": 10000042,
            "guid": "2664326143951415061",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "4",
                    "val": "4"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "70",
                    "val": "70"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951685524",
                "2664326143951675935",
                "2664326143951682106",
                "2664326143951456833",
                "2664326143951707009",
                "2664326143951564288"
            ],
            "talentIdList": [
                421
            ],
            "fightPropMap": {
                "1": 10025.1943359375,
                "2": 6154.259765625,
                "3": 0.30320000648498535,
                "4": 692.20751953125,
                "5": 324.6199951171875,
                "6": 1.045720100402832,
                "7": 611.541015625,
                "8": 74.06999969482422,
                "9": 0.07289999723434448,
                "20": 0.2093999981880188,
                "21": 0,
                "22": 2.1649999618530273,
                "23": 1.0648000240325928,
                "26": 0,
                "27": 0,
                "28": 37.29999923706055,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0.4659999907016754,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "71": 40,
                "1001": 40,
                "1010": 18675.611328125,
                "2000": 19219.09375,
                "2001": 1740.682861328125,
                "2002": 730.1923828125,
                "2003": 0
            },
            "skillDepotId": 4201,
            "fetterInfo": {
                "expNumber": 2500,
                "expLevel": 6,
                "fetterList": [
                    {
                        "fetterId": 32202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 32201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 32086,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32085,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32035,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32034,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32033,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32032,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32031,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32030,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32029,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32028,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32027,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32026,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32025,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32024,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32023,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32022,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32021,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32020,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32019,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32018,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32017,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32016,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32403,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32015,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32208,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 32014,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32207,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 32013,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32206,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 32012,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32205,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 32011,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32204,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 32010,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32203,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 32009,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32071,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32056,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32057,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32036,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32083,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32037,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32084,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32038,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32039,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32040,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32087,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32041,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 129,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 32042,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32043,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32044,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32051,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32052,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32053,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32055,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32054,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32050,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32049,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32048,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32047,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32046,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32068,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32045,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32082,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32081,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32080,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32079,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32076,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32075,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32073,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32072,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32074,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32058,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32059,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32060,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32061,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 32062,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32063,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32064,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32065,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32066,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32067,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32069,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 32070,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                422101,
                422201,
                422301
            ],
            "skillLevelMap": {
                "10421": 6,
                "10422": 6,
                "10425": 6
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1618597584,
            "pendingPromoteRewardList": [
                5
            ],
            "excelInfo": {
                "prefabPathHash": "513109309730",
                "prefabPathRemoteHash": "26697866215",
                "controllerPathHash": "664801677487",
                "controllerPathRemoteHash": "1033226418192",
                "combatConfigHash": "927565649365"
            }
        },
        {
            "avatarId": 10000039,
            "guid": "2664326143951442672",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "16947",
                    "val": "16947"
                },
                "1002": {
                    "type": 1002,
                    "ival": "3",
                    "val": "3"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "59",
                    "val": "59"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951450067",
                "2664326143951547141",
                "2664326143951542355",
                "2664326143951391256",
                "2664326143951313125"
            ],
            "talentIdList": [
                391,
                392,
                393,
                394
            ],
            "fightPropMap": {
                "1": 6238.1396484375,
                "2": 3836,
                "3": 0.4099000096321106,
                "4": 390.4377746582031,
                "5": 66.44999694824219,
                "6": 0.227400004863739,
                "7": 391.512451171875,
                "8": 39.349998474121094,
                "20": 0.1160999983549118,
                "21": 0,
                "22": 1.25409996509552,
                "23": 1.2364674806594849,
                "26": 0.15000000596046448,
                "27": 0,
                "28": 100.23999786376953,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0.11999999731779099,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "75": 80,
                "1005": 80,
                "1010": 12546.962890625,
                "2000": 12631.15234375,
                "2001": 545.67333984375,
                "2002": 430.8624572753906,
                "2003": 0
            },
            "skillDepotId": 3901,
            "fetterInfo": {
                "expNumber": 3385,
                "expLevel": 6,
                "fetterList": [
                    {
                        "fetterId": 34202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 34201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 127,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 34040,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34039,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34047,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34046,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34045,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34044,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34043,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34042,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34041,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34038,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34037,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34034,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34078,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34033,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34032,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34031,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34075,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34030,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34074,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34029,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34073,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34028,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34027,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34026,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34070,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34025,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34069,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34024,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34054,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 34053,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34052,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34051,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34050,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34055,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 34203,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 34009,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34056,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34048,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34071,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34083,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34036,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34049,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34072,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34085,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34084,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34205,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 34011,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34058,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34080,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34082,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34035,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34204,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 34010,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34057,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34079,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34081,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34206,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 34012,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34059,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34207,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 34013,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34060,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34208,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 34014,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34061,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34403,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34015,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34062,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34016,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34063,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34017,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34064,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34018,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34065,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34019,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34066,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34020,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34067,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34021,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34068,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34022,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 34023,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                392101,
                392301
            ],
            "skillLevelMap": {
                "10391": 1,
                "10392": 3,
                "10395": 3
            },
            "proudSkillExtraLevelMap": {
                "3939": 3
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1619646073,
            "pendingPromoteRewardList": [
                5
            ],
            "excelInfo": {
                "prefabPathHash": "20417938162",
                "prefabPathRemoteHash": "682419231537",
                "controllerPathHash": "1098970219322",
                "controllerPathRemoteHash": "72341147305",
                "combatConfigHash": "431069984096"
            }
        },
        {
            "avatarId": 10000020,
            "guid": "2664326143951460349",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "3",
                    "val": "3"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "50",
                    "val": "50"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951638367",
                "2664326143951621952",
                "2664326143951453247"
            ],
            "talentIdList": [
                201
            ],
            "fightPropMap": {
                "1": 7052.46826171875,
                "2": 926.1300048828125,
                "4": 176.4824981689453,
                "5": 35.01000213623047,
                "7": 442.62060546875,
                "20": 0.08889999985694885,
                "21": 0,
                "22": 0.5698999762535095,
                "23": 1.103600025177002,
                "26": 0,
                "27": 0,
                "28": 0,
                "29": 0,
                "30": 0.3325999975204468,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "71": 80,
                "1001": 70.1912841796875,
                "1010": 2076.936767578125,
                "2000": 7978.59814453125,
                "2001": 211.49249267578125,
                "2002": 442.62060546875,
                "2003": 0
            },
            "skillDepotId": 2001,
            "fetterInfo": {
                "expNumber": 50,
                "expLevel": 1,
                "fetterList": [
                    {
                        "fetterId": 9202,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9105,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 9104,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9103,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9102,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9101,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9100,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9119,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9118,
                        "fetterState": 1,
                        "condIndexList": [
                            2
                        ]
                    },
                    {
                        "fetterId": 9117,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9116,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9115,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9114,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9113,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9403,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9112,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9140,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9141,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9142,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9143,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9144,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9145,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9146,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9147,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9148,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9149,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9158,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9402,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9208,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9111,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9159,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9160,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9139,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9162,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9151,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9138,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9161,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9150,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9157,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9207,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9110,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9156,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9206,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9109,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9153,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9203,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9106,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9152,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9137,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9136,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9135,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9134,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9133,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9132,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9131,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 109,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 9130,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9129,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9128,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9127,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9126,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9125,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9124,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9123,
                        "fetterState": 1,
                        "condIndexList": [
                            2
                        ]
                    },
                    {
                        "fetterId": 9122,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9121,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9120,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9205,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9108,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 9204,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 9107,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                202101,
                202301
            ],
            "skillLevelMap": {
                "10201": 1,
                "10202": 1,
                "10203": 1
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1620103952,
            "pendingPromoteRewardList": [
                5
            ],
            "excelInfo": {
                "prefabPathHash": "287611953712",
                "prefabPathRemoteHash": "1035546684047",
                "controllerPathHash": "787805685604",
                "controllerPathRemoteHash": "738814618720",
                "combatConfigHash": "179900643858"
            }
        },
        {
            "avatarId": 10000030,
            "guid": "2664326143951479019",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "4",
                    "val": "4"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "70",
                    "val": "70"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951336725",
                "2664326143951481191",
                "2664326143951577623",
                "2664326143951545289",
                "2664326143951599549",
                "2664326143951285785"
            ],
            "fightPropMap": {
                "1": 11243.2080078125,
                "2": 5945.1396484375,
                "3": 2.0653371810913086,
                "4": 506.591064453125,
                "5": 349.1300048828125,
                "6": 0.2856000065803528,
                "7": 564.4993896484375,
                "8": 79.6300048828125,
                "9": 0.10490000247955322,
                "20": 0.2289000004529953,
                "21": 0,
                "22": 0.9429000020027161,
                "23": 1.152899980545044,
                "26": 0,
                "27": 0,
                "28": 0,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0.14399999380111694,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "76": 40,
                "1006": 100,
                "1010": 27865.51953125,
                "2000": 40409.36328125,
                "2001": 1000.4034423828125,
                "2002": 703.3453979492188,
                "2003": 0
            },
            "skillDepotId": 3001,
            "fetterInfo": {
                "expLevel": 10,
                "rewardedFetterLevelList": [
                    10
                ],
                "fetterList": [
                    {
                        "fetterId": 172001,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 172003,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 172004,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 172005,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 172006,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 172007,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 172008,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 172002,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 118,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17167,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17166,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17165,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17164,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17163,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17162,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17161,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17160,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17157,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17156,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17155,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17154,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17153,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17152,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17151,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17150,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17149,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17148,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17147,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17146,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17118,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17117,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17119,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17120,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17125,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17126,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17127,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17128,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17131,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17138,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17116,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17139,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17123,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17100,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17133,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17124,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17101,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17134,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17137,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17136,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17403,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17112,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17135,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17132,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17102,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17103,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17104,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17105,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17106,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17107,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17108,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17109,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17110,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17111,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17113,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17114,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17115,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17121,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17168,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17122,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17129,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17130,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17140,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17141,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17142,
                        "fetterState": 1,
                        "condIndexList": [
                            2
                        ]
                    },
                    {
                        "fetterId": 17143,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17144,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 17145,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                302101,
                302201,
                302301
            ],
            "skillLevelMap": {
                "10301": 2,
                "10302": 6,
                "10303": 6
            },
            "avatarType": 1,
            "wearingFlycloakId": 140005,
            "bornTime": 1620699348,
            "pendingPromoteRewardList": [
                5
            ],
            "excelInfo": {
                "prefabPathHash": "613941571388",
                "prefabPathRemoteHash": "1009270878742",
                "controllerPathHash": "651151760882",
                "controllerPathRemoteHash": "1019573886117",
                "combatConfigHash": "633834988714"
            }
        },
        {
            "avatarId": 10000024,
            "guid": "2664326143951497760",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "2039",
                    "val": "2039"
                },
                "1002": {
                    "type": 1002,
                    "ival": "3",
                    "val": "3"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "50",
                    "val": "50"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951603743"
            ],
            "talentIdList": [
                241,
                242,
                243
            ],
            "fightPropMap": {
                "1": 7693.6015625,
                "4": 207.51910400390625,
                "7": 382.26324462890625,
                "20": 0.05000000074505806,
                "21": 0,
                "22": 0.5,
                "23": 1.0774670839309692,
                "26": 0,
                "27": 0,
                "28": 0,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0.11999999731779099,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "71": 80,
                "1001": 29.73809242248535,
                "1010": 6644.55908203125,
                "2000": 7693.6015625,
                "2001": 207.51910400390625,
                "2002": 382.26324462890625,
                "2003": 0
            },
            "skillDepotId": 2401,
            "fetterInfo": {
                "expLevel": 1,
                "fetterList": [
                    {
                        "fetterId": 113,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 14168,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14167,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14166,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14165,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14164,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14163,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14162,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14161,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14160,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14157,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14156,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14155,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14154,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14153,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14152,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14151,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14150,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14149,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14148,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14402,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14208,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14111,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14403,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14112,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14113,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14114,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14115,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14116,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14118,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14119,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14204,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14107,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14130,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14205,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14108,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14131,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14120,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14128,
                        "fetterState": 1,
                        "condIndexList": [
                            2
                        ]
                    },
                    {
                        "fetterId": 14401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14207,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14110,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14133,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14122,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14206,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14109,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14132,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14121,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14127,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14126,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14123,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14203,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14106,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14202,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14105,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 14104,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14103,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14102,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14101,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14100,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14147,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14117,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14124,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14125,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14134,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14135,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14136,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14137,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14138,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14139,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14140,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14141,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14142,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14143,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 14144,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14145,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 14146,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                242101,
                242301
            ],
            "skillLevelMap": {
                "10241": 1,
                "10242": 2,
                "10245": 4
            },
            "proudSkillExtraLevelMap": {
                "2432": 3
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1621555232,
            "pendingPromoteRewardList": [
                5
            ],
            "excelInfo": {
                "prefabPathHash": "416348876948",
                "prefabPathRemoteHash": "514719320300",
                "controllerPathHash": "608589799692",
                "controllerPathRemoteHash": "366173440603",
                "combatConfigHash": "136811659922"
            }
        },
        {
            "avatarId": 10000051,
            "guid": "2664326143951497829",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "6",
                    "val": "6"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "90",
                    "val": "90"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951547949",
                "2664326143951524892",
                "2664326143951531745",
                "2664326143951425165",
                "2664326143951548148",
                "2664326143951515253"
            ],
            "fightPropMap": {
                "1": 13225.583984375,
                "2": 5706.1396484375,
                "3": 0.5533999800682068,
                "4": 851.6310424804688,
                "5": 342.1199951171875,
                "6": 0.4489000141620636,
                "7": 750.8776245117188,
                "8": 57.87000274658203,
                "20": 0.7260399460792542,
                "21": 0,
                "22": 1.816499948501587,
                "23": 1.330299973487854,
                "26": 0,
                "27": 0,
                "28": 0,
                "29": 0,
                "30": 1.0829999446868896,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "75": 80,
                "1005": 44.60199737548828,
                "1010": 13225.677734375,
                "2000": 26250.76171875,
                "2001": 1576.0482177734375,
                "2002": 808.7476196289062,
                "2003": 0
            },
            "skillDepotId": 5101,
            "fetterInfo": {
                "expLevel": 10,
                "rewardedFetterLevelList": [
                    10
                ],
                "fetterList": [
                    {
                        "fetterId": 39202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 39201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 39017,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39016,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39403,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39015,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39208,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 39014,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39207,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 39013,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39206,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 39012,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39031,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39030,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39029,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39028,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39027,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39026,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39025,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39024,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39023,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39019,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39018,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39203,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 39009,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39204,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 39010,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39205,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 39011,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39020,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39021,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39022,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 135,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 39032,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39033,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39060,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39061,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39062,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39063,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39064,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39065,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39068,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39069,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39070,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39071,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39078,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39067,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39079,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39080,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39059,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39082,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39035,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39058,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39081,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39034,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39077,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39066,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39076,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39075,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39072,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39057,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39056,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39055,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39054,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39053,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39052,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39051,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39050,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39049,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39048,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39047,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39046,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39045,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39044,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39043,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39042,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39041,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39040,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39039,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39038,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39037,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 39036,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                512101,
                512201,
                512301
            ],
            "skillLevelMap": {
                "10511": 8,
                "10512": 7,
                "10515": 8
            },
            "avatarType": 1,
            "wearingFlycloakId": 140006,
            "bornTime": 1621555727,
            "excelInfo": {
                "prefabPathHash": "668326829204",
                "prefabPathRemoteHash": "72241286790",
                "controllerPathHash": "626565187397",
                "controllerPathRemoteHash": "139749211592",
                "combatConfigHash": "372184831437"
            }
        },
        {
            "avatarId": 10000044,
            "guid": "2664326143951516376",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "3",
                    "val": "3"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "50",
                    "val": "50"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951352610"
            ],
            "talentIdList": [
                441
            ],
            "fightPropMap": {
                "1": 6603.6748046875,
                "4": 185.2478485107422,
                "6": 0.11999999731779099,
                "7": 470.787353515625,
                "9": 0.09560000151395798,
                "20": 0.05000000074505806,
                "21": 0,
                "22": 0.5,
                "23": 1,
                "26": 0,
                "27": 0,
                "28": 0,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "70": 60,
                "1010": 6603.67431640625,
                "2000": 6603.6748046875,
                "2001": 207.4775848388672,
                "2002": 515.7946166992188,
                "2003": 0
            },
            "skillDepotId": 4401,
            "fetterInfo": {
                "expLevel": 1,
                "fetterList": [
                    {
                        "fetterId": 33202,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 33303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33206,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33012,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33205,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33011,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33041,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33040,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33019,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33018,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33017,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33016,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33403,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33015,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33402,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33208,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 131,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 33014,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33207,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33013,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33204,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33010,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33203,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33009,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33047,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33046,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33045,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33054,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33053,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33052,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33051,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33058,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33056,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33057,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33059,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33060,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33069,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33022,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33049,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33072,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33025,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33061,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33050,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33073,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33026,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33062,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33048,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33071,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33024,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33070,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33023,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33068,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33021,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33067,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33020,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33066,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33063,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33055,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33027,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33028,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33029,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33030,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33031,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33032,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33033,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33034,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33035,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33036,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33037,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33038,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33039,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33042,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 33043,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 33044,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                442101,
                442301
            ],
            "skillLevelMap": {
                "10441": 1,
                "10442": 1,
                "10443": 1
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1622557949,
            "pendingPromoteRewardList": [
                5
            ],
            "excelInfo": {
                "prefabPathHash": "106252126644",
                "prefabPathRemoteHash": "381479839174",
                "controllerPathHash": "1049922783922",
                "controllerPathRemoteHash": "396659331352",
                "combatConfigHash": "1036649499780"
            }
        },
        {
            "avatarId": 10000043,
            "guid": "2664326143951520401",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "4",
                    "val": "4"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "70",
                    "val": "70"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951450256",
                "2664326143951556462",
                "2664326143951556387",
                "2664326143951628787",
                "2664326143951563783",
                "2664326143951283847"
            ],
            "talentIdList": [
                431,
                432,
                433,
                434,
                435,
                436
            ],
            "fightPropMap": {
                "1": 7140.57763671875,
                "2": 5228.1298828125,
                "3": 0.19939999282360077,
                "4": 531.9190673828125,
                "5": 402.42999267578125,
                "6": 0.24480000138282776,
                "7": 543.0529174804688,
                "8": 69.44000244140625,
                "9": 0.2915000021457672,
                "20": 0.12000000476837158,
                "21": 0,
                "22": 1.0471999645233154,
                "23": 1.051337183105469,
                "26": 0,
                "27": 0,
                "28": 729.739990234375,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0.27000001072883606,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "74": 80,
                "1004": 80,
                "1010": 5584.6630859375,
                "2000": 13792.5380859375,
                "2001": 1064.562744140625,
                "2002": 770.7928466796875,
                "2003": 0
            },
            "skillMap": {
                "10432": {
                    "maxChargeCount": 2
                }
            },
            "skillDepotId": 4301,
            "fetterInfo": {
                "expNumber": 1310,
                "expLevel": 7,
                "fetterList": [
                    {
                        "fetterId": 31202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 31201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 31075,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31074,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31204,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 31010,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31203,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 31009,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31207,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 31013,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31205,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 31011,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31206,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 31012,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31208,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 31014,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31403,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31015,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31016,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31017,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31018,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31019,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31020,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31021,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31022,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31023,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31024,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31037,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31038,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31039,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31040,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31041,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31042,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31043,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31044,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31051,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31052,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31053,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 31055,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31054,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 130,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 31073,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31026,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31050,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31072,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31025,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31049,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31071,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31048,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31070,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31047,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31046,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31045,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31069,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31068,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31065,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31064,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31063,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31062,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31061,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31060,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31059,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31058,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31057,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31056,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31036,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31035,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31034,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31033,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31032,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31031,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31030,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31029,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31028,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 31027,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                432101,
                432201,
                432301
            ],
            "skillLevelMap": {
                "10431": 2,
                "10432": 4,
                "10435": 4
            },
            "proudSkillExtraLevelMap": {
                "4332": 3,
                "4339": 3
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1622669426,
            "pendingPromoteRewardList": [
                5
            ],
            "excelInfo": {
                "prefabPathHash": "546341495788",
                "prefabPathRemoteHash": "1097750453646",
                "controllerPathHash": "401164961608",
                "controllerPathRemoteHash": "283691368027",
                "combatConfigHash": "32052863980"
            }
        },
        {
            "avatarId": 10000002,
            "guid": "2664326143951600599",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "5",
                    "val": "5"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "80",
                    "val": "80"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951412580",
                "2664326143951412124",
                "2664326143951638442",
                "2664326143951412233",
                "2664326143951332121",
                "2664326143951608767"
            ],
            "fightPropMap": {
                "1": 11344.50390625,
                "2": 6303.64990234375,
                "3": 0.09910000115633011,
                "4": 702.421875,
                "5": 443.2799987792969,
                "6": 0.9687999486923218,
                "7": 691.639404296875,
                "8": 78.71000671386719,
                "9": 0.05829999968409538,
                "20": 0.1160999983549118,
                "21": 0,
                "22": 1.9460999965667725,
                "23": 1.4726999998092651,
                "26": 0,
                "27": 0,
                "28": 0,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0.6159999966621399,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "75": 80,
                "1005": 80,
                "1010": 8746.408203125,
                "2000": 18772.39453125,
                "2001": 1826.2081298828125,
                "2002": 810.6719970703125,
                "2003": 0
            },
            "skillDepotId": 201,
            "fetterInfo": {
                "expNumber": 1760,
                "expLevel": 6,
                "fetterList": [
                    {
                        "fetterId": 3100,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3129,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3128,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3204,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 3107,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3203,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 3106,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 3105,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 3104,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3103,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3102,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3101,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3135,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3134,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3133,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3132,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3131,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3130,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3127,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3126,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3125,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3145,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 3136,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3147,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3148,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3149,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3150,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3151,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3152,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3153,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3154,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3163,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3116,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3164,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3117,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3165,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3118,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3144,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3167,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3120,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3156,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3206,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 3109,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3166,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3119,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3155,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3205,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 101,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 3108,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3162,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3115,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3161,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3114,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3137,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3160,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3113,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3157,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3207,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 3110,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3146,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3138,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3139,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3140,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3141,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3142,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3143,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3208,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 3111,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3403,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3112,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3121,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3122,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3123,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 3124,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                22101,
                22201,
                22301
            ],
            "skillLevelMap": {
                "10013": 1,
                "10018": 6,
                "10019": 8,
                "10024": 7
            },
            "avatarType": 1,
            "wearingFlycloakId": 140006,
            "bornTime": 1628015883,
            "excelInfo": {
                "prefabPathHash": "333586904715",
                "prefabPathRemoteHash": "545186903800",
                "controllerPathHash": "772875223598",
                "controllerPathRemoteHash": "473465558869",
                "combatConfigHash": "367151151437"
            }
        },
        {
            "avatarId": 10000056,
            "guid": "2664326143951643736",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "4",
                    "val": "4"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "70",
                    "val": "70"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951250700"
            ],
            "fightPropMap": {
                "1": 7392.59814453125,
                "4": 551.6078491210938,
                "6": 0.11999999731779099,
                "7": 485.05694580078125,
                "20": 0.05000000074505806,
                "21": 0,
                "22": 0.5,
                "23": 1.5586652755737305,
                "26": 0,
                "27": 0,
                "28": 0,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "71": 80,
                "1001": 29.496784210205078,
                "1010": 6260.47509765625,
                "2000": 7392.59814453125,
                "2001": 617.80078125,
                "2002": 485.05694580078125,
                "2003": 0
            },
            "skillDepotId": 5601,
            "fetterInfo": {
                "expNumber": 140,
                "expLevel": 2,
                "fetterList": [
                    {
                        "fetterId": 56034,
                        "fetterState": 1,
                        "condIndexList": [
                            2
                        ]
                    },
                    {
                        "fetterId": 56033,
                        "fetterState": 1,
                        "condIndexList": [
                            2
                        ]
                    },
                    {
                        "fetterId": 56032,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56031,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56030,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56035,
                        "fetterState": 1,
                        "condIndexList": [
                            2
                        ]
                    },
                    {
                        "fetterId": 56029,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56028,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56027,
                        "fetterState": 1,
                        "condIndexList": [
                            2
                        ]
                    },
                    {
                        "fetterId": 56024,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56023,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56022,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56021,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56020,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56019,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56018,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56017,
                        "fetterState": 1,
                        "condIndexList": [
                            2
                        ]
                    },
                    {
                        "fetterId": 56016,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56208,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56014,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56207,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 141,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 56013,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56045,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56046,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56047,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56048,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56001,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56049,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56002,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56050,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56003,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56051,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56004,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56052,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56005,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56053,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56006,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56054,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 56007,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56055,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 56008,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56056,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56203,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56009,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56063,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56064,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56065,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56067,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56066,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56062,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56403,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56015,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56061,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56060,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56059,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56206,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56012,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56058,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56205,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56011,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56057,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56204,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56010,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56044,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56043,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56042,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56041,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56040,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56039,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56038,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56037,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 56036,
                        "fetterState": 1,
                        "condIndexList": [
                            2
                        ]
                    },
                    {
                        "fetterId": 56026,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 56025,
                        "fetterState": 1
                    }
                ]
            },
            "inherentProudSkillList": [
                562101,
                562201,
                562301
            ],
            "skillLevelMap": {
                "10561": 3,
                "10562": 6,
                "10565": 5
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1630528924,
            "pendingPromoteRewardList": [
                5
            ],
            "excelInfo": {
                "prefabPathHash": "528620097544",
                "prefabPathRemoteHash": "652350773995",
                "controllerPathHash": "1015963399679",
                "controllerPathRemoteHash": "996614957275",
                "combatConfigHash": "916225324370"
            }
        },
        {
            "avatarId": 10000062,
            "guid": "2664326143951645817",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "1742",
                    "val": "1742"
                },
                "1002": {
                    "type": 1002,
                    "ival": "1",
                    "val": "1"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "24",
                    "val": "24"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951645819"
            ],
            "fightPropMap": {
                "1": 3216.83935546875,
                "4": 111.44278717041016,
                "6": 0.09000000357627869,
                "7": 199.62026977539062,
                "20": 0.05000000074505806,
                "21": 0,
                "22": 0.5,
                "23": 1,
                "26": 0,
                "27": 0,
                "28": 0,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "75": 40,
                "1005": 40,
                "1010": 3216.83935546875,
                "2000": 3216.83935546875,
                "2001": 121.47264099121094,
                "2002": 199.62026977539062,
                "2003": 0
            },
            "skillDepotId": 6201,
            "fetterInfo": {
                "expLevel": 1,
                "fetterList": [
                    {
                        "fetterId": 62035,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62034,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62033,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62032,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 62031,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 62030,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 62029,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 142,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 62028,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62037,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62038,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62039,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62040,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62041,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62042,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62043,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62044,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62051,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62004,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62006,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62053,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62052,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62005,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 62007,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62054,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62055,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62202,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 62008,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62027,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62050,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62003,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62026,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62049,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62002,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62048,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62001,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62047,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62046,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62045,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62036,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62203,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 62009,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62204,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 62010,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62205,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 62011,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62206,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 62012,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62013,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62402,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 62014,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62403,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 62015,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 62016,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 62017,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62018,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62019,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62020,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 62021,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 62022,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 62023,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 62024,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 62025,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                622101,
                622301
            ],
            "skillLevelMap": {
                "10621": 1,
                "10622": 1,
                "10625": 1
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1630587109,
            "pendingPromoteRewardList": [
                3,
                5
            ],
            "excelInfo": {
                "prefabPathHash": "106591017791",
                "prefabPathRemoteHash": "655391671774",
                "controllerPathHash": "123794129009",
                "controllerPathRemoteHash": "679848107185",
                "combatConfigHash": "625315450987"
            }
        },
        {
            "avatarId": 10000052,
            "guid": "2664326143951669236",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "0"
                },
                "1002": {
                    "type": 1002,
                    "ival": "5",
                    "val": "5"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "80",
                    "val": "80"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951686428",
                "2664326143951685273",
                "2664326143951682489",
                "2664326143951595472",
                "2664326143951680956",
                "2664326143951671046"
            ],
            "fightPropMap": {
                "1": 11387.720703125,
                "2": 6303.6494140625,
                "3": 0.05249999836087227,
                "4": 746.2235107421875,
                "5": 342.1199951171875,
                "6": 0.1923000067472458,
                "7": 696.385986328125,
                "8": 120.3699951171875,
                "9": 0.13120000064373016,
                "20": 0.2794000208377838,
                "21": 0,
                "22": 1.728100061416626,
                "23": 2.5584001541137695,
                "26": 0,
                "27": 0,
                "28": 0,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0.4659999907016754,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "71": 90,
                "1001": 100,
                "1010": 16460.3046875,
                "2000": 18289.2265625,
                "2001": 1231.84228515625,
                "2002": 908.1217651367188,
                "2003": 0
            },
            "skillDepotId": 5201,
            "fetterInfo": {
                "expNumber": 1885,
                "expLevel": 6,
                "fetterList": [
                    {
                        "fetterId": 52201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 52202,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 52203,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 52009,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52204,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 52010,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52205,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 52011,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52206,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 52012,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52207,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 52013,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52402,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52208,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 52014,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52403,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52015,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52016,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52017,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52018,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52019,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52020,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52022,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52023,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52024,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52025,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52026,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52027,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52030,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52052,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52053,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52054,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 52055,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52056,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52057,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52058,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52059,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52060,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52061,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52062,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52063,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52070,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52071,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52072,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52074,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52073,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52069,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52068,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52021,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52067,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52066,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52065,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52064,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52051,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52050,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52049,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52048,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52047,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52046,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52045,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52044,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52043,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52042,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52041,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52040,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52039,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52038,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52029,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52028,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52037,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52036,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52035,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 139,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52034,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52033,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52032,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 52031,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                522101,
                522201,
                522301,
                522501
            ],
            "skillLevelMap": {
                "10521": 3,
                "10522": 6,
                "10525": 8
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1631388201,
            "excelInfo": {
                "prefabPathHash": "663641599411",
                "prefabPathRemoteHash": "507922855284",
                "controllerPathHash": "924119038683",
                "controllerPathRemoteHash": "258630930303",
                "combatConfigHash": "1087671176872"
            }
        },
        {
            "avatarId": 10000053,
            "guid": "2664326143951697804",
            "propMap": {
                "1001": {
                    "type": 1001,
                    "ival": "5494",
                    "val": "5494"
                },
                "1002": {
                    "type": 1002,
                    "ival": "1",
                    "val": "1"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "33",
                    "val": "33"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951469526",
                "2664326143951697556"
            ],
            "fightPropMap": {
                "1": 4362.06787109375,
                "4": 328.229248046875,
                "7": 274.0193176269531,
                "8": 34.720001220703125,
                "20": 0.1550000011920929,
                "21": 0,
                "22": 0.616599977016449,
                "23": 1.397199034690857,
                "26": 0,
                "27": 0,
                "28": 18.649999618530273,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0.4659999907016754,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "74": 80,
                "1004": 80,
                "1010": 4362.068359375,
                "2000": 4362.06787109375,
                "2001": 328.229248046875,
                "2002": 308.73931884765625,
                "2003": 0
            },
            "skillDepotId": 5301,
            "fetterInfo": {
                "expNumber": 20,
                "expLevel": 1,
                "fetterList": [
                    {
                        "fetterId": 53201,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 53202,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 138,
                        "fetterState": 2
                    },
                    {
                        "fetterId": 53203,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53009,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53301,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53204,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53010,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53302,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53205,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53011,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53303,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53206,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53012,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53401,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53207,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53013,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53402,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53208,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53014,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53403,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53015,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53016,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53017,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53018,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53019,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53022,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53023,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53024,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53027,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53028,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53021,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53020,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53029,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53030,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53031,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53032,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53033,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53058,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53059,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53060,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53061,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53062,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53063,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53064,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53065,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53066,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53067,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53068,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53069,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53076,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53077,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53078,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53080,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53079,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53075,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53074,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53073,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53072,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53071,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53070,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53057,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53056,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53055,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53054,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53053,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53052,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53051,
                        "fetterState": 1
                    },
                    {
                        "fetterId": 53050,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53049,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53048,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53047,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53046,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53045,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53044,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53043,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53042,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53041,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53040,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53039,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53038,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53037,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53036,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53035,
                        "fetterState": 3
                    },
                    {
                        "fetterId": 53034,
                        "fetterState": 3
                    }
                ]
            },
            "inherentProudSkillList": [
                532101,
                532301
            ],
            "skillLevelMap": {
                "10531": 1,
                "10532": 1,
                "10535": 1
            },
            "avatarType": 1,
            "wearingFlycloakId": 140001,
            "bornTime": 1633352690,
            "pendingPromoteRewardList": [
                3,
                5
            ],
            "excelInfo": {
                "prefabPathHash": "637793630515",
                "prefabPathRemoteHash": "622028177723",
                "controllerPathHash": "578074493430",
                "controllerPathRemoteHash": "260169990883",
                "combatConfigHash": "909772775179"
            }
        },
        {
            "avatarId": 10000051,
            "guid": "2664326143951708856",
            "propMap": {
                "1002": {
                    "type": 1002,
                    "ival": "6",
                    "val": "6"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "90",
                    "val": "90"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951708857",
                "2664326143951708858",
                "2664326143951708859",
                "2664326143951708860",
                "2664326143951708861",
                "2664326143951708862"
            ],
            "fightPropMap": {
                "1": 13225.583984375,
                "2": 5706.1396484375,
                "3": 0.5533999800682068,
                "4": 851.6310424804688,
                "5": 342.1199951171875,
                "6": 0.4489000141620636,
                "7": 750.8776245117188,
                "8": 57.87000274658203,
                "20": 0.7260399460792542,
                "21": 0,
                "22": 1.816499948501587,
                "23": 1.330299973487854,
                "26": 0,
                "27": 0,
                "28": 0,
                "29": 0,
                "30": 1.0829999446868896,
                "40": 0,
                "41": 0,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "75": 80,
                "1005": 80,
                "1010": 25988.25390625,
                "2000": 26250.76171875,
                "2001": 1576.0482177734375,
                "2002": 808.7476196289062,
                "2003": 0
            },
            "trialAvatarInfo": {
                "trialEquipList": [
                    {
                        "itemId": 92544,
                        "guid": "2664326143951708857",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 14001,
                                "appendPropIdList": [
                                    501082,
                                    501031,
                                    501224,
                                    501064,
                                    501224,
                                    501064,
                                    501222,
                                    501224,
                                    501081
                                ]
                            },
                            "isLocked": true
                        }
                    },
                    {
                        "itemId": 82523,
                        "guid": "2664326143951708858",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 12001,
                                "appendPropIdList": [
                                    501233,
                                    501032,
                                    501203,
                                    501224,
                                    501201,
                                    501234,
                                    501201,
                                    501222
                                ]
                            },
                            "isLocked": true
                        }
                    },
                    {
                        "itemId": 82553,
                        "guid": "2664326143951708859",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 10002,
                                "appendPropIdList": [
                                    501231,
                                    501224,
                                    501064,
                                    501021,
                                    501232,
                                    501223,
                                    501024,
                                    501062
                                ]
                            }
                        }
                    },
                    {
                        "itemId": 75513,
                        "guid": "2664326143951708860",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 15015,
                                "appendPropIdList": [
                                    501021,
                                    501084,
                                    501063,
                                    501224,
                                    501064,
                                    501064,
                                    501223,
                                    501021
                                ]
                            }
                        }
                    },
                    {
                        "itemId": 92533,
                        "guid": "2664326143951708861",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 13007,
                                "appendPropIdList": [
                                    501052,
                                    501064,
                                    501224,
                                    501234,
                                    501222,
                                    501222,
                                    501231,
                                    501052
                                ]
                            },
                            "isLocked": true
                        }
                    },
                    {
                        "itemId": 12409,
                        "guid": "2664326143951708862",
                        "equip": {
                            "weapon": {
                                "level": 90,
                                "promoteLevel": 6,
                                "affixMap": {
                                    "112409": 0
                                }
                            },
                            "isLocked": true
                        }
                    }
                ]
            },
            "skillDepotId": 5101,
            "inherentProudSkillList": [
                512101,
                512201,
                512301
            ],
            "skillLevelMap": {
                "10511": 8,
                "10512": 7,
                "10515": 8
            },
            "avatarType": 3,
            "wearingFlycloakId": 140006,
            "bornTime": 1621555727,
            "excelInfo": {
                "prefabPathHash": "668326829204",
                "prefabPathRemoteHash": "72241286790",
                "controllerPathHash": "626565187397",
                "controllerPathRemoteHash": "139749211592",
                "combatConfigHash": "372184831437"
            }
        },
        {
            "avatarId": 10000042,
            "guid": "2664326143951708869",
            "propMap": {
                "1002": {
                    "type": 1002,
                    "ival": "4",
                    "val": "4"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "70",
                    "val": "70"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951708870",
                "2664326143951708871",
                "2664326143951708872",
                "2664326143951708873",
                "2664326143951708874",
                "2664326143951708875"
            ],
            "talentIdList": [
                421
            ],
            "fightPropMap": {
                "1": 10025.1943359375,
                "2": 6154.259765625,
                "3": 0.30320000648498535,
                "4": 692.20751953125,
                "5": 324.6199951171875,
                "6": 1.045720100402832,
                "7": 611.541015625,
                "8": 74.06999969482422,
                "9": 0.07289999723434448,
                "20": 0.2093999981880188,
                "21": 0,
                "22": 2.1649999618530273,
                "23": 1.0648000240325928,
                "26": 0,
                "27": 0,
                "28": 37.29999923706055,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0.4659999907016754,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "71": 40,
                "1001": 40,
                "1010": 10326.427734375,
                "2000": 19219.09375,
                "2001": 1740.682861328125,
                "2002": 730.1923828125,
                "2003": 0
            },
            "trialAvatarInfo": {
                "trialEquipList": [
                    {
                        "itemId": 93543,
                        "guid": "2664326143951708870",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 14001,
                                "appendPropIdList": [
                                    501224,
                                    501204,
                                    501061,
                                    501031,
                                    501223,
                                    501224,
                                    501034,
                                    501032
                                ]
                            },
                            "isLocked": true
                        }
                    },
                    {
                        "itemId": 93524,
                        "guid": "2664326143951708871",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 12001,
                                "appendPropIdList": [
                                    501203,
                                    501223,
                                    501083,
                                    501243,
                                    501221,
                                    501224,
                                    501224,
                                    501082,
                                    501081
                                ]
                            },
                            "isLocked": true
                        }
                    },
                    {
                        "itemId": 93554,
                        "guid": "2664326143951708872",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 10004,
                                "appendPropIdList": [
                                    501021,
                                    501082,
                                    501224,
                                    501234,
                                    501223,
                                    501224,
                                    501223,
                                    501223,
                                    501024
                                ]
                            },
                            "isLocked": true
                        }
                    },
                    {
                        "itemId": 80513,
                        "guid": "2664326143951708873",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 15009,
                                "appendPropIdList": [
                                    501222,
                                    501023,
                                    501202,
                                    501094,
                                    501201,
                                    501201,
                                    501024,
                                    501224
                                ]
                            },
                            "isLocked": true
                        }
                    },
                    {
                        "itemId": 93533,
                        "guid": "2664326143951708874",
                        "equip": {
                            "reliquary": {
                                "level": 15,
                                "exp": 6895,
                                "mainPropId": 13008,
                                "appendPropIdList": [
                                    501033,
                                    501024,
                                    501241,
                                    501051,
                                    501033,
                                    501033
                                ]
                            }
                        }
                    },
                    {
                        "itemId": 11405,
                        "guid": "2664326143951708875",
                        "equip": {
                            "weapon": {
                                "level": 79,
                                "exp": 4900,
                                "promoteLevel": 5,
                                "affixMap": {
                                    "111405": 1
                                }
                            },
                            "isLocked": true
                        }
                    }
                ]
            },
            "skillDepotId": 4201,
            "inherentProudSkillList": [
                422101,
                422201,
                422301
            ],
            "skillLevelMap": {
                "10421": 6,
                "10422": 6,
                "10425": 6
            },
            "avatarType": 3,
            "wearingFlycloakId": 140001,
            "bornTime": 1618597584,
            "excelInfo": {
                "prefabPathHash": "513109309730",
                "prefabPathRemoteHash": "26697866215",
                "controllerPathHash": "664801677487",
                "controllerPathRemoteHash": "1033226418192",
                "combatConfigHash": "927565649365"
            }
        },
        {
            "avatarId": 10000052,
            "guid": "2664326143951708882",
            "propMap": {
                "1002": {
                    "type": 1002,
                    "ival": "5",
                    "val": "5"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "80",
                    "val": "80"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951708883",
                "2664326143951708884",
                "2664326143951708885",
                "2664326143951708886",
                "2664326143951708887",
                "2664326143951708888"
            ],
            "fightPropMap": {
                "1": 11387.720703125,
                "2": 6303.6494140625,
                "3": 0.05249999836087227,
                "4": 746.2235107421875,
                "5": 342.1199951171875,
                "6": 0.1923000067472458,
                "7": 696.385986328125,
                "8": 120.3699951171875,
                "9": 0.13120000064373016,
                "20": 0.2794000208377838,
                "21": 0,
                "22": 1.728100061416626,
                "23": 2.5584001541137695,
                "26": 0,
                "27": 0,
                "28": 0,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0.4659999907016754,
                "42": 0,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "71": 90,
                "1001": 24.91779327392578,
                "1010": 18289.2265625,
                "2000": 18289.2265625,
                "2001": 1231.84228515625,
                "2002": 908.1217651367188,
                "2003": 0
            },
            "trialAvatarInfo": {
                "trialEquipList": [
                    {
                        "itemId": 94543,
                        "guid": "2664326143951708883",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 14001,
                                "appendPropIdList": [
                                    501204,
                                    501082,
                                    501052,
                                    501221,
                                    501221,
                                    501221,
                                    501052,
                                    501201
                                ]
                            }
                        }
                    },
                    {
                        "itemId": 94523,
                        "guid": "2664326143951708884",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 12001,
                                "appendPropIdList": [
                                    501083,
                                    501223,
                                    501064,
                                    501203,
                                    501062,
                                    501221,
                                    501083,
                                    501082
                                ]
                            }
                        }
                    },
                    {
                        "itemId": 94553,
                        "guid": "2664326143951708885",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 10007,
                                "appendPropIdList": [
                                    501023,
                                    501094,
                                    501221,
                                    501082,
                                    501092,
                                    501224,
                                    501084,
                                    501021
                                ]
                            }
                        }
                    },
                    {
                        "itemId": 77514,
                        "guid": "2664326143951708886",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 15009,
                                "appendPropIdList": [
                                    501224,
                                    501202,
                                    501023,
                                    501234,
                                    501221,
                                    501221,
                                    501233,
                                    501021,
                                    501233
                                ]
                            },
                            "isLocked": true
                        }
                    },
                    {
                        "itemId": 94533,
                        "guid": "2664326143951708887",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 13008,
                                "appendPropIdList": [
                                    501202,
                                    501061,
                                    501033,
                                    501024,
                                    501204,
                                    501201,
                                    501062,
                                    501023
                                ]
                            },
                            "isLocked": true
                        }
                    },
                    {
                        "itemId": 13415,
                        "guid": "2664326143951708888",
                        "equip": {
                            "weapon": {
                                "level": 80,
                                "promoteLevel": 5,
                                "affixMap": {
                                    "113415": 0
                                }
                            },
                            "isLocked": true
                        }
                    }
                ]
            },
            "skillDepotId": 5201,
            "inherentProudSkillList": [
                522101,
                522201,
                522301,
                522501
            ],
            "skillLevelMap": {
                "10521": 3,
                "10522": 6,
                "10525": 8
            },
            "avatarType": 3,
            "wearingFlycloakId": 140001,
            "bornTime": 1631388201,
            "excelInfo": {
                "prefabPathHash": "663641599411",
                "prefabPathRemoteHash": "507922855284",
                "controllerPathHash": "924119038683",
                "controllerPathRemoteHash": "258630930303",
                "combatConfigHash": "1087671176872"
            }
        },
        {
            "avatarId": 10000025,
            "guid": "2664326143951708895",
            "propMap": {
                "1002": {
                    "type": 1002,
                    "ival": "5",
                    "val": "5"
                },
                "1003": {
                    "type": 1003,
                    "ival": "0"
                },
                "1004": {
                    "type": 1004,
                    "ival": "0"
                },
                "4001": {
                    "type": 4001,
                    "ival": "80",
                    "val": "80"
                }
            },
            "lifeState": 1,
            "equipGuidList": [
                "2664326143951708896",
                "2664326143951708897",
                "2664326143951708898",
                "2664326143951708899",
                "2664326143951708900",
                "2664326143951708901"
            ],
            "talentIdList": [
                251,
                252,
                253,
                254,
                255,
                256
            ],
            "fightPropMap": {
                "1": 9059.529296875,
                "2": 5526.8798828125,
                "3": 0.3089999854564667,
                "4": 622.098388671875,
                "5": 405.5299987792969,
                "6": 0.7193999886512756,
                "7": 671.415283203125,
                "8": 16.200000762939453,
                "9": 0.2842000126838684,
                "20": 0.27160000801086426,
                "21": 0,
                "22": 1.6036999225616455,
                "23": 1.7098984718322754,
                "26": 0,
                "27": 0,
                "28": 80,
                "29": 0,
                "30": 0,
                "40": 0,
                "41": 0,
                "42": 0.6980000138282776,
                "43": 0,
                "44": 0,
                "45": 0,
                "46": 0,
                "50": 0,
                "51": 0,
                "52": 0,
                "53": 0,
                "54": 0,
                "55": 0,
                "56": 0,
                "72": 80,
                "1002": 80,
                "1010": 16427.59375,
                "2000": 17385.8046875,
                "2001": 1475.166015625,
                "2002": 878.4314575195312,
                "2003": 0
            },
            "trialAvatarInfo": {
                "trialEquipList": [
                    {
                        "itemId": 77544,
                        "guid": "2664326143951708896",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 14001,
                                "appendPropIdList": [
                                    501052,
                                    501032,
                                    501202,
                                    501223,
                                    501224,
                                    501223,
                                    501222,
                                    501223,
                                    501052
                                ]
                            },
                            "isLocked": true
                        }
                    },
                    {
                        "itemId": 77523,
                        "guid": "2664326143951708897",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 12001,
                                "appendPropIdList": [
                                    501061,
                                    501033,
                                    501203,
                                    501221,
                                    501202,
                                    501203,
                                    501224,
                                    501201
                                ]
                            },
                            "isLocked": true
                        }
                    },
                    {
                        "itemId": 90553,
                        "guid": "2664326143951708898",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 10004,
                                "appendPropIdList": [
                                    501092,
                                    501021,
                                    501081,
                                    501033,
                                    501091,
                                    501032,
                                    501034,
                                    501033
                                ]
                            }
                        }
                    },
                    {
                        "itemId": 90412,
                        "guid": "2664326143951708899",
                        "equip": {
                            "reliquary": {
                                "level": 17,
                                "mainPropId": 15011,
                                "appendPropIdList": [
                                    401061,
                                    401051,
                                    401094,
                                    401231,
                                    401233,
                                    401232
                                ]
                            }
                        }
                    },
                    {
                        "itemId": 73534,
                        "guid": "2664326143951708900",
                        "equip": {
                            "reliquary": {
                                "level": 21,
                                "mainPropId": 13008,
                                "appendPropIdList": [
                                    501022,
                                    501092,
                                    501203,
                                    501054,
                                    501201,
                                    501024,
                                    501051,
                                    501092,
                                    501054
                                ]
                            }
                        }
                    },
                    {
                        "itemId": 11403,
                        "guid": "2664326143951708901",
                        "equip": {
                            "weapon": {
                                "level": 86,
                                "exp": 165800,
                                "promoteLevel": 6,
                                "affixMap": {
                                    "111403": 2
                                }
                            },
                            "isLocked": true
                        }
                    }
                ]
            },
            "skillDepotId": 2501,
            "inherentProudSkillList": [
                252101,
                252201,
                252301
            ],
            "skillLevelMap": {
                "10381": 2,
                "10382": 7,
                "10385": 7
            },
            "proudSkillExtraLevelMap": {
                "2532": 3,
                "2539": 3
            },
            "avatarType": 3,
            "wearingFlycloakId": 140001,
            "bornTime": 1614382328,
            "excelInfo": {
                "prefabPathHash": "60295706774",
                "prefabPathRemoteHash": "174079047914",
                "controllerPathHash": "1092330510148",
                "controllerPathRemoteHash": "169787480951",
                "combatConfigHash": "529772651469"
            }
        },
   ],
    "avatarTeamMap": {
        "1": {
            "avatarGuidList": [
                "2664326143951600599",
                "2664326143951256400",
                "2664326143951442672",
                "2664326143951479019"
            ],
            "teamName": "ayaka"
        },
        "2": {
            "avatarGuidList": [
                "2664326143951241370",
                "2664326143951252776",
                "2664326143951643736",
                "2664326143951479019"
            ],
            "teamName": "anver"
        },
        "3": {
            "avatarGuidList": [
                "2664326143951372989",
                "2664326143951252776",
                "2664326143951669236",
                "2664326143951479019"
            ],
            "teamName": "d"
        },
        "4": {
            "avatarGuidList": [
                "2664326143951415061",
                "2664326143951252776",
                "2664326143951669236",
                "2664326143951256400"
            ],
            "teamName": "a eaeae"
        }
    },
    "curAvatarTeamId": 3,
    "chooseAvatarGuid": "2664326143951241217",
    "ownedFlycloakList": [
        140001,
        140002,
        140003,
        140004,
        140005,
        140006,
        140007,
        140008,
        140009
    ],
    "ownedCostumeList": [
        201401
    ]
}

var curAvatarTeamId = AvatarDataNotify.curAvatarTeamId
var sceneGuidList = AvatarDataNotify.avatarTeamMap[curAvatarTeamId.toString()].avatarGuidList

var makeSceneTeamUpdateNotify = {
    "sceneTeamAvatarList": []
}

for (var x in sceneGuidList){
    var curGuid = sceneGuidList[x]

    for (var y in AvatarDataNotify.avatarList){
        if (curGuid == AvatarDataNotify.avatarList[y].guid) {
            // here is the same

            var sceneTeamAvatar = {
                "playerUid": 620336771,
                "avatarGuid": AvatarDataNotify.avatarList[y].guid,
                "sceneId": sceneIdSelect,
                "entityId": 16777400 + AvatarDataNotify.avatarList[y].avatarId % 100,
                "avatarAbilityInfo": {},
                "sceneEntityInfo": {
                    "entityType": 1,
                    "entityId": 16777400 + AvatarDataNotify.avatarList[y].avatarId % 100,
                    "motionInfo": {
                        "pos": {},
                        "rot": {},
                        "speed": {}
                    },
                    "propList": [
                        {
                            "type": 4001,
                            "propValue": {
                                "type": 4001,
                                "ival": AvatarDataNotify.avatarList[y].propMap["4001"].ival,
                                "val": AvatarDataNotify.avatarList[y].propMap["4001"].val
                            }
                        }
                    ],
                    "fightPropList": [],
                    "lifeState": 1,
                    "animatorParaList": [
                        {}
                    ],
                    "avatar": {
                        "uid": 620336771,
                        "avatarId": AvatarDataNotify.avatarList[y].avatarId,
                        "guid": AvatarDataNotify.avatarList[y].guid,
                        "peerId": 1,
                        "equipIdList": [],
                        "skillDepotId": (AvatarDataNotify.avatarList[y].avatarId % 100) * 100 + 1,
                        "talentIdList": AvatarDataNotify.avatarList[y].talentIdList,
                        "weapon": {},
                        "reliquaryList": [],
                        "inherentProudSkillList": AvatarDataNotify.avatarList[y].inherentProudSkillList,
                        "skillLevelMap": AvatarDataNotify.avatarList[y].skillLevelMap,
                        "proudSkillExtraLevelMap": AvatarDataNotify.avatarList[y].proudSkillExtraLevelMap,
                        "wearingFlycloakId": AvatarDataNotify.avatarList[y].wearingFlycloakId,
                        "bornTime": AvatarDataNotify.avatarList[y].bornTime,
                        "excelInfo": AvatarDataNotify.avatarList[y].excelInfo
                    },
                    "entityClientData": {},
                    "entityAuthorityInfo": {
                        "abilityInfo": {},
                        "rendererChangedInfo": {},
                        "aiInfo": {
                            "isAiOpen": true,
                            "bornPos": {}
                        },
                        "bornPos": {}
                    }
                },
                "weaponGuid": {},
                "weaponEntityId": {},
                "weaponAbilityInfo": {},
                "abilityControlBlock": {
                    "abilityEmbryoList": [ // TODOTODO 
                        {
                            "abilityId": 5,
                            "abilityNameHash": 4117694238,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 6,
                            "abilityNameHash": 534122942,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 7,
                            "abilityNameHash": 4154503075,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 8,
                            "abilityNameHash": 4264196532,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 9,
                            "abilityNameHash": 4264196533,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 10,
                            "abilityNameHash": 4264196534,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 11,
                            "abilityNameHash": 4264196535,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 12,
                            "abilityNameHash": 4264196536,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 13,
                            "abilityNameHash": 4264196537,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 14,
                            "abilityNameHash": 865738928,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 15,
                            "abilityNameHash": 855573040,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 16,
                            "abilityNameHash": 3745977574,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 17,
                            "abilityNameHash": 3364230707,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 18,
                            "abilityNameHash": 266205005,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 19,
                            "abilityNameHash": 3000802652,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 20,
                            "abilityNameHash": 341379584,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 21,
                            "abilityNameHash": 401452267,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 22,
                            "abilityNameHash": 2594993730,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 23,
                            "abilityNameHash": 987125845,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 24,
                            "abilityNameHash": 324439278,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 25,
                            "abilityNameHash": 3155864749,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 26,
                            "abilityNameHash": 601123348,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 27,
                            "abilityNameHash": 2117785286,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 28,
                            "abilityNameHash": 2551964576,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 29,
                            "abilityNameHash": 2642792750,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 30,
                            "abilityNameHash": 2306062007,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 31,
                            "abilityNameHash": 3105629177,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 32,
                            "abilityNameHash": 3771526669,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 33,
                            "abilityNameHash": 100636247,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 34,
                            "abilityNameHash": 1564404322,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 35,
                            "abilityNameHash": 497711942,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 36,
                            "abilityNameHash": 127390306,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 37,
                            "abilityNameHash": 2314260649,
                            "abilityOverrideNameHash": 1178079449
                        },
                        {
                            "abilityId": 38,
                            "abilityNameHash": 3504552398,
                            "abilityOverrideNameHash": 1178079449
                        }
                    ]
                },
                "isPlayerCurAvatar": false
            }

            for (var z in AvatarDataNotify.avatarList[y].fightPropMap) {

                var tempList = {
                    "propType": z,
                    "propValue": AvatarDataNotify.avatarList[y].fightPropMap[z]
                }

                sceneTeamAvatar.sceneEntityInfo.fightPropList.push(tempList)
            }
            
            if (x == 3) {
                sceneTeamAvatar.isPlayerCurAvatar = true
            }

            makeSceneTeamUpdateNotify.sceneTeamAvatarList.push(sceneTeamAvatar)
        }
    }
}


var makePlayerEnterSceneInfoNotify = {
    curAvatarEntityId: 16777400 + AvatarDataNotify.avatarList[3].avatarId % 100,
    avatarEnterInfo: [],

    teamEnterInfo: {
        teamEntityId: 150995153,
        teamAbilityInfo: {},
        abilityControlBlock: {}
    },
    mpLevelEntityInfo: {
        entityId: 184549594,
        authorityPeerId: 1,
        abilityInfo: {}
    },
    enterSceneToken: 8427
}

for (var x in sceneGuidList){
    var curGuid = sceneGuidList[x]

    
    for (var y in AvatarDataNotify.avatarList){
        if (curGuid == AvatarDataNotify.avatarList[y].guid) {
            // here is the same

            var avaterEnter = {
                "avatarGuid": curGuid,
                "avatarEntityId": 16777400 + AvatarDataNotify.avatarList[y].avatarId % 100,
                "avatarAbilityInfo": {},
                "weaponGuid": {},
                "weaponEntityId": {},
                "weaponAbilityInfo": {}
            }

            makePlayerEnterSceneInfoNotify.avatarEnterInfo.push(avaterEnter)
        }
    }
}

var makeSceneEntityAppearNotify = {
    "entityList": [makeSceneTeamUpdateNotify.sceneTeamAvatarList[3]],
    "appearType": "VISION_BORN"
}



var SceneTeamUpdateNotify = {
    "sceneTeamAvatarList": [
        {
            "playerUid": 620336771,
            "avatarGuid": {
                "low": 131773,
                "high": 620336771,
                "unsigned": true
            },
            "sceneId": sceneIdSelect,
            "entityId": 16777426,
            "avatarAbilityInfo": {},
            "sceneEntityInfo": {
                "entityType": 1,
                "entityId": 16777426,
                "motionInfo": {
                    "pos": {},
                    "rot": {},
                    "speed": {}
                },
                "propList": [
                    {
                        "type": 4001,
                        "propValue": {
                            "type": 4001,
                            "ival": {
                                "low": 90,
                                "high": 0,
                                "unsigned": false
                            },
                            "val": {
                                "low": 90,
                                "high": 0,
                                "unsigned": false
                            }
                        }
                    }
                ],
                "fightPropList": [
                    {
                        "propType": 1,
                        "propValue": 13103.125
                    },
                    {
                        "propType": 2,
                        "propValue": 4780
                    },
                    {
                        "propType": 3,
                        "propValue": 0.43719998002052307
                    },
                    {
                        "propType": 4,
                        "propValue": 810.970703125
                    },
                    {
                        "propType": 5,
                        "propValue": 384.92999267578125
                    },
                    {
                        "propType": 6,
                        "propValue": 0.8794599771499634
                    },
                    {
                        "propType": 7,
                        "propValue": 814.6676025390625
                    },
                    {
                        "propType": 8,
                        "propValue": 34.720001220703125
                    },
                    {
                        "propType": 9,
                        "propValue": 0.12389999628067017
                    },
                    {
                        "propType": 20,
                        "propValue": 0.4116000235080719
                    },
                    {
                        "propType": 21
                    },
                    {
                        "propType": 22,
                        "propValue": 1.7125999927520752
                    },
                    {
                        "propType": 23,
                        "propValue": 1.051800012588501
                    },
                    {
                        "propType": 26
                    },
                    {
                        "propType": 27
                    },
                    {
                        "propType": 28,
                        "propValue": 18.649999618530273
                    },
                    {
                        "propType": 29
                    },
                    {
                        "propType": 30
                    },
                    {
                        "propType": 40
                    },
                    {
                        "propType": 41
                    },
                    {
                        "propType": 42,
                        "propValue": 0.9039999842643738
                    },
                    {
                        "propType": 43
                    },
                    {
                        "propType": 44
                    },
                    {
                        "propType": 45
                    },
                    {
                        "propType": 46
                    },
                    {
                        "propType": 50
                    },
                    {
                        "propType": 51
                    },
                    {
                        "propType": 52
                    },
                    {
                        "propType": 53
                    },
                    {
                        "propType": 54
                    },
                    {
                        "propType": 55
                    },
                    {
                        "propType": 56
                    },
                    {
                        "propType": 72,
                        "propValue": 60
                    },
                    {
                        "propType": 2000,
                        "propValue": 23611.810546875
                    },
                    {
                        "propType": 2001,
                        "propValue": 1909.116943359375
                    },
                    {
                        "propType": 2002,
                        "propValue": 950.3248291015625
                    },
                    {
                        "propType": 2003
                    },
                    {
                        "propType": 1010,
                        "propValue": 21250.62890625
                    }
                ],
                "lifeState": 1,
                "animatorParaList": [
                    {}
                ],
                "avatar": {
                    "uid": 620336771,
                    "avatarId": 10000060,
                    "guid": {
                        "low": 131773,
                        "high": 620336771,
                        "unsigned": true
                    },
                    "peerId": 1,
                    "equipIdList": [
                        90543,
                        90523,
                        90553,
                        76513,
                        90533,
                        15405
                    ],
                    "skillDepotId": 6001,
                    "talentIdList": [
                        601,
                        602,
                        603,
                        604,
                        605,
                        606
                    ],
                    "weapon": {
                        "entityId": 100663507, 
                        "gadgetId": 50015508, // Aqua fix
                        "itemId": 15508, // Aqua fix
                        "guid": {
                            "low": 4968,
                            "high": 620336771,
                            "unsigned": true
                        },
                        "level": 90,
                        "promoteLevel": 6,
                        "abilityInfo": {},
                        "affixMap": {
                            "115508": 1
                        }
                    },
                    "reliquaryList": [
                        {
                            "itemId": 90543,
                            "guid": {
                                "low": 139654,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 21
                        },
                        {
                            "itemId": 90523,
                            "guid": {
                                "low": 139830,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 21
                        },
                        {
                            "itemId": 90553,
                            "guid": {
                                "low": 127110,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 21
                        },
                        {
                            "itemId": 76513,
                            "guid": {
                                "low": 322856,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 21
                        },
                        {
                            "itemId": 90533,
                            "guid": {
                                "low": 125991,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 21
                        }
                    ],
                    "inherentProudSkillList": [
                        602101,
                        602201,
                        602301
                    ],
                    "skillLevelMap": {
                        "10601": 6,
                        "10602": 8,
                        "10603": 8,
                        "10604": 8,
                        "10605": 8,
                        "10606": 8,
                        "10607": 8,
                        "10608": 8,
                        "10609": 8,
                        "10610": 8
                    },
                    "proudSkillExtraLevelMap": {
                        "6031": 1
                    },
                    "wearingFlycloakId": 140006,
                    "bornTime": 1617750142,
                    "excelInfo": {
                        "prefabPathHash": {
                            "low": 39441813,
                            "high": 245,
                            "unsigned": true
                        },
                        "prefabPathRemoteHash": {
                            "low": -681162818,
                            "high": 65,
                            "unsigned": true
                        },
                        "controllerPathHash": {
                            "low": -1558210548,
                            "high": 138,
                            "unsigned": true
                        },
                        "controllerPathRemoteHash": {
                            "low": -940225571,
                            "high": 24,
                            "unsigned": true
                        },
                        "combatConfigHash": {
                            "low": -487780691,
                            "high": 151,
                            "unsigned": true
                        }
                    }
                },
                "entityClientData": {},
                "entityAuthorityInfo": {
                    "abilityInfo": {},
                    "rendererChangedInfo": {},
                    "aiInfo": {
                        "isAiOpen": true,
                        "bornPos": {}
                    },
                    "bornPos": {}
                }
            },
            "weaponGuid": {
                "low": 4968,
                "high": 620336771,
                "unsigned": true
            },
            "weaponEntityId": 100663507,
            "weaponAbilityInfo": {},
            "abilityControlBlock": {
                "abilityEmbryoList": [
                    {"abilityId": 7,"abilityNameHash": 3658085500,"abilityOverrideNameHash": 1178079449},
{"abilityId": 8,"abilityNameHash": 1836719789,"abilityOverrideNameHash": 1178079449},
{"abilityId": 9,"abilityNameHash": 2104631754,"abilityOverrideNameHash": 1178079449},
{"abilityId": 10,"abilityNameHash": 1946413246,"abilityOverrideNameHash": 1178079449},
{"abilityId": 11,"abilityNameHash": 1946413247,"abilityOverrideNameHash": 1178079449},
{"abilityId": 12,"abilityNameHash": 1946413248,"abilityOverrideNameHash": 1178079449},
{"abilityId": 13,"abilityNameHash": 1946413249,"abilityOverrideNameHash": 1178079449},
{"abilityId": 14,"abilityNameHash": 1946413250,"abilityOverrideNameHash": 1178079449},
{"abilityId": 15,"abilityNameHash": 1946413251,"abilityOverrideNameHash": 1178079449},
{"abilityId": 16,"abilityNameHash": 637038785,"abilityOverrideNameHash": 1178079449},
{"abilityId": 17,"abilityNameHash": 3324144316,"abilityOverrideNameHash": 1178079449},
{"abilityId": 18,"abilityNameHash": 2711105693,"abilityOverrideNameHash": 1178079449},
{"abilityId": 19,"abilityNameHash": 2801350039,"abilityOverrideNameHash": 1178079449},
{"abilityId": 20,"abilityNameHash": 753428308,"abilityOverrideNameHash": 1178079449},
{"abilityId": 21,"abilityNameHash": 2334035326,"abilityOverrideNameHash": 1178079449},
{"abilityId": 22,"abilityNameHash": 546829896,"abilityOverrideNameHash": 1178079449},
{"abilityId": 23,"abilityNameHash": 1681692485,"abilityOverrideNameHash": 1178079449},
{"abilityId": 24,"abilityNameHash": 3355580636,"abilityOverrideNameHash": 1178079449},
{"abilityId": 25,"abilityNameHash": 2671369911,"abilityOverrideNameHash": 1178079449},
{"abilityId": 26,"abilityNameHash": 2413837291,"abilityOverrideNameHash": 1178079449},
{"abilityId": 27,"abilityNameHash": 2877912587,"abilityOverrideNameHash": 1178079449},
{"abilityId": 28,"abilityNameHash": 939989696,"abilityOverrideNameHash": 1178079449},
{"abilityId": 29,"abilityNameHash": 1054763148,"abilityOverrideNameHash": 1178079449},
{"abilityId": 30,"abilityNameHash": 2653227910,"abilityOverrideNameHash": 1178079449},
{"abilityId": 31,"abilityNameHash": 346042929,"abilityOverrideNameHash": 1178079449},
{"abilityId": 32,"abilityNameHash": 1298769539,"abilityOverrideNameHash": 1178079449},
{"abilityId": 33,"abilityNameHash": 3519094889,"abilityOverrideNameHash": 1178079449},
{"abilityId": 34,"abilityNameHash": 4004055550,"abilityOverrideNameHash": 1178079449},
{"abilityId": 35,"abilityNameHash": 3961656255,"abilityOverrideNameHash": 1178079449},
{"abilityId": 36,"abilityNameHash": 3262817007,"abilityOverrideNameHash": 1178079449},
{"abilityId": 37,"abilityNameHash": 545267007,"abilityOverrideNameHash": 1178079449},
{"abilityId": 38,"abilityNameHash": 134128075,"abilityOverrideNameHash": 1178079449},
{"abilityId": 39,"abilityNameHash": 614372848,"abilityOverrideNameHash": 1178079449},
{"abilityId": 40,"abilityNameHash": 558386046,"abilityOverrideNameHash": 1178079449},
{"abilityId": 41,"abilityNameHash": 1413923014,"abilityOverrideNameHash": 1178079449},
{"abilityId": 42,"abilityNameHash": 3955926384,"abilityOverrideNameHash": 1178079449},
{"abilityId": 43,"abilityNameHash": 2687119937,"abilityOverrideNameHash": 1178079449},
{"abilityId": 44,"abilityNameHash": 4077213942,"abilityOverrideNameHash": 1178079449},
{"abilityId": 45,"abilityNameHash": 628675405,"abilityOverrideNameHash": 1178079449},
{"abilityId": 46,"abilityNameHash": 3986961334,"abilityOverrideNameHash": 1178079449},
{"abilityId": 47,"abilityNameHash": 2298140808,"abilityOverrideNameHash": 1178079449},
{"abilityId": 48,"abilityNameHash": 91748655,"abilityOverrideNameHash": 1178079449},
{"abilityId": 49,"abilityNameHash": 1271629785,"abilityOverrideNameHash": 1178079449},
{"abilityId": 50,"abilityNameHash": 3165059310,"abilityOverrideNameHash": 1178079449},
{"abilityId": 51,"abilityNameHash": 3477313570,"abilityOverrideNameHash": 1178079449},
{"abilityId": 52,"abilityNameHash": 687079705,"abilityOverrideNameHash": 1178079449},
{"abilityId": 53,"abilityNameHash": 636063530,"abilityOverrideNameHash": 1178079449},
{"abilityId": 54,"abilityNameHash": 2034864807,"abilityOverrideNameHash": 1178079449},
{"abilityId": 55,"abilityNameHash": 2943802114,"abilityOverrideNameHash": 1178079449},
{"abilityId": 56,"abilityNameHash": 339122891,"abilityOverrideNameHash": 1178079449},
{"abilityId": 57,"abilityNameHash": 279317431,"abilityOverrideNameHash": 1178079449},
{"abilityId": 58,"abilityNameHash": 16212818,"abilityOverrideNameHash": 1178079449},
{"abilityId": 59,"abilityNameHash": 2164299053,"abilityOverrideNameHash": 1178079449},
{"abilityId": 60,"abilityNameHash": 1818191273,"abilityOverrideNameHash": 1178079449},
{"abilityId": 61,"abilityNameHash": 2554960283,"abilityOverrideNameHash": 1178079449},
{"abilityId": 62,"abilityNameHash": 756178416,"abilityOverrideNameHash": 1178079449},
{"abilityId": 63,"abilityNameHash": 3400520400,"abilityOverrideNameHash": 1178079449},
{"abilityId": 64,"abilityNameHash": 4023053652,"abilityOverrideNameHash": 1178079449},
{"abilityId": 65,"abilityNameHash": 325009464,"abilityOverrideNameHash": 1178079449},
{"abilityId": 66,"abilityNameHash": 3692884337,"abilityOverrideNameHash": 1178079449},
{"abilityId": 67,"abilityNameHash": 1397628936,"abilityOverrideNameHash": 1178079449},
{"abilityId": 68,"abilityNameHash": 831394429,"abilityOverrideNameHash": 1178079449},
{"abilityId": 69,"abilityNameHash": 935372625,"abilityOverrideNameHash": 1178079449},
{"abilityId": 70,"abilityNameHash": 935372626,"abilityOverrideNameHash": 1178079449},
{"abilityId": 71,"abilityNameHash": 935372627,"abilityOverrideNameHash": 1178079449},
{"abilityId": 72,"abilityNameHash": 935372628,"abilityOverrideNameHash": 1178079449},
{"abilityId": 73,"abilityNameHash": 950668105,"abilityOverrideNameHash": 1178079449},
{"abilityId": 74,"abilityNameHash": 16212816,"abilityOverrideNameHash": 1178079449},
{"abilityId": 75,"abilityNameHash": 744057765,"abilityOverrideNameHash": 1178079449},
{"abilityId": 76,"abilityNameHash": 925922765,"abilityOverrideNameHash": 1178079449},
{"abilityId": 77,"abilityNameHash": 2013119018,"abilityOverrideNameHash": 1178079449},
{"abilityId": 78,"abilityNameHash": 1753792216,"abilityOverrideNameHash": 1178079449},
{"abilityId": 79,"abilityNameHash": 4131369254,"abilityOverrideNameHash": 1178079449},
{"abilityId": 80,"abilityNameHash": 2839806880,"abilityOverrideNameHash": 1178079449},
{"abilityId": 81,"abilityNameHash": 1368965523,"abilityOverrideNameHash": 1178079449},
                ]
            }
        },
        {
            "playerUid": 620336771,
            "avatarGuid": {
                "low": 11560,
                "high": 620336771,
                "unsigned": true
            },
            "sceneId": sceneIdSelect,
            "entityId": 16777428,
            "avatarAbilityInfo": {},
            "sceneEntityInfo": {
                "entityType": 1,
                "entityId": 16777428,
                "motionInfo": {
                    "pos": {},
                    "rot": {},
                    "speed": {}
                },
                "propList": [
                    {
                        "type": 4001,
                        "propValue": {
                            "type": 4001,
                            "ival": {
                                "low": 90,
                                "high": 0,
                                "unsigned": false
                            },
                            "val": {
                                "low": 90,
                                "high": 0,
                                "unsigned": false
                            }
                        }
                    }
                ],
                "fightPropList": [
                    {
                        "propType": 1,
                        "propValue": 12397.404296875
                    },
                    {
                        "propType": 2,
                        "propValue": 5825.6396484375
                    },
                    {
                        "propType": 3,
                        "propValue": 0.17489999532699585
                    },
                    {
                        "propType": 4,
                        "propValue": 755.9412231445312
                    },
                    {
                        "propType": 5,
                        "propValue": 349.42999267578125
                    },
                    {
                        "propType": 6,
                        "propValue": 0.8614000082015991
                    },
                    {
                        "propType": 7,
                        "propValue": 771.2493286132812
                    },
                    {
                        "propType": 8,
                        "propValue": 57.869998931884766
                    },
                    {
                        "propType": 9,
                        "propValue": 0.06560000032186508
                    },
                    {
                        "propType": 20,
                        "propValue": 0.14329999685287476
                    },
                    {
                        "propType": 21
                    },
                    {
                        "propType": 22,
                        "propValue": 0.8341000080108643
                    },
                    {
                        "propType": 23,
                        "propValue": 1.998400092124939
                    },
                    {
                        "propType": 26
                    },
                    {
                        "propType": 27
                    },
                    {
                        "propType": 28,
                        "propValue": 109.56999969482422
                    },
                    {
                        "propType": 29
                    },
                    {
                        "propType": 30,
                        "propValue": 0.344857782125473
                    },
                    {
                        "propType": 40
                    },
                    {
                        "propType": 41
                    },
                    {
                        "propType": 42
                    },
                    {
                        "propType": 43
                    },
                    {
                        "propType": 44
                    },
                    {
                        "propType": 45
                    },
                    {
                        "propType": 46
                    },
                    {
                        "propType": 50
                    },
                    {
                        "propType": 51
                    },
                    {
                        "propType": 52
                    },
                    {
                        "propType": 53
                    },
                    {
                        "propType": 54
                    },
                    {
                        "propType": 55
                    },
                    {
                        "propType": 56
                    },
                    {
                        "propType": 70,
                        "propValue": 60
                    },
                    {
                        "propType": 2000,
                        "propValue": 20391.3515625
                    },
                    {
                        "propType": 2001,
                        "propValue": 1756.5390625
                    },
                    {
                        "propType": 2002,
                        "propValue": 879.7133178710938
                    },
                    {
                        "propType": 2003
                    },
                    {
                        "propType": 1010,
                        "propValue": 13479.236328125
                    }
                ],
                "lifeState": 1,
                "animatorParaList": [
                    {}
                ],
                "avatar": {
                    "uid": 620336771,
                    "avatarId": 10000065,
                    "guid": {
                        "low": 11560,
                        "high": 620336771,
                        "unsigned": true
                    },
                    "peerId": 1,
                    "equipIdList": [
                        81543,
                        81523,
                        73553,
                        81513,
                        81533,
                        11406
                    ],
                    "skillDepotId": 3201,
                    "talentIdList": [
                        651,
                        652,
                        653,
                        654,
                        655,
                        656
                    ],
                    "weapon": {
                        "entityId": 100663509,
                        "gadgetId": 50011406,
                        "itemId": 11406,
                        "guid": {
                            "low": 3482,
                            "high": 620336771,
                            "unsigned": true
                        },
                        "level": 90,
                        "promoteLevel": 6,
                        "abilityInfo": {},
                        "affixMap": {
                            "111406": 0
                        }
                    },
                    "reliquaryList": [
                        {
                            "itemId": 81543,
                            "guid": {
                                "low": 194429,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 21
                        },
                        {
                            "itemId": 81523,
                            "guid": {
                                "low": 135934,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 17
                        },
                        {
                            "itemId": 73553,
                            "guid": {
                                "low": 177817,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 21
                        },
                        {
                            "itemId": 81513,
                            "guid": {
                                "low": 113383,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 21
                        },
                        {
                            "itemId": 81533,
                            "guid": {
                                "low": 182277,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 13
                        }
                    ],
                    "inherentProudSkillList": [
                        322101,
                        322201,
                        322301
                    ],
                    "skillLevelMap": {
                        "10651": 4,
                        "10652": 4,
                        "10653": 9,
                        "10654": 9,
                        "10655": 9,
                        "10656": 9,
                        "10657": 9,
                        "10658": 9,
                        "10659": 9
                    },
                    "proudSkillExtraLevelMap": {
                        "6531": 3,
                        "6532": 3,
                        "6539": 3
                    },
                    "wearingFlycloakId": 140004,
                    "bornTime": 1614097370,
                    "excelInfo": {
                        "prefabPathHash": {
                            "low": 507354767,
                            "high": 188,
                            "unsigned": true
                        },
                        "prefabPathRemoteHash": {
                            "low": -2135733983,
                            "high": 247,
                            "unsigned": true
                        },
                        "controllerPathHash": {
                            "low": -970968086,
                            "high": 202,
                            "unsigned": true
                        },
                        "controllerPathRemoteHash": {
                            "low": -173374137,
                            "high": 100,
                            "unsigned": true
                        },
                        "combatConfigHash": {
                            "low": -111580314,
                            "high": 45,
                            "unsigned": true
                        }
                    }
                },
                "entityClientData": {},
                "entityAuthorityInfo": {
                    "abilityInfo": {},
                    "rendererChangedInfo": {},
                    "aiInfo": {
                        "isAiOpen": true,
                        "bornPos": {}
                    },
                    "bornPos": {}
                }
            },
            "weaponGuid": {
                "low": 3482,
                "high": 620336771,
                "unsigned": true
            },
            "weaponEntityId": 100663509,
            "weaponAbilityInfo": {},
            "abilityControlBlock": {
                "abilityEmbryoList": [
                    {"abilityId": 7,"abilityNameHash": 3025809079,"abilityOverrideNameHash": 1178079449},
{"abilityId": 8,"abilityNameHash": 1662050655,"abilityOverrideNameHash": 1178079449},
{"abilityId": 9,"abilityNameHash": 752846185,"abilityOverrideNameHash": 1178079449},
{"abilityId": 10,"abilityNameHash": 731168062,"abilityOverrideNameHash": 1178079449},
{"abilityId": 11,"abilityNameHash": 3861734037,"abilityOverrideNameHash": 1178079449},
{"abilityId": 12,"abilityNameHash": 502324281,"abilityOverrideNameHash": 1178079449},
{"abilityId": 13,"abilityNameHash": 985936588,"abilityOverrideNameHash": 1178079449},
{"abilityId": 14,"abilityNameHash": 2705947909,"abilityOverrideNameHash": 1178079449},
{"abilityId": 15,"abilityNameHash": 3323912088,"abilityOverrideNameHash": 1178079449},
{"abilityId": 16,"abilityNameHash": 1966215531,"abilityOverrideNameHash": 1178079449},
{"abilityId": 17,"abilityNameHash": 395993297,"abilityOverrideNameHash": 1178079449},
{"abilityId": 18,"abilityNameHash": 1865022656,"abilityOverrideNameHash": 1178079449},
{"abilityId": 19,"abilityNameHash": 173656730,"abilityOverrideNameHash": 1178079449},
{"abilityId": 20,"abilityNameHash": 4153732733,"abilityOverrideNameHash": 1178079449},
{"abilityId": 21,"abilityNameHash": 2412439820,"abilityOverrideNameHash": 1178079449},
{"abilityId": 22,"abilityNameHash": 600896811,"abilityOverrideNameHash": 1178079449},
{"abilityId": 23,"abilityNameHash": 2514158575,"abilityOverrideNameHash": 1178079449},
{"abilityId": 24,"abilityNameHash": 3833596208,"abilityOverrideNameHash": 1178079449},
{"abilityId": 25,"abilityNameHash": 1993374714,"abilityOverrideNameHash": 1178079449},
                ]
            }
        },
        {
            "playerUid": 620336771,
            "avatarGuid": {
                "low": 428020,
                "high": 620336771,
                "unsigned": true
            },
            "sceneId": sceneIdSelect,
            "entityId": 16777430,
            "avatarAbilityInfo": {},
            "sceneEntityInfo": {
                "entityType": 1,
                "entityId": 16777430,
                "motionInfo": {
                    "pos": {},
                    "rot": {},
                    "speed": {}
                },
                "propList": [
                    {
                        "type": 4001,
                        "propValue": {
                            "type": 4001,
                            "ival": {
                                "low": 80,
                                "high": 0,
                                "unsigned": false
                            },
                            "val": {
                                "low": 80,
                                "high": 0,
                                "unsigned": false
                            }
                        }
                    }
                ],
                "fightPropList": [
                    {
                        "propType": 1,
                        "propValue": 11387.720703125
                    },
                    {
                        "propType": 2,
                        "propValue": 6303.6494140625
                    },
                    {
                        "propType": 3,
                        "propValue": 0.05249999836087227
                    },
                    {
                        "propType": 4,
                        "propValue": 746.2235107421875
                    },
                    {
                        "propType": 5,
                        "propValue": 342.1199951171875
                    },
                    {
                        "propType": 6,
                        "propValue": 0.1923000067472458
                    },
                    {
                        "propType": 7,
                        "propValue": 696.385986328125
                    },
                    {
                        "propType": 8,
                        "propValue": 120.3699951171875
                    },
                    {
                        "propType": 9,
                        "propValue": 0.13120000064373016
                    },
                    {
                        "propType": 20,
                        "propValue": 0.2794000208377838
                    },
                    {
                        "propType": 21
                    },
                    {
                        "propType": 22,
                        "propValue": 1.728100061416626
                    },
                    {
                        "propType": 23,
                        "propValue": 2.5584001541137695
                    },
                    {
                        "propType": 26
                    },
                    {
                        "propType": 27
                    },
                    {
                        "propType": 28
                    },
                    {
                        "propType": 29
                    },
                    {
                        "propType": 30
                    },
                    {
                        "propType": 40
                    },
                    {
                        "propType": 41,
                        "propValue": 0.4659999907016754
                    },
                    {
                        "propType": 42
                    },
                    {
                        "propType": 43
                    },
                    {
                        "propType": 44
                    },
                    {
                        "propType": 45
                    },
                    {
                        "propType": 46
                    },
                    {
                        "propType": 50
                    },
                    {
                        "propType": 51
                    },
                    {
                        "propType": 52
                    },
                    {
                        "propType": 53
                    },
                    {
                        "propType": 54
                    },
                    {
                        "propType": 55
                    },
                    {
                        "propType": 56
                    },
                    {
                        "propType": 71,
                        "propValue": 90
                    },
                    {
                        "propType": 2000,
                        "propValue": 18289.2265625
                    },
                    {
                        "propType": 2001,
                        "propValue": 1231.84228515625
                    },
                    {
                        "propType": 2002,
                        "propValue": 908.1217651367188
                    },
                    {
                        "propType": 2003
                    },
                    {
                        "propType": 1010,
                        "propValue": 16460.3046875
                    }
                ],
                "lifeState": 1,
                "animatorParaList": [
                    {}
                ],
                "avatar": {
                    "uid": 620336771,
                    "avatarId": 10000052,
                    "guid": {
                        "low": 428020,
                        "high": 620336771,
                        "unsigned": true
                    },
                    "peerId": 1,
                    "equipIdList": [
                        94543,
                        94523,
                        94553,
                        77514,
                        94533,
                        13415
                    ],
                    "skillDepotId": 5201,
                    "weapon": {
                        "entityId": 100663511,
                        "gadgetId": 50013415,
                        "itemId": 13415,
                        "guid": {
                            "low": 429830,
                            "high": 620336771,
                            "unsigned": true
                        },
                        "level": 80,
                        "promoteLevel": 5,
                        "abilityInfo": {},
                        "affixMap": {
                            "113415": 0
                        }
                    },
                    "reliquaryList": [
                        {
                            "itemId": 94543,
                            "guid": {
                                "low": 445212,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 21
                        },
                        {
                            "itemId": 94523,
                            "guid": {
                                "low": 444057,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 21
                        },
                        {
                            "itemId": 94553,
                            "guid": {
                                "low": 441273,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 21
                        },
                        {
                            "itemId": 77514,
                            "guid": {
                                "low": 354256,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 21
                        },
                        {
                            "itemId": 94533,
                            "guid": {
                                "low": 439740,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 21
                        }
                    ],
                    "inherentProudSkillList": [
                        522101,
                        522201,
                        522301,
                        522501
                    ],
                    "skillLevelMap": {
                        "10521": 3,
                        "10522": 6,
                        "10525": 8
                    },
                    "proudSkillExtraLevelMap": {
                        "5231": 1
                    },
                    "wearingFlycloakId": 140001,
                    "bornTime": 1631388201,
                    "excelInfo": {
                        "prefabPathHash": {
                            "low": -2078331469,
                            "high": 154,
                            "unsigned": true
                        },
                        "prefabPathRemoteHash": {
                            "low": 1116714356,
                            "high": 118,
                            "unsigned": true
                        },
                        "controllerPathHash": {
                            "low": 701070043,
                            "high": 215,
                            "unsigned": true
                        },
                        "controllerPathRemoteHash": {
                            "low": 932892543,
                            "high": 60,
                            "unsigned": true
                        },
                        "combatConfigHash": {
                            "low": 1044450984,
                            "high": 253,
                            "unsigned": true
                        }
                    }
                },
                "entityClientData": {},
                "entityAuthorityInfo": {
                    "abilityInfo": {},
                    "rendererChangedInfo": {},
                    "aiInfo": {
                        "isAiOpen": true,
                        "bornPos": {}
                    },
                    "bornPos": {}
                }
            },
            "weaponGuid": {
                "low": 429830,
                "high": 620336771,
                "unsigned": true
            },
            "weaponEntityId": 100663511,
            "weaponAbilityInfo": {},
            "abilityControlBlock": {
                "abilityEmbryoList": [
                    {
                        "abilityId": 6,
                        "abilityNameHash": 3615654516,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 7,
                        "abilityNameHash": 3822074956,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 8,
                        "abilityNameHash": 2337815395,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 9,
                        "abilityNameHash": 3402617160,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 10,
                        "abilityNameHash": 2483967753,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 11,
                        "abilityNameHash": 3150635223,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 12,
                        "abilityNameHash": 3995491792,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 13,
                        "abilityNameHash": 2306062007,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 14,
                        "abilityNameHash": 3105629177,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 15,
                        "abilityNameHash": 3771526669,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 16,
                        "abilityNameHash": 100636247,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 17,
                        "abilityNameHash": 1564404322,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 18,
                        "abilityNameHash": 497711942,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 19,
                        "abilityNameHash": 1150936224,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 20,
                        "abilityNameHash": 127390306,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 21,
                        "abilityNameHash": 2433777281,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 22,
                        "abilityNameHash": 265136204,
                        "abilityOverrideNameHash": 1178079449
                    }
                ]
            }
        },
        {
            "playerUid": 620336771,
            "avatarGuid": {
                "low": 237803,
                "high": 620336771,
                "unsigned": true
            },
            "sceneId": sceneIdSelect,
            "entityId": 16777432,
            "avatarAbilityInfo": {},
            "sceneEntityInfo": {
                "entityType": 1,
                "entityId": 16777432,
                "motionInfo": {
                    "pos": {},
                    "rot": {},
                    "speed": {}
                },
                "propList": [
                    {
                        "type": 4001,
                        "propValue": {
                            "type": 4001,
                            "ival": {
                                "low": 70,
                                "high": 0,
                                "unsigned": false
                            },
                            "val": {
                                "low": 70,
                                "high": 0,
                                "unsigned": false
                            }
                        }
                    }
                ],
                "fightPropList": [
                    {
                        "propType": 1,
                        "propValue": 11243.2080078125
                    },
                    {
                        "propType": 2,
                        "propValue": 5945.1396484375
                    },
                    {
                        "propType": 3,
                        "propValue": 2.0653371810913086
                    },
                    {
                        "propType": 4,
                        "propValue": 506.591064453125
                    },
                    {
                        "propType": 5,
                        "propValue": 349.1300048828125
                    },
                    {
                        "propType": 6,
                        "propValue": 0.2856000065803528
                    },
                    {
                        "propType": 7,
                        "propValue": 564.4993896484375
                    },
                    {
                        "propType": 8,
                        "propValue": 79.6300048828125
                    },
                    {
                        "propType": 9,
                        "propValue": 0.10490000247955322
                    },
                    {
                        "propType": 20,
                        "propValue": 0.2289000004529953
                    },
                    {
                        "propType": 21
                    },
                    {
                        "propType": 22,
                        "propValue": 0.9429000020027161
                    },
                    {
                        "propType": 23,
                        "propValue": 1.152899980545044
                    },
                    {
                        "propType": 26
                    },
                    {
                        "propType": 27
                    },
                    {
                        "propType": 28
                    },
                    {
                        "propType": 29
                    },
                    {
                        "propType": 30
                    },
                    {
                        "propType": 40
                    },
                    {
                        "propType": 41
                    },
                    {
                        "propType": 42
                    },
                    {
                        "propType": 43
                    },
                    {
                        "propType": 44
                    },
                    {
                        "propType": 45,
                        "propValue": 0.14399999380111694
                    },
                    {
                        "propType": 46
                    },
                    {
                        "propType": 50
                    },
                    {
                        "propType": 51
                    },
                    {
                        "propType": 52
                    },
                    {
                        "propType": 53
                    },
                    {
                        "propType": 54
                    },
                    {
                        "propType": 55
                    },
                    {
                        "propType": 56
                    },
                    {
                        "propType": 76,
                        "propValue": 40
                    },
                    {
                        "propType": 2000,
                        "propValue": 40409.36328125
                    },
                    {
                        "propType": 2001,
                        "propValue": 1000.4034423828125
                    },
                    {
                        "propType": 2002,
                        "propValue": 703.3453979492188
                    },
                    {
                        "propType": 2003
                    },
                    {
                        "propType": 1010,
                        "propValue": 27865.51953125
                    }
                ],
                "lifeState": 1,
                "animatorParaList": [
                    {}
                ],
                "avatar": {
                    "uid": 620336771,
                    "avatarId": 10000030,
                    "guid": {
                        "low": 237803,
                        "high": 620336771,
                        "unsigned": true
                    },
                    "peerId": 1,
                    "equipIdList": [
                        88543,
                        91523,
                        91553,
                        91513,
                        91433,
                        13303
                    ],
                    "skillDepotId": 3001,
                    "weapon": {
                        "entityId": 100663513,
                        "gadgetId": 50013303,
                        "itemId": 13303,
                        "guid": {
                            "low": 44569,
                            "high": 620336771,
                            "unsigned": true
                        },
                        "level": 80,
                        "promoteLevel": 5,
                        "abilityInfo": {},
                        "affixMap": {
                            "113303": 4
                        }
                    },
                    "reliquaryList": [
                        {
                            "itemId": 88543,
                            "guid": {
                                "low": 95509,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 21
                        },
                        {
                            "itemId": 91523,
                            "guid": {
                                "low": 239975,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 21
                        },
                        {
                            "itemId": 91553,
                            "guid": {
                                "low": 336407,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 21
                        },
                        {
                            "itemId": 91513,
                            "guid": {
                                "low": 304073,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 21
                        },
                        {
                            "itemId": 91433,
                            "guid": {
                                "low": 358333,
                                "high": 620336771,
                                "unsigned": true
                            },
                            "level": 17
                        }
                    ],
                    "inherentProudSkillList": [
                        302101,
                        302201,
                        302301
                    ],
                    "skillLevelMap": {
                        "10301": 2,
                        "10302": 6,
                        "10303": 6
                    },
                    "proudSkillExtraLevelMap": {
                        "3031": 1
                    },
                    "wearingFlycloakId": 140005,
                    "bornTime": 1620699348,
                    "excelInfo": {
                        "prefabPathHash": {
                            "low": -238751940,
                            "high": 142,
                            "unsigned": true
                        },
                        "prefabPathRemoteHash": {
                            "low": -46435818,
                            "high": 234,
                            "unsigned": true
                        },
                        "controllerPathHash": {
                            "low": -1683268110,
                            "high": 151,
                            "unsigned": true
                        },
                        "controllerPathRemoteHash": {
                            "low": 1666636965,
                            "high": 237,
                            "unsigned": true
                        },
                        "combatConfigHash": {
                            "low": -1820171094,
                            "high": 147,
                            "unsigned": true
                        }
                    }
                },
                "entityClientData": {},
                "entityAuthorityInfo": {
                    "abilityInfo": {},
                    "rendererChangedInfo": {},
                    "aiInfo": {
                        "isAiOpen": true,
                        "bornPos": {}
                    },
                    "bornPos": {}
                }
            },
            "weaponGuid": {
                "low": 44569,
                "high": 620336771,
                "unsigned": true
            },
            "weaponEntityId": 100663513,
            "weaponAbilityInfo": {},
            "abilityControlBlock": {
                "abilityEmbryoList": [
                    {
                        "abilityId": 5,
                        "abilityNameHash": 1529187430,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 6,
                        "abilityNameHash": 440915193,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 7,
                        "abilityNameHash": 664835149,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 8,
                        "abilityNameHash": 3086456309,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 9,
                        "abilityNameHash": 413798022,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 10,
                        "abilityNameHash": 1122239457,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 11,
                        "abilityNameHash": 487661916,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 12,
                        "abilityNameHash": 1358503499,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 13,
                        "abilityNameHash": 981208402,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 14,
                        "abilityNameHash": 2306062007,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 15,
                        "abilityNameHash": 3105629177,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 16,
                        "abilityNameHash": 3771526669,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 17,
                        "abilityNameHash": 100636247,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 18,
                        "abilityNameHash": 1564404322,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 19,
                        "abilityNameHash": 497711942,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 20,
                        "abilityNameHash": 127390306,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 21,
                        "abilityNameHash": 2682057395,
                        "abilityOverrideNameHash": 1178079449
                    },
                    {
                        "abilityId": 22,
                        "abilityNameHash": 4137789196,
                        "abilityOverrideNameHash": 1178079449
                    }
                ]
            },
            "isPlayerCurAvatar": true
        }
    ]
}


var AddFriendNotify= { 
    "targetUid": 1337,
    "targetFriendBrief": {
    "uid": 1337,
    "nickname": "Console",
    "level": 100,
    "worldLevel": 8,
    "signature": "Console Command",
    "onlineState": 1,
    "isMpModeAvailable": true,
    "nameCardId": 210070,
    "showAvatarInfoList": [
    {"avatarId": 10000033,"level": 85},
    {"avatarId": 10000032,"level": 83},
    {"avatarId": 10000016,"level": 80},
    {"avatarId": 10000030,"level": 60},
    {"avatarId": 10000041,"level": 80},
    {"avatarId": 10000042,"level": 70},
    {"avatarId": 10000051,"level": 90},
    {"avatarId": 10000006,"level": 71}]}}

var PlayerEnterSceneInfoNotify = {
    "curAvatarEntityId": 16777432,
    "avatarEnterInfo": [
        {
            "avatarGuid": "2664326143951372989",
            "avatarEntityId": 16777426,
            "avatarAbilityInfo": {},
            "weaponGuid": "2664326143951246184",
            "weaponEntityId": 100663507,
            "weaponAbilityInfo": {}
        },
        {
            "avatarGuid": "2664326143951252776",
            "avatarEntityId": 16777428,
            "avatarAbilityInfo": {},
            "weaponGuid": "2664326143951244698",
            "weaponEntityId": 100663509,
            "weaponAbilityInfo": {}
        },
        {
            "avatarGuid": "2664326143951669236",
            "avatarEntityId": 16777430,
            "avatarAbilityInfo": {},
            "weaponGuid": "2664326143951671046",
            "weaponEntityId": 100663511,
            "weaponAbilityInfo": {}
        },
        {
            "avatarGuid": "2664326143951479019",
            "avatarEntityId": 16777432,
            "avatarAbilityInfo": {},
            "weaponGuid": "2664326143951285785",
            "weaponEntityId": 100663513,
            "weaponAbilityInfo": {}
        }
    ],
    "teamEnterInfo": {
        "teamEntityId": 150995153,
        "teamAbilityInfo": {},
        "abilityControlBlock": {}
    },
    "mpLevelEntityInfo": {
        "entityId": 184549594,
        "authorityPeerId": 1,
        "abilityInfo": {}
    },
    "enterSceneToken": 8427
}


var SceneEntityAppearNotify = {
    "entityList": [
        {
            "entityType": 1,
            "entityId": 16777432,
            "motionInfo": {
                "pos": posScene,
                "rot": {
                    "Y": 38.38740158081055
                },
                "speed": {}
            },
            "propList": [
                {
                    "type": 4001,
                    "propValue": {
                        "type": 4001,
                        "ival": "70",
                        "val": "70"
                    }
                }
            ],
            "fightPropList": [
                {
                    "propType": 1,
                    "propValue": 11243.2080078125
                },
                {
                    "propType": 2,
                    "propValue": 5945.1396484375
                },
                {
                    "propType": 3,
                    "propValue": 2.0653371810913086
                },
                {
                    "propType": 4,
                    "propValue": 506.591064453125
                },
                {
                    "propType": 5,
                    "propValue": 349.1300048828125
                },
                {
                    "propType": 6,
                    "propValue": 0.2856000065803528
                },
                {
                    "propType": 7,
                    "propValue": 564.4993896484375
                },
                {
                    "propType": 8,
                    "propValue": 79.6300048828125
                },
                {
                    "propType": 9,
                    "propValue": 0.10490000247955322
                },
                {
                    "propType": 20,
                    "propValue": 0.2289000004529953
                },
                {
                    "propType": 21
                },
                {
                    "propType": 22,
                    "propValue": 0.9429000020027161
                },
                {
                    "propType": 23,
                    "propValue": 1.152899980545044
                },
                {
                    "propType": 26
                },
                {
                    "propType": 27
                },
                {
                    "propType": 28
                },
                {
                    "propType": 29
                },
                {
                    "propType": 30
                },
                {
                    "propType": 40
                },
                {
                    "propType": 41
                },
                {
                    "propType": 42
                },
                {
                    "propType": 43
                },
                {
                    "propType": 44
                },
                {
                    "propType": 45,
                    "propValue": 0.14399999380111694
                },
                {
                    "propType": 46
                },
                {
                    "propType": 50
                },
                {
                    "propType": 51
                },
                {
                    "propType": 52
                },
                {
                    "propType": 53
                },
                {
                    "propType": 54
                },
                {
                    "propType": 55
                },
                {
                    "propType": 56
                },
                {
                    "propType": 76,
                    "propValue": 40
                },
                {
                    "propType": 2000,
                    "propValue": 40409.36328125
                },
                {
                    "propType": 2001,
                    "propValue": 1000.4034423828125
                },
                {
                    "propType": 2002,
                    "propValue": 703.3453979492188
                },
                {
                    "propType": 2003
                },
                {
                    "propType": 1010,
                    "propValue": 27865.51953125
                }
            ],
            "lifeState": 1,
            "animatorParaList": [
                {}
            ],
            "avatar": {
                "uid": 1337,
                "avatarId": 10000030,
                "guid": "2664326143951479019",
                "peerId": 1,
                "equipIdList": [
                    88543,
                    91523,
                    91553,
                    91513,
                    91433,
                    13303
                ],
                "skillDepotId": 3001,
                "weapon": {
                    "entityId": 100663513,
                    "gadgetId": 50013303,
                    "itemId": 13303,
                    "guid": "2664326143951285785",
                    "level": 80,
                    "promoteLevel": 5,
                    "abilityInfo": {},
                    "affixMap": {
                        "113303": 4
                    }
                },
                "reliquaryList": [
                    {
                        "itemId": 88543,
                        "guid": "2664326143951336725",
                        "level": 21
                    },
                    {
                        "itemId": 91523,
                        "guid": "2664326143951481191",
                        "level": 21
                    },
                    {
                        "itemId": 91553,
                        "guid": "2664326143951577623",
                        "level": 21
                    },
                    {
                        "itemId": 91513,
                        "guid": "2664326143951545289",
                        "level": 21
                    },
                    {
                        "itemId": 91433,
                        "guid": "2664326143951599549",
                        "level": 17
                    }
                ],
                "inherentProudSkillList": [
                    302101,
                    302201,
                    302301
                ],
                "skillLevelMap": {
                    "10301": 2,
                    "10302": 6,
                    "10303": 6
                },
                "proudSkillExtraLevelMap": {
                    "3031": 1
                },
                "teamResonanceList": [],
                "wearingFlycloakId": 140005,
                "bornTime": 1620699348,
                "excelInfo": {
                    "prefabPathHash": "613941571388",
                    "prefabPathRemoteHash": "1009270878742",
                    "controllerPathHash": "651151760882",
                    "controllerPathRemoteHash": "1019573886117",
                    "combatConfigHash": "633834988714"
                }
            },
            "entityClientData": {},
            "entityAuthorityInfo": {
                "abilityInfo": {},
                "rendererChangedInfo": {},
                "aiInfo": {
                    "isAiOpen": true,
                    "bornPos": {}
                },
                "bornPos": {}
            }
        }
    ],
    "appearType": "VISION_BORN"
}


var PlayerStoreNotify = {
    "storeType": 1,
    "itemList": [
        {
            "itemId": 15508,
            "guid": "123123123123123",
            "equip": {
                "weapon": {
                    "level": 90,
                    "promoteLevel": 6,
                    "affixMap": {
                        "115508": 0
                    }
                }
            }
        }
    ],
    "weightLimit": 2000,
}


var PlayerEnterSceneNotify1 = {
    "sceneId": sceneIdSelect,
    "pos": posScene,
    "sceneBeginTime": "1634238866027",
    "type": 1,
    "targetUid": 1337,
    "worldLevel": 8,
    "enterSceneToken": 8427,
    "isFirstLoginEnterScene": false,
    "sceneTagIdList": [
        102,
        107,
        109,
        111,
        112,
        113,
        116,
        117,
        118,
        125
    ],
    "enterReason": 1,
    "worldType": 1,
    "sceneTransaction": "3-1337-1634238866-5602"
}

var MHYKey = "yVhTpFklXX+0pmuqnp8DZADpIVkPDfVgGRo9LZAz5HTs0Elb2E8rQt01hCaNStQUxWipx8QDLzLoFqIT5yJoaY1wqvRbx/8WxkQWoRogk/5RlKdHUHiEnLJgSnI0QUguwjctaO72mjp5b412CqxlsxAFSFB7/4B4Vu7lDrceXARI5O7gOSEpMv9/Fpb9A6xM59KmRr7ZRaR10qbdCCHQ3LAmXcw71xAOtg/e0fok/QoHZkrLlvgFrIWUNtiK9qAmFkLhYXpse91HAEvn0ett3Ool0aIOFeT9rqgjFZBOPJmAyeF3mBAsyLRyussx795QmkT+SJ7e5TnzUvy1HO4qffHkzq/dAvi0JBHvX6pdWcrgSZ2p1HCCOj/Aij6z2hkyEp6loZI6kg1xvS0KCB4cVASK7jThdyJB4fZ/qBOyGRU6Pi6CrGvyV1Ztc9196Cz31pOZq8dUA/O6IRY8sMg6NM9qifAEK+1c4d6ubpagQGTdGEsJO10uOO88BvTCc0QPPZ7xPwk0qQho7BfvW19fwYFZ3F87d4AfomA5HPnTWG1RfCOdU3oeY/ShRv67urQV9/szRwIoCDBNx45u5a//QiEOa45RWA+Q80PuBnzbb3SM2T5KtaOrvcak54eqqVEERsbYD9DOqeK/BKVBy355ijpRGo0wCWPOhcG/kUFYekGwsEKpb4b9PuOS8HTEwCQfHR51fwFfqYoBqk3/xSOYpm6qUCwvzPoIcNNRgjKKly/sJKr6+kf0ug5dPb03CQfMQmnfiF6N7GVqn/3YAb6Uax1LqXDRgDp4nrCMO3sI0LvmtPWU9zVJ0cfWu27PzqxhTPSdROjzteaR6X5SAAJHZV7hQEJfEiKvhwP1FYCB8bj8SQ95nCP40jvvTbgzZLkR0lsLJUrAOKz/fRZkMAMs69NFlbIuNQr/oMU164WYsurjMijTASOdv/QjBD2pRXoyS6qWgQZbDe7HL8iVCi/BKThCDRSFubFVzlKxtLz1HdsIi2vXJ5ZmNR4+5AYOidtL201gKPYGCVMt3pXASJMelBT5qEkd3q3rSciNvPCAC2wsUiaCpZJ6RvBDBX3M5qImglDRHpdrrYZBCDvju0yun84dtR4HgBnzNTYvb7IItqEmzy++KrhRQGd9lHoNX1rIarELihWDsBLDeMgwKInHTd+DZdfIYQMGKjXZ6ZlldzBNciV79608ZnBhYG8tmN9a2NjnTb1g6bee22zxSQVx0awjjEXcc1dcCOi88EQMlChyiZ2DX5CfYWX3Oios+UXKckBpS9r8KvRheqIG4ASKSIoaAFDZuBK9gC6QH2luKovMGzGY+Jbyifgyh8p5rJDu19hOmRUD7r98VT4DVn+YNZZQFegxzLsZRhEaozFGQNqbPr+5oVKtWLW93BHrrc0xXRzDwSL/8LJQkbHFfgaUSBqAP6tpEAuOGFuaQlPJl3OQN+7PNXX1etnehKH+l+HV1V9FGjKnVhjHN1hW7lkhDmIDPld++1wqQ11gzLgpdx0fe0/URdAfPjxFm+40DQ11mNCx1iyLRD88D8CppxAtPTvO+NBisMUwBmuN2Cy1MnLpy1qzvpSTqqIip3WclP+cqZO3Tz9l0g0wxLKQr8xb7+9ST1bmRLZmdE28qlFh+DMEcysJWmyefhItFhWyP2oa9uiQ/c9pqnaDgrC93OgWkg0kwymeeJs7Neo1amQHYO7oWFm0hDeUJD59qlWYvsD4n1fq/acxFLBULo1PTzYl3UcrM2e94qlOaP27Aa5k6AUDt9u2rpBPL+oQJzoHKtvnLhwpFLGLSepp4hOAV0uU6XpDbPdA28ggDGtYa5hA7rGefQaHdkAse45nIqQG4fTwbSgCXtpaZawPs6m3TJjeSTqPRIcJTsvo/wL9sZw+F8ZNQ0misFcen3AwzW4gPXvQUN+QEWoA3PyOdJa8Cszpuui1JLfkx4an+FhdDOANvC0Tv6inJl9QE3v/uh1m+EZsGr3vuWNOH8i7ZVSWHPOR3QcXPqOnbm1V1i0mMFznd6B7i4XCUkvruBLGSO6YEI4nrx1Bj9ey/z8M43R1ryi4EJy7JyzTiXDJY8IQlqSdoAfUws+jQmTyG3o3LSpxmFWWBvEEWzK7hezQD5hLh+hza4ZWgtnVcOgUyXPH2PwVYQ12WFmzFxmWLaA6h9CrhznqY91jn2eWipbu8oi5EvrSACkF1S+vsU5fhtL5JBbkS+psqyn5hw+71RRANA0draFUVBIwjItLjgqBzSuCtKQut7+LpIgQzpciTLrGrJ0S2SPuF8qIjOv5Ydzzwr/79kGRLTIdaTXCeQZ3PaaDI6SN0A9zUUpIaQXutsgXguMt4fQjp3dR/S6jOfxc/IwFWWeognavUOSWIwh23QIugPUAV//3SN8ADi6QGtIzx/Wvuc9P96IjNBYGRM0CwdqdPMHUCAlj9p4Fs5E4WZcLDrEuXdAJAjNsCDftVbqGBjeDXJn9J+pA0Tlh83iGChgo98ZAMNx0i//fmxPI44+cEEJSW7fITPkdSNC9Mv7VDNmGcpE+CT7M68iQalxgUk9wBh7uAM4SqFOtUEsThSJKHAmujdAgz+jppl+E5QKgIHkeJk9+5aCMHz1b/h+Cme3suYeeKFwIu+kXZZG8OlIphYQyhTTmjxuLbbGmUAqhrxKTEARsnEENSRjd23DR8Bm1eZFqEGWnqw0peNTyDn7Xr7Z8r1a5SwLoCly2pGA4lsYnLCLlQAAce+038/C2VPo0ru47kFusPgu2urJjeaNYkVqGSFwUe2YYKAiBoMQraBz5/zNNf4p59SBB4wP/F+isKcE+Vv03DSdkfskE7NBZgpzMmesobp3cgTbT1KwB2USNkTq/bnRH2vMURZPYjByESzmPS8EGjT0ow4kbH6/XHdYTaDz4wxqqI8wRWj8ZvvYjEVhlTvg4hdNXFOMQ8p1LuQ+WK566X3/Q+JfXxLlN6lJ9yMZiYVpkzJwxc27l21hcQeWMJ56AhdcxHQ1D08Q0Yu1BGzTrnKNIeEbOySS/0IYZSHSohlJkbKGjfS2+VJfNHzY3PqTawfWiWd9hd+fq6ORwHK7vWpTgAC/Q+6SOFw4iDHsuAyKeWcKMSShscDoTsXR0Ht+Q5qI99G0+3KA7IvODQkiOlFW35v1DdHGK/ujXN+zKUxDJfyQ+SkfOOQa12QpezxIf4EzM7+A2vmLpcWpzO6DXnOUQyyiZgvqOuqCVoh64L0Radca5GZNoWCJRj9uG0F0Orm5ASFKjxHbjLgz8eYeWMwkCbxhyMjXPuD/FlpdpWqbigC9khbXxa1W53k/o56RldBT1SzfHquRaXpnEBupuXLXFO3ubhv/FUTzuh0kYxenPZEgYdPsbcZzfw+NxJa1LIcOiIwkZGiz5gJUKbtL78AXO3pxG8MBiIAZ/eAb6QoUyWVEJy1gcu3OCCndeyrjE/hLY+FP4EVaVLiS39j/vtUKQyivGh1R8oaeuU9/pbNZvV7TXsygUXG9xPNjDcBW4QdMPI9lEaamPlIOy78aykPoo3+biykq4lpkwgmJusY12iuVa2dTcs35P0dsWRbF2L887ht23+D8bym+nmwCbjf3qXekI9ZegmQ2aK0OEg0o1TtmteRKrih5W0wEAVyWX2oRctwavFBF5Js6oPHpdoKGrlOQpfsVUDcLMAWo46USoYyvCfZXdy7Q60Y2qfO5R9XDxdvajoDo3lvWA2yFnfaXU6cE0dLGFR4EZ7wcC8xUi4U4y8EXX/Vy8+Zxb9wKEG6EpT0drUOpZqRP8bNzppUrqgHuVztK9G2ZPu4J7+i17OToRaloYbyrQEgOS5r3xu1mIl6zw+vlILt3CtWAP9NsFF4HLvua9JAk9MYDF7RaDpT1CvPc+vroZ6yAc6vpK/7fhYzQbp0kzkrAN7QCUt1LKBBSuF5DEuwkVK74cIZ0l+Oq+An4EgsncnqUVO5jMzA4peiLFz4yYdcfMue2ZwkD0NTsjXQ9IgJFT+tZcZNXB1dZ1nLfxKx0z9R1T80jlG1NdWWRTyr8Am7pg0bDoQgy0ANzzaKVypurbCFyQALIjKc3cXbGqMU6piCVj8WcXaeC9TgYbD8bgB85zF2zFQXVti/8lnRjM4f86lXiC3dHGCxbIzVxp8yYbv6TWq5TsgOll/jzBHuE92iN51yEsGhfVhOyi3ao36EiRIlSSgZqxi6a2iCYcUG7dcEFcfrnk+UnMpMF6Ms/ovjyvY8z3WkpqXLfCqB5YvKLD/pYJfl5cqkig1FNmna2u3R2rnlGcqh+9YxLYiAe7dZCc5drsse6ksk1sEqT988WKUUM7jCEuA+LMXqlPvkW0o155bi3imdo69ujjKTWKtNWwUnRJjqkO8Ax00NxLcR4O1LjhuCnyM83uwIUn01cOmVKdtiK0ONWxvpfkbuHD5Hn5Ge4C7pCS/8lT5EfuM1nARFSwQCaPUSx7I0vK7akH9+Y9+GaAhMhy3PuZvoVISOjEI/XJ/hMyJDnREdXCmnmkffP6nhYqJnzZHEXWk8st9GVhuQgNgS4V7ID//i0KT0WynLTj7v7AfLHvBPSHIzVYHDY/seZtWjFMH0+6ONDwkzb2f9mwHMOKEJvjdM5cuRVPZxXF/D4B0Rr+Hs7ue6DtqDlqMsU2OcogVnQF9aO7SgdVkRccc+SeLwtAYBPpMeUNeecbpL6LVvR9W65HxI/HeI9+A/3z50wVLF4UIkURVvSePxMHLndekrKpaoM5KDT80z0V/j4uOP7aJmrv7lYO5A84+GwO2/CKp30WW4NZlUpqon8/5ZOJCE0XrWdic58dVAQPTvJAdyLPKPd21YtCYXkLEJkwyffezz82KXgfGFU0alFYeK3KX1RRUGH9b/kcZydciE1SymnrVM0F1kQZzuAwu3e9llPU31cZUDP6awu+ezxFT+X4RVTShHvcofilEYm1HWewVgVeVaBG4AY6NisvjNU+vRcAc+Yst5EvowMbAKiPG6jhgGgsbA36/aNPyEF/EwEOo14Gc9iZnSlcGpEexZQm2HyzLNAzD+6pA54M4wZ3txVSDJjDHF14TnfqZmdH4QoBWqT5Z8Myqs+qwIM4hwUZ9y1NnaSgU1Bx0NbrLo2FqbpI7Ftv+ciqCE44DX9oN/zG6OonZZGzCW8BO+BeroU1jETJay3/LMIXik8smNjdka5g3GKq1/HZ+ErWtAPqNjrbaLcZvV5WAn4OVQwOaF7DlMmHfHZLDWBD8T6di8SFnOCSZd2YglcCsEDkFQ0DoAZ2gTfg1kVaWumsgnS3FswIS1yzTZbiEALS4FpVp6idZM1eMtQUgpzZZxLaxzHXrV6HkSW2WfkplGvq7r8PZp1YKJAMUXGKoLYHyhpaJDB+qotju0ymhya3C/HeILn5qWOSVZQu8HaQis9r7V5hDTj3FrBP73CkCAV4elPxM1suoU/Rkq2TX+qBYLtzhY5KlvHv9acKL7TT1LVdMA==";
var initialKey = Buffer.from(MHYKey,'base64');

function handleHandshake(data, type) {
    switch (type) {
        case 255: // 0xFF -- NEW CONNECTION
            var buffer = Buffer.from(data)
            var Handshake = new handshake();
            Handshake.decode(buffer);

            var _Conv = (Date.now());
            var _Token = 0xFFCCEEBB ^ ((Date.now() >> 32) & 0xFFFFFFFF);

            var newBuffer = new handshake([0x145, 0x14514545], _Conv, _Token);
            return newBuffer;
        case 404: // 0X194 -- DISCONNECTION
            var buffer = Buffer.from(data)
            var Handshake = new handshake(handshake.MAGIC_DISCONNECT);

            seedKey = undefined

            return Handshake
        default:
            console.log("[UNHANDLED HANDSHAKE] %x" + type)
            return;
    }


}

var sentTimes = {}
async function sendPacketAsyncByName(kcpobj, name, keyBuffer, Packet = undefined) {

    // Reads the bin file from the packet
    if (Packet == undefined) {
        // console.log("[FS] READING %s", name)
        Packet = Buffer.from(fs.readFileSync("base64/" + name + ".txt"), 'base64')
    }

    if (parseInt(name.charAt(name.length - 1))) {
        name = name.slice(0, name.length - 1)
    }
    // Determines packetID by name
    const packetID = dataUtil.getPacketIDByProtoName(name)

    // logs the packet [DEBUG]
    // console.log(Packet)
    // Sends the packet
    kcpobj.send(await dataUtil.dataToPacket(Packet, packetID, keyBuffer));
    console.log("[SENT] %i (%s) was sent back", packetID, name)
}
var AreaRspCount, PointRspCount, WorldAreaCount = 0
async function handleSendPacket(protobuff, packetID, kcpobj, keyBuffer) {

    // Packed ID By Name so no more HARDCODING
    const packetIdName = dataUtil.getProtoNameByPacketID(packetID);

    // Data is declared here because node-js would say data is already defined
    var data;
    switch (packetIdName) {
        case "PingReq": // PingReq

            const PingRsp = {
                clientTime: protobuff["clientTime"],
                ueTime: protobuff["ueTime"]
            }

            // To protobuffer
            data = await dataUtil.objToProtobuffer(PingRsp, dataUtil.getPacketIDByProtoName("PingRsp"));
            sendPacketAsyncByName(kcpobj, "PingRsp", keyBuffer, data)


            break;
        case "MarkMapReq":
            // hack: mark map will teleport
            // Use Zhongli only!
            
            if (!protobuff.op) {

                if (protobuff.mark.name != "") {
                    posScene = {
                        "X": protobuff.mark.pos.X,
                        "Y": protobuff.mark.name *= 1,
                        "Z": protobuff.mark.pos.Z
                    }
                } else {
                    posScene = {
                        "X": protobuff.mark.pos.X,
                        "Y": 500,
                        "Z": protobuff.mark.pos.Z
                    }
                }

                SceneEntityAppearNotify.entityList[SceneEntityAppearNotify.entityList.length - 1].motionInfo.pos = posScene
                
                sendPacketAsyncByName(kcpobj, "PlayerEnterSceneInfoNotify", keyBuffer, await dataUtil.objToProtobuffer(PlayerEnterSceneInfoNotify, dataUtil.getPacketIDByProtoName("PlayerEnterSceneInfoNotify")));
    
                // To protobuffer;
                sendPacketAsyncByName(kcpobj, "SceneEntityAppearNotify", keyBuffer, await dataUtil.objToProtobuffer(SceneEntityAppearNotify, dataUtil.getPacketIDByProtoName("SceneEntityAppearNotify")));
            }

            break;

        case "GetPlayerTokenReq": // GetPlayerTokenReq

            // Needs to be readed and passed to protobuffer to change the secretKeySeed
            const GetPlayerTokenRsp = {
                "uid":1337,
                "token":"5d3a68649e77deb7870e76cb2a882f6afd683e58",
                "accountType":1,
                "accountUid":"1",
                "isProficientPlayer":true,
                "secretKeySeed":2,
                "securityCmdBuffer": Buffer.from("bOWfEaq03Yd8HWvHODwqi5UfAlUGMgqwAopeu26XS7I=", 'base64'),
                "platformType":3,
                "channelId":1,
                "countryCode":"MX"
            }
            //GetPlayerTokenRsp.gmUid = "1"

            // Executes C# compiled EXE that returns the XOR Blob determined by secretKeySeed
            require('child_process').execFile('./yuanshenKey/ConsoleApp2.exe', [2], function (err, data) {
                if (err) {
                    console.log(err)
                }
                seedKey = Buffer.from(data.toString(), 'hex'); // Key
            });
            console.log(GetPlayerTokenRsp);

            data = await dataUtil.objToProtobuffer(GetPlayerTokenRsp, dataUtil.getPacketIDByProtoName("GetPlayerTokenRsp"));
            sendPacketAsyncByName(kcpobj, "GetPlayerTokenRsp", keyBuffer, data)

            break;

        case "DungeonEntryInfoReq":

            const DungeonEntryInfoRsp = {
                "pointId":protobuff.pointId,
                "dungeonEntryList":[
                    {"dungeonId":5200}
                ], // related to drop reward
                "recommendDungeonId":5200
            }

            sendPacketAsyncByName(kcpobj, "DungeonEntryInfoRsp", keyBuffer, await dataUtil.objToProtobuffer(DungeonEntryInfoRsp, dataUtil.getPacketIDByProtoName("DungeonEntryInfoRsp")));
            
            break;


        case "TowerAllDataReq": // TowerAllDataReq

            const TowerAllDataRsp = {
                towerFloorRecordList: [
                   {
                    passedLevelMap: {},
                    passedLevelRecordList: [],
                    floorId: 1001
                  }
                ],
                floorOpenTimeMap: {
                  '1020': 1626426000,
                  '1021': 1626426000,
                  '1022': 1626426000,
                  '1023': 1626426000
                },
                skipFloorGrantedRewardItemMap: {},
                towerScheduleId: 26,
                curLevelRecord: {
                  towerTeamList: [],
                  buffIdList: [],
                  isEmpty: true
                },
                nextScheduleChangeTime: 1627808399,
                scheduleStartTime: 1626426000
              }

			sendPacketAsyncByName(kcpobj, "TowerAllDataRsp", keyBuffer, await dataUtil.objToProtobuffer(TowerAllDataRsp, dataUtil.getPacketIDByProtoName("TowerAllDataRsp")))
			
			break;

        case "AvatarWearFlycloakReq":
            var flyCloak = protobuff.flycloakId
            var AvatarGUID = protobuff.avatarGuid
            console.log(flyCloak)
            console.log(parseInt(AvatarGUID))
            
            const AvatarWearFlycloakRsp = {
                "flycloakId": parseInt(flyCloak),
                "avatarGuid": parseInt(AvatarGUID)
            }

            sendPacketAsyncByName(kcpobj, "AvatarWearFlycloakRsp", keyBuffer, await dataUtil.objToProtobuffer(AvatarWearFlycloakRsp, dataUtil.getPacketIDByProtoName("AvatarWearFlycloakRsp")))
			sendPacketAsyncByName(kcpobj, "AvatarDataNotify", keyBuffer);

            break;

        case "WearEquipReq":
            const WearEquipRsp = {
                "avatarGuid": parseInt(protobuff.avatarGuid),
                "equipGuid": parseInt(protobuff.equipGuid),
            }

            // To protobuffer

            
            const AvatarEquipChangeNotify2 = {
                avatarGuid: 867583397107,
                equipType: 6,
                itemId: 15508,
                equipGuid: 3544845098770512337,
                weapon: {
                    "entityId":100663758,
                    "gadgetId":50015508,
                    "itemId":15508,
                    "guid":"3544845098770512337",
                    "level":1,
                    "abilityInfo":{}
                }
            }

            AvatarEquipChangeNotify2.avatarGuid = protobuff.avatarGuid
            AvatarEquipChangeNotify2.equipGuid = protobuff.equipGuid
            AvatarEquipChangeNotify2.weapon.guid = protobuff.equipGuid
			AvatarEquipChangeNotify2.weapon.itemId = 15508 // Aqua fix
            
            sendPacketAsyncByName(kcpobj, "AvatarEquipChangeNotify", keyBuffer, await dataUtil.objToProtobuffer(AvatarEquipChangeNotify2, dataUtil.getPacketIDByProtoName("AvatarEquipChangeNotify")));

            console.log(WearEquipRsp)
            sendPacketAsyncByName(kcpobj, "WearEquipRsp", keyBuffer, await dataUtil.objToProtobuffer(WearEquipRsp, dataUtil.getPacketIDByProtoName("WearEquipRsp")))

            break;

        case "EnterSceneDoneReq":

            // To protobuffer;
            console.log(SceneEntityAppearNotify)

            sendPacketAsyncByName(kcpobj, "SceneEntityAppearNotify", keyBuffer, await dataUtil.objToProtobuffer(SceneEntityAppearNotify, dataUtil.getPacketIDByProtoName("SceneEntityAppearNotify")));
            
            const EnterSceneDoneRsp = {
                "enterSceneToken": 8427
            }
            
            sendPacketAsyncByName(kcpobj, "EnterSceneDoneRsp", keyBuffer, await dataUtil.objToProtobuffer(EnterSceneDoneRsp, dataUtil.getPacketIDByProtoName("EnterSceneDoneRsp")));

            break;

        case "UnlockTransPointReq":
            var pointId = protobuff.pointId
			console.log(pointId)
            const UnlockTransPointRsp = {
                "sceneId": sceneIdSelect,
                "pointId": parseInt(protobuff.pointId),
            }
			
			const ScenePointUnlockNotify = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/ScenePointUnlockNotify.bin"), dataUtil.getPacketIDByProtoName("ScenePointUnlockNotify"))
			
			ScenePointUnlockNotify.sceneId = sceneIdSelect
			ScenePointUnlockNotify.pointList = protobuff.pointId
			
            sendPacketAsyncByName(kcpobj, "ScenePointUnlockNotify", keyBuffer, await dataUtil.objToProtobuffer(ScenePointUnlockNotify, dataUtil.getPacketIDByProtoName("ScenePointUnlockNotify")));

            console.log(UnlockTransPointRsp)
            sendPacketAsyncByName(kcpobj, "UnlockTransPointRsp", keyBuffer, await dataUtil.objToProtobuffer(UnlockTransPointRsp, dataUtil.getPacketIDByProtoName("UnlockTransPointRsp")))
			
		break;

        case "PlayerLoginReq": // PlayerLoginReq

            sendPacketAsyncByName(kcpobj, "AvatarDataNotify", keyBuffer, await dataUtil.objToProtobuffer(AvatarDataNotify, dataUtil.getPacketIDByProtoName("AvatarDataNotify")));

            // ActivityScheduleInfoNotify
            // EVENTACTIVITY

            const ActivityScheduleInfoNotify = {
                activityScheduleList: [
                   {
                    activityId: 5039,
                    isOpen: true,
                    scheduleId: 5039001,
                    beginTime: 1626822000,
                    endTime: 1630450800
                  },
                   {
                    activityId: 5002,
                    isOpen: true,
                    scheduleId: 5002016,
                    beginTime: 1626822000,
                    endTime: 1628636340
                  },
                   {
                    activityId: 5038,
                    isOpen: true,
                    scheduleId: 5038001,
                    beginTime: 1626822000,
                    endTime: 1630450800
                  }
                ]
              }
            ActivityScheduleInfoNotify.activityScheduleList[2].activityId = 5064

            for (Possible = 3; Possible <= 100; Possible++)
            {
                ActivityScheduleInfoNotify.activityScheduleList[Possible] = {
                    "activityId": 5050 + Possible, // 5000 start
                    "isOpen": true,
                    "scheduleId": 5078001,
                    "beginTime": 1626822000,
                    "endTime": 1930450800
                }
            }

            sendPacketAsyncByName(kcpobj, "ActivityScheduleInfoNotify", keyBuffer, await dataUtil.objToProtobuffer(ActivityScheduleInfoNotify, dataUtil.getPacketIDByProtoName("ActivityScheduleInfoNotify")));
            

            // PlayerDataNotify
            const PlayerDataNotify = {
                "nickName": "PancakeTS",
                "serverTime": epochTime,
                "regionId": 49,
                "propMap": {
                    "10004": {
                        "type": 10004,
                        "ival": "1",
                        "val": "1"
                    },
                    "10005": {
                        "type": 10005,
                        "ival": "100",
                        "val": "100"
                    },
                    "10006": {
                        "type": 10006,
                        "ival": "1",
                        "val": "1"
                    },
                    "10007": {
                        "type": 10007,
                        "ival": "0"
                    },
                    "10008": {
                        "type": 10008,
                        "ival": "0"
                    },
                    "10009": {
                        "type": 10009,
                        "ival": "1",
                        "val": "1"
                    },
                    "10010": {
                        "type": 10010,
                        "ival": "24000",
                        "val": "24000"
                    },
                    "10011": {
                        "type": 10011,
                        "ival": "24000",
                        "val": "24000"
                    },
                    "10012": {
                        "type": 10012,
                        "ival": "0"
                    },
                    "10013": {
                        "type": 10013,
                        "ival": "60",
                        "val": "60"
                    },
                    "10014": {
                        "type": 10014,
                        "ival": "52770",
                        "val": "52770"
                    },
                    "10015": {
                        "type": 10015,
                        "ival": "114514",  // Primogem
                        "val": "114514"
                    },
                    "10016": {
                        "type": 10016,
                        "ival": "83000",  // Mora
                        "val": "83000"
                    },
                    "10017": {
                        "type": 10017,
                        "ival": "2",
                        "val": "2"
                    },
                    "10019": {
                        "type": 10019,
                        "ival": "8",
                        "val": "8"
                    },
                    "10020": {
                        "type": 10020,
                        "ival": "9998",  // Resin
                        "val": "9998"
                    },
                    "10022": {
                        "type": 10022,
                        "ival": "0"
                    },
                    "10023": {
                        "type": 10023,
                        "ival": "0"
                    },
                    "10025": {
                        "type": 10025,  // Genesis Crystal
                        "ival": "114514",
                        "val": "114514",
                    },
                    "10026": {
                        "type": 10026,
                        "ival": "0"
                    },
                    "10027": {
                        "type": 10027,
                        "ival": "0"
                    },
                    "10035": {
                        "type": 10035,
                        "ival": "0"
                    },
                    "10036": {
                        "type": 10036,
                        "ival": "0"
                    },
                    "10037": {
                        "type": 10037,
                        "ival": "0"
                    },
                    "10038": {
                        "type": 10038,
                        "ival": "0"
                    },
                    "10039": {
                        "type": 10039,
                        "ival": "8",
                        "val": "8"
                    },
                    "10040": {
                        "type": 10040,
                        "ival": "0"
                    },
                    "10041": {
                        "type": 10041,
                        "ival": "5",
                        "val": "5"
                    },
                    "10042": {
                        "type": 10042,
                        "ival": "6",
                        "val": "6"
                    },
                    "10043": {
                        "type": 10043,
                        "ival": "0"
                    },
                    "10044": {
                        "type": 10044,
                        "ival": "0"
                    }
                }
            }
            

            console.log(PlayerDataNotify)
            // To protobuffer
            var PlayerDataNotifyData = await dataUtil.objToProtobuffer(PlayerDataNotify, dataUtil.getPacketIDByProtoName("PlayerDataNotify"));
            sendPacketAsyncByName(kcpobj, "PlayerDataNotify", keyBuffer, PlayerDataNotifyData);

            // OpenStateUpdateNotify
            const OpenStateUpdateNotify = {
                "openStateMap": {
                    "1": 1,
                    "2": 1,
                    "3": 1,
                    "4": 1,
                    "10": 1,
                    "5": 1,
                    "6": 1,
                    "7": 1,
                    "8": 1,
                    "9": 1,
                    "11": 1,
                    "12": 1,
                    "31": 1,
                    "30": 1,
                    "37": 1,
                    "39": 1,
                    "45": 1,
                    "54": 1,
                    "2100": 1,
                    "13": 1,
                    "14": 1,
                    "15": 1,
                    "16": 1,
                    "17": 1,
                    "18": 1,
                    "19": 1,
                    "20": 1,
                    "21": 1,
                    "22": 1,
                    "23": 1,
                    "24": 1,
                    "25": 1,
                    "26": 1,
                    "27": 1,
                    "28": 1,
                    "29": 1,
                    "32": 1,
                    "33": 1,
                    "34": 1,
                    "35": 1,
                    "36": 1,
                    "38": 1,
                    "40": 1,
                    "41": 1,
                    "50": 1,
                    "51": 1,
                    "59": 1,
                    "52": 1,
                    "53": 1,
                    "56": 1,
                    "58": 1,
                    "76": 1,
                    "60": 1,
                    "61": 1,
                    "62": 1,
                    "63": 1,
                    "64": 1,
                    "66": 1,
                    "67": 1,
                    "68": 1,
                    "69": 1,
                    "70": 1,
                    "71": 1,
                    "72": 1,
                    "73": 1,
                    "74": 1,
                    "75": 1,
                    "77": 1,
                    "78": 1,
                    "79": 1,
                    "80": 1,
                    "81": 1,
                    "82": 1,
                    "83": 1,
                    "84": 1,
                    "2001": 1,
                    "2002": 1,
                    "2003": 1,
                    "2004": 1,
                    "2104": 1,
                    "2105": 1,
                    "2106": 1,
                    "1411": 1,
                    "1412": 1,
                    "2205": 1,
                    "2206": 1,
                    "2400": 1,
                    "2401": 1,
                    "2402": 1,
                    "2210": 1,
                    "2211": 1,
                    "2212": 1,
                    "57": 1,
                    "43": 1,
                    "1001": 1,
                    "1002": 1,
                    "1003": 1,
                    "1004": 1,
                    "1005": 1,
                    "1006": 1,
                    "1007": 1,
                    "1008": 1,
                    "1009": 1,
                    "1010": 1,
                    "903": 1,
                    "901": 1,
                    "902": 1,
                    "900": 1,
                    "1011": 1,
                    "1013": 1,
                    "1100": 1,
                    "1103": 1,
                    "1101": 1,
                    "1102": 1,
                    "1104": 1,
                    "44": 1,
                    "47": 1,
                    "48": 1,
                    "49": 1,
                    "1403": 1,
                    "1200": 1,
                    "1201": 1,
                    "1202": 1,
                    "55": 1,
                    "1401": 1,
                    "1402": 1,
                    "802": 1,
                    "800": 1,
                    "801": 1,
                    "803": 1,
                    "1404": 1,
                    "1405": 1,
                    "1409": 1,
                    "65": 1,
                    "1406": 1,
                    "1407": 1,
                    "1408": 1,
                    "1410": 1,
                    "2200": 1,
                    "2201": 1,
                    "1502": 1,
                    "1500": 1,
                    "1501": 1,
                    "1700": 1,
                    "1600": 1,
                    "1504": 1,
                    "1505": 1,
                    "2000": 1,
                    "1012": 1,
                    "1503": 1,
                    "85": 1,
                    "86": 1,
                    "2101": 1,
                    "2103": 1,
                    "2102": 1,
                    "2005": 1,
                    "87": 1,
                    "88": 1,
                    "89": 1,
                    "2500": 1,
                    "2403": 1,
                    "2501": 1,
                    "1300": 1,
                    "1301": 1,
                }
            }
			sendPacketAsyncByName(kcpobj, "OpenStateUpdateNotify", keyBuffer, await dataUtil.objToProtobuffer(OpenStateUpdateNotify,
            await dataUtil.getPacketIDByProtoName("OpenStateUpdateNotify")));

            // BattlePassAllDataNotify

            const BattlePassAllDataNotify = {
                haveCurSchedule: true,
                curSchedule: {
                    scheduleId: 2700, // 2.7 -> 2700 , 2.6 -> 2600
                    level: 50,
                    point: 0,
                    unlockStatus: 2,
                    rewardTakenList: [],
                    beginTime: 0,
                    endTime: 4294967295,
                    curCycle: {},

                    productInfo: {
                        normalProductId: "ys_glb_bp_normal_tier10",
                        extraProductId: "ys_glb_bp_extra_tier20",
                        upgradeProductId: "ys_glb_bp_upgrade_tier12",
                    },

                    isViewed: true,
                    curCyclePoints: 0
                },
                missionList: []
            }

            sendPacketAsyncByName(kcpobj, "BattlePassAllDataNotify", keyBuffer, await dataUtil.objToProtobuffer(BattlePassAllDataNotify, getPacketIDByProtoName("BattlePassAllDataNotify")));
 


            // AchievementAllDataNotify
            
            const AchievementAllDataNotify = {
                "achievementList": []
            }

            // View all achievements hack
            for (x=0; x<=7; x++)
            {
                for (Possible = 1; Possible<= 200; Possible++){
                    Achievement = {
                        "id": 80000 + Possible + x*1000,
                        "status": "REWARD_TAKEN",
                        "totalProgress": 1,
                        "finishTimestamp": 1618420174 // if not remove and change status UNFINISHED
                    }
                    AchievementAllDataNotify.achievementList.push(Achievement)
                }
            }

            sendPacketAsyncByName(kcpobj, "AchievementAllDataNotify", keyBuffer, await dataUtil.objToProtobuffer(AchievementAllDataNotify, getPacketIDByProtoName("AchievementAllDataNotify")));
 

            // StoreWeightLimitNotify
            const StoreWeightLimitNotify =  { "storeType": 1, "weightLimit": 90000, "materialCountLimit": 2000, "weaponCountLimit": 2000, "reliquaryCountLimit": 1000, "furnitureCountLimit": 2000 }

            sendPacketAsyncByName(kcpobj, "StoreWeightLimitNotify", keyBuffer, await dataUtil.objToProtobuffer(StoreWeightLimitNotify,   
            await dataUtil.getPacketIDByProtoName("StoreWeightLimitNotify")))

            // PlayerStoreNotify
            
            /*
            for (Possible = 1; Possible < 2000; Possible++) { // Unlock Artifacts
                PlayerStoreNotify.itemList[Possible] = {"itemId":97000+Possible,"guid":"96413"+Possible,"equip":{"reliquary":{"level":1,"mainPropId":12001}}};
            }
            */

            await sendPacketAsyncByName(kcpobj, "PlayerStoreNotify", keyBuffer, await dataUtil.objToProtobuffer(PlayerStoreNotify, dataUtil.getPacketIDByProtoName("PlayerStoreNotify")));

            //AvatarSatiationDataNotify
            // GENERATE
            const AvatarSatiationDataNotify = {
                "satiationDataList": [
                    {
                        "avatarGuid": "2664326143951241217",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951241370",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951241527",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951241529",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951241725",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951241978",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951244729",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951250713",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951252776",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951256400",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951265546",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951268193",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951334210",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951372979",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951372989",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951388445",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951415061",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951442672",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951460349",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951479019",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951497760",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951497829",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951516376",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951520401",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951600599",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951643736",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951645817",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951669236",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951697804",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951708856",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951708869",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951708882",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    },
                    {
                        "avatarGuid": "2664326143951708895",
                        "finishTime": 2313224,
                        "penaltyFinishTime": 2313224
                    }
                ]
            }
            
            sendPacketAsyncByName(kcpobj, "AvatarSatiationDataNotify", keyBuffer,  await dataUtil.objToProtobuffer(AvatarSatiationDataNotify, dataUtil.getPacketIDByProtoName("AvatarSatiationDataNotify")));

            // PlayerMatchInfoNotify 
            const PlayerMatchInfoNotify = {
                hostUid: 1337
            }
			sendPacketAsyncByName(kcpobj, "PlayerMatchInfoNotify", keyBuffer, await dataUtil.objToProtobuffer(PlayerMatchInfoNotify, dataUtil.getPacketIDByProtoName("PlayerMatchInfoNotify")))


            //RegionSearchNotify
            const RegionSearchNotify = {
                regionSearchList: [],
                uid: 1337
            }
			sendPacketAsyncByName(kcpobj, "RegionSearchNotify", keyBuffer, await dataUtil.objToProtobuffer(RegionSearchNotify, dataUtil.getPacketIDByProtoName("RegionSearchNotify")))

            //PlayerEnterSceneNotify
            sendPacketAsyncByName(kcpobj, "PlayerEnterSceneNotify", keyBuffer, await dataUtil.objToProtobuffer(PlayerEnterSceneNotify1, dataUtil.getPacketIDByProtoName("PlayerEnterSceneNotify")));

            // Response
            const PlayerLoginRsp = {
                "isUseAbilityHash": true,
                "abilityHashCode": 1844674,
                "gameBiz": "hk4e_global",
                "clientDataVersion": null,
                "clientSilenceDataVersion": null,
                
                "clientMd5": "",
                "clientSilenceMd5": "",

                "resVersionConfig": "",

                "clientVersionSuffix": "",
                "clientSilenceVersionSuffix": "",

                "isScOpen": false,
                "registerCps": "mihoyo",
                "countryCode": "US",
            }

            // To protobuffer
            console.log(PlayerLoginRsp)
            sendPacketAsyncByName(kcpobj, "PlayerLoginRsp", keyBuffer, await dataUtil.objToProtobuffer(PlayerLoginRsp, dataUtil.getPacketIDByProtoName("PlayerLoginRsp")));

            const CodexDataFullNotify = {
                "typeDataList":[
                    {
                        "type":1,
                        "codexIdList":[],
                        "haveViewedList":[]
                    },
                    {
                        "type":2,
                        "codexIdList":[],
                        "haveViewedList":[],
                    },
                    {
                        "type":3,
                        "codexIdList":[],
                        "haveViewedList":[]
                    },
                    {
                        "type":4,
                        "codexIdList":[],
                        "haveViewedList":[]
                    },
                    {
                        "type":5,
                        "codexIdList":[50003007,50007001,50008005,50009001,50012006,50017002,50019001,50019004,50020002,50022001,50023003,50023004,50024003,50025001,50025002,50026001,50027001,50028002,50029001,50029002],
                        "haveViewedList":[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
                    },
                    {
                        "type":6,
                        "codexIdList":[60100001,60100002,60100003,60100004,60100005,60100006,60100007,60100008,60100009,60100010,60100011,60100012,60100013,60100015,60100016,60200001,60200002,60200003,60200004,60200005,60200006,60200007,60200008,60200009,60200014,60300001,60300002,60300003,60300004,60300005,60300006,60300007,60300008,60300009,60300010,60300011,60300013,60300014,60300017,60300021,60300026,60300028,60400001,60400002,60400003,60400004,60400005,60400011,60400012,60400016,60500001,60500002,60500003,60500004,60500005,60500006,60500007,60500008,60500009,60500010,60500011,60500012,60500013,60500016,60500017,60500018,60500019,60500020,60500021,60500022,60500023,60500024,60500025,60500026,60500027,60500028,60500030,60500031,60500033,60500035,60500036],
                        "haveViewedList":[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
                    },
                    {
                        "type":7,
                        "codexIdList":[],
                        "haveViewedList":[]
                    },
                    {
                        "type":8,
                        "codexIdList":[],
                        "haveViewedList":[]
                    }
                ]
            }

            // Some will not appear in the archive
            // Then add it yourself
            // Add everything will occur error because of size problem
            // Tutorials and Books do later

            for (Quest = 1; Quest <= 50; Quest++) {
                for (Quest2 = 1; Quest2 <= 20; Quest2++) {
                    CodexDataFullNotify.typeDataList[0].codexIdList.push(10000000 + 10000*Quest + Quest2);
                    CodexDataFullNotify.typeDataList[0].haveViewedList.push(true);
                }
            }

            for (Weapon = 1; Weapon <= 5; Weapon++) {
                for (Weapon2 = 1; Weapon2 <= 5; Weapon2++) {
                    for (Weapon3 = 1; Weapon3 <= 15; Weapon3++) {
                        CodexDataFullNotify.typeDataList[1].codexIdList.push(30210000 + 1000*Weapon + 100*Weapon2 + Weapon3);
                        CodexDataFullNotify.typeDataList[1].haveViewedList.push(true);
                    }
                }
            }

            for (Animal = 1; Animal <= 9; Animal++) {
                for (Animal2 = 1; Animal2 <= 9; Animal2++) {
                    for (Animal3 = 1; Animal3 <= 10; Animal3++) {
                        for (Animal4 = 1; Animal4 <= 10; Animal4++) {
                            CodexDataFullNotify.typeDataList[2].codexIdList.push(20000000 + 1000000*Animal + 10000*Animal2 + 100*Animal3 + Animal4);
                            CodexDataFullNotify.typeDataList[2].haveViewedList.push(true);
                        }
                    }
                }
            }

            for (Material = 100; Material <= 110; Material++) {
                for (Material2 = 1; Material2 <= 50; Material2++) {
                    CodexDataFullNotify.typeDataList[3].codexIdList.push(40000000 + 1000*Material + Material2);
                    CodexDataFullNotify.typeDataList[3].haveViewedList.push(true);
                }
            }
            for (Material = 20; Material <= 25; Material++) {
                for (Material2 = 1; Material2 <= 50; Material2++) {
                    CodexDataFullNotify.typeDataList[3].codexIdList.push(40000000 + 10000*Material + Material2);
                    CodexDataFullNotify.typeDataList[3].haveViewedList.push(true);
                }
            }
            for (Material = 30; Material <= 35; Material++) {
                for (Material2 = 1; Material2 <= 50; Material2++) {
                    CodexDataFullNotify.typeDataList[3].codexIdList.push(40000000 + 10000*Material + Material2);
                    CodexDataFullNotify.typeDataList[3].haveViewedList.push(true);
                }
            }
            for (Material = 331; Material <= 339; Material++) {
                for (Material2 = 1; Material2 <= 50; Material2++) {
                    CodexDataFullNotify.typeDataList[3].codexIdList.push(40000000 + 1000*Material + Material2);
                    CodexDataFullNotify.typeDataList[3].haveViewedList.push(true);
                }
            }
            for (Material = 40; Material <= 40; Material++) {
                for (Material2 = 1; Material2 <= 50; Material2++) {
                    CodexDataFullNotify.typeDataList[3].codexIdList.push(40000000 + 10000*Material + Material2);
                    CodexDataFullNotify.typeDataList[3].haveViewedList.push(true);
                }
            }


            for (View = 1; View <= 3; View++) {
                for (Viewpoint = 1; Viewpoint <= 30; Viewpoint++) {
                    CodexDataFullNotify.typeDataList[6].codexIdList.push(70000000 + 100000*View + Viewpoint);
                    CodexDataFullNotify.typeDataList[6].haveViewedList.push(true);
                }
            }

            for (Reliquery = 1; Reliquery <= 9; Reliquery++) {
                for (Reliquery2 = 1; Reliquery2 <= 9; Reliquery2++) {
                    for (Reliquery3 = 1; Reliquery3 <= 9; Reliquery3++) {
                        CodexDataFullNotify.typeDataList[7].codexIdList.push(30100000 + 1000*Reliquery + 100*Reliquery2 + Reliquery3);
                        CodexDataFullNotify.typeDataList[7].haveViewedList.push(true);
                    }
                }
            }

            console.log(CodexDataFullNotify);
            sendPacketAsyncByName(kcpobj, "CodexDataFullNotify", keyBuffer, await dataUtil.objToProtobuffer(CodexDataFullNotify, dataUtil.getPacketIDByProtoName("CodexDataFullNotify")));

            break;

        case "SetPlayerHeadImageReq":
          
            sendPacketAsyncByName(kcpobj, "SetPlayerHeadImageRsp", keyBuffer, await dataUtil.objToProtobuffer({"avatarId": protobuff.avatarId,"profilePicture":{"avatarId": protobuff.avatarId}}, dataUtil.getPacketIDByProtoName("SetPlayerHeadImageRsp")))
            break;


        case "SetNameCardReq":
            var CardID = protobuff.nameCardId
            console.log(CardID)

            const SetNameCardRsp = { "nameCardId": parseInt(CardID) || 210001 }

            sendPacketAsyncByName(kcpobj, "SetNameCardRsp", keyBuffer, await dataUtil.objToProtobuffer(SetNameCardRsp, dataUtil.getPacketIDByProtoName("SetNameCardRsp")))
            break;
			
        case "UpdatePlayerShowAvatarListReq":

            // Response
			
			const UpdatePlayerShowAvatarListRsp = { "showAvatarIdList": [10000052, 10000054, 10000056] }
			
            sendPacketAsyncByName(kcpobj, "UpdatePlayerShowAvatarListRsp", keyBuffer, await dataUtil.objToProtobuffer(UpdatePlayerShowAvatarListRsp, dataUtil.getPacketIDByProtoName("UpdatePlayerShowAvatarListRsp")))
            break;
			
        case "GetAllUnlockNameCardReq":
            CardList = []
            for (Possible = 0; Possible < 121; Possible++) { // Unlock Namecard Lists
                CardList[Possible] = 210001 + Possible
            }
            const GetAllUnlockNameCardRsp = { "nameCardList": CardList }

            sendPacketAsyncByName(kcpobj, "GetAllUnlockNameCardRsp", keyBuffer, await dataUtil.objToProtobuffer(GetAllUnlockNameCardRsp, dataUtil.getPacketIDByProtoName("GetAllUnlockNameCardRsp")))
            break;
			
        case "SetNameCardReq":

            // Response
            sendPacketAsyncByName(kcpobj, "SetNameCardRsp", keyBuffer)

            break;

        case "AvatarWearFlycloakReq":

            // Response
            sendPacketAsyncByName(kcpobj, "AvatarWearFlycloakRsp", keyBuffer)

            break;

        case "GetPlayerSocialDetailReq":

            // Response
            const GetPlayerSocialDetailRsp = {
                "detailData":{
                    "uid":1337,
                    "nickname":"여행자",
                    "level":31,
                    "birthday":{"month":2,"day":27},
                    "worldLevel":3,
                    "onlineState":1,
                    "param": 0,
                    "isFriend":true,
                    "isMpModeAvailable":true,
                    "nameCardId":210028,
                    "finishAchievementNum":112}
                }

            console.log(GetPlayerSocialDetailRsp)

            sendPacketAsyncByName(kcpobj, "GetPlayerSocialDetailRsp", keyBuffer, await dataUtil.objToProtobuffer(GetPlayerSocialDetailRsp, dataUtil.getPacketIDByProtoName("GetPlayerSocialDetailRsp")));

            break;

        case "ChangeAvatarReq":

            console.log("ChangeAvatarReq")
            console.log(protobuff)
            // movePos
            // guid

            const ChangeAvatarRsp ={
                curGuid: protobuff.guid,
                retcode: 0    
            }

            const SceneEntityDisappearNotify = {
                entityList: [PlayerEnterSceneInfoNotify.curAvatarEntityId],
                disappearType: 3,
            }


            // SceneEntityDisappearNotify
            sendPacketAsyncByName(kcpobj, "SceneEntityDisappearNotify", keyBuffer, await dataUtil.objToProtobuffer(SceneEntityDisappearNotify, dataUtil.getPacketIDByProtoName("SceneEntityDisappearNotify")))

            // SceneTeamUpdateNotify SceneEntityAppearNotify PlayerEnterSceneInfoNotify
            // Copy Paste from YSFreedom
            for (var x in PlayerEnterSceneInfoNotify.avatarEnterInfo) {
                if (PlayerEnterSceneInfoNotify.avatarEnterInfo[x].avatarGuid == protobuff.guid)
                {
                    PlayerEnterSceneInfoNotify.curAvatarEntityId = PlayerEnterSceneInfoNotify.avatarEnterInfo[x].avatarEntityId;
                }
            }

            SceneEntityAppearNotify.appearType = 3

            for (var x in SceneEntityAppearNotify.entityList) {
                SceneEntityAppearNotify.entityList[x].entityId = PlayerEnterSceneInfoNotify.curAvatarEntityId;
                SceneEntityAppearNotify.entityList[x].motionInfo.pos = posScene

                for (var y in SceneTeamUpdateNotify.sceneTeamAvatarList) {
                    if (SceneTeamUpdateNotify.sceneTeamAvatarList[y].avatarGuid == protobuff.guid) {
                        SceneTeamUpdateNotify.sceneTeamAvatarList[y].sceneEntityInfo.motionInfo.pos = posScene;
                        SceneEntityAppearNotify.entityList.push(SceneTeamUpdateNotify.sceneTeamAvatarList[y].sceneEntityInfo);
                        
                    }
                }
            }

            // Response
            sendPacketAsyncByName(kcpobj, "SceneEntityAppearNotify", keyBuffer, await dataUtil.objToProtobuffer(SceneEntityAppearNotify, dataUtil.getPacketIDByProtoName("SceneEntityAppearNotify")))
            sendPacketAsyncByName(kcpobj, "ChangeAvatarRsp", keyBuffer, await dataUtil.objToProtobuffer(ChangeAvatarRsp, dataUtil.getPacketIDByProtoName("ChangeAvatarRsp")))
        
            break;

        case "GetPlayerBlacklistReq":

            // Response
            sendPacketAsyncByName(kcpobj, "GetPlayerBlacklistRsp", keyBuffer, await dataUtil.objToProtobuffer({blacklist: []}, dataUtil.getPacketIDByProtoName("GetPlayerBlacklistRsp")))


            break;

        case "GetShopReq":

            console.log(protobuff)

            const GetShopRsp = {
                "shop": {
                  "shopType": 900,
                  "cardProductList": [
                    {
                      "productId": "ys_glb_blessofmoon_tier5",
                      "priceTier": "Tier_5",
                      "mcoinBase": 300,
                      "hcoinPerDay": 90,
                      "days": 30,
                      "cardProductType": 1
                    }
                  ]
                }
              }
            // Response
            sendPacketAsyncByName(kcpobj, "GetShopRsp", keyBuffer, await dataUtil.objToProtobuffer(GetShopRsp, dataUtil.getPacketIDByProtoName("GetShopRsp")));


            break;

        case "EnterSceneReadyReq":

            // EnterScenePeerNotify
            const EnterScenePeerNotify = {
                "destSceneId": sceneIdSelect,
                "peerId": 1,
                "hostPeerId": 1,
                "enterSceneToken": 8427
            }

            sendPacketAsyncByName(kcpobj, "EnterScenePeerNotify", keyBuffer, await dataUtil.objToProtobuffer(EnterScenePeerNotify, dataUtil.getPacketIDByProtoName("EnterScenePeerNotify")));

            // Response
            const EnterSceneReadyRsp = {
                enterSceneToken: 8427
            }
            sendPacketAsyncByName(kcpobj, "EnterSceneReadyRsp", keyBuffer, await dataUtil.objToProtobuffer(EnterSceneReadyRsp, dataUtil.getPacketIDByProtoName("EnterSceneReadyRsp")));

            break;

        case "GetActivityInfoReq":
            const GetActivityInfoRsp = {
                activityInfoList: [
                   {
                    watcherInfoList: [],
                    meetCondList: [],
                    expireCondList: [],
                    activityCoinMap: {},
                    takenRewardList: [],
                    activityId: 5039,
                    scheduleId: 5039001,
                    beginTime: 1626822000,
                    endTime: 1630450800,
                    activityType: 2005
                  },
                   {
                    watcherInfoList: [],
                    meetCondList: [],
                    expireCondList: [],
                    activityCoinMap: {},
                    takenRewardList: [],
                    activityId: 5002,
                    scheduleId: 5002016,
                    beginTime: 1626822000,
                    endTime: 1628636340,
                    activityType: 4,
                    trialAvatarInfo: {
                        rewardInfoList: [
                            
                            { trialAvatarIndexId: 47 },
                            { trialAvatarIndexId: 48 },
                            { trialAvatarIndexId: 49 },
                            { trialAvatarIndexId: 50 }
                        ]
                    }
                  },
                   {
                    watcherInfoList: [],
                    meetCondList: [],
                    expireCondList: [],
                    activityCoinMap: {},
                    takenRewardList: [],
                    activityId: 5038,
                    scheduleId: 5002015,
                    beginTime: 1626822000,
                    endTime: 1630450800,
                    activityType: 8
                  }
                ],
                activatedSaleIdList: []
              }
           
            // EVENTACTIVITY
            
            for (Possible = 3; Possible <= 100; Possible++)
            {
                GetActivityInfoRsp.activityInfoList[Possible] = {
                    "watcherInfoList": [],
                    "meetCondList": [],
                    "expireCondList": [],
                    "activityCoinMap": {},
                    "takenRewardList": [],
                    "activityId": 5050 + Possible,
                    "scheduleId": 5078001,
                }
            }
            // To protobuffer
            var GetActivityInfoRspData = await dataUtil.objToProtobuffer(GetActivityInfoRsp, dataUtil.getPacketIDByProtoName("GetActivityInfoRsp"));
            sendPacketAsyncByName(kcpobj, "GetActivityInfoRsp", keyBuffer, GetActivityInfoRspData);

        case "SceneInitFinishReq":

            // WorldOwnerDailyTaskNotify
            sendPacketAsyncByName(kcpobj, "WorldOwnerDailyTaskNotify", keyBuffer, await dataUtil.objToProtobuffer({taskList: []}, dataUtil.getPacketIDByProtoName("WorldOwnerDailyTaskNotify")));

            //WorldPlayerInfoNotify

            const WorldPlayerInfoNotify = {
                "playerInfoList":[
                    {
                        "uid":1337,
                        "nickname":"여행자",
                        "playerLevel":60,
                        "mpSettingType":2,
                        "curPlayerNumInWorld":1,
                        "worldLevel":8,
                        "nameCardId":210028
                    }
                ],
                "playerUidList":[1337]
            }

            // To protobuffer
            data = await dataUtil.objToProtobuffer(WorldPlayerInfoNotify, dataUtil.getPacketIDByProtoName("WorldPlayerInfoNotify"));
            sendPacketAsyncByName(kcpobj, "WorldPlayerInfoNotify", keyBuffer, data);

            //WorldDataNotify
            const WorldDataNotify = {"worldPropMap":{"1":{"type":1,"ival":1,"val":0},"2":{"type":2,"ival":2,"val":0}}}
            sendPacketAsyncByName(kcpobj, "WorldDataNotify", keyBuffer, await dataUtil.objToProtobuffer(WorldDataNotify, dataUtil.getPacketIDByProtoName("WorldDataNotify")));

            //WorldOwnerBlossomBriefInfoNotify
            sendPacketAsyncByName(kcpobj, "WorldOwnerBlossomBriefInfoNotify", keyBuffer, await dataUtil.objToProtobuffer({ briefInfoList: [] }, dataUtil.getPacketIDByProtoName("WorldOwnerBlossomBriefInfoNotify")))

            //TeamResonanceChangeNotify            
            sendPacketAsyncByName(kcpobj, "TeamResonanceChangeNotify", keyBuffer,  await dataUtil.objToProtobuffer({"infoList": []}, dataUtil.getPacketIDByProtoName("TeamResonanceChangeNotify")))

            //WorldAllRoutineTypeNotify
            sendPacketAsyncByName(kcpobj, "WorldAllRoutineTypeNotify", keyBuffer, await dataUtil.objToProtobuffer({ worldRoutineTypeList: [] }, dataUtil.getPacketIDByProtoName("WorldAllRoutineTypeNotify")))

            // SceneForceUnlockNotify
            sendPacketAsyncByName(kcpobj, "SceneForceUnlockNotify", keyBuffer, await dataUtil.objToProtobuffer({ forceIdList: [] }, dataUtil.getPacketIDByProtoName("SceneForceUnlockNotify")))

            //PlayerGameTimeNotify
            sendPacketAsyncByName(kcpobj, "PlayerGameTimeNotify", keyBuffer,  await dataUtil.objToProtobuffer({ gameTime: 16469, uid: 1337 }, dataUtil.getPacketIDByProtoName("PlayerGameTimeNotify")))

            //SceneTimeNotify
            sendPacketAsyncByName(kcpobj, "SceneTimeNotify", keyBuffer,  await dataUtil.objToProtobuffer({ sceneId: sceneIdSelect, is_paused: false, scene_time: 9000 }, dataUtil.getPacketIDByProtoName("SceneTimeNotify")))

            //SceneDataNotify
            sendPacketAsyncByName(kcpobj, "SceneDataNotify", keyBuffer,  await dataUtil.objToProtobuffer( { levelConfigNameList: ["Level_BigWorld"] }, dataUtil.getPacketIDByProtoName("SceneDataNotify")))

			//SceneAreaWeatherNotify
            const SceneAreaWeatherNotify = { "weatherAreaId": 1, "climateType": 1 }

            // sendPacketAsyncByName(kcpobj, "SceneAreaWeatherNotify", keyBuffer, await dataUtil.objToProtobuffer(SceneAreaWeatherNotify, dataUtil.getPacketIDByProtoName("SceneAreaWeatherNotify")))

            //AvatarEquipChangeNotify
            /*
            const AvatarEquipChangeNotify = {
                avatarGuid: myAvatarInfo.guid,
                equipType: 6,
                itemId: 11201,
                equipGuid: 3544845098770512337,
                weapon: {
                    "entityId":100663758,
                    "gadgetId":50011101,
                    "itemId":11101,
                    "guid":"3544845098770512337",
                    "level":1,
                    "abilityInfo":{}
                }
            }
            */
            // sendPacketAsyncByName(kcpobj, "AvatarEquipChangeNotify", keyBuffer,  await dataUtil.objToProtobuffer(AvatarEquipChangeNotify, dataUtil.getPacketIDByProtoName("AvatarEquipChangeNotify")))


            //HostPlayerNotify
            sendPacketAsyncByName(kcpobj, "HostPlayerNotify", keyBuffer,  await dataUtil.objToProtobuffer({ hostUid: 1337, hostPeerId: 1 }, dataUtil.getPacketIDByProtoName("HostPlayerNotify")))

            //ScenePlayerInfoNotify
            const ScenePlayerInfoNotify = {
                "playerInfoList": [
                    {
                        "uid":1337,
                        "peerId":1,
                        "name":"여행자",
                        "sceneId":sceneIdSelect,
                        "onlinePlayerInfo":{
                            "uid":1337,
                            "nickname":"여행자",
                            "playerLevel":60,
                            "mpSettingType":2,
                            "curPlayerNumInWorld":1,
                            "worldLevel":8,
                            "nameCardId":210028
                        }
                    }
                ]
            }
            // To protobuffer
            data = await dataUtil.objToProtobuffer(ScenePlayerInfoNotify, dataUtil.getPacketIDByProtoName("ScenePlayerInfoNotify"));
            sendPacketAsyncByName(kcpobj, "ScenePlayerInfoNotify", keyBuffer, data);

            //PlayerEnterSceneInfoNotify
            
            console.log(PlayerEnterSceneInfoNotify)

            // To protobuffer
            sendPacketAsyncByName(kcpobj, "PlayerEnterSceneInfoNotify", keyBuffer, await dataUtil.objToProtobuffer(PlayerEnterSceneInfoNotify, dataUtil.getPacketIDByProtoName("PlayerEnterSceneInfoNotify")));

            //SyncTeamEntityNotify
            const SyncTeamEntityNotify = { teamEntityInfoList: [], sceneId: sceneIdSelect }
            sendPacketAsyncByName(kcpobj, "SyncTeamEntityNotify", keyBuffer, await dataUtil.objToProtobuffer(SyncTeamEntityNotify, dataUtil.getPacketIDByProtoName("SyncTeamEntityNotify")));

            //SyncScenePlayTeamEntityNotify
            sendPacketAsyncByName(kcpobj, "SyncScenePlayTeamEntityNotify", keyBuffer, await dataUtil.objToProtobuffer({ entityInfoList: [], sceneId: sceneIdSelect }, dataUtil.getPacketIDByProtoName("SyncScenePlayTeamEntityNotify")));

            //ScenePlayBattleInfoListNotify
            sendPacketAsyncByName(kcpobj, "ScenePlayBattleInfoListNotify", keyBuffer, await dataUtil.objToProtobuffer({ battleInfoList: [] }, dataUtil.getPacketIDByProtoName("ScenePlayBattleInfoListNotify")));

            //SceneTeamUpdateNotify

            sendPacketAsyncByName(kcpobj, "SceneTeamUpdateNotify", keyBuffer, await dataUtil.objToProtobuffer(SceneTeamUpdateNotify, dataUtil.getPacketIDByProtoName("SceneTeamUpdateNotify")));
            
            //AllMarkPointNotify
            sendPacketAsyncByName(kcpobj, "AllMarkPointNotify", keyBuffer, await dataUtil.objToProtobuffer({ markList: [] }, dataUtil.getPacketIDByProtoName("AllMarkPointNotify")));

            // PlayerPropNotify
			
            const PlayerPropNotify = {
                propMap: { '10020': { type: 10020, ival: 160, val: 160 } }
            }
            // sendPacketAsyncByName(kcpobj, "PlayerPropNotify", keyBuffer, await dataUtil.objToProtobuffer(PlayerPropNotify, dataUtil.getPacketIDByProtoName("PlayerPropNotify")));
            
            //SceneInitFinishRsp
            // Response
            const SceneInitFinishRsp = {
                enterSceneToken: 8427
            }
            sendPacketAsyncByName(kcpobj, "SceneInitFinishRsp", keyBuffer,  await dataUtil.objToProtobuffer(SceneInitFinishRsp, dataUtil.getPacketIDByProtoName("SceneInitFinishRsp")));

            break;

        case "PathfindingEnterSceneReq": // PathfindingEnterSceneReq

            sendPacketAsyncByName(kcpobj, "PathfindingEnterSceneRsp", keyBuffer, await dataUtil.objToProtobuffer({}, dataUtil.getPacketIDByProtoName("PathfindingEnterSceneRsp")));


            break;

        case "EnterWorldAreaReq":
            sendPacketAsyncByName(kcpobj, "EnterWorldAreaRsp", keyBuffer,await dataUtil.objToProtobuffer({ retcode: 0, areaType: protobuff.areaType, areaId: protobuff.areaId }, dataUtil.getPacketIDByProtoName("EnterWorldAreaRsp")));

            break;

        case "PostEnterSceneReq":

            const PostEnterSceneRsp = { enterSceneToken: 8427 }

            sendPacketAsyncByName(kcpobj, "PostEnterSceneRsp", keyBuffer,  await dataUtil.objToProtobuffer(PostEnterSceneRsp, dataUtil.getPacketIDByProtoName("PostEnterSceneRsp")));

            break;

        case "GetShopmallDataReq":

            sendPacketAsyncByName(kcpobj, "GetShopmallDataRsp", keyBuffer, await dataUtil.objToProtobuffer({ shopTypeList: [ 900, 1052, 902, 1001, 903 ] }, dataUtil.getPacketIDByProtoName("GetShopmallDataRsp")));


            break;

        case "UnionCmdNotify":

            for (var x in protobuff.cmdList) {
                if (protobuff.cmdList[x].messageId == 362)
                {
                    // CombatInvocationsNotify
                    // to get current Pos

                    var combatResult = "Placeholder"

                    protobuf.load("./proto/CombatInvocationsNotify.proto", function(err, root) {
                        const result = root.lookup("CombatInvocationsNotify").decode(protobuff.cmdList[x].body)

                        try {
                            if (result.invokeList[0].argumentType == 7 && result.invokeList[0].forwardType == 2) {
                                combatResult = result.invokeList[0].combatData
                            }
                        }
                        catch (err) {

                        }

                        
                        if (combatResult != "Placeholder") {
                            
                            protobuf.load("./proto/EntityMoveInfo.proto", function(err, root) {
                                const result = root.lookup("EntityMoveInfo").decode(combatResult)
                                
                                try {

                                    if (result.entityId == PlayerEnterSceneInfoNotify.curAvatarEntityId) {
                                        posScene = result.motionInfo.pos
                                    }

                                }
                                catch (err) {

                                }
                            });
                        }
                    });

                }
                
            }

            break;
        
        case "InteractDailyDungeonInfoNotify":
            break;

        case "SceneTransToPointReq":
            
            //PlayerEnterSceneNotify

            const SceneTransToPointRsp = {
                "sceneId": parseInt(protobuff.sceneId),
                "pointId": parseInt(protobuff.pointId),
            }

            //sendPacketAsyncByName(kcpobj, "PlayerEnterSceneNotify", keyBuffer);
            // or PlayerEnterSceneInfoNotify
            // dunno?

            sendPacketAsyncByName(kcpobj, "SceneTransToPointRsp", keyBuffer, await dataUtil.objToProtobuffer(SceneTransToPointRsp, dataUtil.getPacketIDByProtoName("SceneTransToPointRsp")))
            
            break;

        case "PlayerSetPauseReq": // PlayerSetPauseReq

            // To protobuffer
            data = await dataUtil.objToProtobuffer({}, dataUtil.getPacketIDByProtoName("PlayerSetPauseRsp"));
            sendPacketAsyncByName(kcpobj, "PlayerSetPauseRsp", keyBuffer, data)

            break;

        case "GetSceneAreaReq": // GetSceneAreaReq


            const GetSceneAreaRsp = {
                areaIdList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,17,18,19,100,101,102,103,200,210,300],
                    cityInfoList: [
                        { cityId: 1, level: 1 },
                        { cityId: 2, level: 1 },
                        { cityId: 3, level: 1 },
                    ],
                        sceneId: sceneIdSelect
            }
            sendPacketAsyncByName(kcpobj, "GetSceneAreaRsp", keyBuffer, await dataUtil.objToProtobuffer(GetSceneAreaRsp, dataUtil.getPacketIDByProtoName("GetSceneAreaRsp")))

            break;
			
        case "GetScenePointReq": // GetScenePointReq
            PointList = []
            for (Possible = 0; Possible < 2000; Possible++) {
                PointList[Possible] = 0 + Possible
            }
            const GetScenePointRsp = { "unlockedPointList": PointList, "sceneId": sceneIdSelect }

			sendPacketAsyncByName(kcpobj, "GetScenePointRsp", keyBuffer, await dataUtil.objToProtobuffer(GetScenePointRsp, dataUtil.getPacketIDByProtoName("GetScenePointRsp")))
            break;

        case "PrivateChatReq":
            let PrivateChatNotify = {
                chatInfo: {
                    uid: 1337,
                    toUid: 1337,
                    text: protobuff.text,
                    isRead: false
                }
            }
            data = await dataUtil.objToProtobuffer(PrivateChatNotify, dataUtil.getPacketIDByProtoName("PrivateChatNotify"));
            sendPacketAsyncByName(kcpobj, "PrivateChatNotify", keyBuffer, data)

            var toBuff = Buffer.from(protobuff.text)
            var command = toBuff.toString().split(" ")[0]
            var args = toBuff.toString().trim().split(" ")
            var reply = "PLACEHOLDER"
            switch (command) {
                case "inv":
                    if (args[1] == "add") {
                        const obj = {
                            "itemId": parseInt(args[2]),
                            "guid": "2681193339516092" + Math.random() * (99 - 10) + 10,
                        }
                        if (args[3] == "w") {
                            obj["equip"] = {
                                "weapon": {
                                    "level": args[4]
                                }
                            }
                        }
                        else if (args[3] == "m") {
                            obj["material"] = {
                                count: args[4]
                            }

                        } else {
                            reply = "Usage: inv (add) (w/m) (id) (level/count)"
                            break;
                        }

                        const ItemAddHintNotify = {
                            "itemList": [{
                                "itemId": parseInt(args[2]),
                                "count": parseInt(args[4])
                            }],
                            "reason": 37
                        }
                        if (args[3] == "w") {
                            ItemAddHintNotify.itemList[0].count = 1
                        }
                        data = await dataUtil.objToProtobuffer(ItemAddHintNotify, dataUtil.getPacketIDByProtoName("ItemAddHintNotify"));
                        sendPacketAsyncByName(kcpobj, "ItemAddHintNotify", keyBuffer, data)


                        PlayerStoreNotify.itemList.push(obj);
                        data = await dataUtil.objToProtobuffer(PlayerStoreNotify, dataUtil.getPacketIDByProtoName("PlayerStoreNotify"));
                        sendPacketAsyncByName(kcpobj, "PlayerStoreNotify", keyBuffer, data)
                    }
                    else {
                        reply = "Usage: inv (add) (w/m) (id) (level/count)"
                        break;
                    }
                    reply = `Added ${args[3] == "m" ? "Material" : "Weapon"} number ${args[2]} with a ${args[3] == "m" ? "count" : "level"} of ${args[4]}`
                    break;
                case "s":
                case "send":
                    sendPacketAsyncByName(kcpobj, args[1], keyBuffer)
                    reply = `Sent packet ${dataUtil.getPacketIDByProtoName(args[1])} (${args[1]}) to client`
                    break;
                case "r":
                case "backtonormal":
                case "reset":
                case "restart":
                    sendPacketAsyncByName(kcpobj, "PlayerEnterSceneNotify", keyBuffer, await dataUtil.objToProtobuffer(PlayerEnterSceneNotify1, dataUtil.getPacketIDByProtoName("PlayerEnterSceneNotify")))
                    reply = "Restarting..."
                    break;
                case "w":
                case "weather":
                    const weatherCommandData = {
                        weatherValueMap: {},
                        weatherAreaId: parseInt(args[1]),
                        climateType: 3
                    }
                    sendPacketAsyncByName(kcpobj, "SceneAreaWeatherNotify", keyBuffer, await dataUtil.objToProtobuffer(weatherCommandData, dataUtil.getPacketIDByProtoName("SceneAreaWeatherNotify")))
                    reply = "Weather has been set to: " + args[1]
                    break;
                case "t":
                case "time":
                    const PlayerGameTimeNotifyData = {
                        gameTime: parseInt(args[1])
                    }
                    sendPacketAsyncByName(kcpobj, "PlayerGameTimeNotify", keyBuffer, await dataUtil.objToProtobuffer(PlayerGameTimeNotifyData, dataUtil.getPacketIDByProtoName("PlayerGameTimeNotify")))
                    reply = "Time has been set to: " + args[1]
                    break;
                case "av":
                case "avatar":
                    if (args[1] == "add" || args[1] == "a") {
                        ShowAvatarList.push(args[2])
                    }
                    else if (args[1] == "remove" || args[1] == "r") {
                        for (var _ in ShowAvatarList)
                            if (_ == args[2])
                                ShowAvatarList.splice(_, 1)
                    }
                    else if (args[1] == "list" || args[1] == "l") {
                        reply = ShowAvatarList
                    }
                    else {
                        reply = "Usage: av ([a]dd/[r]emove/[l]ist) (id)\n\nNOTE: [R]EMOVE IS BY INDEX NOT BY VALUE"
                        break;
                    }
                    break;
                
                case "welkin":
                    const CardProductRewardNotify = {
                        "productId": "ys_glb_blessofmoon_tier5",
                        "hcoin": args[1],
                        "remainDays": args[2]
                    }
                    reply = "Welkin primo: " + args[1] + "  date: " + args[2]

                    sendPacketAsyncByName(kcpobj, "CardProductRewardNotify", keyBuffer, await dataUtil.objToProtobuffer(CardProductRewardNotify, dataUtil.getPacketIDByProtoName("CardProductRewardNotify")))
                    
                    break;

                case "spawn":
                    const SceneEntityAppearNotifyMon = {
                        entityList: [
                          {
                            propList: [],
                            fightPropList: [],
                            animatorParaList: [],
                            entityEnvironmentInfoList: [],
                            tagList: [],
                            entityType: 2, // monster is 2
                            entityId: temp_entityid,
                            motionInfo: {
                                pos: posScene,
                                rot: {
                                    x: 0.0,
                                    y: 0.0,
                                    z: 0.0,
                                },
                                speed: {
                                    x: 0.0,
                                    y: 0.0,
                                    z: 0.0,
                                }
                            },
                            lifeState: 1,
                            entityClientData: {},
                            
                            entityAuthorityInfo: {
                                abilityInfo: {},
                                rendererChangedInfo: {},
                                aiInfo: {
                                    isAiOpen: true,
                                    bornPos: {
                                        x: 0.0,
                                        y: 0.0,
                                        z: 0.0,
                                    },
                                    skillCdMap: {},
                                    servantInfo: null,
                                    aiThreatMap: {},
                                    skillGroupCdMap: {},
                                    curTactic: 0
                                },
                                bornPos: {},
                                poseParaList: [],
                            },
                            monster: {
                                "monsterId":args[1],
                                "bornType":1
                            }
                          }
                        ],
                        appearType: 12
                      }

                    temp_entityid += 1

                    console.log(SceneEntityAppearNotifyMon)

                    reply = "spawn monsterId " + args[1]

                    sendPacketAsyncByName(kcpobj, "SceneEntityAppearNotify", keyBuffer, await dataUtil.objToProtobuffer(SceneEntityAppearNotifyMon, dataUtil.getPacketIDByProtoName("SceneEntityAppearNotify")))
                    


                    break;

                case "quest":

                    const QuestListUpdateNotify = {"questList":[{"questId":7051101,"state":3,"startTime":1648390899,"parentQuestId":70511,"startGameTime":150704,"acceptTime":1648390899,"finishProgressList":[1]}]}

                    sendPacketAsyncByName(kcpobj, "QuestListUpdateNotify", keyBuffer, await dataUtil.objToProtobuffer(QuestListUpdateNotify, dataUtil.getPacketIDByProtoName("QuestListUpdateNotify")))
                    

                    break;

                default:
                    reply = "Command doesnt seem to exist..."
            }

            PrivateChatNotify = {
                chatInfo: {
                    uid: 1337,
                    toUid: 1337,
                    text: reply,
                    isRead: false
                }
            }
            data = await dataUtil.objToProtobuffer(PrivateChatNotify, dataUtil.getPacketIDByProtoName("PrivateChatNotify"));
            sendPacketAsyncByName(kcpobj, "PrivateChatNotify", keyBuffer, data)

            sendPacketAsyncByName(kcpobj, "PrivateChatRsp", keyBuffer, await dataUtil.objToProtobuffer({}, dataUtil.getPacketIDByProtoName("PrivateChatRsp")))
                    

            break;

        case "GetScenePointReq": // GetScenePointReq

            // Response
            var XD = PointRspCount > 0 ? PointRspCount : "";
            sendPacketAsyncByName(kcpobj, "GetScenePointRsp" + XD, keyBuffer)
            PointRspCount++

            break;
        
            

        case "GetWidgetSlotReq":

            sendPacketAsyncByName(kcpobj, "GetWidgetSlotRsp", keyBuffer, await dataUtil.objToProtobuffer({slotList: [ {}, { tag: 1 } ]}, dataUtil.getPacketIDByProtoName("GetWidgetSlotRsp")))
                    
            break;

        case "GetRegionSearchReq":
            
            const RegionSearchNotify2 = {
                regionSearchList: [],
                uid: 1337
            }

			sendPacketAsyncByName(kcpobj, "RegionSearchNotify", keyBuffer, await dataUtil.objToProtobuffer(RegionSearchNotify2, dataUtil.getPacketIDByProtoName("RegionSearchNotify")))
            break;

        case "ReunionBriefInfoReq": // ReunionBriefInfoReq

            sendPacketAsyncByName(kcpobj, "ReunionBriefInfoRsp", keyBuffer, await dataUtil.objToProtobuffer({}, dataUtil.getPacketIDByProtoName("ReunionBriefInfoRsp")))
            break;

        case "GetAllActivatedBargainDataReq": // GetAllActivatedBargainDataReq

            sendPacketAsyncByName(kcpobj, "GetAllActivatedBargainDataRsp", keyBuffer, await dataUtil.objToProtobuffer({snapshotList: [] }, dataUtil.getPacketIDByProtoName("GetAllActivatedBargainDataRsp")))
            break;
        
        case "GetChatEmojiCollectionReq": // GetChatEmojiCollectionReq
            
            sendPacketAsyncByName(kcpobj, "GetChatEmojiCollectionRsp", keyBuffer, await dataUtil.objToProtobuffer({}, dataUtil.getPacketIDByProtoName("GetChatEmojiCollectionRsp")));
            break;
        
        case "PullRecentChatReq":
            const PullRecentChatRsp = {
                "chatInfo": [{
                    "time": 1647437836,
                    "uid": 1337,
                    "toUid": 1337,
                    "text": "Console"
                }]
            }
            sendPacketAsyncByName(kcpobj, "PullRecentChatRsp", keyBuffer, await dataUtil.objToProtobuffer(PullRecentChatRsp, dataUtil.getPacketIDByProtoName("PullRecentChatRsp")));
            break;
        
        case "GetPlayerFriendListReq":
        case "GetRecentMpPlayerListReq": 

            sendPacketAsyncByName(kcpobj, "AddFriendNotify", keyBuffer, await dataUtil.objToProtobuffer(AddFriendNotify, dataUtil.getPacketIDByProtoName("AddFriendNotify")))

            break;

        case "GetPlayerAskFriendListReq": // GetPlayerAskFriendListReq
            const GetPlayerAskFriendListRsp = {
                askFriendList: []
            }
            // To protobuffer
            console.log(GetPlayerAskFriendListRsp)
            
            sendPacketAsyncByName(kcpobj, "GetPlayerAskFriendListRsp", keyBuffer, await dataUtil.objToProtobuffer(GetPlayerAskFriendListRsp, dataUtil.getPacketIDByProtoName("GetPlayerAskFriendListRsp")));
            break;

        case "ClientAbilityInitFinishNotify": // ClientAbilityInitFinishNotify

            console.log("ClientAbilityInitFinishNotify")

            break;
        
        case "NpcTalkReq":
            const NpcTalkRsp = {
                curTalkId: protobuff.curTalkId,
                entityId: protobuff.entityId
            }
            sendPacketAsyncByName(kcpobj, "NpcTalkRsp", keyBuffer, await dataUtil.objToProtobuffer(NpcTalkRsp, dataUtil.getPacketIDByProtoName("NpcTalkRsp")));

            break;
        
        case "SetOpenStateReq":
            console.log(protobuff)
            break;

        case "QueryPathReq":
            break;
        case "PersonalLineAllDataReq":
            const PersonalLineAllDataRsp = {
                "legendaryKeyCount":1,
                "ongoingPersonalLineList":[
                9,
                13,
                19,
                ],
                "lockedPersonalLineList":[
                    {
                    "personalLineId":2,
                    "level":34
                    },
                    {
                    "personalLineId":3,
                    "level":36
                    },
                    {
                    "personalLineId":4,
                    "level":38
                    },
            
                    {
                    "personalLineId":6,
                    "level":40
                    },
                    {
                        "personalLineId":7,
                        "level":40
                    },
                    {
                        "personalLineId":8,
                        "level":40
                    },
                    {
                        "personalLineId":10,
                        "level":40
                    },
                    {
                        "personalLineId":11,
                        "level":40
                    },
                    {
                        "personalLineId":12,
                        "level":40
                    },
                    {
                        "personalLineId":14,
                        "level":40
                    },
                    {
                        "personalLineId":15,
                        "level":40
                    },
                    {
                        "personalLineId":16,
                        "level":40
                    },
                    {
                        "personalLineId":17,
                        "level":40
                    },
                    {
                        "personalLineId":18,
                        "level":40
                    },
                ]
            }

            data = await dataUtil.objToProtobuffer(PersonalLineAllDataRsp, dataUtil.getPacketIDByProtoName("PersonalLineAllDataRsp"));
            sendPacketAsyncByName(kcpobj, "PersonalLineAllDataRsp", keyBuffer, data)

            break;
        
        case "SetUpAvatarTeamReq":
            // need to replace
            // AvatarDataNotify - avatarTeamMap, curAvatarTeamId, chooseAvatarGuid ... if needed

            /*

            SetUpAvatarTeamReq requests:
            - teamId
            - avatarTeamGuidList
            - curAvatarGuid

            AvatarTeamUpdateNotify sends:
            {
                "avatarTeamMap": {
                    "1": {
                        "avatarGuidList": [
                            "3544845098770497922",
                            "3544845098770511634",
                            "3544845098770512321",
                            "3544845098770498035"
                        ]
                    }
                }
            }

            and SceneTeamUpdateNotify updates
            * generate SceneTeamUpdateNotify is really needed

            // SceneTeamUpdateNotify
            // SceneEntityAppearNotify // 현재 아바타 정보를 보여주는놈
            // PlayerEnterSceneInfoNotify

            SetUpAvatarTeamRsp responses same as protobuff

            */

            const AvatarTeamUpdateNotify = {
                avatarTeamMap: {
                }
            }

            AvatarTeamUpdateNotify.avatarTeamMap[protobuff.teamId.toString()] = {
                "avatarGuidList": protobuff.avatarGuidList
            }

            AvatarDataNotify.avatarTeamMap[protobuff.teamId.toString()] = {
                "avatarGuidList": protobuff.avatarGuidList
            }
            AvatarDataNotify.chooseAvatarGuid = protobuff.curAvatarGuid
            
            sendPacketAsyncByName(kcpobj, "AvatarTeamUpdateNotify", keyBuffer, await dataUtil.objToProtobuffer(AvatarTeamUpdateNotify, dataUtil.getPacketIDByProtoName("AvatarTeamUpdateNotify")));





            const SetUpAvatarTeamRsp = {
                teamId: protobuff.teamId,
                avatarTeamGuidList: protobuff.avatarTeamGuidList,
                curAvatarGuid: protobuff.curAvatarGuid
            }

            sendPacketAsyncByName(kcpobj, "SetUpAvatarTeamRsp", keyBuffer, await dataUtil.objToProtobuffer(SetUpAvatarTeamRsp, dataUtil.getPacketIDByProtoName("SetUpAvatarTeamRsp")));

            break;


        case "GetGachaInfoReq":
            const GetGachaInfoRsp = {
                "gachaInfoList": [
                  {
                    "gachaType": 200,
                    "scheduleId": 893,
                    "beginTime": 0,
                    "endTime": 4294967295,
                    "costItemId": 224,
                    "costItemNum": 0,
                    "gachaPrefabPath": "GachaShowPanel_A022",
                    "gachaProbUrl": "https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&gacha_id=cbca8b58edaea048a628aa2ecfe20204f69696&timestamp=1648597701",
                    "gachaRecordUrl": "https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=200&gacha_id=cbca8b58edaea048a628aa2ecfe20204f69696&timestamp=1648597701",
                    "gachaPreviewPrefabPath": "UI_Tab_GachaShowPanel_A022",
                    "tenCostItemId": 224,
                    "tenCostItemNum": 0,
                    "leftGachaTimes": 4294967295,
                    "gachaTimesLimit": 4294967295,
                    "gachaSortId": 1000,
                    "gachaProbUrlOversea": "https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&gacha_id=cbca8b58edaea048a628aa2ecfe20204f69696&timestamp=1648597701",
                    "gachaRecordUrlOversea": "https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=200&gacha_id=cbca8b58edaea048a628aa2ecfe20204f69696&timestamp=1648597701"
                  },
                  {
                    "gachaType": 301,
                    "scheduleId": 933,
                    "beginTime": 0,
                    "endTime": 4294967295,
                    "costItemId": 223,
                    "costItemNum": 0,
                    "gachaPrefabPath": "GachaShowPanel_A079",
                    "gachaProbUrl": "https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&gacha_id=eaa07ae07196ca35c36b48213560ab6df7617e&timestamp=1648597988",
                    "gachaRecordUrl": "https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=301&gacha_id=eaa07ae07196ca35c36b48213560ab6df7617e&timestamp=1648597988",
                    "gachaPreviewPrefabPath": "UI_Tab_GachaShowPanel_A079",
                    "tenCostItemId": 223,
                    "tenCostItemNum": 0,
                    "leftGachaTimes": 4294967295,
                    "gachaTimesLimit": 4294967295,
                    "gachaSortId": 9998,
                    "gachaProbUrlOversea": "https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&gacha_id=eaa07ae07196ca35c36b48213560ab6df7617e&timestamp=1648597988",
                    "gachaRecordUrlOversea": "https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=301&gacha_id=eaa07ae07196ca35c36b48213560ab6df7617e&timestamp=1648597988",
                    "gachaUpInfoList": [
                      {
                        "itemParentType": 1,
                        "itemIdList": [
                          1002
                        ]
                      },
                      {
                        "itemParentType": 2,
                        "itemIdList": [
                          1020,
                          1045,
                          1053
                        ]
                      }
                    ]
                  },
                  {
                    "gachaType": 302,
                    "scheduleId": 943,
                    "beginTime": 0,
                    "endTime": 4294967295,
                    "costItemId": 223,
                    "costItemNum": 0,
                    "gachaPrefabPath": "GachaShowPanel_A080",
                    "gachaProbUrl": "https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&gacha_id=db9eddc6811aa7170b49f251fa5c488e030bd7&timestamp=1648598035",
                    "gachaRecordUrl": "https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=302&gacha_id=db9eddc6811aa7170b49f251fa5c488e030bd7&timestamp=1648598035",
                    "gachaPreviewPrefabPath": "UI_Tab_GachaShowPanel_A080",
                    "tenCostItemId": 223,
                    "tenCostItemNum": 0,
                    "leftGachaTimes": 4294967295,
                    "gachaTimesLimit": 4294967295,
                    "gachaSortId": 9996,
                    "gachaProbUrlOversea": "https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&gacha_id=db9eddc6811aa7170b49f251fa5c488e030bd7&timestamp=1648598035",
                    "gachaRecordUrlOversea": "https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=302&gacha_id=db9eddc6811aa7170b49f251fa5c488e030bd7&timestamp=1648598035",
                    "gachaUpInfoList": [
                      {
                        "itemParentType": 1,
                        "itemIdList": [
                          11509,
                          12504
                        ]
                      },
                      {
                        "itemParentType": 2,
                        "itemIdList": [
                          11401,
                          12402,
                          13407,
                          14401,
                          15401
                        ]
                      }
                    ]
                  },
                  {
                    "gachaType": 100,
                    "endTime": 4294967295,
                    "costItemId": 224,
                    "costItemNum": 0,
                    "gachaPrefabPath": "GachaShowPanel_A016",
                    "gachaProbUrl": "https://webstatic.mihoyo.com/hk4e/event/e20190909gacha/index.html#/newbiegacha",
                    "gachaRecordUrl": "https://webstatic.mihoyo.com/hk4e/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=100",
                    "gachaPreviewPrefabPath": "UI_Tab_GachaShowPanel_A016",
                    "tenCostItemId": 224,
                    "tenCostItemNum": 0,
                    "gachaTimesLimit": 20,
                    "gachaSortId": 9999,
                    "gachaProbUrlOversea": "https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha#/newbiegacha",
                    "gachaRecordUrlOversea": "https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=100"
                  }
                ],
                "gachaRandom": 1063641077
              }
            
            // To protobuffer
            data = await dataUtil.objToProtobuffer(GetGachaInfoRsp, dataUtil.getPacketIDByProtoName("GetGachaInfoRsp"));
            sendPacketAsyncByName(kcpobj, "GetGachaInfoRsp", keyBuffer, data)
            break;

        case "DoGachaReq":
            const DoGachaRsp = {
                gachaItemList: []
            }
            
            /*
            for(let x = 0; x<66; x++) {
                DoGachaRsp.gachaItemList[x] = {
                        transferItems: [],
                        tokenItemList: [ { itemId: 222, count: 15 } ],
                        gachaItem_: { itemId: 1001+x, count: 1 }
                }
            }
            */

            DoGachaRsp.gachaItemList[0] = {
                transferItems: [],
                tokenItemList: [ { itemId: 222, count: 15} ],
                gachaItem_: { itemId: 1060, count: 1 },
                isGachaItemNew: true,
                isFlashCard: true,

            }

            for (let x = 1; x<7; x++) {
                DoGachaRsp.gachaItemList[x] = {
                    transferItems: [
                        { item: { itemId: 1160, count: 1}, isTransferItemNew: true},
                        { item: { itemId: 221, count: 10}, isTransferItemNew: true},
                    ],
                    tokenItemList: [ { itemId: 222, count: 15} ],
                    gachaItem_: { itemId: 1060, count: 1 },

                }
            }

            for (let x = 7; x<10; x++) {
                DoGachaRsp.gachaItemList[x] = {
                    transferItems: [
                        { item: { itemId: 221, count: 25}, isTransferItemNew: true},
                    ],
                    tokenItemList: [ { itemId: 222, count: 15} ],
                    gachaItem_: { itemId: 1060, count: 1 },

                }
            }

            // To protobuffer

            data = await dataUtil.objToProtobuffer(DoGachaRsp, dataUtil.getPacketIDByProtoName("DoGachaRsp"));
            sendPacketAsyncByName(kcpobj, "DoGachaRsp", keyBuffer, data)
            break;
        
        case "CalcWeaponUpgradeReturnItemsReq":
            const CalcWeaponUpgradeReturnItemsRsp = {
                "targetWeaponGuid": protobuff.targetWeaponGuid
            }
            sendPacketAsyncByName(kcpobj, "CalcWeaponUpgradeReturnItemsRsp", keyBuffer, await dataUtil.objToProtobuffer(CalcWeaponUpgradeReturnItemsRsp, dataUtil.getPacketIDByProtoName("CalcWeaponUpgradeReturnItemsRsp")));
            break;
        
        case "WeaponUpgradeReq":

            const StoreItemChangeNotify = {
                storeType: 1,
                itemList: [
                    {
                        itemId: 11502,
                        guid: protobuff.targetWeaponGuid,
                        equip: {
                            weapon: {
                                level: 20
                            }
                        }
                    }
                ]                
            }

            const WeaponUpgradeRsp = {
                "oldLevel": 1,
                "curLevel": 2
            }
            sendPacketAsyncByName(kcpobj, "WeaponUpgradeRsp", keyBuffer, await dataUtil.objToProtobuffer(WeaponUpgradeRsp, dataUtil.getPacketIDByProtoName("WeaponUpgradeRsp")));
            break;


        case "SetPlayerSignatureReq":

            // $$$ Console Removed $$$

            const SetPlayerSignatureRsp = {
                retcode: 0,
                signature: protobuff.signature
            }
            data = await dataUtil.objToProtobuffer(SetPlayerSignatureRsp, dataUtil.getPacketIDByProtoName("SetPlayerSignatureRsp"));
            sendPacketAsyncByName(kcpobj, "SetPlayerSignatureRsp", keyBuffer, data)
            break;
        case "EntityConfigHashNotify":
        case "EvtAiSyncCombatThreatInfoNotify":
        case "ClientAbilityChangeNotify":
        case "ObstacleModifyNotify":
        case "SetEntityClientDataNotify":
            break;
        default:
            console.log(c.colog(32, "UNHANDLED PACKET: ") + packetID + "_" + dataUtil.getProtoNameByPacketID(packetID))
            return;
    }
}


module.exports = {

    execute(port) {

        var output = async function (data, size, context) {
            // For some reason some data is undefined or null
            if (data == undefined || data == null || data == NaN) return;
            // Some type of detector for stupid packets
            if (data.length > 26 && data != undefined) {
                data = dataUtil.formatSentPacket(data, token); // Formatting
                // WARNING - MIGHT BE DELETED \\

                var arrayData = dataUtil.getPackets(data); // Splitting all the packets
                for (var k in arrayData) { // In all the splitted packets
                    // send one by one
                    server.send(arrayData[k], 0, arrayData[k].length, context.port, context.address);
                    //console.log("[SENT] " + arrayData[k].toString('hex'))

                }
                return
            }
            server.send(data, 0, size, context.port, context.address);
        };

        server.on('error', (error) => {
            // Wtffff best error handler
            server.close();
        });

        server.on('message', async (data, rinfo) => {
            // Extracted from KCP example lol
            var k = rinfo.address + '_' + rinfo.port + '_' + data.readUInt32LE(0).toString(16);
            var bufferMsg = Buffer.from(data);

            // Detects if its a handshake
            if (bufferMsg.byteLength <= 20) {
                var ret = handleHandshake(bufferMsg, bufferMsg.readInt32BE(0)); // Handling:TM:
                ret.encode(); // Some stupid handshake class i made
                console.log("[HANDSHAKE]")
                // send
                server.send(ret.buffer, 0, ret.buffer.byteLength, rinfo.port, rinfo.address);
                return
            }

            // More stolen shit
            if (undefined === clients[k]) {
                var context = {
                    address: rinfo.address,
                    port: rinfo.port
                };
                var kcpobj = new kcp.KCP(data.readUInt32LE(0), context);
                kcpobj.nodelay(1, 10, 2, 1);
                kcpobj.output(output);
                clients[k] = kcpobj;
            }
            // token! [hardcoded]
            token = data.readUInt32BE(4);

            // Finally getting into the important shit
            var kcpobj = clients[k];
            var reformatedPacket = await dataUtil.reformatKcpPacket(bufferMsg);
            kcpobj.input(reformatedPacket) // fuck you
            kcpobj.update(Date.now())


            var recv = kcpobj.recv();
            if (recv) {
                var packetRemHeader = recv; // Removes Modified KCP Header and leaves the data

                console.log(c.colog(31, "[RECV] %s"), packetRemHeader.toString('hex'))

                var keyBuffer = seedKey == undefined ? initialKey : seedKey;    // Gets the key data

                //console.log(keyBuffer)
                dataUtil.xorData(packetRemHeader, keyBuffer);   // xors the data into packetRemHeader

                // Check if the recived data is a packet
                if (packetRemHeader.length > 5 && packetRemHeader.readInt16BE(0) == 0x4567 && packetRemHeader.readUInt16BE(packetRemHeader.byteLength - 2) == 0x89AB) {
                    var packetID = packetRemHeader.readUInt16BE(2); // Packet ID
                    if (![2349, 373, 3187, 19, 1, 49,100].includes(packetID)) {
						var dataBuffer = await dataUtil.dataToProtobuffer(dataUtil.parsePacketData(recv), packetID);
						// console.log(dataBuffer);
                        console.log(c.colog(32, "[KCP] Got packet %i (%s)"), packetID, dataUtil.getProtoNameByPacketID(packetID)); // Debug
                    }


                    var noMagic = dataUtil.parsePacketData(packetRemHeader); // Parse packet data

                    // [DEBUG] if packet is not known then its stored there with its data
                    if (packetID == parseInt(dataUtil.getProtoNameByPacketID(packetID))) {
                        console.log("[UNK PACKET] " + packetRemHeader.toString('hex'));
                        fs.appendFile("./unk/unknown_packets/" + packetID, "unknown", (err) => {
                            if (err)
                                throw err
                        })
                        return;
                    }

                    // yeah whatever this shit
                    var dataBuffer = await dataUtil.dataToProtobuffer(noMagic, packetID);
                    handleSendPacket(dataBuffer, packetID, kcpobj, keyBuffer);
                }

            }

        });

        // yooo kcp listening
        server.on('listening', () => {
            var address = server.address();
            console.log(`[KCP ${address.port}] LISTENING.`); // He do be listenin doe
        });

        server.bind(port); // binds
    }
}
