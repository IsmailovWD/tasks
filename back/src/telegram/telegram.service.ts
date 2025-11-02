import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TelegramService {
  private token: string;
  private chatId: string;
  private logger = new Logger(TelegramService.name);

  constructor(private config: ConfigService) {
    this.token = this.config.get('TELEGRAM_BOT_TOKEN') || '';
    this.chatId = this.config.get('TELEGRAM_CHAT_ID') || '';
  }

  async sendMessage(text: string) {
    if (!this.token || !this.chatId) {
      this.logger.warn(
        'Telegram token or chat id not set; skipping sendMessage',
      );
      return;
    }
    const url = `https://api.telegram.org/bot${this.token}/sendMessage`;
    try {
      await axios.post(url, { chat_id: this.chatId, text, parse_mode: 'HTML' });
    } catch (err) {
      this.logger.error(
        'Failed to send telegram message',
        (err as any).message,
      );
    }
  }
}
