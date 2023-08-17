import { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'image-sls-examples',
  frameworkVersion: '3',
  plugins: [
    'serverless-offline',
    'serverless-with-cloudfront',
    './dist/etc/deploy-history/index.js',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'ap-northeast-1',
    architecture: 'arm64',
    timeout: 29,
    profile: 'default',
    logRetentionInDays: 3,
    // deploymentBucket: {
    //   name: 'sls-deploy-bucket',
    // },
    apiGateway: {
      apiKeys: [
        {
          name: 'image-sls-examples-api-key',
          // enabled: false,
          description: 'custom-image-api-key',
        },
      ],
      // apiKeySourceType: 'HEADER',
      binaryMediaTypes: ['*/*'],
    },
  },
  functions: {
    index: {
      handler: 'dist/app/custom/handler.CustomHandler',
      package: {
        individually: true,
      },
      events: [
        {
          http: {
            method: 'ANY',
            path: '/',
            // private: false,
          },
        },
        {
          http: {
            method: 'ANY',
            path: '{proxy+}',
            // private: true,
          },
        },
      ],
    },
  },
  custom: {
    withCloudFront: {
      type: 'rest',
      headers: [
        'Accept',
        'Accept-Encoding',
        'Accept-Language',
        'Authorization',
        'x-api-key',
      ],
      // logging: {
      //   bucket: 'sls-log-bucket',
      //   prefix: 'custom/',
      // },
    },
    deployHistory: {
      stages: ['staging'],
    },
  },
};
module.exports = serverlessConfiguration;
