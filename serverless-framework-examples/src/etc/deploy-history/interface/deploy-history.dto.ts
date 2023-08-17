import {
  AwsLambdaRuntimeType,
  AwsRegionType,
  ProviderType,
} from './sls-config.dto';

export class DeployHistoryDto {
  // service name
  name: string;

  // deploy begin time: local
  localBeginAt: string;

  // deploy end time: local
  localEndAt?: string;

  // deploy begin time: utc
  beginAt: string;

  // deploy end time: utc
  endAt?: string;

  // deploy stage
  stage: string;

  // deploy git branch name
  branch?: string;

  // deploy git user name
  user?: string;

  // deploy git commit hash
  hash?: string;

  // deploy provider service
  provider: ProviderType;

  // deploy resources(aws lambda, fargate...)
  functions?: string[];

  region?: AwsRegionType;

  runtime?: AwsLambdaRuntimeType;
}
