import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'main-sls-examples',
  frameworkVersion: '3',
  plugins: ['serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'ap-northeast-1',
    logRetentionInDays: 5,
    architecture: 'arm64',
    timeout: 29,
    // deploymentBucket: {
    //   serverSideEncryption: 'AES256',
    // },
  },
  package: {
    individually: true,
  },
  functions: {
    index: {
      handler: 'dist/app/main/handler.MainHandler',
      // url: true,
      // logRetentionInDays: 1,
      // timeout: 29,
      // architecture: 'x86_64',
      events: [
        {
          http: {
            method: 'ANY',
            path: '/',
          },
        },
        {
          http: {
            method: 'ANY',
            path: '{proxy+}',
          },
        },
      ],
    },
  },
  custom: {
    'serverless-offline': {
      httpPort: 3200,
    },
  },
};

module.exports = serverlessConfiguration;
