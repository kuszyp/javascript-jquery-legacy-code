// src/index.js

const Lexer = require("./Lexer");
const types = require("./TokenType");
const fs = require("fs");
const path = require("path");

const filePath = "./script.txt";
let data = "";

try {
    data = fs.readFileSync(filePath, "utf8");
} catch (err) {
    console.error("Error reading file:", err);
}

console.log("File content:", data);

const lxr = new Lexer(data);
let tokens = new Array();
let eof = false;

while (!eof) {
    let token = lxr.nextToken();
    tokens.push(token);

    if (token.type == types.ILLEGAL) {
        eof = true;
    }
}

console.log("Tokenized script:", tokens);
