"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deploy = void 0;
const show_version_1 = require("./deploy/show_version");
const show_options_1 = require("./deploy/show_options");
const check_git_resources_1 = require("./deploy/check_git_resources");
const check_kubernetes_cluster_1 = require("./deploy/check_kubernetes_cluster");
const check_kubernetes_connection_1 = require("./deploy/check_kubernetes_connection");
const check_kubernetes_enviroment_1 = require("./deploy/check_kubernetes_enviroment");
const check_kubernetes_enviroment_configuration_1 = require("./deploy/check_kubernetes_enviroment_configuration");
const check_kubernetes_cluster_conditions_1 = require("./deploy/check_kubernetes_cluster_conditions");
const check_hosts_1 = require("./deploy/check_hosts");
const check_kubernetes_harbor_key_1 = require("./deploy/check_kubernetes_harbor_key");
const check_docker_file_1 = require("./deploy/check_docker_file");
const check_docker_1 = require("./deploy/check_docker");
const check_docker_login_1 = require("./deploy/check_docker_login");
const check_docker_running_1 = require("./deploy/check_docker_running");
const check_bratiska_build_envs_1 = require("./deploy/check_bratiska_build_envs");
const build_docker_image_1 = require("./deploy/build_docker_image");
const check_docker_image_1 = require("./deploy/check_docker_image");
const clean_bratiska_build_envs_1 = require("./deploy/clean_bratiska_build_envs");
const push_docker_image_1 = require("./deploy/push_docker_image");
const check_pushed_image_1 = require("./deploy/check_pushed_image");
const clean_docker_image_1 = require("./deploy/clean_docker_image");
const check_ports_numbers_1 = require("./deploy/check_ports_numbers");
const create_kustomize_env_vars_1 = require("./deploy/create_kustomize_env_vars");
const build_kustomize_1 = require("./deploy/build_kustomize");
const check_kustomize_1 = require("./deploy/check_kustomize");
const deploy_kubernetes_1 = require("./deploy/deploy_kubernetes");
const clean_kustomize_1 = require("./deploy/clean_kustomize");
const check_deployment_1 = require("./deploy/check_deployment");

class Deploy {
  show_version(options, version) {
    (0, show_version_1.show_version)(options, version);
  }

  show_options(options) {
    (0, show_options_1.show_options)(options);
  }

  check_git_resources(options) {
    (0, check_git_resources_1.check_git_resources)(options);
  }

  check_kubernetes_cluster(options) {
    (0, check_kubernetes_cluster_1.check_kubernetes_cluster)(options);
  }

  check_kubernetes_connection(options) {
    (0, check_kubernetes_connection_1.check_kubernetes_connection)(options);
  }

  check_kubernetes_enviroment(options) {
    (0, check_kubernetes_enviroment_1.check_kubernetes_enviroment)(options);
  }

  check_kubernetes_enviroment_configuration(options) {
    return (0, check_kubernetes_enviroment_configuration_1.check_kubernetes_enviroment_configuration)(options);
  }

  check_kubernetes_cluster_conditions(options) {
    (0, check_kubernetes_cluster_conditions_1.check_kubernetes_cluster_conditions)(options);
  }

  check_hosts(options) {
    (0, check_hosts_1.check_hosts)(options);
  }

  check_kubernetes_harbor_key(options) {
    (0, check_kubernetes_harbor_key_1.check_kubernetes_harbor_key)(options);
  }

  check_docker_file(options) {
    (0, check_docker_file_1.check_docker_file)(options);
  }

  check_docker(options) {
    (0, check_docker_1.check_docker)(options);
  }

  check_docker_login(options) {
    (0, check_docker_login_1.check_docker_login)(options);
  }

  check_docker_running(options) {
    (0, check_docker_running_1.check_docker_running)(options);
  }

  check_bratiska_build_envs(options) {
    (0, check_bratiska_build_envs_1.check_bratiska_build_envs)(options);
  }

  build_docker_image(options) {
    (0, build_docker_image_1.build_docker_image)(options);
  }

  check_docker_image(options) {
    (0, check_docker_image_1.check_docker_image)(options);
  }

  clean_bratiska_build_envs(options) {
    (0, clean_bratiska_build_envs_1.clean_bratiska_build_envs)(options);
  }

  push_docker_image(options) {
    (0, push_docker_image_1.push_docker_image)(options);
  }

  check_pushed_image(options) {
    (0, check_pushed_image_1.check_pushed_image)(options);
  }

  clean_docker_image(options) {
    (0, clean_docker_image_1.clean_docker_image)(options);
  }

  check_ports_numbers(options) {
    (0, check_ports_numbers_1.check_ports_numbers)(options);
  }

  create_kustomize_env_vars(options) {
    (0, create_kustomize_env_vars_1.create_kustomize_env_vars)(options);
  }

  build_kustomize(options) {
    (0, build_kustomize_1.build_kustomize)(options);
  }

  check_kustomize(options) {
    (0, check_kustomize_1.check_kustomize)(options);
  }

  deploy_kubernetes(options) {
    (0, deploy_kubernetes_1.deploy_kubernetes)(options);
  }

  clean_kustomize(options) {
    (0, clean_kustomize_1.clean_kustomize)(options);
  }

  check_deployment(options) {
    (0, check_deployment_1.check_deployment)(options);
  }
}
exports.Deploy = Deploy;
