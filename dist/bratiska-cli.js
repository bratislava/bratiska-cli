#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
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
const chalk_1 = __importDefault(require("chalk"));
const clear_1 = __importDefault(require("clear"));
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = require("commander");
const deploy_1 = require("./deploy");
const tag_1 = require("./tag");
const common_1 = require("./common");
const helpers = __importStar(require("./helpers"));
const version = "2.4.0";
const deploy = new deploy_1.Deploy();
const tag = new tag_1.Tag();
const common = new common_1.Common();
try {
  (0, clear_1.default)();
  console.log(chalk_1.default.blue(figlet_1.default.textSync("Bratiska-cli", { horizontalLayout: "full" })));
  commander_1.program
    .name("bratiska-cli")
    .version(version)
    .description("Simple Bratiska-cli utility for managing Bratislava Innovation apps")
    .action(() => {
      console.log(chalk_1.default.green("Please choose from selected commands based on yur needs. My favourite command is `deploy`."));
      commander_1.program.help();
    });
  commander_1.program
    .command("tag")
    .argument("[env]", "environment", "")
    .summary("Tag a version of app and run pipelines")
    .description("Tag a version of app and run pipelines")
    .option("-tag, --tag <tag>", "Specify a tag")
    .option("-tech, --tech <tech>", "Technology in tag used in pipelines")
    .option("-recreate, --recreate", "Recreate and re-push tag")
    .option("-delete, --delete", "Delete a tag locally and in origin")
    .option("-local, --local", "Nothing will be pushed to origin")
    .option("-no_pull, --no_pull", "If you dont want to git pull from origin during tag")
    .option("-feature, --feature", "Increment version of app with feature level")
    .option("-major, --major", "Increment version of app with major level")
    .option("-debug, --debug", "Debugging")
    .option("-dry_run, --dry_run", "Run without creating an tag")
    .option("-force, --force <pass>", "Force")
    .action((env, options) => {
      /* step 0 */
      common.show_version(options, version);
      /* step 1 */
      tag.tag_options(options, env);
      /* step 2 */
      common.show_options(options);
      /* step 3 */
      common.get_git_current_branch(options);
      /* step 4 */
      common.get_git_fetch(options);
      /* step 5 */
      common.get_git_pull(options);
      /* step 6 */
      common.get_git_user_info(options);
      /* step 7 */
      common.get_git_commits(options);
      /* step 8 */
      common.get_git_branch(options);
      /* step 9 */
      common.get_git_tags(options);
      /* step 10 */
      common.check_kubernetes_cluster(options);
      /* step 11 */
      common.check_kubernetes_enviroment(options);
      /* step 12 */
      tag.delete_tag(options);
      /* step 13 */
      tag.create_tag(options);
    });
  commander_1.program
    .command("deploy")
    .summary("Local build and deploy to kubernetes")
    .description("If you need to deploy app to kubernetes, this is tool for you")
    //.argument('[source_path]', 'Path to main folder for app')
    .option("-build_image, --build_image", "Build image only.")
    .option("-force_rebuild, --force_rebuild", "Forcing image rebuild.")
    .option("-build_image_no_registry, --build_image_no_registry", "Don`t push to registry")
    .option("-build_kustomize, --build_kustomize", "Build kustomize file only.")
    .option("-dry_run, --dry_run", "Run without deploying to kubernetes")
    .option("-k, --kustomize <file_or_direcotry>", "Specify kustomize file or kustomize directory")
    .option("-i, --image <url>", "Specify image from harbour via url")
    .option("-n, --namespace <namespace>", "Namespace")
    .option("-d, --deployment <deployment>", "Deployment app")
    .option("-h, --host <host>", "Host url address")
    .option("-e, --env <env>", "Deployment environment")
    .option("-s, --sentry <token>", "Specify sentry auth token for build")
    .option("-kubectl_timeout, --kubectl_timeout <timeout_in_seconds>", "Specify kubectl timeout in seconds")
    .option("-r, --registry <url>", "Docker image registry url", "harbor.bratislava.sk")
    .option("-staging, --staging", "To deploy on staging, you need to add this flag.")
    .option("-production, --production", "To deploy on production, you need to add this flag.")
    .option("-debug, --debug", "Debugging")
    .option("-beta, --beta", "Beta features")
    .option("-no_image_repo_check, --no_image_repo_check", "No Image repository check")
    .option("-no_pull, --no_pull", "If you dont want to git pull from origin during tag")
    .option("-force, --force <pass>", "Force")
    .action((options) => {
      /* step 0 */
      common.show_version(options, version);
      /* step 1 */
      common.show_options(options);
      /* step 2 */
      common.get_git_current_branch(options);
      /* step 3 */
      common.get_git_fetch(options);
      /* step 4 */
      common.get_git_status(options);
      /* step 5 */
      common.get_git_user_info(options);
      /* step 6 */
      common.get_git_commits(options);
      /* step 7 */
      common.check_git_repo_name(options);
      /* step 8 */
      common.get_git_branch(options);
      /* step 9 */
      common.check_git_merge_status(options);
      /* step 10 */
      common.get_git_tags(options);
      /* step 11 */
      common.check_kubernetes_cluster(options);
      /* step 12 */
      deploy.check_kubernetes_connection(options);
      /* step 13 */
      common.check_kubernetes_enviroment(options);
      /* step 14 */
      options = deploy.check_kubernetes_enviroment_configuration(options);
      /* step 15 */
      deploy.check_kubernetes_cluster_conditions(options);
      /* step 16 */
      deploy.check_hosts(options);
      /* step 17 */
      deploy.check_ports_numbers(options);
      /* step 18 */
      deploy.check_kubernetes_harbor_key(options);
      /* step 19 */
      deploy.check_docker_file(options);
      /* step 20 */
      deploy.check_docker(options);
      /* step 21 */
      deploy.check_docker_running(options);
      /* step 22 */
      deploy.check_docker_login(options);
      /* step 23 */
      deploy.check_bratiska_build_envs(options);
      /* step 24 */
      deploy.check_docker_ignore(options);
      /* step 25 */
      deploy.build_docker_image(options);
      /* step 26 */
      deploy.check_docker_image(options);
      /* step 27 */
      deploy.clean_bratiska_build_envs(options);
      /* step 28 */
      deploy.push_docker_image(options);
      /* step 29 */
      deploy.check_pushed_image(options);
      /* step 30 */
      deploy.clean_docker_image(options);
      /* step 31 */
      deploy.create_kustomize_env_vars(options);
      /* step 32 */
      deploy.build_kustomize(options);
      /* step 33 */
      deploy.check_kustomize(options);
      /* step 34 */
      deploy.deploy_kubernetes(options);
      /* step 35 */
      deploy.clean_kustomize(options);
      /* step 36 */
      deploy.check_deployment(options);
    });
  commander_1.program.parse(process.argv);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
}
catch (e) {
  helpers.log("\x1b[31m", `\nISSUE: ${e.message}`);
  process.exit(1);
}
