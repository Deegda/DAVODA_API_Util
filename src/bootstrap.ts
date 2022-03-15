import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { LoggingInterceptor } from '@algoan/nestjs-logging-interceptor';
import { Logger } from 'nestjs-pino';
import ServerlessExpress from '@vendia/serverless-express';
import express from 'express';

let cachedServer: any;

export const bootstrapServer = async (module: any) => {
    if (!cachedServer) {
        const expressApp = express();

        const app = await NestFactory.create(module, new ExpressAdapter(expressApp));
        app.useLogger(app.get(Logger));
        app.useGlobalInterceptors(new LoggingInterceptor());
        app.useGlobalPipes(new ValidationPipe());
        app.enableCors({
            origin: '*'
        });

        await app.init();

        cachedServer = ServerlessExpress({ app: expressApp });
    }

    return cachedServer;
};
