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
exports.deploy_kubernetes = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
//TODO return deployment status
function deploy_kubernetes(options) {
  helpers.line(`(${helpers.step(options)}) Deploying to kubernetes...`);
  if (options.dry_run ||
    options.build_kustomize ||
    options.build_image ||
    options.build_image_no_registry) {
    helpers.skipping();
    return;
  }
  const apply_to_kubernetes_bash = commands.kubect_apply_to_kubernetes(helpers.manifest_path(options));
  if (apply_to_kubernetes_bash.err) {
    helpers.print_if_debug_bash(options, "apply_to_kubernetes_bash", apply_to_kubernetes_bash);
    throw new Error(`We had an error applying the kustomize manifest to kubernetes. ${apply_to_kubernetes_bash.err}`);
  }
  console.log(apply_to_kubernetes_bash.res);
  helpers.ok();
}
exports.deploy_kubernetes = deploy_kubernetes;
