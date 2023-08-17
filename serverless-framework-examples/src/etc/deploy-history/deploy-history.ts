import { SlsHooksType } from './interface/sls-hook.interface';
import { SlsCliParamDto, SlsConfigDto } from './interface/sls-config.dto';
import { DeployHistoryService } from './deploy-history.service';
import { DeployHistoryDto } from './interface/deploy-history.dto';

const TAG = 'DeployHistory';

interface ServerlessApp {
  service: SlsConfigDto;
}

export class DeployHistory {
  private readonly config: SlsConfigDto;
  private readonly hooks: SlsHooksType;

  private service: DeployHistoryService;
  private history: DeployHistoryDto;

  constructor(app: ServerlessApp, cli: SlsCliParamDto) {
    this.config = {
      service: app.service.service,
      provider: app.service.provider,
      functions: app.service.functions,
      custom: app.service.custom['deployHistory'],
      options: {
        ...cli,
        stage: cli.stage || 'dev',
      },
    };
    console.debug(TAG, 'constructor', this.config);
    if (
      !this.config.custom.stages.find(
        (item) => item === this.config.options.stage,
      )
    ) {
      console.log(TAG, 'not-exec', this.config.options.stage);
      return;
    }
    this.hooks = {
      initialize: () => this.init(),
      'after:package:initialize': () => this.beforeDeploy(),
      'before:package:createDeploymentArtifacts': async () =>
        await this.afterDeploy(),
      // 'before:deploy:deploy': () => this.beforeDeploy(),
      // 'after:deploy:deploy': async () => await this.afterDeploy(),
    };
  }

  init() {
    console.debug(TAG, `init-plugin`);
    this.service = new DeployHistoryService(this.config);
  }

  beforeDeploy() {
    console.debug(TAG, `before-deploy`);
    this.history = this.service.beforeDeploy();
    console.debug(TAG, 'before-deploy-dto', this.history);
  }

  async afterDeploy() {
    console.debug(TAG, `after-deploy`);
    this.history = await this.service.afterDeploy(this.history);
    console.debug(TAG, 'after-deploy-dto', this.history);
  }
}
