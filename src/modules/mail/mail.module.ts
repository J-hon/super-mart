import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerConfigService } from 'src/config/mailer.config';

@Module({
  imports: [MailerModule.forRootAsync({ useClass: MailerConfigService })],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
