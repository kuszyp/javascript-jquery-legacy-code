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
        this.#skipWhitespace();

        if (this.char === ";") {
            token = new Token(tokens.SEMI, this.char);
        } else if (this.char === "+") {
            token = new Token(tokens.PLUS, this.char);
        } else if (this.char === "-") {
            token = new Token(tokens.MINUS, this.char);
        } else if (this.char === "*") {
            token = new Token(tokens.MULTIPLY, this.char);
        } else if (this.char === "/") {
            token = new Token(tokens.DIVIDE, this.char);
        } else if (this.char === "=") {
            token = this.#chooseEqualToken();
            // token = new Token(tokens.ASSIGN, this.char);
        } else if (this.#charIsNumber()) {
            return new Token(tokens.INT, this.#readNumber());
        } else if (this.#charIsLetter()) {
            return new Token(tokens.IDENT, this.#readIdentifier());
        } else {
            token = new Token(tokens.ILLEGAL, this.char);
        }

        this.#advanceChar();
        return token;
    }

    #charIsNumber() {
        return /^-?\d+$/.test(this.char);
    }

    #charIsLetter() {
        return this.char.match(/[a-z]/i);
    }

    #chooseEqualToken() {
        if (this.#peekChar() == "=") {
            this.#advanceChar();
            return new Token(tokens.EQUAL, "==");
        }

        return new Token(tokens.ASSIGN, "=");
    }

    /**
     * Moves the pointer to the next character in the input
     * (updates this.position, this.nextPosition and this.char value)
     */
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

    #readIdentifier() {
        let start = this.position;
        while (this.#charIsLetter()) {
            this.#advanceChar();
        }
        return this.input.substring(start, this.position);
    }

    /**
     * Returns next character in the input without changing the position
     * Returns null when we reach the end of the input
     */
    #peekChar() {
        if (this.nextPosition >= this.input.length) {
            return null;
        }
        return this.input[this.nextPosition];
    }

    #skipWhitespace() {
        while (
            this.char === " " ||
            this.char === "\t" ||
            this.char === "\n" ||
            this.char === "\r"
        ) {
            this.#advanceChar();
        }
    }
};
