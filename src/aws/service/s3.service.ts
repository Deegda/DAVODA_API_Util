import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PutObjectRequest, S3, S3ClientConfig } from '@aws-sdk/client-s3';
import { CONFIG_CONNECTION_OPTIONS } from '../constant';

@Injectable()
export class S3Service {
    #S3Client: S3;

    constructor(
        @Inject(CONFIG_CONNECTION_OPTIONS)
        private readonly _options: S3ClientConfig
    ) {
        this.#S3Client = new S3(this._options);
    }

    #createBucketURL({ Bucket, Key }: PutObjectRequest) {
        return `https://${Bucket}.s3-${this.#S3Client.config.region}.amazonaws.com/${Key}`;
    }

    async upload(params: PutObjectRequest) {
        return this.#S3Client
            .putObject(params)
            .then(() => this.#createBucketURL(params))
            .catch(() => {
                throw new BadRequestException();
            });
    }
}
