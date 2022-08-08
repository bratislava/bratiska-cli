"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Steps = void 0;
const _01_show_version_1 = require("./steps/01_show_version");
const _0_show_options_1 = require("./steps/0_show_options");
const _1_check_git_resources_1 = require("./steps/1_check_git_resources");
const _2_check_kubernetes_cluster_1 = require("./steps/2_check_kubernetes_cluster");
const _3_check_kubernetes_connection_1 = require("./steps/3_check_kubernetes_connection");
const _4_check_kubernetes_enviroment_1 = require("./steps/4_check_kubernetes_enviroment");
const _45_check_kubernetes_enviroment_configuration_1 = require("./steps/45_check_kubernetes_enviroment_configuration");
const _5_check_kubernetes_cluster_conditions_1 = require("./steps/5_check_kubernetes_cluster_conditions");
const _6_check_hosts_1 = require("./steps/6_check_hosts");
const _7_check_kubernetes_harbor_key_1 = require("./steps/7_check_kubernetes_harbor_key");
const _75_check_docker_file_1 = require("./steps/75_check_docker_file");
const _8_check_docker_1 = require("./steps/8_check_docker");
const _89_check_docker_login_1 = require("./steps/89_check_docker_login");
const _81_check_docker_running_1 = require("./steps/81_check_docker_running");
const _9_build_docker_image_1 = require("./steps/9_build_docker_image");
const _10_check_docker_image_1 = require("./steps/10_check_docker_image");
const _11_push_docker_image_1 = require("./steps/11_push_docker_image");
const _12_check_pushed_image_1 = require("./steps/12_check_pushed_image");
const _13_clean_docker_image_1 = require("./steps/13_clean_docker_image");
const _65_check_ports_numbers_1 = require("./steps/65_check_ports_numbers");
const _15_create_env_vars_1 = require("./steps/15_create_env_vars");
const _16_build_kustomize_1 = require("./steps/16_build_kustomize");
const _17_check_kustomize_1 = require("./steps/17_check_kustomize");
const _18_deploy_kubernetes_1 = require("./steps/18_deploy_kubernetes");
const _19_clean_kustomize_1 = require("./steps/19_clean_kustomize");
const _20_check_deployment_1 = require("./steps/20_check_deployment");
class Steps {
    show_version_01(options, version) {
        (0, _01_show_version_1.show_version)(options, version);
    }
    show_options_0(options) {
        (0, _0_show_options_1.show_options)(options);
    }
    check_git_resources_1(options) {
        (0, _1_check_git_resources_1.check_git_resources)(options);
    }
    check_kubernetes_cluster_2(options) {
        (0, _2_check_kubernetes_cluster_1.check_kubernetes_cluster)(options);
    }
    check_kubernetes_connection_3(options) {
        (0, _3_check_kubernetes_connection_1.check_kubernetes_connection)(options);
    }
    check_kubernetes_enviroment_4(options) {
        (0, _4_check_kubernetes_enviroment_1.check_kubernetes_enviroment)(options);
    }
    check_kubernetes_enviroment_configuration_45(options) {
        return (0, _45_check_kubernetes_enviroment_configuration_1.check_kubernetes_enviroment_configuration)(options);
    }
    check_kubernetes_cluster_conditions_5(options) {
        (0, _5_check_kubernetes_cluster_conditions_1.check_kubernetes_cluster_conditions)(options);
    }
    check_hosts_6(options) {
        (0, _6_check_hosts_1.check_hosts)(options);
    }
    check_kubernetes_harbor_key_7(options) {
        (0, _7_check_kubernetes_harbor_key_1.check_kubernetes_harbor_key)(options);
    }
    check_docker_75(options) {
        (0, _75_check_docker_file_1.check_docker_file)(options);
    }
    check_docker_8() {
        (0, _8_check_docker_1.check_docker)();
    }
    check_docker_login_89(options) {
        (0, _89_check_docker_login_1.check_docker_login)(options);
    }
    check_docker_running_81(options) {
        (0, _81_check_docker_running_1.check_docker_running)(options);
    }
    build_docker_image_9(options) {
        (0, _9_build_docker_image_1.build_docker_image)(options);
    }
    check_docker_image_10(options) {
        (0, _10_check_docker_image_1.check_docker_image)(options);
    }
    push_docker_image_11(options) {
        (0, _11_push_docker_image_1.push_docker_image)(options);
    }
    check_pushed_image_12(options) {
        (0, _12_check_pushed_image_1.check_pushed_image)(options);
    }
    clean_docker_image_13(options) {
        (0, _13_clean_docker_image_1.clean_docker_image)(options);
    }
    check_ports_numbers_65(options) {
        (0, _65_check_ports_numbers_1.check_ports_numbers)(options);
    }
    create_env_vars_15(options) {
        (0, _15_create_env_vars_1.create_env_vars)(options);
    }
    build_kustomize_16(options) {
        (0, _16_build_kustomize_1.build_kustomize)(options);
    }
    check_kustomize_17(options) {
        (0, _17_check_kustomize_1.check_kustomize)(options);
    }
    deploy_kubernetes_18(options) {
        (0, _18_deploy_kubernetes_1.deploy_kubernetes)(options);
    }
    clean_kustomize_19(options) {
        (0, _19_clean_kustomize_1.clean_kustomize)(options);
    }
    check_deployment_20(options) {
        (0, _20_check_deployment_1.check_deployment)(options);
    }
}
exports.Steps = Steps;
