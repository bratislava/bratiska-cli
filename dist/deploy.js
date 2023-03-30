"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deploy = void 0;
const check_kubernetes_connection_1 = require("./deploy/check_kubernetes_connection");
const check_kubernetes_enviroment_configuration_1 = require("./deploy/check_kubernetes_enviroment_configuration");
const check_kubernetes_cluster_conditions_1 = require("./deploy/check_kubernetes_cluster_conditions");
const check_hosts_1 = require("./deploy/check_hosts");
const check_kubernetes_harbor_key_1 = require("./deploy/check_kubernetes_harbor_key");
const check_ports_numbers_1 = require("./deploy/check_ports_numbers");
const create_kustomize_env_vars_1 = require("./deploy/create_kustomize_env_vars");
const build_kustomize_1 = require("./deploy/build_kustomize");
const check_kustomize_1 = require("./deploy/check_kustomize");
const deploy_kubernetes_1 = require("./deploy/deploy_kubernetes");
const clean_kustomize_1 = require("./deploy/clean_kustomize");
const check_deployment_1 = require("./deploy/check_deployment");
class Deploy {
  check_kubernetes_connection(options) {
    (0, check_kubernetes_connection_1.check_kubernetes_connection)(options);
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
