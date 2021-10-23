import { Got } from "got";
interface IInbox {
    content: string;
}
interface IMessage {
    URL: string;
    Email: string;
    Id: string;
}
export declare class GmailnatorClient {
    CSRF: string;
    HttpClient: Got;
    init(): Promise<void>;
    GetInbox(Email: string): Promise<IInbox[]>;
    GetMessage(Message: IMessage): Promise<string>;
}
export {};
//# sourceMappingURL=index.d.ts.map