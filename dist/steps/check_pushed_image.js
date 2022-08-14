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
  helpers.line(`(${helpers.step(options)}) Checking if the image is in the remote registry.\n...`);
  if (options.image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }
  helpers.print_if_debug(options, `image tag: ${helpers.image_tag(options)}`);
  const image_r = commands.docker_check_image_in_registry(options);
  if (image_r.err !== "") {
    throw new Error(`There was an issue checking if the image is in a registry! Probably you are unauthorized, or the image is not there. Check the above docker push log.`);
  }
  helpers.print_line_if_debug(options, "(11) Continue Checking if image...");
  helpers.ok();
}

exports.check_pushed_image = check_pushed_image;
