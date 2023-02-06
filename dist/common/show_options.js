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
exports.show_options = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
const path = __importStar(require("path"));
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
function show_options(options) {
  const pwd = commands.pwd();
  if (pwd === "") {
    throw new Error("There was an issue getting the current working directory!");
  }
  options.pwd = pwd;
  options.pipelines = false;
  if (options.debug) {
    helpers.print_debug(`pwd: ${options.pwd}`);
  }
  if (typeof options.build_image === "undefined") {
    options.build_image = false;
  }
  if (typeof options.build_image_no_registry === "undefined") {
    options.build_image_no_registry = false;
  }
  if (typeof options.force_rebuild === "undefined") {
    options.force_rebuild = false;
  }
  if (typeof options.build_kustomize === "undefined") {
    options.build_kustomize = false;
  }
  if (typeof options.kustomize === "undefined") {
    options.kustomize = false;
  }
  if (typeof options.image === "undefined") {
    options.image = false;
  }
  if (typeof options.no_pull === "undefined") {
    options.no_pull = false;
  }
  if (typeof options.tag === "undefined") {
    options.tag = false;
  }
  if (typeof options.tag_command === "undefined") {
    options.tag_command = false;
  }
  if (typeof options.no_image_repo_check === "undefined") {
    options.no_image_repo_check = false;
  }
  if (typeof options.namespace === "undefined") {
    // ignore namespace when not defined during only image build
    options.namespace = "standalone";
    if (options.build_image || options.build_image_no_registry) {
      options.namespace = false;
    }
  }
  if (typeof options.sentry === "undefined") {
    options.sentry = false;
  }
  if (typeof options.kubectl_timeout === "undefined") {
    options.kubectl_timeout = "120";
  }
  if (typeof options.beta === "undefined") {
    options.beta = false;
  }
  if (typeof options.debug === "undefined") {
    options.debug = false;
  }
  if (typeof options.dry_run === "undefined") {
    options.dry_run = false;
  }
  if (typeof options.recreate === "undefined") {
    options.recreate = false;
  }
  if (typeof options.delete === "undefined") {
    options.delete = false;
  }
  if (typeof options.tech === "undefined") {
    options.tech = false;
  }
  if (typeof options.local === "undefined") {
    options.local = false;
  }
  if (typeof options.feature === "undefined") {
    options.feature = false;
  }
  if (typeof options.major === "undefined") {
    options.major = false;
  }
  if (process.env["CI"]) {
    options.pipelines = true;
  }
  if (typeof options.force === "undefined") {
    options.force = false;
  } else {
    const pass = crypto_1.default
      .createHash("sha256")
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .update(options.force)
      .digest("base64");
    console.log(pass);
    if (pass === "ynqstnhwPpmybNTjkQfHxXJuviKIyMRV66kUWcrspmU=") {
      options.force = true;
      helpers.star_wars();
    } else {
      throw new Error(helpers.game_over());
    }
  }
  if (typeof options.staging !== "undefined" &&
    typeof options.production !== "undefined") {
    throw new Error("Staging and production flags can`t be used at the same time!");
  }
  if (options.sentry) {
    process.env["SENTRY_AUTH_TOKEN"] = options.sentry;
  }
  const pack = helpers.load_package(options);
  if (typeof options.deployment === "undefined") {
    options.deployment = pack.name;
    if (options.deployment === "app" && options.force === false) {
      throw new Error(`You are using general package.json project name: ${options.deployment}. Please change the project name in the package.json to a different one.`);
    }
  }
  if (options.image && options.no_image_repo_check === false) {
    const img = options.image;
    if (!img.includes(options.deployment)) {
      throw new Error(`Image should include deployment name: ${options.deployment} for security reasons. Now it is: ${img}`);
    }
  }
  if (typeof options.version === "undefined") {
    options.version = pack.version;
  }
  if (!helpers.is_allowed_env(options.env) &&
    typeof options.env !== "undefined") {
    throw new Error(`Unknown environment: '${options.env}'. Please use one of the allowed environments: 'dev', 'staging', 'prod'`);
  }
  helpers.line("(0) Starting with options... \n");
  options.kustomize_default_path = false;
  const path_ku_local = helpers.kustomize_folder_path(options);
  if (fs_1.default.existsSync(path_ku_local)) {
    options.kustomize_default_path = true;
  }
  options.repository_uri = path.basename(options.pwd);
  helpers.print_options(options);
  helpers.line("(0) Showing detected app info... \n");
  helpers.spacer_line(`Application name: `);
  helpers.print_important_info(`${options.deployment}`);
  helpers.spacer_line(`Directory of application: `);
  helpers.print_important_info(`${options.pwd}`);
  helpers.spacer_line(`Package.json: `);
  helpers.print_important_info("present");
  helpers.spacer_line(`Kubernetes folder with kustomize files included: `);
  helpers.print_important_info(`${options.kustomize_default_path}`);
  return options;
}
exports.show_options = show_options;
