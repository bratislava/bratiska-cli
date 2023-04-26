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
exports.load_package = exports.game_over = exports.star_wars = exports.assign_env_vars = exports.is_deployment_image = exports.is_master_image = exports.map_cluster_to_env = exports.check_ports = exports.capitalize = exports.pull_secret_name = exports.kustomize_folder_base = exports.docker_ignore_path = exports.docker_build_next_env = exports.bratiska_cli_build_dot_env_path = exports.bratiska_cli_build_env_filename = exports.kustomize_folder_path = exports.dockerfile_path = exports.manifest_path = exports.manifest = exports.image_latest_tag = exports.latest_tag = exports.tag = exports.image_tag = exports.image = exports.message = exports.print_line_if_debug = exports.print_if_debug_bash = exports.print_if_debug = exports.print_debug = exports.print_info_line = exports.print_info = exports.print_error_line_spacer = exports.print_error_line = exports.print_error = exports.print_warning_line = exports.print_warning = exports.print_important_info_line = exports.print_important_info_spacer = exports.print_important_info = exports.print_command = exports.br = exports.finished = exports.not_present = exports.skipping = exports.ok = exports.spacer_log = exports.spacer_line = exports.spacer = exports.line = exports.log = void 0;
exports.kind_to_app = exports.sleep = exports.get_final_branch = exports.tag_value = exports.calculate_version_diff = exports.is_allowed_env = exports.step = exports.print_options = exports.load_json = void 0;
const chalk_1 = __importDefault(require("chalk"));
const clear_1 = __importDefault(require("clear"));
const figlet_1 = __importDefault(require("figlet"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const compare_versions_1 = require("compare-versions");
const commands = __importStar(require("./commands"));
const crypto_1 = __importDefault(require("crypto"));
const ALLOWED_ENVIRONMENTS = [
  "dev",
  "staging",
  "prod",
  "build_image",
  "build_kustomize"
];
exports.log = console.log.bind(console);
function line(content) {
  process.stdout.write("\x1b[37m" + content);
}
exports.line = line;
function spacer() {
  return "    ";
}
exports.spacer = spacer;
function spacer_line(content) {
    return line(spacer() + content);
}
exports.spacer_line = spacer_line;
function spacer_log(content) {
  return line("\n" + spacer() + content);
}
exports.spacer_log = spacer_log;
function ok() {
  (0, exports.log)(chalk_1.default.green(" OK"));
}
exports.ok = ok;
function skipping() {
  (0, exports.log)(chalk_1.default.yellow(" SKIPPING"));
}
exports.skipping = skipping;
function not_present() {
  line(chalk_1.default.yellow(" NOT PRESENT"));
}
exports.not_present = not_present;
function finished() {
    (0, exports.log)(chalk_1.default.green(' FINISHED'));
}
exports.finished = finished;
function br() {
    (0, exports.log)('\n');
}
exports.br = br;
function print_command(cmd) {
    (0, exports.log)(chalk_1.default.yellow(cmd));
}
exports.print_command = print_command;
function print_important_info(cmd) {
    (0, exports.log)(chalk_1.default.green(cmd));
}
exports.print_important_info = print_important_info;
function print_important_info_spacer(cmd) {
    (0, exports.log)(chalk_1.default.green(spacer() + cmd));
}
exports.print_important_info_spacer = print_important_info_spacer;
function print_important_info_line(cmd) {
    process.stdout.write(chalk_1.default.green(cmd));
}
exports.print_important_info_line = print_important_info_line;
function print_warning(cmd) {
    (0, exports.log)(chalk_1.default.yellow(cmd));
}
exports.print_warning = print_warning;
function print_warning_line(cmd) {
    process.stdout.write(chalk_1.default.yellow(cmd));
}
exports.print_warning_line = print_warning_line;
function print_error(cmd) {
    (0, exports.log)(chalk_1.default.red(cmd));
}
exports.print_error = print_error;
function print_error_line(cmd) {
    process.stdout.write(chalk_1.default.red(cmd));
}
exports.print_error_line = print_error_line;
function print_error_line_spacer(cmd) {
    print_error_line(spacer() + cmd);
}
exports.print_error_line_spacer = print_error_line_spacer;
function print_info(cmd) {
    (0, exports.log)(chalk_1.default.grey(cmd));
}
exports.print_info = print_info;
function print_info_line(cmd) {
    process.stdout.write(chalk_1.default.grey(cmd));
}
exports.print_info_line = print_info_line;
function print_debug(cmd) {
    process.stdout.write(chalk_1.default.cyan(`DEBUG: ${cmd}\n`));
}
exports.print_debug = print_debug;
function print_if_debug(options, cmd) {
    if (options.debug) {
        print_debug(cmd);
    }
}
exports.print_if_debug = print_if_debug;
function print_if_debug_bash(options, name, bash) {
    print_if_debug(options, `${name}.res: ${bash.res}, ${name}.err: ${bash.err} `);
}
exports.print_if_debug_bash = print_if_debug_bash;
function print_line_if_debug(options, content) {
    if (options.debug) {
      process.stdout.write("\x1b[37m" + content);
    }
}
exports.print_line_if_debug = print_line_if_debug;
function message(content) {
    (0, exports.log)(chalk_1.default.white(content));
}
exports.message = message;
function image(options) {
    let image = `${options.registry}/`;
    if (options.namespace) {
        image += `${options.namespace}/`;
    }
    image += `${options.deployment}`;
    return image;
}
exports.image = image;
function image_tag(options) {
    if (options.image) {
        options.image = options.image;
        return options.image;
    }
    return `${image(options)}:${tag(options)}`;
}
exports.image_tag = image_tag;
function tag(options) {
  if (options.tag !== false) {
    return options.tag;
  }
  if (options.image) {
    options.image = options.image;
    const tmp_split = options.image.split(":");
    return tmp_split[1];
  }
  let untracked = "";
  let pipelines = "";
  let commit = "";
  let tag = "";
  let branch = "-" + options.branch;
  if (options.untracked) {
    untracked = "-untracked";
  }
  if (options.branch === "origin/master") {
    branch = "";
  }
  if (options.commit) {
    commit = `-${options.commit}`;
  }
  let force_rebuild = "";
  if (options.force_rebuild) {
    force_rebuild = "-force-rebuild-" + crypto_1.default.randomBytes(20).toString("hex");
  }
  if (options.pipelines) {
    pipelines = "-pipelines";
  }
  if (options.gittag) {
    tag = `-tag-${options.gittag}`;
  }
  let tag_value = `bratiska-cli-v${options.bratiska_cli_version}${pipelines}${untracked}${force_rebuild}${branch}${commit}${tag}-v${options.version}`;
  tag_value = tag_value.replace(" ", "-");
  tag_value = tag_value.replace(/[#@/\\_]/g, "-");
  tag_value = tag_value.replace(/-+/g, "-");
  return tag_value.substring(0, 128);
}
exports.tag = tag;
function latest_tag(options) {
    return `${options.env}-latest`;
}
exports.latest_tag = latest_tag;
function image_latest_tag(options) {
    if (options.image) {
        return options.image;
    }
    return `${image(options)}:${latest_tag(options)}`;
}
exports.image_latest_tag = image_latest_tag;
function manifest(options) {
    return `manifest-${tag(options)}.yaml`;
}
exports.manifest = manifest;
function manifest_path(options) {
    return `${options.pwd}/${manifest(options)}`;
}
exports.manifest_path = manifest_path;
function dockerfile_path(options) {
    return `${options.pwd}/Dockerfile`;
}
exports.dockerfile_path = dockerfile_path;
function kustomize_folder_path(options) {
    return `${options.pwd}/kubernetes/envs/${capitalize(options.env)}`;
}
exports.kustomize_folder_path = kustomize_folder_path;
function bratiska_cli_build_env_filename(options) {
    return `.env.bratiska-cli-build.${options.env}`;
}
exports.bratiska_cli_build_env_filename = bratiska_cli_build_env_filename;
function bratiska_cli_build_dot_env_path(options) {
    return `${options.pwd}/${bratiska_cli_build_env_filename(options)}`;
}
exports.bratiska_cli_build_dot_env_path = bratiska_cli_build_dot_env_path;
function docker_build_next_env(options) {
    return `${options.pwd}/.env.production.local`;
}
exports.docker_build_next_env = docker_build_next_env;
function docker_ignore_path(options) {
    return `${options.pwd}/.dockerignore`;
}
exports.docker_ignore_path = docker_ignore_path;
function kustomize_folder_base(options) {
    return `${options.pwd}/kubernetes/base`;
}
exports.kustomize_folder_base = kustomize_folder_base;
function pull_secret_name(options) {
    return `harbor-secret-${options.env}-${options.namespace}-bratiska-cli`;
}
exports.pull_secret_name = pull_secret_name;
function capitalize(s) {
  if (typeof s !== "string")
    return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}
exports.capitalize = capitalize;
function check_ports(options) {
  const env_path_specific = kustomize_folder_path(options) + "/.env";
  const env_path_base = kustomize_folder_base(options) + "/.env";
  const env_path_main = options.pwd + "/.env";
  print_if_debug(options, `env_path_specific: ${env_path_specific}`);
  print_if_debug(options, `env_path_base: ${env_path_base}`);
  print_if_debug(options, `env_path_main: ${env_path_main}`);
  print_if_debug(options, `local terminal env['PORT']: ${process.env["PORT"]}`);
  dotenv_1.default.config({ path: env_path_main });
  print_if_debug(options, `env_path_main env['PORT']: ${process.env["PORT"]}`);
  dotenv_1.default.config({ override: true, path: env_path_base });
  print_if_debug(options, `env_path_base env['PORT']: ${process.env["PORT"]}`);
  dotenv_1.default.config({ override: true, path: env_path_specific });
  print_if_debug(options, `env_path_specific env['PORT']: ${process.env["PORT"]}`);
  if (typeof process.env["PORT"] === "undefined") {
    options.app_port = "3000";
    line(` using default app port `);
    print_important_info_line(`PORT=${options.app_port}`);
    line(`...`);
  } else {
    options.app_port = process.env["PORT"];
    line(` using app port from env `);
    print_important_info_line(`PORT=${options.app_port}`);
    line(`...`);
  }
}
exports.check_ports = check_ports;
function map_cluster_to_env(cluster) {
    cluster = cluster.trim();
    if (cluster.trim() === 'tkg-master') {
        throw new Error('Deploying to cluster tkg-master is not supported! Sorry :(');
    }
    const parts = cluster.split('-');
    return parts[2];
}
exports.map_cluster_to_env = map_cluster_to_env;
function is_master_image(options) {
    if (options.image) {
        options.image = options.image;
      return options.image.includes("master");
    }
    return false;
}
exports.is_master_image = is_master_image;
function is_deployment_image(options) {
    if (options.image) {
        options.image = options.image;
        return options.image.includes(options.deployment);
    }
    return false;
}
exports.is_deployment_image = is_deployment_image;
function assign_env_vars(options) {
  if (options.image) {
    options.repository_uri = "using_external_image";
    options.commit = "using_external_image";
  }
  if (!options.repository_uri) {
    throw new Error("Git repository URI cannot be false!");
  }
  if (!options.commit) {
    throw new Error("Git Commit cannot be false!");
  }
  if (!options.namespace) {
    throw new Error("Namespace have to be filled! Please use --namespace <namespace_name> for defining namespace in kubernetes.\n");
  }
  if (!options.deployment) {
    throw new Error("Deployment names have to be filled! Please use --deployment <deployment_name> for defining deployment name.\n");
  }
  if (!options.host) {
    throw new Error("The host has to be filled! Please use --host <host> for deployment URL host.\n");
  }
  if (!options.registry) {
    throw new Error("The registry has to be filled! Please use --registry <registry_url>.");
  }
  if (!options.namespace) {
    throw new Error("Namespace has to be filled! Please use --namespace <namespace>.");
  }
  if (image_tag(options) === "//") {
    throw new Error("Image have to be filled! Please use --image <image_tag>.");
  }
  if (!process.env["BUILD_REPOSITORY_URI"]) {
    process.env["BUILD_REPOSITORY_URI"] = options.repository_uri;
    print_if_debug(options, `BUILD_REPOSITORY_URI=${process.env["BUILD_REPOSITORY_URI"]}`);
  }
  if (!process.env["BUILD_REPOSITORY_NAME"]) {
    process.env["BUILD_REPOSITORY_NAME"] = options.deployment;
    print_if_debug(options, `BUILD_REPOSITORY_NAME=${process.env["BUILD_REPOSITORY_NAME"]}`);
  }
  if (!process.env["DEPLOYMENT_ENV"]) {
    process.env["DEPLOYMENT_ENV"] = options.deployment_env;
    print_if_debug(options, `DEPLOYMENT_ENV=${process.env["DEPLOYMENT_ENV"]}`);
  }
  if (!process.env["ENV"]) {
    process.env["ENV"] = options.env;
    print_if_debug(options, `ENV=${process.env["ENV"]}`);
  }
  if (!process.env["HOSTNAME"]) {
    process.env["HOSTNAME"] = options.host;
    print_if_debug(options, `HOSTNAME=${process.env["HOSTNAME"]}`);
  }
  // sometimes raw HOSTNAME cannot be used, therefore we have this placeholder
  if (!process.env["BRATISKA_HOSTNAME"]) {
    process.env["BRATISKA_HOSTNAME"] = options.host;
    print_if_debug(options, `HOSTNAME=${process.env["BRATISKA_HOSTNAME"]}`);
  }
  if (!process.env["IMAGE_TAG"]) {
    process.env["IMAGE_TAG"] = image_tag(options);
    print_if_debug(options, `IMAGE_TAG=${process.env["IMAGE_TAG"]}`);
  }
  if (!process.env["IMAGE"]) {
    process.env["IMAGE"] = image(options);
    print_if_debug(options, `IMAGE=${process.env["IMAGE"]}`);
  }
  if (!process.env["TAG"]) {
    process.env["TAG"] = tag(options);
    print_if_debug(options, `TAG=${process.env["TAG"]}`);
  }
  if (!process.env["GIT_TAG"]) {
    process.env["GIT_TAG"] = options.gittag;
    print_if_debug(options, `GIT_TAG=${process.env["GIT_TAG"]}`);
  }
  if (!process.env["COMMIT"]) {
    process.env["COMMIT"] = options.commit;
    print_if_debug(options, `COMMIT=${process.env["COMMIT"]}`);
  }
  if (!process.env["NAMESPACE"]) {
    process.env["NAMESPACE"] = options.namespace;
    print_if_debug(options, `NAMESPACE=${process.env["NAMESPACE"]}`);
  }
  if (!process.env["IMAGE_PULL_SECRET"]) {
    process.env["IMAGE_PULL_SECRET"] = pull_secret_name(options);
    print_if_debug(options, `IMAGE_PULL_SECRET=${process.env["IMAGE_PULL_SECRET"]}`);
  }
  if (!process.env["INTERNAL_APP_PORT"]) {
    process.env["INTERNAL_APP_PORT"] = options.app_port;
    print_if_debug(options, `INTERNAL_APP_PORT=${process.env["INTERNAL_APP_PORT"]}`);
  }
  if (typeof options.envs !== "undefined") {
    for (const [env_name, env_value] of Object.entries(options.envs)) {
      process.env[env_name.toUpperCase()] = env_value;
      print_if_debug(options, `${env_name.toUpperCase()}=${process.env[env_name.toUpperCase()]}`);
    }
  }
}
exports.assign_env_vars = assign_env_vars;
function star_wars() {
    (0, clear_1.default)();
    console.log(chalk_1.default.black(figlet_1.default.textSync('Star Wars', { horizontalLayout: 'full' })), '\n', chalk_1.default.red('MAY THE FORCE BE WITH YOU! SECURITY CHECKS ARE DISABLED! YOU SHOULD KNOW WHAT YOU ARE DOING!'));
}
exports.star_wars = star_wars;
function game_over() {
    return ('\n' +
        figlet_1.default.textSync('Game Over', { horizontalLayout: 'full' }) +
        '\n Wrong password for using a --force! It would help if you did not use this option. Incident reported.');
}
exports.game_over = game_over;
function load_package(options) {
    if (typeof options === 'undefined') {
      const pwd = commands.pwd();
      if (pwd === "") {
        throw new Error("There was an issue getting the current working directory!");
      }
      options = {
        app_port: "",
        cluster: "",
        commit: "",
        deployment: "",
        deployment_env: "",
        env: "",
        host: "",
        namespace: "",
        registry: "",
        repository_uri: "",
        step: 0,
        pwd: pwd,
        kustomize_kinds: []
      };
    }
    const path = options.pwd + '/package.json';
    if (!fs_1.default.existsSync(path)) {
        throw new Error('We haven`t found package.json in path: ' + path);
    }
    return load_json(path);
}
exports.load_package = load_package;
function load_json(path) {
    if (!fs_1.default.existsSync(path)) {
        return false;
    }
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require(path);
    }
    catch (e) {
        throw new Error('There was an issue with json file on path: ' + path + ' \n Error' + e);
    }
}
exports.load_json = load_json;
function print_options(options) {
    if (options.staging) {
      print_important_info_spacer("--staging");
    }
    if (options.production) {
      print_important_info_spacer("--production");
    }
    if (options.beta) {
        print_important_info_spacer(`--beta`);
    }
    if (options.debug) {
      print_important_info_spacer("--debug");
    }
    if (options.no_image_repo_check) {
      print_important_info_spacer("--no_image_repo_check");
    }
    if (options.dry_run) {
      print_important_info_spacer("--dry_run");
    }
    if (options.force) {
      print_important_info_spacer("--force");
    }
    if (options.build_kustomize) {
      print_important_info_spacer("--build_kustomize");
    }
    if (options.force_rebuild) {
      print_important_info_spacer("--force_rebuild");
    }
    if (options.build_image) {
      print_important_info_spacer("--build_image");
    }
    if (options.build_image_no_registry) {
      print_important_info_spacer("--build_image_no_registry");
    }
    if (options.no_pull) {
      print_important_info_spacer("--no_pull");
    }
    if (options.recreate) {
        print_important_info_spacer(`--recreate`);
    }
    if (options.delete) {
        print_important_info_spacer(`--delete`);
    }
    if (options.feature) {
        print_important_info_spacer(`--feature`);
    }
    if (options.major) {
        print_important_info_spacer(`--major`);
    }
    if (options.local) {
        print_important_info_spacer(`--local`);
    }
    if (options.env) {
        print_important_info_spacer(`--env=${options.env}`);
    }
    if (options.tech) {
        print_important_info_spacer(`--tech=${options.tech}`);
    }
    if (options.tag) {
        print_important_info_spacer(`--tag=${options.tag}`);
    }
    if (options.deployment) {
        print_important_info_spacer(`--deployment=${options.deployment}`);
    }
    if (options.kubectl_timeout) {
        print_important_info_spacer(`--kubectl_timeout=${options.kubectl_timeout}`);
    }
    if (options.version) {
        print_important_info_spacer(`--version=${options.version}`);
    }
    if (options.image) {
        print_important_info_spacer(`--image=${options.image}`);
    }
    if (options.kustomize) {
        print_important_info_spacer(`--kustomize=${options.kustomize}`);
    }
    if (options.namespace) {
        print_important_info_spacer(`--namespace=${options.namespace}`);
    }
    if (options.host) {
        print_important_info_spacer(`--host=${options.host}`);
    }
    if (options.registry) {
        print_important_info_spacer(`--registry=${options.registry}`);
    }
}
exports.print_options = print_options;
function step(options) {
    options.step++;
    return options.step;
}
exports.step = step;
function is_allowed_env(env) {
    return ALLOWED_ENVIRONMENTS.includes(env);
}
exports.is_allowed_env = is_allowed_env;
function increment_bug(version) {
  const terms = version.split(".").map(function(e) {
    return parseInt(e);
  });
  if (terms.length != 3) {
    return version;
  }
  if (++terms[2] > 9) {
    ++terms[1];
    terms[2] = 0;
  }
  return terms.join(".");
}
function calculate_version_diff(v1, v2) {
  const v1_terms = v1.split(".").map(function(e) {
    return parseInt(e);
  });
  const v2_terms = v2.split(".").map(function(e) {
    return parseInt(e);
  });
  if (v1_terms.length != 3 || v2_terms.length != 3) {
    return 0;
  }
  return ((v2_terms[0] - v1_terms[0]) * 100 +
    (v2_terms[1] - v1_terms[1]) * 10 +
    (v2_terms[2] - v1_terms[2]));
}
exports.calculate_version_diff = calculate_version_diff;
function increment_feature(version) {
  const terms = version.split(".").map(function(e) {
    return parseInt(e);
  });
  if (terms.length != 3) {
    return version;
  }
  if (++terms[1] > 9) {
    ++terms[0];
    terms[1] = 0;
    terms[2] = 0;
  } else {
    terms[2] = 0;
  }
  return terms.join(".");
}
function increment_major(version) {
  return [parseInt(version.split(".")[0]) + 1, 0, 0].join(".");
}
function tag_overridden_message(options) {
    print_warning_line(`\n${spacer()}Automatically generated tag was overridden by --tag: `);
    print_warning_line(` '`);
    print_important_info_line(options.tag);
    print_warning_line(`'`);
}
function tag_new_message(tag_text) {
    print_warning_line(`\n${spacer()}This is the first tag with this format: `);
    print_important_info_line(tag_text);
    print_warning_line(` in this repository. Taking and incrementing a version from 'prod'.`);
}
function tag_value_dev(options) {
  let tag_value = "";
  tag_value = options.env;
  if (options.tech !== false) {
    tag_value += `-${options.tech}`;
  }
  tag_value += `-${options.branch}`;
  tag_value += `-${options.commit_short}`;
  tag_value += `-${options.user_name}`;
  tag_value = tag_value.replace(" ", "-");
  tag_value = tag_value.replace(/[#@/\\_]/g, "-");
  tag_value = tag_value.replace(/-+/g, "-");
  return tag_value.substring(0, 64);
}
function tag_get_latest_version(options, tag) {
  const tag_format = tag + `[0-9]\.[0-9]\.[0-9]*`;
  const last_tag = commands.git_get_last_remote_tags(options, tag_format);
  print_if_debug(options, `tag_get_latest_version tag: ${tag} and result is: ${last_tag}`);
  if (last_tag === "") {
    return false;
  }
  return last_tag.replace(tag, "");
}
function tag_value_staging(options) {
  if (options.branch !== "master") {
    print_warning_line("Be aware, you are not on master branch! We don`t recommend to deploy to staging from other branches than master.");
  }
  let tag_text = options.env;
  if (options.tech !== false) {
    tag_text += `-${options.tech}`;
  }
  let latest_main_version = tag_get_latest_version(options, "prod");
  let latest_tag_version = tag_get_latest_version(options, tag_text);
  if (latest_main_version === false) {
    latest_main_version = "0.0.0";
  }
  if (latest_tag_version === false) {
    if (options.delete) {
      return tag_text;
    }
    latest_tag_version = "0.0.0";
    tag_new_message(tag_text);
  }
  if (options.delete) {
    return tag_text + latest_tag_version;
  }
  let new_tag_version = "";
  print_if_debug(options, `latest_main_version: ${(latest_main_version)}, latest_tag_version: ${latest_tag_version}`);
  const compare_result = (0, compare_versions_1.compareVersions)(latest_main_version, latest_tag_version);
  switch (compare_result) {
    case 1:
      new_tag_version = latest_main_version;
      break;
    case -1:
      new_tag_version = latest_tag_version;
      break;
    default:
      new_tag_version = latest_main_version;
      break;
  }
  if (options.major === true) {
    return tag_text + increment_major(new_tag_version);
  }
  if (options.feature === true) {
    return tag_text + increment_feature(new_tag_version);
  }
  return tag_text + increment_bug(new_tag_version);
}
function tag_value_prod(options) {
  if (options.branch !== "master") {
    throw new Error(`You need to be on the 'master' branch to be able tag in prod environment. Currently you are on: '${options.branch}'`);
  }
  return tag_value_staging(options);
}
function tag_value(options) {
  let tag_value = "";
  if (options.tag !== false) {
    if (options.env !== "") {
      tag_overridden_message(options);
    }
    return options.tag;
  }
  switch (options.env) {
    case "dev":
      tag_value = tag_value_dev(options);
      break;
    case "staging":
      tag_value = tag_value_staging(options);
      break;
    case "prod":
      tag_value = tag_value_prod(options);
      break;
  }
  return tag_value;
}
exports.tag_value = tag_value;
function get_final_branch(options, branch_list_in_string) {
  print_if_debug(options, `branch_list_in_string: ${branch_list_in_string}`);
  const branch_list_dirty = branch_list_in_string.split(/\r?\n/);
  const branch_list = branch_list_dirty.filter((e) => !e.includes("HEAD"));
  print_if_debug(options, `branch_list flattened: ${branch_list.flat()}`);
  print_if_debug(options, `branch_list.length: ${branch_list.length}`);
  const is_master = branch_list.findIndex((e) => e.includes("master"));
  print_if_debug(options, `branch_list has master?: ${is_master}`);
  if (branch_list.length > 0) {
    if (is_master !== -1) {
      return "master";
    } else {
      return branch_list[0];
    }
  }
  return false;
}
exports.get_final_branch = get_final_branch;
function sleep(time) {
    const stop = new Date().getTime();
  while (new Date().getTime() < stop + time) {
  }
}
exports.sleep = sleep;
function kind_to_app(kind) {
  switch (kind) {
    case "deployment":
      return "app";
    case "statefulset":
      return "database";
  }
}
exports.kind_to_app = kind_to_app;
