"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = {
        enumerable: true, get: function() {
          return m[k];
        }
      };
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
var __importStar = (this && this.__importStar) || function(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_deployment = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function check_deployment(options) {
  helpers.line(`(${helpers.step(options)}) Checking the deployment status...`);
  if (options.dry_run ||
    options.build_kustomize ||
    options.build_image ||
    options.build_image_no_registry) {
    helpers.skipping();
    return;
  }
  //check if deployment kind is in kubernetes kinds array
  let kind = "deployment";
  if (options.kustomize_kinds.includes("statefulset") &&
    !options.kustomize_kinds.includes("deployment")) {
    kind = "statefulset";
  }
  commands.kubectl_deploy_status_stdio(kind, options);
  const status_bash = commands.kubectl_deploy_status_utf8(kind, options);
  helpers.print_if_debug_bash(options, "status_bash", status_bash);
  if (status_bash.err) {
    helpers.print_warning(`Deploy was not successfully rolled out. Showing kubernetes deploy events for ${options.deployment}:`);
    commands.kubectl_deploy_events(kind, options);
    /*
    //currently disables as it was slowing pipeline
    helpers.print_warning(
      `Showing kubernetes container logs for ${options.deployment}:`,
    );
    commands.kubectl_deployment_logs(options);
    */
    throw Error(`Exiting bratiska-cli with status code 1, because deploy was not successfully rolled out in kubernetes.`);
  }
  helpers.finished();
}
exports.check_deployment = check_deployment;
