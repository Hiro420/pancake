// File reading
const fs = require("fs")

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

// Time
var epochTime = Date.now();


// i hardcoded this so bad lmao
var seedKey = undefined; // Hardcoding is no more :crab:
var token = 0x00000000;

var server = dgram.createSocket("udp4");

var CharacterID = 10000007
var TalentID = 50

var MHYKey = "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";
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
        Packet = fs.readFileSync("bin/" + name + ".bin")
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
posScene = {
    "X": 1996,
    "Y": 300,
    "Z": -673
}
var AreaRspCount, PointRspCount, WorldAreaCount, GachaRspValue = 0
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
            if (!protobuff.op) {
                posScene = {
                    "X": protobuff.mark.pos.X,
                    "Y": 500.67052,
                    "Z": protobuff.mark.pos.Z
                }
                console.log(posScene)

                const SceneEntityAppearNotifyw = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/SceneEntityAppearNotify.bin"), dataUtil.getPacketIDByProtoName("SceneEntityAppearNotify"))
                SceneEntityAppearNotifyw.entityList[0].AvatarId = CharacterID
                SceneEntityAppearNotifyw.entityList[0].motionInfo.pos = posScene
    
                // To protobuffer;
                sendPacketAsyncByName(kcpobj, "SceneEntityAppearNotify", keyBuffer, await dataUtil.objToProtobuffer(SceneEntityAppearNotifyw, dataUtil.getPacketIDByProtoName("SceneEntityAppearNotify")));
            }

            break;

        case "GetPlayerTokenReq": // GetPlayerTokenReq

            // Needs to be readed and passed to protobuffer to change the secretKeySeed
            const GetPlayerTokenRsp = await dataUtil.dataToProtobuffer(fs.readFileSync("bin/GetPlayerTokenRsp.bin"), dataUtil.getPacketIDByProtoName("GetPlayerTokenRsp"))

            // Secret Key is now 2 to make it easier
            GetPlayerTokenRsp.secretKeySeed = 2
            GetPlayerTokenRsp.uid = 1
            //GetPlayerTokenRsp.accountUid = "1"
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

        case "TowerAllDataReq": // TowerAllDataReq

            const TowerAllDataRsp = await dataUtil.dataToProtobuffer(fs.readFileSync("bin/TowerAllDataRsp.bin"), dataUtil.getPacketIDByProtoName("TowerAllDataRsp"))
			
			TowerAllDataRsp.isFinishedEntranceFloor = true
			TowerAllDataRsp.isFirstInteract = true
			
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

            const AvatarEquipChangeNotify = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/AvatarEquipChangeNotify.bin"), dataUtil.getPacketIDByProtoName("AvatarEquipChangeNotify"))
			
            AvatarEquipChangeNotify.avatarGuid = protobuff.avatarGuid
            AvatarEquipChangeNotify.equipGuid = protobuff.equipGuid
            AvatarEquipChangeNotify.weapon.guid = protobuff.equipGuid
			AvatarEquipChangeNotify.weapon.itemId = 13416
            
            sendPacketAsyncByName(kcpobj, "AvatarEquipChangeNotify", keyBuffer, await dataUtil.objToProtobuffer(AvatarEquipChangeNotify, dataUtil.getPacketIDByProtoName("AvatarEquipChangeNotify")));

            console.log(WearEquipRsp)
            sendPacketAsyncByName(kcpobj, "WearEquipRsp", keyBuffer, await dataUtil.objToProtobuffer(WearEquipRsp, dataUtil.getPacketIDByProtoName("WearEquipRsp")))

            break;

        case "EnterSceneDoneReq":

            //sendPacketAsyncByName(kcpobj, "SceneEntityAppearNotify", keyBuffer)
            const SceneEntityAppearNotify = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/SceneEntityAppearNotify.bin"), dataUtil.getPacketIDByProtoName("SceneEntityAppearNotify"))
            SceneEntityAppearNotify.entityList[0].AvatarId = CharacterID
			SceneEntityAppearNotify.entityList[0].equipGuidList = "2600256355860217858"
			SceneEntityAppearNotify.entityList[0].motionInfo.pos = posScene
			SceneEntityAppearNotify.entityList[0].avatar.uid = 1
            // To protobuffer;
            sendPacketAsyncByName(kcpobj, "SceneEntityAppearNotify", keyBuffer, await dataUtil.objToProtobuffer(SceneEntityAppearNotify, dataUtil.getPacketIDByProtoName("SceneEntityAppearNotify")));
            sendPacketAsyncByName(kcpobj, "EnterSceneDoneRsp", keyBuffer)

            break;

        case "UnlockTransPointReq":
            var pointId = protobuff.pointId
			console.log(pointId)
            const UnlockTransPointRsp = {
                "sceneId": 3,
                "pointId": parseInt(protobuff.pointId),
            }
			
			const ScenePointUnlockNotify = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/ScenePointUnlockNotify.bin"), dataUtil.getPacketIDByProtoName("ScenePointUnlockNotify"))
			
			ScenePointUnlockNotify.sceneId = 3
			ScenePointUnlockNotify.pointList = protobuff.pointId
			
            sendPacketAsyncByName(kcpobj, "ScenePointUnlockNotify", keyBuffer, await dataUtil.objToProtobuffer(ScenePointUnlockNotify, dataUtil.getPacketIDByProtoName("ScenePointUnlockNotify")));

            console.log(UnlockTransPointRsp)
            sendPacketAsyncByName(kcpobj, "UnlockTransPointRsp", keyBuffer, await dataUtil.objToProtobuffer(UnlockTransPointRsp, dataUtil.getPacketIDByProtoName("UnlockTransPointRsp")))
			
		break;

        case "PlayerLoginReq": // PlayerLoginReq

            //AvatarDataNotify
            const AvatarDataNotify = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/AvatarDataNotify.bin"), dataUtil.getPacketIDByProtoName("AvatarDataNotify"))
            
            // Preview character
            // how to fix skills?
            // do not touch avatarList[0]
            
            //AvatarDataNotify.avatarList[2].avatarId = 10000035;
            sendPacketAsyncByName(kcpobj, "AvatarDataNotify", keyBuffer, await dataUtil.objToProtobuffer(AvatarDataNotify, dataUtil.getPacketIDByProtoName("AvatarDataNotify")));

            // ActivityScheduleInfoNotify
            // EVENTACTIVITY

            const ActivityScheduleInfoNotify = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/ActivityScheduleInfoNotify.bin"), dataUtil.getPacketIDByProtoName("ActivityScheduleInfoNotify"))

            ActivityScheduleInfoNotify.activityScheduleList[2].activityId = 5064

            for (Possible = 3; Possible <= 100; Possible++)
            {
                ActivityScheduleInfoNotify.activityScheduleList[Possible] = {
                    "activityId": 5050 + Possible,
                    "isOpen": true,
                    "scheduleId": 5039001,
                    "beginTime": 1626822000,
                    "endTime": 1930450800
                }
            }

            sendPacketAsyncByName(kcpobj, "ActivityScheduleInfoNotify", keyBuffer, await dataUtil.objToProtobuffer(ActivityScheduleInfoNotify, dataUtil.getPacketIDByProtoName("ActivityScheduleInfoNotify")));

            // PlayerPropNotify
			// sendPacketAsyncByName(kcpobj, "PlayerPropNotify", keyBuffer);

            // PlayerDataNotify
            const PlayerDataNotify = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/PlayerDataNotify.bin"), dataUtil.getPacketIDByProtoName("PlayerDataNotify"))
            PlayerDataNotify.nickName = "여행자"

            PlayerDataNotify.serverTime = epochTime
            // Time adjustment

			PlayerDataNotify.propMap["10015"].ival = 99999999
			PlayerDataNotify.propMap["10015"].val = 99999999  // Primo
			
			PlayerDataNotify.propMap["10013"].ival = 60
			PlayerDataNotify.propMap["10013"].val = 60 // Player level

			PlayerDataNotify.propMap["10016"].ival = 99999999
			PlayerDataNotify.propMap["10016"].val = 99999999  // Genesis

			PlayerDataNotify.propMap["10019"].ival = 8
			PlayerDataNotify.propMap["10019"].val = 8  // World level
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
                    "5": 1,
                    "6": 1,
                    "7": 1,
                    "8": 1,
                    "10": 1,
                    "11": 1,
                    "12": 1,
                    "13": 1,
                    "14": 1,
                    "15": 1,
                    "16": 1,
                    "18": 1,
                    "19": 1,
                    "21": 1,
                    "22": 1,
                    "23": 1,
                    "25": 1,
                    "27": 1,
                    "28": 1,
                    "29": 1,
                    "30": 1,
                    "31": 1,
                    "32": 1,
                    "33": 1,
                    "35": 1,
                    "36": 1,
                    "37": 1,
                    "38": 1,
                    "39": 1,
                    "40": 1,
                    "45": 1,
                    "47": 1,
                    "49": 1,
                    "50": 1,
                    "51": 1,
                    "52": 1,
                    "53": 1,
                    "54": 1,
                    "55": 1,
                    "56": 1,
                    "57": 1,
                    "58": 1,
                    "59": 1,
                    "60": 1,
                    "61": 1,
                    "62": 1,
                    "64": 1,
                    "65": 1,
                    "66": 1,
                    "74": 1,
                    "800": 1,
                    "801": 1,
                    "802": 1,
                    "900": 1,
                    "901": 1,
                    "902": 1,
                    "903": 1,
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
                    "1100": 1,
                    "1102": 1,
                    "1103": 1,
                    "1104": 1,
                    "1300": 1,
                    "1301": 1,
                    "1401": 1,
                    "1402": 1,
                    "1403": 1,
                    "1404": 1,
                    "1405": 1,
                    "1406": 1,
                    "1408": 1,
                    "1501": 1,
                    "1700": 1,
                    "2000": 1,
                    "2100": 1,
                    "2101": 1,
                    "2200": 1,
                    "2400": 1,
                    "2500": 1
                  }
            }
			sendPacketAsyncByName(kcpobj, "OpenStateUpdateNotify", keyBuffer, await dataUtil.objToProtobuffer(OpenStateUpdateNotify,
            await dataUtil.getPacketIDByProtoName("OpenStateUpdateNotify")));

            // AchievementAllDataNotify
            
            const AchievementAllDataNotify = {
                "achievementList": []
            }

            // View all achievments hack
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
            const StoreWeightLimitNotify =  { "storeType": "STORE_PACK", "weightLimit": 90000, "materialCountLimit": 2000, "weaponCountLimit": 2000, "reliquaryCountLimit": 1000, "furnitureCountLimit": 2000 }

            sendPacketAsyncByName(kcpobj, "StoreWeightLimitNotify", keyBuffer, await dataUtil.objToProtobuffer(StoreWeightLimitNotify,   
            await dataUtil.getPacketIDByProtoName("StoreWeightLimitNotify")))

            // PlayerStoreNotify

            const PlayerStoreNotify = {
                "storeType": "STORE_PACK",
                "itemList": [
                    {
                        "itemId": 11510,
                        "guid": "1",
                        "equip": {
                            "weapon": {
                                "level": 90,
                                "promoteLevel": 6,
                                "affixMap": {
                                    "113416": 0
                                }
                            }
                        }
                    }
                ],
                "weightLimit": 2000,
            }


            
            for (Possible = 1; Possible < 2000; Possible++) { // Unlock Artifacts
                PlayerStoreNotify.itemList[Possible] = {"itemId":97000+Possible,"guid":"96413"+Possible,"equip":{"reliquary":{"level":1,"mainPropId":12001}}};
            }

            await sendPacketAsyncByName(kcpobj, "PlayerStoreNotify", keyBuffer, await dataUtil.objToProtobuffer(PlayerStoreNotify, dataUtil.getPacketIDByProtoName("PlayerStoreNotify")))

            //AvatarSatiationDataNotify
            // sendPacketAsyncByName(kcpobj, "AvatarSatiationDataNotify", keyBuffer);

            //RegionSearchNotify
			// sendPacketAsyncByName(kcpobj, "RegionSearchNotify", keyBuffer);


            //PlayerEnterSceneNotify
            const PlayerEnterSceneNotify1 = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/PlayerEnterSceneNotify.bin"), dataUtil.getPacketIDByProtoName("PlayerEnterSceneNotify"))
            PlayerEnterSceneNotify1.pos = posScene
            PlayerEnterSceneNotify1.targetUid = 1
            console.log(PlayerEnterSceneNotify1)
            sendPacketAsyncByName(kcpobj, "PlayerEnterSceneNotify", keyBuffer, await dataUtil.objToProtobuffer(PlayerEnterSceneNotify1, dataUtil.getPacketIDByProtoName("PlayerEnterSceneNotify")));

            // Response
            // const PlayerLoginRsp = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/PlayerLoginRsp.bin"), dataUtil.getPacketIDByProtoName("PlayerLoginRsp"))
            
            const PlayerLoginRsp = {
                "retcode": 0,
                "playerData": [],
                "isNewPlayer": false,
                "targetUid": 1,
                "loginRand": 0,
                "isUseAbilityHash": false,
                "abilityHashCode": 0,
                "abilityHashMap": {},
                "clientDataVersion": 0,
                "isRelogin": false,
                "clientSilenceDataVersion": 0,
                "gameBiz": "",
                "playerDataVersion": 0,
                "clientMd5": "",
                "clientSilenceMd5": "",
                "resVersionConfig": null,
                "blockInfoMap": {},
                "clientVersionSuffix": "",
                "clientSilenceVersionSuffix": "",
                "shortAbilityHashMap": [],
                "scInfo": [],
                "isAudit": false,
                "isScOpen": false,
                "registerCps": "",
                "featureBlockInfoList": [],
                "isDataNeedRelogin": false,
                "countryCode": "",
                "nextResVersionConfig": null,
                "nextResourceUrl": "",
                "targetHomeOwnerUid": 1,
                "isEnableClientHashDebug": false,
                "isTransfer": false,
                "totalTickTime": 0.0
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
            for (Possible = 0; Possible < 118; Possible++) { // Unlock Namecard Lists
                CardList[Possible] = 210001 + Possible
            }
            const GetAllUnlockNameCardRsp = { "nameCardList": CardList }

            sendPacketAsyncByName(kcpobj, "GetAllUnlockNameCardRsp", keyBuffer, await dataUtil.objToProtobuffer(GetAllUnlockNameCardRsp, dataUtil.getPacketIDByProtoName("GetAllUnlockNameCardRsp")))
            break;
			
        case "SetNameCardReq":

            // Response
            sendPacketAsyncByName(kcpobj, "SetNameCardRsp", keyBuffer)

            break;
			
        case "UnlockTransPointReq":

            // Response
            sendPacketAsyncByName(kcpobj, "UnlockTransPointRsp", keyBuffer)

            break;

        case "AvatarWearFlycloakReq":

            // Response
            sendPacketAsyncByName(kcpobj, "AvatarWearFlycloakRsp", keyBuffer)

            break;

        case "GetPlayerSocialDetailReq":

            // Response

            // need to change uid?

            sendPacketAsyncByName(kcpobj, "GetPlayerSocialDetailRsp", keyBuffer)

            break;

        case "ChangeAvatarReq":

            // SceneEntityAppearNotify
            //const SceneEntityAppearNotify3 = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/SceneEntityAppearNotify.bin"), dataUtil.getPacketIDByProtoName("SceneEntityAppearNotify"))
            //SceneEntityAppearNotify3.entityList[0].motionInfo.pos = {
                //"X": -6200.6272,
               // "Y": 300.67052,
               // "Z": -3000.0728
            //}
            // To protobuffer;
            // PlayerEnterSceneInfoNotify2.curAvatarEntityId = 16777959;

            // sendPacketAsyncByName(kcpobj, "PlayerEnterSceneInfoNotify", keyBuffer, await dataUtil.objToProtobuffer(PlayerEnterSceneInfoNotify2, dataUtil.getPacketIDByProtoName("PlayerEnterSceneInfoNotify")));

            // PlayerEnterSceneInfoNotify
            //sendPacketAsyncByName(kcpobj, "PlayerEnterSceneInfoNotify", keyBuffer)

            const ChangeAvatarRsp = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/ChangeAvatarRsp.bin"), dataUtil.getPacketIDByProtoName("ChangeAvatarRsp"))
            ChangeAvatarRsp.retcode = 0
            ChangeAvatarRsp.curGuid = protobuff.guid

            // SceneEntityDisappearNotify
            sendPacketAsyncByName(kcpobj, "SceneEntityDisappearNotify", keyBuffer)

            // SceneEntityAppearNotify with others
            const SceneEntityAppearNotify2 = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/SceneEntityAppearNotify.bin"), dataUtil.getPacketIDByProtoName("SceneEntityAppearNotify"))
            const PlayerEnterSceneInfoNotify2 = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/PlayerEnterSceneInfoNotify.bin"), dataUtil.getPacketIDByProtoName("PlayerEnterSceneInfoNotify"))
            
            // const SceneTeamUpdateNotify = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/SceneTeamUpdateNotify.bin"), dataUtil.getPacketIDByProtoName("SceneTeamUpdateNotify"))
            
            // Copy Paste from YSFreedom
            for (var x in PlayerEnterSceneInfoNotify2.avatarEnterInfo) {
                if (x.avatarGuid == protobuff.guid)
                {
                    PlayerEnterSceneInfoNotify2.curAvatarEntityId = x.avatarEntityId;
                }
            }

            for (var x in SceneEntityAppearNotify2.entityList) {
                x.entityId = PlayerEnterSceneInfoNotify2.curAvatarEntityId;

                /*
                for (var y in SceneTeamUpdateNotify.sceneTeamAvatarList) {
                    if (y.avatarGuid == protobuff.guid) {
                        y.sceneEntityInfo.motionInfo = x.motionInfo;
                        SceneEntityAppearNotify2.entityList.push(y.sceneEntityInfo);
                    }
                }
                */
                // why it occurs error?
            }

            // Response
            sendPacketAsyncByName(kcpobj, "SceneEntityAppearNotify2", keyBuffer, await dataUtil.objToProtobuffer(SceneEntityAppearNotify2, dataUtil.getPacketIDByProtoName("SceneEntityAppearNotify")))
            sendPacketAsyncByName(kcpobj, "ChangeAvatarRsp", keyBuffer, await dataUtil.objToProtobuffer(ChangeAvatarRsp, dataUtil.getPacketIDByProtoName("ChangeAvatarRsp")))

            break;

        case "GetPlayerBlacklistReq":

            // Response
            //sendPacketAsyncByName(kcpobj, "GetPlayerBlacklistRsp", keyBuffer)

            break;

        case "GetShopReq":

            // Response
            //sendPacketAsyncByName(kcpobj, "GetShopRsp", keyBuffer)

            break;

        case "EnterSceneReadyReq":

            // EnterScenePeerNotify
            sendPacketAsyncByName(kcpobj, "EnterScenePeerNotify", keyBuffer);

            // Response
            sendPacketAsyncByName(kcpobj, "EnterSceneReadyRsp", keyBuffer)

            break;

        case "GetActivityInfoReq":
            const GetActivityInfoRsp = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/GetActivityInfoRsp.bin"), dataUtil.getPacketIDByProtoName("GetActivityInfoRsp"))
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
                    "scheduleId": 5038001,
                }
            }

            GetActivityInfoRsp.activityInfoList[1].trialAvatarInfo.rewardInfoList[0].trialAvatarIndexId = 45
            GetActivityInfoRsp.activityInfoList[1].trialAvatarInfo.rewardInfoList[1].trialAvatarIndexId = 46
            GetActivityInfoRsp.activityInfoList[1].trialAvatarInfo.rewardInfoList[2].trialAvatarIndexId = 47
            GetActivityInfoRsp.activityInfoList[1].trialAvatarInfo.rewardInfoList[3].trialAvatarIndexId = 48
            
            // To protobuffer
            var GetActivityInfoRspData = await dataUtil.objToProtobuffer(GetActivityInfoRsp, dataUtil.getPacketIDByProtoName("GetActivityInfoRsp"));
            sendPacketAsyncByName(kcpobj, "GetActivityInfoRsp", keyBuffer, GetActivityInfoRspData);

        case "SceneInitFinishReq":

            // WorldOwnerDailyTaskNotify
            sendPacketAsyncByName(kcpobj, "WorldOwnerDailyTaskNotify", keyBuffer);

            //WorldPlayerInfoNotify
            // maybe set as getplayersocialdetailrsp would work?

            const WorldPlayerInfoNotify = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/WorldPlayerInfoNotify.bin"), dataUtil.getPacketIDByProtoName("WorldPlayerInfoNotify"))
            WorldPlayerInfoNotify.playerInfoList[0].name = "Waffel | PANCAKE (PS)"
	    WorldPlayerInfoNotify.playerUidList[0] = 1
            WorldPlayerInfoNotify.playerInfoList[0].uid = 1
            // To protobuffer
            data = await dataUtil.objToProtobuffer(WorldPlayerInfoNotify, dataUtil.getPacketIDByProtoName("WorldPlayerInfoNotify"));
            sendPacketAsyncByName(kcpobj, "WorldPlayerInfoNotify", keyBuffer, data);

            //WorldDataNotify
            sendPacketAsyncByName(kcpobj, "WorldDataNotify", keyBuffer);

            //WorldOwnerBlossomBriefInfoNotify
            sendPacketAsyncByName(kcpobj, "WorldOwnerBlossomBriefInfoNotify", keyBuffer);

            //TeamResonanceChangeNotify
            sendPacketAsyncByName(kcpobj, "TeamResonanceChangeNotify", keyBuffer);

            //WorldAllRoutineTypeNotify
            sendPacketAsyncByName(kcpobj, "WorldAllRoutineTypeNotify", keyBuffer);

            // SceneForceUnlockNotify
            sendPacketAsyncByName(kcpobj, "SceneForceUnlockNotify", keyBuffer);

            //PlayerGameTimeNotify
            sendPacketAsyncByName(kcpobj, "PlayerGameTimeNotify", keyBuffer);

            //SceneTimeNotify
            sendPacketAsyncByName(kcpobj, "SceneTimeNotify", keyBuffer);

            //SceneDataNotify
            sendPacketAsyncByName(kcpobj, "SceneDataNotify", keyBuffer);

			//SceneAreaWeatherNotify
            const SceneAreaWeatherNotify = { "weatherAreaId": 3100, "climateType": 3 }

            sendPacketAsyncByName(kcpobj, "SceneAreaWeatherNotify", keyBuffer, await dataUtil.objToProtobuffer(SceneAreaWeatherNotify, dataUtil.getPacketIDByProtoName("SceneAreaWeatherNotify")))

            //AvatarEquipChangeNotify
            sendPacketAsyncByName(kcpobj, "AvatarEquipChangeNotify2", keyBuffer);

            //AvatarEquipChangeNotify1
            sendPacketAsyncByName(kcpobj, "AvatarEquipChangeNotify1", keyBuffer);

            //AvatarEquipChangeNotify2
            sendPacketAsyncByName(kcpobj, "AvatarEquipChangeNotify1", keyBuffer);

            //AvatarEquipChangeNotify3
            sendPacketAsyncByName(kcpobj, "AvatarEquipChangeNotify2", keyBuffer);

            //HostPlayerNotify
            sendPacketAsyncByName(kcpobj, "HostPlayerNotify", keyBuffer);

            //ScenePlayerInfoNotify
            // very sus
            const ScenePlayerInfoNotify = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/ScenePlayerInfoNotify.bin"), dataUtil.getPacketIDByProtoName("ScenePlayerInfoNotify"))
            ScenePlayerInfoNotify.playerInfoList[0].name = "TeTT"
            ScenePlayerInfoNotify.playerInfoList[0].onlinePlayerInfo.nickname = "TeTT"
            ScenePlayerInfoNotify.playerInfoList[0].signature = "응애에요"
	        ScenePlayerInfoNotify.playerInfoList[0].uid = 1
            ScenePlayerInfoNotify.playerInfoList[0].onlinePlayerInfo.uid = 1
            ScenePlayerInfoNotify.playerInfoList[0].onlinePlayerInfo.nameCardId = 210112
            // To protobuffer
            data = await dataUtil.objToProtobuffer(ScenePlayerInfoNotify, dataUtil.getPacketIDByProtoName("ScenePlayerInfoNotify"));
            sendPacketAsyncByName(kcpobj, "ScenePlayerInfoNotify", keyBuffer, data);

            //PlayerEnterSceneInfoNotify
            const PlayerEnterSceneInfoNotify = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/PlayerEnterSceneInfoNotify.bin"), dataUtil.getPacketIDByProtoName("PlayerEnterSceneInfoNotify"))
            PlayerEnterSceneInfoNotify.avatarEnterInfo[0].avatarEntityId = CharacterID
            // To protobuffer
            var PlayerEnterSceneInfoNotifyData = await dataUtil.objToProtobuffer(PlayerEnterSceneInfoNotify, dataUtil.getPacketIDByProtoName("PlayerEnterSceneInfoNotify"));
            sendPacketAsyncByName(kcpobj, "PlayerEnterSceneInfoNotify", keyBuffer, PlayerEnterSceneInfoNotifyData);

            //SyncTeamEntityNotify
            sendPacketAsyncByName(kcpobj, "SyncTeamEntityNotify", keyBuffer);

            //SyncScenePlayTeamEntityNotify
            sendPacketAsyncByName(kcpobj, "SyncScenePlayTeamEntityNotify", keyBuffer);

            //ScenePlayBattleInfoListNotify
            sendPacketAsyncByName(kcpobj, "ScenePlayBattleInfoListNotify", keyBuffer);

            //SceneTeamUpdateNotify
            sendPacketAsyncByName(kcpobj, "SceneTeamUpdateNotify", keyBuffer);

            //AllMarkPointNotify
            sendPacketAsyncByName(kcpobj, "AllMarkPointNotify", keyBuffer);

            //PlayerPropNotify1
            sendPacketAsyncByName(kcpobj, "PlayerPropNotify1", keyBuffer);

            //SceneInitFinishRsp
            // Response
            sendPacketAsyncByName(kcpobj, "SceneInitFinishRsp", keyBuffer);

            break;

        case "PathfindingEnterSceneReq": // PathfindingEnterSceneReq

            sendPacketAsyncByName(kcpobj, "PathfindingEnterSceneRsp", keyBuffer)


            break;

        case "EnterWorldAreaReq":

            var XD3 = WorldAreaCount > 0 ? WorldAreaCount : "";
            sendPacketAsyncByName(kcpobj, "EnterWorldAreaRsp" + XD3, keyBuffer)

            break;

        case "PostEnterSceneReq":

            sendPacketAsyncByName(kcpobj, "PostEnterSceneRsp", keyBuffer)

            break;

        case "GetShopmallDataReq":

            sendPacketAsyncByName(kcpobj, "GetShopmallDataRsp", keyBuffer)

            break;

        case "UnionCmdNotify":


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

            const PlayerSetPauseRsp = {
                retcode: 0
            }
            // Response
            // To protobuffer
            data = await dataUtil.objToProtobuffer(PlayerSetPauseRsp, dataUtil.getPacketIDByProtoName("PlayerSetPauseRsp"));
            sendPacketAsyncByName(kcpobj, "PlayerSetPauseRsp", keyBuffer, data)

            break;

        case "GetSceneAreaReq": // GetSceneAreaReq

            const GetSceneAreaRsp = {
                areaIdList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,17,18,200],
                    cityInfoList: [
                        { cityId: 1, level: 8 },
                        { cityId: 2, level: 8 },
                        { cityId: 3, level: 10 }
                    ],
                        sceneId: 3
            }
            sendPacketAsyncByName(kcpobj, "GetSceneAreaRsp", keyBuffer, await dataUtil.objToProtobuffer(GetSceneAreaRsp, dataUtil.getPacketIDByProtoName("GetSceneAreaRsp")))
            break;
			
        case "GetScenePointReq": // GetScenePointReq
            PointList = []
            for (Possible = 0; Possible < 1000; Possible++) {
                PointList[Possible] = 0 + Possible
            }
            const GetScenePointRsp = { "unlockedPointList": PointList, "sceneId": 3 }

			sendPacketAsyncByName(kcpobj, "GetScenePointRsp", keyBuffer, await dataUtil.objToProtobuffer(GetScenePointRsp, dataUtil.getPacketIDByProtoName("GetScenePointRsp")))
            break;

        case "PrivateChatReq":
            let PrivateChatNotify = {
                chatInfo: {
                    uid: 2,
                    toUid: 1,
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
                    sendPacketAsyncByName(kcpobj, "PlayerEnterSceneNotify", keyBuffer)
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
				case "pos":
                case "loc":
                    const SceneEntityAppearNotify5 = {
                        "entityList": [{
                            "motionInfo": {
                                "pos":
                                {
                                    "X": parseInt(args[1]) || 0,
                                    "Y": parseInt(args[2]) || 0,
                                    "Z": parseInt(args[3]) || 0
                                },
                                "rot":
                                {
                                    "Y": parseInt(args[4]) || 0
                                }
                            }
                        }],
                    }
                    sendPacketAsyncByName(kcpobj, "SceneEntityAppearNotify", keyBuffer, await dataUtil.objToProtobuffer(SceneEntityAppearNotify5, dataUtil.getPacketIDByProtoName("SceneEntityAppearNotify")))
                    reply = `Player Pos is now X: ${SceneEntityAppearNotify5.entityList[0].motionInfo.pos.X}
                    Y: ${SceneEntityAppearNotify5.entityList[0].motionInfo.pos.Y}
                    Z: ${SceneEntityAppearNotify5.entityList[0].motionInfo.pos.Z}
                    ROT: ${SceneEntityAppearNotify5.entityList[0].motionInfo.rot.Y}`
                    break;
                default:
                    reply = "Command doesnt seem to exist..."
            }

            PrivateChatNotify = {
                chatInfo: {
                    uid: 2,
                    toUid: 1,
                    text: reply,
                    isRead: false
                }
            }
            data = await dataUtil.objToProtobuffer(PrivateChatNotify, dataUtil.getPacketIDByProtoName("PrivateChatNotify"));
            sendPacketAsyncByName(kcpobj, "PrivateChatNotify", keyBuffer, data)

            sendPacketAsyncByName(kcpobj, "PrivateChatRsp", keyBuffer)

            break;

        case "GetScenePointReq": // GetScenePointReq

            // Response
            var XD = PointRspCount > 0 ? PointRspCount : "";
            sendPacketAsyncByName(kcpobj, "GetScenePointRsp" + XD, keyBuffer)
            PointRspCount++

            break;

        case "GetWidgetSlotReq":

            sendPacketAsyncByName(kcpobj, "GetWidgetSlotRsp", keyBuffer)

            break;

        case "GetRegionSearchReq":
            sendPacketAsyncByName(kcpobj, "RegionSearchNotify", keyBuffer)

            break;

        case "ReunionBriefInfoReq": // ReunionBriefInfoReq

            sendPacketAsyncByName(kcpobj, "ReunionBriefInfoRsp", keyBuffer)

            break;

        case "GetAllActivatedBargainDataReq": // GetAllActivatedBargainDataReq

            sendPacketAsyncByName(kcpobj, "GetAllActivatedBargainDataRsp", keyBuffer);

            break;

        case "GetPlayerFriendListReq": // GetPlayerFriendListReq
            
            const GetPlayerFriendListRsp = {
                "friendList":[
                    {
                        "uid":2,
                        "nickname":"남행자",
                        "level":59,
                        "worldLevel":8,
                        "param":1,
                        "isMpModeAvailable":true,
                        "lastActiveTime":1647154513,
                        "nameCardId":210092,
                        "showAvatarInfoList":[{"avatarId":10000058,"level":90},{"avatarId":10000052,"level":90},{"avatarId":10000002,"level":90},{"avatarId":10000037,"level":90},{"avatarId":10000049,"level":90},{"avatarId":10000054,"level":90},{"avatarId":10000051,"level":90},{"avatarId":10000046,"level":90}]
                    }
                ]
            }
            // To protobuffer
            data = await dataUtil.objToProtobuffer(GetPlayerFriendListRsp, dataUtil.getPacketIDByProtoName("GetPlayerFriendListRsp"));
            console.log(GetPlayerFriendListRsp);

            sendPacketAsyncByName(kcpobj, "GetPlayerFriendListRsp", keyBuffer, data);
            break;

        case "ClientAbilityInitFinishNotify": // ClientAbilityInitFinishNotify

            console.log("ClientAbilityInitFinishNotify")

            break;

        case "TowerAllDataReq":

            sendPacketAsyncByName(kcpobj, "TowerAllDataRsp", keyBuffer);

            break;

        case "GetShopReq":
            //console.log("XD %i", protobuff.shopType)
            //sendPacketAsyncByName(kcpobj, "GetShopRsp4", keyBuffer);

            break;

        case "GetGachaInfoReq":
            var base = "EpsHCMgBEPMGGPDgsJAGIP+ClaEGKOABMAE6E0dhY2hhU2hvd1BhbmVsX0EwMjJCvQFodHRwczovL3dlYnN0YXRpYy1zZWEubWlob3lvLmNvbS9oazRlL2V2ZW50L2UyMDE5MDkwOWdhY2hhL2luZGV4Lmh0bWw/YXV0aGtleV92ZXI9MSZzaWduX3R5cGU9MiZhdXRoX2FwcGlkPXdlYnZpZXdfZ2FjaGEmZ2FjaGFfaWQ9NmE3YzA4Y2VlOWRjMmI5ODExYTk0YjhiMzM2NTBkZmY3YjdjOTImdGltZXN0YW1wPTE2NDQ5NjkwOTNKywFodHRwczovL3dlYnN0YXRpYy1zZWEubWlob3lvLmNvbS9oazRlL2V2ZW50L2UyMDE5MDkwOWdhY2hhL2luZGV4Lmh0bWw/YXV0aGtleV92ZXI9MSZzaWduX3R5cGU9MiZhdXRoX2FwcGlkPXdlYnZpZXdfZ2FjaGEmaW5pdF90eXBlPTIwMCZnYWNoYV9pZD02YTdjMDhjZWU5ZGMyYjk4MTFhOTRiOGIzMzY1MGRmZjdiN2M5MiZ0aW1lc3RhbXA9MTY0NDk2OTA5M1IaVUlfVGFiX0dhY2hhU2hvd1BhbmVsX0EwMjJY4AFgCmj/////D3D/////D3joB4IBvQFodHRwczovL3dlYnN0YXRpYy1zZWEubWlob3lvLmNvbS9oazRlL2V2ZW50L2UyMDE5MDkwOWdhY2hhL2luZGV4Lmh0bWw/YXV0aGtleV92ZXI9MSZzaWduX3R5cGU9MiZhdXRoX2FwcGlkPXdlYnZpZXdfZ2FjaGEmZ2FjaGFfaWQ9NmE3YzA4Y2VlOWRjMmI5ODExYTk0YjhiMzM2NTBkZmY3YjdjOTImdGltZXN0YW1wPTE2NDQ5NjkwOTOKAcsBaHR0cHM6Ly93ZWJzdGF0aWMtc2VhLm1paG95by5jb20vaGs0ZS9ldmVudC9lMjAxOTA5MDlnYWNoYS9pbmRleC5odG1sP2F1dGhrZXlfdmVyPTEmc2lnbl90eXBlPTImYXV0aF9hcHBpZD13ZWJ2aWV3X2dhY2hhJmluaXRfdHlwZT0yMDAmZ2FjaGFfaWQ9NmE3YzA4Y2VlOWRjMmI5ODExYTk0YjhiMzM2NTBkZmY3YjdjOTImdGltZXN0YW1wPTE2NDQ5NjkwOTOaAR5VSV9HQUNIQV9TSE9XX1BBTkVMX0EwMjJfVElUTEUStgcIrQIQ1QYYoNKckQYg79yKkgYo3wEwAToTR2FjaGFTaG93UGFuZWxfQTA3M0K9AWh0dHBzOi8vd2Vic3RhdGljLXNlYS5taWhveW8uY29tL2hrNGUvZXZlbnQvZTIwMTkwOTA5Z2FjaGEvaW5kZXguaHRtbD9hdXRoa2V5X3Zlcj0xJnNpZ25fdHlwZT0yJmF1dGhfYXBwaWQ9d2Vidmlld19nYWNoYSZnYWNoYV9pZD01MTFmMzMwMzJmMTJjODVkOGY4MDkyMzQxY2JhNjhjMzEyYjUxMiZ0aW1lc3RhbXA9MTY0NDk2OTAwNUrLAWh0dHBzOi8vd2Vic3RhdGljLXNlYS5taWhveW8uY29tL2hrNGUvZXZlbnQvZTIwMTkwOTA5Z2FjaGEvaW5kZXguaHRtbD9hdXRoa2V5X3Zlcj0xJnNpZ25fdHlwZT0yJmF1dGhfYXBwaWQ9d2Vidmlld19nYWNoYSZpbml0X3R5cGU9MzAxJmdhY2hhX2lkPTUxMWYzMzAzMmYxMmM4NWQ4ZjgwOTIzNDFjYmE2OGMzMTJiNTEyJnRpbWVzdGFtcD0xNjQ0OTY5MDA1UhpVSV9UYWJfR2FjaGFTaG93UGFuZWxfQTA3M1jfAWAKaP////8PcP////8PeI5OggG9AWh0dHBzOi8vd2Vic3RhdGljLXNlYS5taWhveW8uY29tL2hrNGUvZXZlbnQvZTIwMTkwOTA5Z2FjaGEvaW5kZXguaHRtbD9hdXRoa2V5X3Zlcj0xJnNpZ25fdHlwZT0yJmF1dGhfYXBwaWQ9d2Vidmlld19nYWNoYSZnYWNoYV9pZD01MTFmMzMwMzJmMTJjODVkOGY4MDkyMzQxY2JhNjhjMzEyYjUxMiZ0aW1lc3RhbXA9MTY0NDk2OTAwNYoBywFodHRwczovL3dlYnN0YXRpYy1zZWEubWlob3lvLmNvbS9oazRlL2V2ZW50L2UyMDE5MDkwOWdhY2hhL2luZGV4Lmh0bWw/YXV0aGtleV92ZXI9MSZzaWduX3R5cGU9MiZhdXRoX2FwcGlkPXdlYnZpZXdfZ2FjaGEmaW5pdF90eXBlPTMwMSZnYWNoYV9pZD01MTFmMzMwMzJmMTJjODVkOGY4MDkyMzQxY2JhNjhjMzEyYjUxMiZ0aW1lc3RhbXA9MTY0NDk2OTAwNZIBBggBEgKcCJIBCggCEgaICJQIoAiaAR5VSV9HQUNIQV9TSE9XX1BBTkVMX0EwNTJfVElUTEWiAQKcCBLJBwiuAhDpBhig0pyRBiDv3IqSBijfATABOhNHYWNoYVNob3dQYW5lbF9BMDc1Qr0BaHR0cHM6Ly93ZWJzdGF0aWMtc2VhLm1paG95by5jb20vaGs0ZS9ldmVudC9lMjAxOTA5MDlnYWNoYS9pbmRleC5odG1sP2F1dGhrZXlfdmVyPTEmc2lnbl90eXBlPTImYXV0aF9hcHBpZD13ZWJ2aWV3X2dhY2hhJmdhY2hhX2lkPTI4OWVmMTM2ODU4Y2E5MTAzYzc5NzA1MGNjM2MxZDZhZDA1YjlkJnRpbWVzdGFtcD0xNjQ0OTY5MDU5SssBaHR0cHM6Ly93ZWJzdGF0aWMtc2VhLm1paG95by5jb20vaGs0ZS9ldmVudC9lMjAxOTA5MDlnYWNoYS9pbmRleC5odG1sP2F1dGhrZXlfdmVyPTEmc2lnbl90eXBlPTImYXV0aF9hcHBpZD13ZWJ2aWV3X2dhY2hhJmluaXRfdHlwZT0zMDImZ2FjaGFfaWQ9Mjg5ZWYxMzY4NThjYTkxMDNjNzk3MDUwY2MzYzFkNmFkMDViOWQmdGltZXN0YW1wPTE2NDQ5NjkwNTlSGlVJX1RhYl9HYWNoYVNob3dQYW5lbF9BMDc1WN8BYApo/////w9w/////w94jE6CAb0BaHR0cHM6Ly93ZWJzdGF0aWMtc2VhLm1paG95by5jb20vaGs0ZS9ldmVudC9lMjAxOTA5MDlnYWNoYS9pbmRleC5odG1sP2F1dGhrZXlfdmVyPTEmc2lnbl90eXBlPTImYXV0aF9hcHBpZD13ZWJ2aWV3X2dhY2hhJmdhY2hhX2lkPTI4OWVmMTM2ODU4Y2E5MTAzYzc5NzA1MGNjM2MxZDZhZDA1YjlkJnRpbWVzdGFtcD0xNjQ0OTY5MDU5igHLAWh0dHBzOi8vd2Vic3RhdGljLXNlYS5taWhveW8uY29tL2hrNGUvZXZlbnQvZTIwMTkwOTA5Z2FjaGEvaW5kZXguaHRtbD9hdXRoa2V5X3Zlcj0xJnNpZ25fdHlwZT0yJmF1dGhfYXBwaWQ9d2Vidmlld19nYWNoYSZpbml0X3R5cGU9MzAyJmdhY2hhX2lkPTI4OWVmMTM2ODU4Y2E5MTAzYzc5NzA1MGNjM2MxZDZhZDA1YjlkJnRpbWVzdGFtcD0xNjQ0OTY5MDU5kgEICAESBMVpqnGSAQ4IAhIKjVmAYd9ow3C4eJoBHlVJX0dBQ0hBX1NIT1dfUEFORUxfQTAyMV9USVRMRaIBBMVpqnGqAQKAYcABAsgBARK2BwiQAxDfBhig0pyRBiDv3IqSBijfATABOhNHYWNoYVNob3dQYW5lbF9BMDc0Qr0BaHR0cHM6Ly93ZWJzdGF0aWMtc2VhLm1paG95by5jb20vaGs0ZS9ldmVudC9lMjAxOTA5MDlnYWNoYS9pbmRleC5odG1sP2F1dGhrZXlfdmVyPTEmc2lnbl90eXBlPTImYXV0aF9hcHBpZD13ZWJ2aWV3X2dhY2hhJmdhY2hhX2lkPWQxMDg1NmEyZjFmMzFlNTgxNTA2YjRmYTU0OTY5YWQzNDNiMDViJnRpbWVzdGFtcD0xNjQ0OTY5MDMzSssBaHR0cHM6Ly93ZWJzdGF0aWMtc2VhLm1paG95by5jb20vaGs0ZS9ldmVudC9lMjAxOTA5MDlnYWNoYS9pbmRleC5odG1sP2F1dGhrZXlfdmVyPTEmc2lnbl90eXBlPTImYXV0aF9hcHBpZD13ZWJ2aWV3X2dhY2hhJmluaXRfdHlwZT0zMDEmZ2FjaGFfaWQ9ZDEwODU2YTJmMWYzMWU1ODE1MDZiNGZhNTQ5NjlhZDM0M2IwNWImdGltZXN0YW1wPTE2NDQ5NjkwMzNSGlVJX1RhYl9HYWNoYVNob3dQYW5lbF9BMDc0WN8BYApo/////w9w/////w94jU6CAb0BaHR0cHM6Ly93ZWJzdGF0aWMtc2VhLm1paG95by5jb20vaGs0ZS9ldmVudC9lMjAxOTA5MDlnYWNoYS9pbmRleC5odG1sP2F1dGhrZXlfdmVyPTEmc2lnbl90eXBlPTImYXV0aF9hcHBpZD13ZWJ2aWV3X2dhY2hhJmdhY2hhX2lkPWQxMDg1NmEyZjFmMzFlNTgxNTA2YjRmYTU0OTY5YWQzNDNiMDViJnRpbWVzdGFtcD0xNjQ0OTY5MDMzigHLAWh0dHBzOi8vd2Vic3RhdGljLXNlYS5taWhveW8uY29tL2hrNGUvZXZlbnQvZTIwMTkwOTA5Z2FjaGEvaW5kZXguaHRtbD9hdXRoa2V5X3Zlcj0xJnNpZ25fdHlwZT0yJmF1dGhfYXBwaWQ9d2Vidmlld19nYWNoYSZpbml0X3R5cGU9MzAxJmdhY2hhX2lkPWQxMDg1NmEyZjFmMzFlNTgxNTA2YjRmYTU0OTY5YWQzNDNiMDViJnRpbWVzdGFtcD0xNjQ0OTY5MDMzkgEGCAESAp4IkgEKCAISBogIlAigCJoBHlVJX0dBQ0hBX1NIT1dfUEFORUxfQTA1M19USVRMRaIBAp4IEvwDCGQg/////w8o4AEwAToTR2FjaGFTaG93UGFuZWxfQTAxNkJOaHR0cHM6Ly93ZWJzdGF0aWMubWlob3lvLmNvbS9oazRlL2V2ZW50L2UyMDE5MDkwOWdhY2hhL2luZGV4Lmh0bWwjL25ld2JpZWdhY2hhSoIBaHR0cHM6Ly93ZWJzdGF0aWMubWlob3lvLmNvbS9oazRlL2V2ZW50L2UyMDE5MDkwOWdhY2hhL2luZGV4Lmh0bWw/YXV0aGtleV92ZXI9MSZzaWduX3R5cGU9MiZhdXRoX2FwcGlkPXdlYnZpZXdfZ2FjaGEmaW5pdF90eXBlPTEwMFIaVUlfVGFiX0dhY2hhU2hvd1BhbmVsX0EwMTZY4AFgCHAUeI9OggFSaHR0cHM6Ly93ZWJzdGF0aWMtc2VhLm1paG95by5jb20vaGs0ZS9ldmVudC9lMjAxOTA5MDlnYWNoYS9pbmRleC5odG1sIy9uZXdiaWVnYWNoYYoBhgFodHRwczovL3dlYnN0YXRpYy1zZWEubWlob3lvLmNvbS9oazRlL2V2ZW50L2UyMDE5MDkwOWdhY2hhL2luZGV4Lmh0bWw/YXV0aGtleV92ZXI9MSZzaWduX3R5cGU9MiZhdXRoX2FwcGlkPXdlYnZpZXdfZ2FjaGEmaW5pdF90eXBlPTEwMBj95tDaBQ==";
            const GetGachaInfoRsp = await dataUtil.dataToProtobuffer(Buffer.from(base,'base64'), dataUtil.getPacketIDByProtoName("GetGachaInfoRsp"))
            
            GetGachaInfoRsp.gachaInfoList[1].tenCostItemNum = 0
            GetGachaInfoRsp.gachaInfoList[1].costItemNum = 0

            console.log(GetGachaInfoRsp);
            
            // To protobuffer
            data = await dataUtil.objToProtobuffer(GetGachaInfoRsp, dataUtil.getPacketIDByProtoName("GetGachaInfoRsp"));
            sendPacketAsyncByName(kcpobj, "GetGachaInfoRsp", keyBuffer, data)
            break;

        case "DoGachaReq":
            const DoGachaRsp = await dataUtil.dataToProtobuffer(fs.readFileSync("./bin/DoGachaRsp.bin"), dataUtil.getPacketIDByProtoName("DoGachaRsp"))
            DoGachaRsp.tenCostItemNum = 0
            
            for(let x = 0; x<10; x++) {
                DoGachaRsp.gachaItemList[x] = {
                        transferItems: [],
                        tokenItemList: [ { itemId: 222, count: 15 } ],
                        gachaItem_: { itemId: GachaRspValue+x, count: 1 }
                }
            }

            // To protobuffer

            console.log(DoGachaRsp);

            data = await dataUtil.objToProtobuffer(DoGachaRsp, dataUtil.getPacketIDByProtoName("DoGachaRsp"));
            sendPacketAsyncByName(kcpobj, "DoGachaRsp", keyBuffer, data)
            break;
            
        case "SetPlayerSignatureReq":
            GachaRspValue = parseInt(protobuff.signature)
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
        case "QueryPathReq":
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
						console.log(dataBuffer);
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
