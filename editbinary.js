// File reading
const fs = require("fs");
const protobuf = require("protobufjs");

// Util
const dataUtil = require("./util/dataUtil");

var moreSliced = fs.readFileSync("./bin/AchievementAllDataNotify.bin");


var protoName = dataUtil.getProtoNameByPacketID(dataUtil.getPacketIDByProtoName("AchievementAllDataNotify"));


protobuf.load("./proto/" + protoName + ".proto", function(err, root) {
    const testMessage = root.lookup(protoName);
    const message = testMessage.decode(moreSliced);
    console.log(message)
    
});



