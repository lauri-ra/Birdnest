"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const xml2js_1 = require("xml2js");
const router = express_1.default.Router();
router.get('/', (_request, response) => {
    const stuff = axios_1.default.get('http://assignments.reaktor.com/birdnest/drones');
    (0, xml2js_1.parseString)(stuff, (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            response.send(result);
        }
    });
});
exports.default = router;
