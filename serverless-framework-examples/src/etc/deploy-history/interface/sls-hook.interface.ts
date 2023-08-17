export type SlsHooksType = {
  initialize: () => void;
  'before:deploy:deploy'?: () => void;
  'after:deploy:deploy'?: () => void;
  'before:package:initialize'?: () => void;
  'package:initialize'?: () => void;
  'after:package:initialize'?: () => void;
  'before:package:createDeploymentArtifacts'?: () => void;
  'package:createDeploymentArtifacts'?: () => void;
  'after:package:createDeploymentArtifacts'?: () => void;
};
