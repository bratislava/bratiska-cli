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
exports.print_options = exports.load_json = exports.load_package = exports.game_over = exports.star_wars = exports.assign_env_vars = exports.is_master_image = exports.map_cluster_to_env = exports.check_ports = exports.capitalize = exports.pull_secret_name = exports.kustomize_folder_base = exports.kustomize_folder_path = exports.dockerfile_path = exports.manifest_path = exports.manifest = exports.tag = exports.image_tag = exports.image = exports.message = exports.print_line_if_debug = exports.print_if_debug = exports.print_debug = exports.print_info_line = exports.print_info = exports.print_warning = exports.print_important_info_line = exports.print_important_info = exports.print_command = exports.br = exports.finished = exports.not_present = exports.skipping = exports.ok = exports.line = exports.log = void 0;
const chalk_1 = __importDefault(require("chalk"));
const clear_1 = __importDefault(require("clear"));
const figlet_1 = __importDefault(require("figlet"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const commands = __importStar(require("./commands"));
const crypto_1 = __importDefault(require("crypto"));
exports.log = console.log.bind(console);
function line(content) {
    process.stdout.write("\x1b[37m" + content);
}
exports.line = line;
function ok() {
  (0, exports.log)(chalk_1.default.green(" OK"));
}
exports.ok = ok;
function skipping() {
  (0, exports.log)(chalk_1.default.yellow(" SKIPPING"));
}
exports.skipping = skipping;
function not_present() {
  (0, exports.log)(chalk_1.default.yellow(" NOT PRESENT"));
}
exports.not_present = not_present;
function finished() {
  (0, exports.log)(chalk_1.default.green(" FINISHED"));
}
exports.finished = finished;
function br() {
  (0, exports.log)("\n");
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
function print_important_info_line(cmd) {
    process.stdout.write(chalk_1.default.green(cmd));
}
exports.print_important_info_line = print_important_info_line;
function print_warning(cmd) {
    (0, exports.log)(chalk_1.default.yellow(cmd));
}
exports.print_warning = print_warning;
function print_info(cmd) {
    (0, exports.log)(chalk_1.default.grey(cmd));
}
exports.print_info = print_info;
function print_info_line(cmd) {
    process.stdout.write(chalk_1.default.grey(cmd));
}
exports.print_info_line = print_info_line;
function print_debug(cmd) {
    process.stdout.write(chalk_1.default.cyan(`\nDEBUG: ${cmd}\n`));
}
exports.print_debug = print_debug;
function print_if_debug(options, cmd) {
    if (options.debug) {
        print_debug(cmd);
    }
}
exports.print_if_debug = print_if_debug;
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
    return `${options.registry}/${options.namespace}/${options.deployment}`;
}
exports.image = image;
function image_tag(options) {
    if (options.image) {
        return options.image;
    }
    return `${image(options)}:${tag(options)}`;
}
exports.image_tag = image_tag;
function tag(options) {
  if (options.image) {
    const tmp_split = options.image.split(":");
    return tmp_split[1];
  }
  let untracked = "";
  let branch = "-" + options.branch;
  if (options.untracked) {
    untracked = "-untracked";
  }
  if (options.branch === "origin/master") {
    branch = "";
  }
  let force_rebuild = "";
  if (options.force_rebuild) {
    force_rebuild = "-force-rebuild-" + crypto_1.default.randomBytes(20).toString("hex");
  }
  branch = branch.replace(/\//g, "");
  return `bratiska-cli-${options.commit}${branch}${untracked}${force_rebuild}`;
}
exports.tag = tag;
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
  print_if_debug(options, process.env["PORT"]);
  dotenv_1.default.config({ path: env_path_main });
  print_if_debug(options, process.env["PORT"]);
  dotenv_1.default.config({ override: true, path: env_path_base });
  print_if_debug(options, process.env["PORT"]);
  dotenv_1.default.config({ override: true, path: env_path_specific });
  print_if_debug(options, process.env["PORT"]);
  if (typeof process.env["PORT"] === "undefined") {
    options.app_port = 3000;
    line(` using default app port `);
    print_important_info_line(`'PORT' = '${options.app_port}'`);
    line(`...`);
  } else {
    options.app_port = process.env["PORT"];
    line(` using app port from env `);
    print_important_info_line(`'PORT' = '${options.app_port}'`);
    line(`...`);
  }
}
exports.check_ports = check_ports;
function map_cluster_to_env(cluster) {
  cluster = cluster.trim();
  if (cluster.trim() === "tkg-master") {
    throw new Error("Deploying to cluster tkg-master is not supported! Sorry :(");
  }
  const parts = cluster.split("-");
  return parts[2];
}
exports.map_cluster_to_env = map_cluster_to_env;
function is_master_image(options) {
    if (options.image) {
      return options.image.includes("master");
    }
    return false;
}
exports.is_master_image = is_master_image;
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
  }
  if (!process.env["BUILD_REPOSITORY_NAME"]) {
    process.env["BUILD_REPOSITORY_NAME"] = options.deployment;
  }
  if (!process.env["DEPLOYMENT_ENV"]) {
    process.env["DEPLOYMENT_ENV"] = options.deployment_env;
  }
  if (!process.env["HOSTNAME"]) {
    process.env["HOSTNAME"] = options.host;
  }
  if (!process.env["IMAGE_TAG"]) {
    process.env["IMAGE_TAG"] = image_tag(options);
  }
  if (!process.env["IMAGE"]) {
    process.env["IMAGE"] = image(options);
  }
  if (!process.env["TAG"]) {
    process.env["TAG"] = tag(options);
  }
  if (!process.env["COMMIT"]) {
    process.env["COMMIT"] = options.commit;
  }
  if (!process.env["NAMESPACE"]) {
    process.env["NAMESPACE"] = options.namespace;
  }
  if (!process.env["IMAGE_PULL_SECRET"]) {
    process.env["IMAGE_PULL_SECRET"] = pull_secret_name(options);
  }
  if (!process.env["INTERNAL_APP_PORT"]) {
    process.env["INTERNAL_APP_PORT"] = options.app_port;
  }
}
exports.assign_env_vars = assign_env_vars;
function star_wars() {
  (0, clear_1.default)();
  console.log(chalk_1.default.black(figlet_1.default.textSync("Star Wars", { horizontalLayout: "full" })), "\n", chalk_1.default.red("MAY THE FORCE BE WITH YOU! SECURITY CHECKS ARE DISABLED! YOU SHOULD KNOW WHAT YOU ARE DOING!"));
}
exports.star_wars = star_wars;
function game_over() {
  return ("\n" +
    figlet_1.default.textSync("Game Over", { horizontalLayout: "full" }) +
    "\n Wrong password for using a --force! It would help if you did not use this option. Incident reported.");
}
exports.game_over = game_over;
function load_package(options) {
  if (typeof options === "undefined") {
    const pwd = commands.pwd();
    if (pwd === "") {
      throw new Error("There was an issue getting the current working directory!");
    }
    options = { pwd: pwd };
  }
  const path = options.pwd + "/package.json";
  if (!fs_1.default.existsSync(path)) {
    throw new Error("We haven`t found package.json in path: " + path);
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
  } catch (e) {
    throw new Error("There was an issue with json file on path: " + path + " \n Error" + e);
  }
}
exports.load_json = load_json;
function print_options(options) {
  if (options.staging) {
    print_important_info("--staging");
  }
  if (options.production) {
    print_important_info("--production");
  }
  if (options.debug) {
    print_important_info("--debug");
  }
  if (options.dry_run) {
    print_important_info("--dry_run");
  }
  if (options.force) {
    print_important_info("--force");
  }
  if (options.build_kustomize) {
    print_important_info("--build_kustomize");
  }
  if (options.force_rebuild) {
    print_important_info("--force_rebuild");
  }
  if (options.build_image) {
    print_important_info("--build_image");
  }
  if (options.build_image_no_registry) {
    print_important_info("--build_image_no_registry");
  }
  if (options.deployment) {
    print_important_info(`--deployment=${options.deployment}`);
  }
  if (options.version) {
    print_important_info(`--version=${options.version}`);
  }
  if (options.image) {
    print_important_info(`--image=${options.image}`);
  }
  if (options.kustomize) {
    print_important_info(`--kustomize=${options.kustomize}`);
  }
  if (options.namespace) {
    print_important_info(`--namespace=${options.namespace}`);
  }
  if (options.host) {
    print_important_info(`--host=${options.host}`);
  }
  if (options.registry) {
    print_important_info(`--registry=${options.registry}`);
  }
  if (options.env) {
    print_important_info(`--env=${options.env}`);
  }
}
exports.print_options = print_options;
