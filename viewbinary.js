// File reading
const fs = require("fs");
const protobuf = require("protobufjs");

// Util
const dataUtil = require("./util/dataUtil");

var protoname = "CalcWeaponUpgradeReturnItemsRsp"

var moreSliced = fs.readFileSync("./bin_old/"+protoname+".bin");
var protoName = dataUtil.getProtoNameByPacketID(dataUtil.getPacketIDByProtoName(protoname));


protobuf.load("./proto_old/" + protoName + ".proto", function(err, root) {
    const testMessage = root.lookup(protoName);
    const message = testMessage.decode(moreSliced);
    console.log(message)
    
});



