"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_kubernetes_connection = check_kubernetes_connection;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function check_kubernetes_connection(options) {
    helpers.line(`(${helpers.step(options)}) Checking Kubernetes connection to the cluster...`);
    if (options.dry_run ||
        options.build_kustomize ||
        options.build_image ||
        options.build_image_no_registry) {
        helpers.skipping();
        return;
    }
    const pods_bash = commands.kubectl_service_account(options);
    if (pods_bash.status !== 0) {
        helpers.print_if_debug_bash(options, 'kubectl_service_account', pods_bash);
        throw new Error(`Probably Kubernetes cluster ${options.cluster} is not reachable from your computer! But it can be also issue with your CICD account, when it is wrongly selected, or doesnt have proper RoleBinding. Please reach your system administrator.`);
    }
    helpers.ok();
    return options;
}
