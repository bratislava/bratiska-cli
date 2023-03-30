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
exports.check_bratiska_build_envs = void 0;
const helpers = __importStar(require("../helpers"));
const fs_1 = __importDefault(require("fs"));

function check_bratiska_build_envs(options) {
  helpers.line(`(${helpers.step(options)}) Checking for bratiska-cli build envs file: `);
  if (options.image) {
    helpers.skipping();
    return;
  }
  const envs_file = helpers.bratiska_cli_build_dot_env_path(options);
  helpers.print_if_debug(options, `bratiska-cli.build envs file: ${envs_file}`);
  if (!fs_1.default.existsSync(envs_file)) {
    helpers.not_present();
    helpers.skipping();
    return;
  }
  helpers.print_important_info_line(`'${helpers.bratiska_cli_build_env_filename(options)}'`);
  helpers.line(`...`);
  const envs_next_file = helpers.docker_build_next_env(options);
  helpers.print_if_debug(options, `envs_next_file: ${envs_next_file}`);
  fs_1.default.copyFileSync(envs_file, envs_next_file);
  if (!fs_1.default.existsSync(envs_next_file)) {
    throw new Error(`We had problem creating next env.production.local!`);
  } else {
    helpers.line(` loaded and created...`);
    if (options.debug) {
      helpers.line(`${fs_1.default.readFileSync(envs_next_file, "utf8")}`);
    }
  }
  if (options.sentry) {
    fs_1.default.appendFileSync(envs_next_file, `\nSENTRY_AUTH_TOKEN=${options.sentry}`);
    helpers.print_if_debug(options, `SENTRY_AUTH_TOKEN=${options.sentry} added to env file ${envs_next_file} for build`);
  }
  helpers.ok();
}

exports.check_bratiska_build_envs = check_bratiska_build_envs;
