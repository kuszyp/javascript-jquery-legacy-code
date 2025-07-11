// src/Lexer.js

const tokens = require("./tokenTypes");
const Token = require("./Token");

module.exports = class {
    constructor(input) {
        this.input = input;
        this.position = 0; // current pointer position
        this.nextPosition = 1; // next pointer position
        this.char = input[0] || ""; // first characer from the input
    }

    nextToken() {
        let token = null;

        if (this.char === ";") {
            token = new Token(tokens.SEMI, this.char);
        } else if (this.#charIsNumber()) {
            return new Token(tokens.INT, this.#readNumber());
        } else {
            token = new Token(tokens.ILLEGAL, this.char);
        }

        this.#advanceChar();
        return token;
    }

    #charIsNumber() {
        return /^-?\d+$/.test(this.char);
    }

    #advanceChar() {
        if (this.nextPosition >= this.input.length) {
            this.char = "";
        } else {
            this.char = this.input[this.nextPosition];
        }

        this.position = this.nextPosition;
        this.nextPosition += 1;
    }

    #readNumber() {
        let start = this.position;

        while (this.#charIsNumber()) {
            this.#advanceChar();
        }

        return this.input.substring(start, this.position);
    }

    #peekChar() {
        if (this.nextPosition >= this.input.length) {
            return null;
        }
        return this.input[this.nextPosition];
    }
};
