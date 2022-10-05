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
exports.check_kubernetes_cluster = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));

function check_kubernetes_cluster(options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Checking the current Kubernetes cluster...`);
  if (options.build_image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }
  const response_cluster = commands.kubectl_cluster();
  options.cluster = response_cluster.res;
  helpers.print_if_debug(options, `current cluster: ${options.cluster}`);
  if (response_cluster.err !== "" && options.tag_command === false) {
    throw new Error("There is no Kubernetes context available. Please log in to the Kubernetes cluster! \n More info:" +
      response_cluster.err);
  }
  if (typeof options.cluster !== "undefined") {
    helpers.line(`\n${helpers.spacer()}Detected cluster: `);
    helpers.print_important_info(`${options.cluster}`);
  }
  if (options.cluster === "prod-k8s-ns-01") {
    throw new Error(`You cannot use '${options.cluster}' cluster! It is forbidden.`);
  }
  helpers.line(`(${step}) Checking the current Kubernetes cluster...`);
  helpers.ok();
  return options;
}

exports.check_kubernetes_cluster = check_kubernetes_cluster;
