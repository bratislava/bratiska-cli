import { Options } from './types';

import { check_kubernetes_connection } from './deploy/check_kubernetes_connection';
import { check_kubernetes_enviroment_configuration } from './deploy/check_kubernetes_enviroment_configuration';
import { check_kubernetes_cluster_conditions } from './deploy/check_kubernetes_cluster_conditions';
import { check_hosts } from './deploy/check_hosts';
import { check_kubernetes_harbor_key } from './deploy/check_kubernetes_harbor_key';
import { check_ports_numbers } from './deploy/check_ports_numbers';
import { create_kustomize_env_vars } from './deploy/create_kustomize_env_vars';
import { build_kustomize } from './deploy/build_kustomize';
import { check_kustomize } from './deploy/check_kustomize';
import { deploy_kubernetes } from './deploy/deploy_kubernetes';
import { clean_kustomize } from './deploy/clean_kustomize';
import { check_deployment } from './deploy/check_deployment';

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

  check_hosts(options: Options) {
    check_hosts(options);
  }

  check_kubernetes_harbor_key(options: Options) {
    check_kubernetes_harbor_key(options);
  }

  check_ports_numbers(options: Options) {
    check_ports_numbers(options);
  }

  create_kustomize_env_vars(options: Options) {
    create_kustomize_env_vars(options);
  }

  build_kustomize(options: Options) {
    build_kustomize(options);
  }

  check_kustomize(options: Options) {
    check_kustomize(options);
  }

  deploy_kubernetes(options: Options) {
    deploy_kubernetes(options);
  }

  clean_kustomize(options: Options) {
    clean_kustomize(options);
  }

  check_deployment(options: Options) {
    check_deployment(options);
  }
}
