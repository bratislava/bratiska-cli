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
exports.check_kubernetes_enviroment = void 0;
const helpers = __importStar(require("../helpers"));
function check_kubernetes_enviroment(options) {
  helpers.line(`(${helpers.step(options)}) Checking chosen Kubernetes cluster with the environment...`);
  if (options.build_image || options.build_image_no_registry) {
    helpers.skipping();
    options.env = "dev";
    return options;
  }
  if (typeof options.env === "undefined") {
    if (options.tag_command === true && options.branch !== "master") {
      options.env = "dev";
      return options;
    }
    options.env = helpers.map_cluster_to_env(options.cluster);
    helpers.print_if_debug(options, `options.env: ${options.env}`);
  } else if (options.env !== helpers.map_cluster_to_env(options.cluster)) {
    const cluster_env = helpers.map_cluster_to_env(options.cluster);
    if (options.tag_command === false) {
      throw new Error(`Your kubernetes context "${options.cluster}" (${cluster_env}) do not match chosen context (${options.env})! Change with --env or kubernetes cluster context!`);
    }
  }
  helpers.ok();
  return options;
}
exports.check_kubernetes_enviroment = check_kubernetes_enviroment;
