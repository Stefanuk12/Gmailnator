// Dependencies
import got, { Got } from "got"
import * as setCookie from "set-cookie-parser"

// Inbox
interface IInbox {
    content: string
}

// Message Inbox
interface IMessage {
    URL: string
    Email: string
    Id: string
}

// Main Gmailnator Client
export class GmailnatorClient {
    // Vars
    CSRF: string = ""
    HttpClient: Got = got.extend()

    // Init (Constructor)
    async init(){
        // Make initial request to website
        const Response = await got("https://www.gmailnator.com", {
            https: {
                rejectUnauthorized: false
            }
        })
        const ResponseCookies = setCookie.parse(Response)   

        // Vars
        const CSRF = ResponseCookies.find(object => object.name == "csrf_gmailnator_cookie")?.value

        // Make sure has CSRF
        if (!CSRF){
            const error = new Error("Could not get CSRF")
            throw(error)
        }

        // Set
        this.CSRF = CSRF
        this.HttpClient = got.extend({
            https: {
                rejectUnauthorized: false
            },
            headers: {
                Cookie: `csrf_gmailnator_cookie=${CSRF}`,
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": undefined
            }
        })
    }

    // Gets the inbox
    async GetInbox(Email: string){
        // Vars
        const Body = `csrf_gmailnator_token=${encodeURIComponent(this.CSRF)}&action=LoadMailList&Email_address=${encodeURIComponent(Email)}`

        // Send Request
        const Response = await this.HttpClient.post("https://www.gmailnator.com/mailbox/mailboxquery", {
            body: Body,
            responseType: "json"
        })

        //
        return <IInbox[]>Response.body
    }

    // Returns the email of a message
    async GetMessage(Message: IMessage){
        // Vars
        const Body = `csrf_gmailnator_token=${this.CSRF}&action=get_message&message_id=${Message.Id}&email=${Message.Email}`

        // Send Request
        const Response = await this.HttpClient.post("https://www.gmailnator.com/mailbox/get_single_message/", {
            body: Body,
        })

        // Return body
        return Response.body
    }
}