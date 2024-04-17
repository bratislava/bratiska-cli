import { Options } from './types';

import { check_kubernetes_connection } from './deploy/check_kubernetes_connection';
import { check_kubernetes_enviroment_configuration } from './deploy/check_kubernetes_enviroment_configuration';
import { check_kubernetes_cluster_conditions } from './deploy/check_kubernetes_cluster_conditions';
import { check_kubernetes_harbor_key } from './deploy/check_kubernetes_harbor_key';
import { deploy_kubernetes } from './deploy/deploy_kubernetes';
import { check_deployment } from './deploy/check_deployment';
import { check_deploy_commands } from './deploy/check_deploy_commands';

export class Deploy {
  check_kubernetes_connection(options: Options) {
    check_kubernetes_connection(options);
  }

  check_kubernetes_enviroment_configuration(options: Options) {
    return check_kubernetes_enviroment_configuration(options);
  }

  check_kubernetes_cluster_conditions(options: Options) {
    check_kubernetes_cluster_conditions(options);
  }

  check_kubernetes_harbor_key(options: Options) {
    check_kubernetes_harbor_key(options);
  }

  deploy_kubernetes(options: Options) {
    deploy_kubernetes(options);
  }

  check_deployment(options: Options) {
    check_deployment(options);
  }

  check_deploy_commands(options: Options) {
    check_deploy_commands(options);
  }
}
