// File reading
const fs = require("fs");
const protobuf = require("protobufjs");

// Util
const dataUtil = require("./util/dataUtil");

var protoname = "SceneEntityAppearNotify"

var moreSliced = fs.readFileSync("./bin/"+protoname+".bin");
var protoName = dataUtil.getProtoNameByPacketID(dataUtil.getPacketIDByProtoName("SceneEntityAppearNotify"));


protobuf.load("./proto/" + protoName + ".proto", function(err, root) {
    const testMessage = root.lookup(protoName);
    const message = testMessage.decode(moreSliced);
    console.log(message)
    
});



