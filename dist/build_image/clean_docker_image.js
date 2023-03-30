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
exports.clean_docker_image = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function clean_docker_image(options) {
  helpers.line(`(${helpers.step(options)}) Cleaning local docker image...`);
  if (options.image ||
    options.dry_run ||
    options.build_image ||
    options.build_image_no_registry) {
    helpers.skipping();
    return;
  }
  const image_r = commands.docker_delete_image(options);
  if (image_r.err !== "") {
    throw new Error(`There was an issue cleaning the local docker image with tag ${helpers.image_tag(options)}`);
  }
  helpers.ok();
}
exports.clean_docker_image = clean_docker_image;
