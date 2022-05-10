import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';

@Injectable()
export class S3Service {
  s3 = new aws.S3({
    region: 'ap-northeast-1',
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    signatureVersion: 'v4',
  });

  async upload(name: string, type: string) {
    const fileParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: name,
      Expires: 600,
      ContentType: type,
      ACL: 'public-read',
    };
    return await this.s3.getSignedUrlPromise('putObject', fileParams);
  }
}
