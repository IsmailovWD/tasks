import { ConfigService } from '@nestjs/config';
export declare class TelegramService {
    private config;
    private token;
    private chatId;
    private logger;
    constructor(config: ConfigService);
    sendMessage(text: string): Promise<void>;
}
