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
exports.check_kubernetes_deployment = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function check_kubernetes_deployment(options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Checking if deployment exists...`);
  helpers.spacer_log(`Deployment: `);
  helpers.print_important_info(`${options.deployment}-app`);
  const response_deployment = commands.kubect_get_deployment(options);
  helpers.print_if_debug_bash(options, "kubectl_get_deployment", response_deployment);
  //check if response_deployment is empty
  if (response_deployment.res == "") {
    throw new Error(`Deployment '${options.deployment}-app' does not exist in kubernetes cluster with namespace '${options.namespace}'.`);
  }
  if (response_deployment.err != "") {
    throw new Error("There was an issue getting the deployment! Error: ${response_deployment.err}");
  }
  helpers.ok();
  return options;
}
exports.check_kubernetes_deployment = check_kubernetes_deployment;
