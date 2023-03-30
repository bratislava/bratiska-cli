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
exports.check_docker_ignore = void 0;
const helpers = __importStar(require("../helpers"));
const fs_1 = __importDefault(require("fs"));
function check_docker_ignore(options) {
  helpers.line(`(${helpers.step(options)}) Checking docker ignore for its content: `);
  if (options.image) {
    helpers.skipping();
    return;
  }
  const docker_ignore_file = helpers.docker_ignore_path(options);
  helpers.print_if_debug(options, `docker_ignore_file: ${docker_ignore_file}`);
  if (!fs_1.default.existsSync(docker_ignore_file)) {
    helpers.not_present();
    helpers.skipping();
    return;
  }
  const docker_ignore_content = fs_1.default.readFileSync(docker_ignore_file, "utf8");
  helpers.print_if_debug(options, `docker_ignore_content: ${docker_ignore_content}`);
  if (docker_ignore_content.includes(".env.production.local")) {
    throw new Error(`The dockerignore file should not include .env.production.local! We need this for propagating bratiska build envs to the docker build time variables!`);
  }
  helpers.ok();
}
exports.check_docker_ignore = check_docker_ignore;
