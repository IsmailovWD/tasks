"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var TelegramService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
let TelegramService = TelegramService_1 = class TelegramService {
    config;
    token;
    chatId;
    logger = new common_1.Logger(TelegramService_1.name);
    constructor(config) {
        this.config = config;
        this.token = this.config.get('TELEGRAM_BOT_TOKEN') || '';
        this.chatId = this.config.get('TELEGRAM_CHAT_ID') || '';
    }
    async sendMessage(text) {
        if (!this.token || !this.chatId) {
            this.logger.warn('Telegram token or chat id not set; skipping sendMessage');
            return;
        }
        const url = `https://api.telegram.org/bot${this.token}/sendMessage`;
        try {
            await axios_1.default.post(url, { chat_id: this.chatId, text, parse_mode: 'HTML' });
        }
        catch (err) {
            this.logger.error('Failed to send telegram message', err.message);
        }
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = TelegramService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TelegramService);
//# sourceMappingURL=telegram.service.js.map