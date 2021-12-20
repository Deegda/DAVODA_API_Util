import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ClientConfiguration, PutObjectRequest } from 'aws-sdk/clients/s3';
import { CONFIG_CONNECTION_OPTIONS } from '../constant';

@Injectable()
export class S3Service {
    #S3Client: AWS.S3;

    constructor(
        @Inject(CONFIG_CONNECTION_OPTIONS)
        private readonly _options: ClientConfiguration
    ) {
        this.#S3Client = new AWS.S3(this._options);
    }

    #createBucketURL({ Bucket, Key }: PutObjectRequest) {
        return `https://${Bucket}.s3-${this.#S3Client.config.region}.amazonaws.com/${Key}`;
    }

    async upload(params: PutObjectRequest) {
        return this.#S3Client
            .putObject(params)
            .promise()
            .then(() => this.#createBucketURL(params))
            .catch(() => {
                throw new BadRequestException();
            });
    }
}
