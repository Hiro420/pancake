// File reading
const fs = require("fs");
const protobuf = require("protobufjs");

// Util
const dataUtil = require("./util/dataUtil");

var moreSliced = fs.readFileSync("./bin/CodexDataFullNotify.bin");


var protoName = dataUtil.getProtoNameByPacketID(dataUtil.getPacketIDByProtoName("CodexDataFullNotify"));


protobuf.load("./proto/" + protoName + ".proto", function(err, root) {
    const testMessage = root.lookup(protoName);
    const message = testMessage.decode(moreSliced);
    console.log(message)
    
});



