import { Options } from './types';

import { show_version } from './common/show_version';
import { show_options } from './common/show_options';
import { check_git_resources } from './common/check_git_resources';
import { check_kubernetes_cluster } from './common/check_kubernetes_cluster';
import { check_kubernetes_enviroment } from './common/check_kubernetes_enviroment';

export class Common {
  show_options(options: Options) {
    show_options(options);
  }

  show_version(options: Options, version: string) {
    show_version(options, version);
  }

  check_git_resources(options: Options) {
    check_git_resources(options);
  }

  check_kubernetes_cluster(options: Options) {
    check_kubernetes_cluster(options);
  }

  check_kubernetes_enviroment(options: Options) {
    check_kubernetes_enviroment(options);
  }
}
