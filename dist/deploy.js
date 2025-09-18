"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deploy = void 0;
const check_kubernetes_connection_1 = require("./deploy/check_kubernetes_connection");
const check_kubernetes_enviroment_configuration_1 = require("./deploy/check_kubernetes_enviroment_configuration");
const check_kubernetes_cluster_conditions_1 = require("./deploy/check_kubernetes_cluster_conditions");
const check_kubernetes_harbor_key_1 = require("./deploy/check_kubernetes_harbor_key");
const deploy_kubernetes_1 = require("./deploy/deploy_kubernetes");
const check_deployment_1 = require("./deploy/check_deployment");
const check_deploy_commands_1 = require("./deploy/check_deploy_commands");
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
    check_kubernetes_harbor_key(options) {
        (0, check_kubernetes_harbor_key_1.check_kubernetes_harbor_key)(options);
    }
    deploy_kubernetes(options) {
        (0, deploy_kubernetes_1.deploy_kubernetes)(options);
    }
    check_deployment(options) {
        (0, check_deployment_1.check_deployment)(options);
    }
    check_deploy_commands(options) {
        (0, check_deploy_commands_1.check_deploy_commands)(options);
    }
}
exports.Deploy = Deploy;
