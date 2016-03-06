"use strict";

const fs = require("fs");
const Ajv = require("ajv");
const ajv = Ajv({ allErrors: true });

const schema = JSON.parse(fs.readFileSync("./schema_seebis.json", "utf-8"));
const files = fs.readdirSync("./data");

let valid = true;
files.forEach(function(file) {
    // ignore hidden files
    if (file.charAt(0) === ".") {
        return;
    }

    let data = JSON.parse(fs.readFileSync("./data/" + file, "utf-8"));
    let isValid = ajv.validate(schema, data);

    if (isValid) {
        console.info(file, "is valid.");
    } else {
        console.error("Invalid JSON:", file);
        console.error(ajv.errors);
    }

    valid = valid && isValid;
});

process.exit(valid === true ? 0 : 1);