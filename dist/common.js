"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Common = void 0;
const show_version_1 = require("./common/show_version");
const show_options_1 = require("./common/show_options");
const check_git_resources_1 = require("./common/check_git_resources");
const check_kubernetes_cluster_1 = require("./common/check_kubernetes_cluster");
const check_kubernetes_enviroment_1 = require("./common/check_kubernetes_enviroment");
class Common {
    show_options(options) {
        (0, show_options_1.show_options)(options);
    }

    show_version(options, version) {
        (0, show_version_1.show_version)(options, version);
    }

    check_git_resources(options) {
        (0, check_git_resources_1.check_git_resources)(options);
    }

    check_kubernetes_cluster(options) {
        (0, check_kubernetes_cluster_1.check_kubernetes_cluster)(options);
    }

    check_kubernetes_enviroment(options) {
        (0, check_kubernetes_enviroment_1.check_kubernetes_enviroment)(options);
    }
}
exports.Common = Common;
