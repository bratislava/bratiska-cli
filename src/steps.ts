import { show_options } from './steps/0_show_options';
import { check_git_resources } from './steps/1_check_git_resources';
import { check_kubernetes_cluster } from './steps/2_check_kubernetes_cluster';
import { check_kubernetes_connection } from './steps/3_check_kubernetes_connection';
import { check_kubernetes_enviroment } from './steps/4_check_kubernetes_enviroment';
import { check_kubernetes_enviroment_configuration } from './steps/45_check_kubernetes_enviroment_configuration';
import { check_kubernetes_cluster_conditions } from './steps/5_check_kubernetes_cluster_conditions';
import { check_hosts } from './steps/6_check_hosts';
import { check_kubernetes_harbor_key } from './steps/7_check_kubernetes_harbor_key';
import { check_docker_file } from './steps/75_check_docker_file';
import { check_docker } from './steps/8_check_docker';
import { check_docker_login } from './steps/89_check_docker_login';
import { check_docker_running } from './steps/81_check_docker_running';
import { build_docker_image } from './steps/9_build_docker_image';
import { check_docker_image } from './steps/10_check_docker_image';
import { push_docker_image } from './steps/11_push_docker_image';
import { check_pushed_image } from './steps/12_check_pushed_image';
import { clean_docker_image } from './steps/13_clean_docker_image';
import { check_ports_numbers } from './steps/65_check_ports_numbers';
import { create_env_vars } from './steps/15_create_env_vars';
import { build_kustomize } from './steps/16_build_kustomize';
import { check_kustomize } from './steps/17_check_kustomize';
import { deploy_kubernetes } from './steps/18_deploy_kubernetes';
import { clean_kustomize } from './steps/19_clean_kustomize';
import { check_deployment } from './steps/20_check_deployment';

export class Steps {
  show_options_0(options: any) {
    show_options(options);
  }

  check_git_resources_1(options: any) {
    check_git_resources(options);
  }

  check_kubernetes_cluster_2(options: any) {
    check_kubernetes_cluster(options);
  }

  check_kubernetes_connection_3(options: any) {
    check_kubernetes_connection(options);
  }

  check_kubernetes_enviroment_4(options: any) {
    check_kubernetes_enviroment(options);
  }

  check_kubernetes_enviroment_configuration_45(options: any) {
    return check_kubernetes_enviroment_configuration(options);
  }

  check_kubernetes_cluster_conditions_5(options: any) {
    check_kubernetes_cluster_conditions(options);
  }

  check_hosts_6(options: any) {
    check_hosts(options);
  }

  check_kubernetes_harbor_key_7(options: any) {
    check_kubernetes_harbor_key(options);
  }

  check_docker_75(options: any) {
    check_docker_file(options);
  }

  check_docker_8() {
    check_docker();
  }

  check_docker_login_89(options: any) {
    check_docker_login(options);
  }

  check_docker_running_81(options: any) {
    check_docker_running(options);
  }

  build_docker_image_9(options: any) {
    build_docker_image(options);
  }

  check_docker_image_10(options: any) {
    check_docker_image(options);
  }

  push_docker_image_11(options: any) {
    push_docker_image(options);
  }

  check_pushed_image_12(options: any) {
    check_pushed_image(options);
  }

  clean_docker_image_13(options: any) {
    clean_docker_image(options);
  }

  check_ports_numbers_65(options: any) {
    check_ports_numbers(options);
  }

  create_env_vars_15(options: any) {
    create_env_vars(options);
  }

  build_kustomize_16(options: any) {
    build_kustomize(options);
  }

  check_kustomize_17(options: any) {
    check_kustomize(options);
  }
  deploy_kubernetes_18(options: any) {
    deploy_kubernetes(options);
  }
  clean_kustomize_19(options: any) {
    clean_kustomize(options);
  }
  check_deployment_20(options: any) {
    check_deployment(options);
  }
}
