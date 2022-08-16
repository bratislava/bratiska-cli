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
const helpers = __importStar(require("./helpers"));
const version = "1.5.90";
const deploy = new deploy_1.Deploy();
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
    .command("deploy")
    .summary("Deploy to kubernetes")
    .description("If you need to deploy app to kubernetes, this is tool for you")
    //.argument('[source_path]', 'Path to main folder for app')
    .option("-build_image, --build_image", "Build image only.")
    .option("-force_rebuild, --force_rebuild", "Forcing image rebuild.")
    .option("-build_image_no_registry, --build_image_no_registry", "Don`t push to registry")
    .option("-build_kustomize, --build_kustomize", "Build kustomize file only.")
    .option("-dry_run, --dry_run", "Run without deploying to kubernetes")
    .option("-k, --kustomize <file_or_direcotry>", "Specify kustomize file or kustomize directory")
    .option("-i, --image <url>", "Specify image from harbour via url")
    .option("-n, --namespace <namespace>", "Namespace", "standalone")
    .option("-d, --deployment <deployment>", "Deployment app")
    .option("-h, --host <host>", "Host url address")
    .option("-e, --env <env>", "Deployment environment")
    .option("-r, --registry <url>", "Docker image registry url", "harbor.bratislava.sk")
    .option("-staging, --staging", "To deploy on staging, you need to add this flag.")
    .option("-production, --production", "To deploy on production, you need to add this flag.")
    .option("-debug, --debug", "Debuging")
    .option("-beta, --beta", "Beta features")
    .option("-no-image-repo-check, --no-image-repo-check", "No Image repository check")
    .option("-force, --force <pass>", "Force")
    .action((options) => {
      /* step 0 */
      deploy.show_version(options, version);
      /* step 1 */
      deploy.show_options(options);
      /* step 2 */
      deploy.check_git_resources(options);
      /* step 3 */
      deploy.check_kubernetes_cluster(options);
      /* step 4 */
      deploy.check_kubernetes_connection(options);
      /* step 5 */
      deploy.check_kubernetes_enviroment(options);
      /* step 6 */
      options = deploy.check_kubernetes_enviroment_configuration(options);
      /* step 7 */
      deploy.check_kubernetes_cluster_conditions(options);
      /* step 8 */
      deploy.check_hosts(options);
      /* step 9 */
      deploy.check_ports_numbers(options);
      /* step 10 */
      deploy.check_kubernetes_harbor_key(options);
      /* step 11 */
      deploy.check_docker_file(options);
      /* step 12 */
      deploy.check_docker(options);
      /* step 13 */
      deploy.check_docker_running(options);
      /* step 14 */
      deploy.check_docker_login(options);
      /* step 15 */
      deploy.check_bratiska_build_envs(options);
      /* step 16 */
      deploy.build_docker_image(options);
      /* step 17 */
      deploy.check_docker_image(options);
      /* step 18 */
      deploy.clean_bratiska_build_envs(options);
      /* step 19 */
      deploy.push_docker_image(options);
      /* step 20 */
      deploy.check_pushed_image(options);
      /* step 21 */
      deploy.clean_docker_image(options);
      /* step 22 */
      deploy.create_kustomize_env_vars(options);
      /* step 23 */
      deploy.build_kustomize(options);
      /* step 24 */
      deploy.check_kustomize(options);
      /* step 25 */
      deploy.deploy_kubernetes(options);
      /* step 26 */
      deploy.clean_kustomize(options);
      /* step 27 */
      deploy.check_deployment(options);
    });
  commander_1.program.parse(process.argv);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
}
catch (e) {
  helpers.log("");
  helpers.log("\x1b[31m", `HOUSTON, WE HAVE A PROBLEM: ${e.message}`);
  process.exit(1);
}
