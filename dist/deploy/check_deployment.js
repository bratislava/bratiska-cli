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
exports.check_deployment = check_deployment;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function check_deployment(options) {
    helpers.line(`(${helpers.step(options)}) Checking the deployment status...`);
    if (options.dry_run ||
        options.build_kustomize ||
        options.build_image ||
        options.build_image_no_registry ||
        options.skip_deployment_check) {
        helpers.skipping();
        return;
    }
    //check if deployment kind is in kubernetes kinds array
    let kind = 'deployment';
    if (options.kustomize_kinds.includes('statefulset') &&
        !options.kustomize_kinds.includes('deployment')) {
        kind = 'statefulset';
    }
    commands.kubectl_deploy_status_stdio(kind, options);
    const status_bash = commands.kubectl_deploy_status_utf8(kind, options);
    if (status_bash.status !== 0) {
        helpers.print_if_debug_bash(options, 'status_bash', status_bash);
        helpers.print_warning(`Deploy was not successfully rolled out. Showing kubernetes deploy events for ${options.deployment}:`);
        commands.kubectl_deploy_events(kind, options);
        const latest_pod_bash = commands.kubectl_get_latest_pod(kind, options);
        helpers.print_if_debug_bash(options, 'latest_pod', latest_pod_bash);
        const pod = latest_pod_bash.res;
        helpers.line(`\n(${helpers.step(options)}) Showing kubernetes logs for pod ${pod}:...`);
        try {
            commands.kubectl_get_log_for_pod(pod, options);
            console.error(`\n Deploy was not successfully rolled out. Check logs above.`);
            process.exit(1);
        }
        catch (e) {
            throw Error(`Exiting bratiska-cli with status code 1, because deploy was not successfully rolled out in kubernetes. Check pod ${pod} logs in grafana.bratislava.sk or directly in kubernetes.`);
        }
    }
    helpers.finished();
}
