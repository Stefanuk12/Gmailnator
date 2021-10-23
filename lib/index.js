"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const got_1 = __importDefault(require("got"));
const setCookie = __importStar(require("set-cookie-parser"));
// Main Gmailnator Client
class GmailnatorClient {
    constructor() {
        // Vars
        this.CSRF = "";
        this.HttpClient = got_1.default.extend();
    }
    // Init (Constructor)
    async init() {
        // Make initial request to website
        const Response = await got_1.default("https://www.gmailnator.com", {
            https: {
                rejectUnauthorized: false
            }
        });
        const ResponseCookies = setCookie.parse(Response);
        // Vars
        const CSRF = ResponseCookies.find(object => object.name == "csrf_gmailnator_cookie")?.value;
        // Make sure has CSRF
        if (!CSRF) {
            const error = new Error("Could not get CSRF");
            throw (error);
        }
        // Set
        this.CSRF = CSRF;
        this.HttpClient = got_1.default.extend({
            https: {
                rejectUnauthorized: false
            },
            headers: {
                Cookie: `csrf_gmailnator_cookie=${CSRF}`,
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": undefined
            }
        });
    }
    // Gets the inbox
    async GetInbox(Email) {
        // Vars
        const Body = `csrf_gmailnator_token=${encodeURIComponent(this.CSRF)}&action=LoadMailList&Email_address=${encodeURIComponent(Email)}`;
        // Send Request
        const Response = await this.HttpClient.post("https://www.gmailnator.com/mailbox/mailboxquery", {
            body: Body,
            responseType: "json"
        });
        //
        return Response.body;
    }
    // Returns the email of a message
    async GetMessage(Message) {
        // Vars
        const Body = `csrf_gmailnator_token=${this.CSRF}&action=get_message&message_id=${Message.Id}&email=${Message.Email}`;
        // Send Request
        const Response = await this.HttpClient.post("https://www.gmailnator.com/mailbox/get_single_message/", {
            body: Body,
        });
        // Return body
        return Response.body;
    }
}
exports.default = GmailnatorClient;
//# sourceMappingURL=index.js.map