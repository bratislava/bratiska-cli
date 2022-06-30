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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_kubernetes_harbor_key = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
/*
  CHECKING KUBERNETES PULL SECRET FOR HARBOR
  we need to check if we have a key to download image from harbor in kubernetes cluster.
*/
function check_kubernetes_harbor_key(options) {
    helpers.line(`(7) Checking the Kubernetes harbor pull secret `);
  helpers.print_important_info_line(`'${helpers.pull_secret_name(options)}'`);
    helpers.line(`...`);
    if (options.dry_run ||
        options.build_kustomize ||
        options.build_image ||
        options.build_image_no_registry) {
        helpers.skipping();
        return;
    }
    const pull_secret_bash = commands.kubectl_pull_secret(options);
    if (pull_secret_bash.res === '') {
        throw new Error(`We have no harbor pull secrets with name '${helpers.pull_secret_name(options)}'  on kubernetes cluster '${options.cluster}'. Don't hesitate to contact Kubernetes admin to create a pull secret.`);
    }
    helpers.ok();
}
exports.check_kubernetes_harbor_key = check_kubernetes_harbor_key;
