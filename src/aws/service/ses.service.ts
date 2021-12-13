import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ClientConfiguration, SendEmailRequest } from 'aws-sdk/clients/ses';

import { CONFIG_CONNECTION_OPTIONS } from '../constant';

@Injectable()
export class SESService {
    #SESClient: AWS.SES;

    constructor(
        @Inject(CONFIG_CONNECTION_OPTIONS)
        private readonly _options: ClientConfiguration
    ) {
        this.#SESClient = new AWS.SES(this._options);
    }

    async sendEmail(params: SendEmailRequest) {
        return this.#SESClient.sendEmail(params).promise();
    }
}
