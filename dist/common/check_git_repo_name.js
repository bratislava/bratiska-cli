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
exports.check_git_repo_name = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function check_git_repo_name(options) {
    const step = helpers.step(options);
    helpers.line(`(${step}) Checking git repo name...`);
    if (options.image) {
        helpers.skipping();
        return;
    }
    const name_bash = commands.git_repo_name(options);
  if (name_bash === "") {
    throw new Error("There was an issue fetching git repo name from git origin!");
    }
    options.repo_name = name_bash;
    helpers.print_if_debug(options, `reponame: ${options.repo_name}`);
    helpers.spacer_log(`Repository name: `);
    helpers.print_important_info(`${options.repo_name}`);
    // this rule applies only to projects which are not strapi and next
    helpers.print_if_debug(options, `${options.repo_name} != ${options.deployment}`);
    if (options.repo_name != options.deployment &&
      !~options.deployment.toLowerCase().indexOf("strapi") &&
      !~options.deployment.toLowerCase().indexOf("next") &&
      !~options.deployment.toLowerCase().indexOf("planner-live-api") &&
      options.pipelines == false) {
        throw Error(`You have repository name mismatch. Git repo name: ${options.repo_name} != package.json name: ${options.deployment}. Please fix the names, that they match with the repository name and project.json name.`);
    }
    const repository_bash = commands.git_repository_url();
  helpers.print_if_debug_bash(options, "repository_bash", repository_bash);
  if (repository_bash.err !== "") {
    throw new Error("There was an issue getting the remote repository URL. Please push your changes to GitHub or azure.\n");
    }
    options.repository_uri = repository_bash.res;
    helpers.print_if_debug(options, `repository_uri: ${options.repository_uri}`);
    return options;
}
exports.check_git_repo_name = check_git_repo_name;
