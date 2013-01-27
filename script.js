var fs = require("fs");
var util = require("util");

var symbols = JSON.parse(fs.readFileSync("smallwave-rtags.json").toString());

function onload()
{
    // console.log(util.inspect(symbols, false, null)); //JSON.stringify(symbols));

    var src = fs.readFileSync("main.cpp").toString();
    // var src = document.getElementById("src").innerHTML;
    // console.log("Foo " + src);
    var symbolIndex = 0;
    var srcIndex = 0;
    var out = "";
    function processSymbol(symbol)
    {
        if (srcIndex < symbol.location.offset) {
            out += src.substring(srcIndex, symbol.location.offset).replace(/ /g, "&nbsp;");
            out += "<a id=\"" + symbol.location.offset + "\"";
            if (symbol.target) {
                out += " href=\"" + (symbol.target.file ? symbol.target.file + ".html#" : "#") + symbol.target.offset + "\"";
            }
            out += ">";
            out += src.substr(symbol.location.offset, symbol.location.length).replace(/ /g, "&nbsp;");
            out += "</a>";
            srcIndex = symbol.location.offset + symbol.location.length;
        }
    }
    for (var file in symbols) {
        symbols[file].forEach(processSymbol);
    }
    out += src.substr(srcIndex).replace(/ /g, "&nbsp;");
    // for (var i=0; i<symbols["
    // while (i < src.length) {
    //     if (

    // }
    out = out.replace(/\n/g, "<br/>\n");
    // out = out.replace(/ /g, "&nbsp;");
    console.log("<html>\n" + out + "</html>");
}
onload();

// var src = "void foo()\n"
//         + "{\n"
// + "}\n"


// int main()
// {
//     foo();
//     return 0;
// }
