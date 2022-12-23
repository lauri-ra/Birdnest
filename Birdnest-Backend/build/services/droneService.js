"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml2js_1 = require("xml2js");
const parseToJson = (xml) => {
    (0, xml2js_1.parseString)(xml, (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(result);
        }
    });
};
exports.default = { parseToJson };
