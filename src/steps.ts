import { show_version } from './steps/show_version';
import { show_options } from './steps/show_options';
import { check_git_resources } from './steps/check_git_resources';
import { check_kubernetes_cluster } from './steps/check_kubernetes_cluster';
import { check_kubernetes_connection } from './steps/check_kubernetes_connection';
import { check_kubernetes_enviroment } from './steps/check_kubernetes_enviroment';
import { check_kubernetes_enviroment_configuration } from './steps/check_kubernetes_enviroment_configuration';
import { check_kubernetes_cluster_conditions } from './steps/check_kubernetes_cluster_conditions';
import { check_hosts } from './steps/check_hosts';
import { check_kubernetes_harbor_key } from './steps/check_kubernetes_harbor_key';
import { check_docker_file } from './steps/check_docker_file';
import { check_docker } from './steps/check_docker';
import { check_docker_login } from './steps/check_docker_login';
import { check_docker_running } from './steps/check_docker_running';
import { load_build_envs } from './steps/load_build_envs';
import { build_docker_image } from './steps/build_docker_image';
import { check_docker_image } from './steps/check_docker_image';
import { clean_build_envs } from './steps/clean_build_envs';
import { push_docker_image } from './steps/push_docker_image';
import { check_pushed_image } from './steps/check_pushed_image';
import { clean_docker_image } from './steps/clean_docker_image';
import { check_ports_numbers } from './steps/check_ports_numbers';
import { create_env_vars } from './steps/create_env_vars';
import { build_kustomize } from './steps/build_kustomize';
import { check_kustomize } from './steps/check_kustomize';
import { deploy_kubernetes } from './steps/deploy_kubernetes';
import { clean_kustomize } from './steps/clean_kustomize';
import { check_deployment } from './steps/check_deployment';

export class Steps {
  show_version(options: Options, version: string) {
    show_version(options, version);
  }

  show_options(options: Options) {
    show_options(options);
  }

  check_git_resources(options: Options) {
    check_git_resources(options);
  }

  check_kubernetes_cluster(options: Options) {
    check_kubernetes_cluster(options);
  }

  check_kubernetes_connection(options: Options) {
    check_kubernetes_connection(options);
  }

  check_kubernetes_enviroment(options: Options) {
    check_kubernetes_enviroment(options);
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

  check_docker_file(options: Options) {
    check_docker_file(options);
  }

  check_docker(options: Options) {
    check_docker(options);
  }

  check_docker_login(options: Options) {
    check_docker_login(options);
  }

  check_docker_running(options: Options) {
    check_docker_running(options);
  }

  load_build_envs(options: Options) {
    load_build_envs(options);
  }

  build_docker_image(options: Options) {
    build_docker_image(options);
  }

  check_docker_image(options: Options) {
    check_docker_image(options);
  }

  clean_build_envs(options: Options) {
    clean_build_envs(options);
  }

  push_docker_image(options: Options) {
    push_docker_image(options);
  }

  check_pushed_image(options: Options) {
    check_pushed_image(options);
  }

  clean_docker_image(options: Options) {
    clean_docker_image(options);
  }

  check_ports_numbers(options: Options) {
    check_ports_numbers(options);
  }

  create_env_vars(options: Options) {
    create_env_vars(options);
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
