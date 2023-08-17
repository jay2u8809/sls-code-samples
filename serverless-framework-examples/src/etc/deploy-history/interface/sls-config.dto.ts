export type ProviderType = 'aws';
export type AwsRegionType = 'ap-northeast-1';
export type AwsLambdaRuntimeType = 'nodejs14.x' | 'nodejs16.x' | 'nodejs18.x';
export type AwsLambdaArchitectureType = 'arm64' | 'x86_64';

type ProvidersType = {
  name: ProviderType;
  runtime: AwsLambdaRuntimeType;
  region: AwsRegionType;
  architecture: AwsLambdaArchitectureType;
};

export type FunctionsType = {
  [key: string]: {
    name: string;
  };
};

export interface SlsCliParamDto {
  stage: string;
  region: AwsRegionType;
  config: string;
  functions: string;
}

export interface SlsConfigDto {
  service: string;
  provider: ProvidersType;
  functions: FunctionsType;
  custom?: {
    stages: string[];
  };
  options?: SlsCliParamDto;
}
