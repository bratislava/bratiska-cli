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
var __importDefault = (this && this.__importDefault) || function(mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_kustomize = void 0;
const helpers = __importStar(require("../helpers"));
const fs_1 = __importDefault(require("fs"));
const helpers_1 = require("../helpers");

function check_kustomize(options) {
  helpers.line(`(${helpers.step(options)}) Checking the kustomize manifest...`);
  if (options.build_image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }
  const manifest_path = helpers.manifest_path(options);
  if (!fs_1.default.existsSync(manifest_path)) {
    throw new Error(`We had an error creating the kustomize manifest. No kustomize file was found!`);
  }
  // load manifest file content
  const manifest_content = fs_1.default.readFileSync(manifest_path, "utf8");
  (0, helpers_1.print_if_debug)(options, `manifest_content: ${manifest_content}`);
  const stats = fs_1.default.statSync(manifest_path);
  if (stats.size < 10) {
    throw new Error(`We had an error creating the kustomize manifest. The Kustomize file is empty! Check issue logs on kustomize build.`);
  }
  // match of kubernetes kinds form the manifest file without kind string
  const kinds = manifest_content.match(/(?<=kind: ).*/g);
  // if no kinds were found in the manifest file, throw an error
  if (!kinds) {
    throw new Error(`We had an error creating the kustomize manifest. No Kubernetes kinds were found in the manifest file!`);
  }
  // if no kinds were found in the manifest file, throw an error
  if (kinds.length < 1) {
    throw new Error(`We had an error creating the kustomize manifest. No Kubernetes kinds were found in the manifest file!`);
  }
  (0, helpers_1.print_if_debug)(options, `${kinds.length} kinds found: ${kinds}`);
  // convert all kinds to lowercase with foreach
  kinds.forEach((kind, index) => {
    kinds[index] = kind.toLowerCase();
  });
  options.kustomize_kinds = kinds;
  helpers.ok();
}

exports.check_kustomize = check_kustomize;
