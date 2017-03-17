console.log("Phonetic-reduce");

const natural = require('natural');
const fs = require('fs');


// load file with list of strings
// process with natural lib to generate phonetic equivalents
// output to file

if(process.argv.length <= 3) {
    console.log("Usage: " + __filename + " <num characters> <filename>");
    process.exit(-1);

}

var params = process.argv;
console.log(params);

var filename = params[3];
var num = params[2];

// Synchronous read
var data = fs.readFileSync(filename);
var dataStr = data.toString();
var arStr = dataStr.split('\r\n');
console.log(arStr);

var arProcessed = [];
var phonetic = natural.Metaphone;

for(var ii=0; ii<arStr.length; ii+=1) {
    if (arStr[ii] == '')
        continue;
    var strProcessed = phonetic.process(arStr[ii].replace(/ /g,''), num);
    //console.log(strProcessed);
    var ob = { "str": arStr[ii],
                "phonetic": strProcessed};
    console.log(ob);
    arProcessed.push(ob);

}
    
var outStr = JSON.stringify(arProcessed);
fs.writeFileSync(filename+".phon", outStr);


//console.log(data);
console.log("Exiting");
