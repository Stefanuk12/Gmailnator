import { Got } from "got";
export interface IInbox {
    content: string;
}
export interface IMessage {
    URL: string;
    Email: string;
    Id: string;
}
export default class GmailnatorClient {
    CSRF: string;
    HttpClient: Got;
    init(): Promise<void>;
    GetInbox(Email: string): Promise<IInbox[]>;
    GetMessage(Message: IMessage): Promise<string>;
}
//# sourceMappingURL=index.d.ts.map