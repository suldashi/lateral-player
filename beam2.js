(async() => {
    const beamcoder = require("beamcoder");
    const fs = require("fs");
    let filters = beamcoder.filters();
    fs.writeFileSync("out.txt", Object.values(filters).map(x => x.description+"\n"));
})()
