import * as os from 'os';
import * as childProcess from 'node:child_process';
import { SlsConfigDto } from './interface/sls-config.dto';
import { DeployHistoryDto } from './interface/deploy-history.dto';

const TAG = 'DeployHistoryService';

export class DeployHistoryService {
  constructor(private readonly config: SlsConfigDto) { }

  public beforeDeploy(): DeployHistoryDto {
    const startAt = new Date();
    return {
      name: this.config.service,
      stage: this.config.options.stage,
      provider: this.config.provider.name,
      // functions: this.config.functions,
      runtime: this.config.provider.runtime,
      region: this.config.provider.region,
      user: os.hostname(),
      localBeginAt: this.checkTimeStamp(startAt, 'ja'),
      beginAt: startAt.toISOString(),
    } as DeployHistoryDto;
  }

  public async afterDeploy(
    history: DeployHistoryDto,
  ): Promise<DeployHistoryDto> {
    const endAt = new Date();
    const branch = await this.commandExec('git branch --show-current');
    return {
      ...history,
      localEndAt: this.checkTimeStamp(endAt, 'ja'),
      endAt: endAt.toISOString(),
      branch: branch.replace('\n', ''),
    } as DeployHistoryDto;
  }

  // === private ===
  private checkTimeStamp(time: Date, locale?: string): string {
    return new Intl.DateTimeFormat(locale || 'en', {
      dateStyle: 'short',
      timeStyle: 'medium',
    }).format(time);
  }

  private async commandExec(cmd: string): Promise<string> {
    return childProcess.execSync(cmd, {
      encoding: 'utf8',
    });
  }
}
