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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const clear_1 = __importDefault(require("clear"));
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = require("commander");
const steps_1 = require("./steps");
const helpers = __importStar(require("./helpers"));
const version = "1.5.72";
const steps = new steps_1.Steps();
try {
  (0, clear_1.default)();
  console.log(chalk_1.default.blue(figlet_1.default.textSync("Bratiska-cli", { horizontalLayout: "full" })));
  commander_1.program
    .name("bratiska-cli")
    .version(version)
    .description("Simple Bratiska-cli utility for managing Bratislava Innovation apps")
    .action((commandAndOptions) => {
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
    .option("-build_image_no_registry, --build_image_no_registry", "Don`t push to rezgistry")
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
    .option("-force, --force <pass>", "Force")
    .action((options) => {
      steps.show_version_01(options, version);
      steps.show_options_0(options);
      steps.check_git_resources_1(options);
      steps.check_kubernetes_cluster_2(options);
      steps.check_kubernetes_connection_3(options);
      steps.check_kubernetes_enviroment_4(options);
      options = steps.check_kubernetes_enviroment_configuration_45(options);
      steps.check_kubernetes_cluster_conditions_5(options);
      steps.check_hosts_6(options);
      steps.check_ports_numbers_65(options);
      steps.check_kubernetes_harbor_key_7(options);
      steps.check_docker_75(options);
      steps.check_docker_8();
      steps.check_docker_running_81(options);
      steps.check_docker_login_89(options);
      steps.build_docker_image_9(options);
      steps.check_docker_image_10(options);
      steps.push_docker_image_11(options);
      steps.check_pushed_image_12(options);
      steps.clean_docker_image_13(options);
      steps.create_env_vars_15(options);
      steps.build_kustomize_16(options);
      steps.check_kustomize_17(options);
      steps.deploy_kubernetes_18(options);
      steps.clean_kustomize_19(options);
      steps.check_deployment_20(options);
    });
  commander_1.program.parse(process.argv);
}
catch (e) {
  helpers.log("");
  helpers.log("\x1b[31m", `HOUSTON, WE HAVE A PROBLEM: ${e.message}`);
  process.exit(1);
}
