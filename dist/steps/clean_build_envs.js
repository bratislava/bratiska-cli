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
exports.clean_build_envs = void 0;
const helpers = __importStar(require("../helpers"));
const fs_1 = __importDefault(require("fs"));
function clean_build_envs(options) {
  helpers.line(`(${helpers.step(options)}) Cleaning for docker build envs... `);
  if (options.image || options.dry_run || options.debug) {
    helpers.skipping();
    return;
  }
  const envs_next_file = helpers.docker_build_next_env(options);
  if (!fs_1.default.existsSync(envs_next_file)) {
    helpers.not_present();
    helpers.skipping();
    return;
  }
  helpers.line("file is present...");
  try {
    fs_1.default.unlinkSync(envs_next_file);
  } catch (err) {
    throw new Error(`We had an error cleaning .env.production.local.`);
  }
  helpers.ok();
}
exports.clean_build_envs = clean_build_envs;
