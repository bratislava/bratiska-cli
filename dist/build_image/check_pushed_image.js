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
exports.check_pushed_image = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function check_pushed_image(options) {
  helpers.line(`(${helpers.step(options)}) Checking if the image is in the remote registry...`);
  if (options.build_image_no_registry ||
    options.no_image_repo_check ||
    options.dry_run) {
    helpers.skipping();
    return;
  }
  const imagetag = helpers.image_tag(options);
  const image_r = commands.docker_check_image_in_registry(options, imagetag);
  if (image_r.err !== "") {
    helpers.print_if_debug(options, `image tag: ${imagetag}`);
    throw new Error(`Image (${imagetag}) is not in the registry! Check your repository. Error: ${image_r.err}`);
  }
  if (options.beta) {
    const latestTag = helpers.image_latest_tag(options);
    const image_r = commands.docker_check_image_in_registry(options, latestTag);
    if (image_r.err !== "") {
      helpers.print_if_debug(options, `image latest tag: ${latestTag}`);
      throw new Error(`Latest image (${latestTag}) is not in the registry! Check your repository. Error: ${image_r.err}`);
    }
  }
  helpers.ok();
}
exports.check_pushed_image = check_pushed_image;
