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
exports.kubectl_deployment_logs = exports.kubectl_deployment_events = exports.kubectl_deployment_status_utf8 = exports.kubectl_deployment_status_stdio = exports.kubect_apply_to_kubernetes = exports.kustomize_build_manifest = exports.get_bratiska_cli_git_package_json = exports.docker_running = exports.docker_login = exports.docker_check_image_in_registry = exports.docker_push_image = exports.docker_delete_image = exports.docker_check_image = exports.docker_tag = exports.docker_build = exports.docker = exports.kubectl_pull_secret = exports.kubectl_pods = exports.kubectl_pods_admin = exports.kubectl_cluster = exports.git_check_commit_remote = exports.git_repo_name = exports.git_current_status = exports.git_get_last_remote_tags = exports.git_origin_commit_tag = exports.git_push_tag = exports.git_delete_tag_origin = exports.git_delete_tag = exports.git_add_tag = exports.git_commit_tag = exports.git_current_commit_short = exports.git_current_commit = exports.git_fetch_origin = exports.git_repository_url = exports.git_branch_from_commit = exports.git_current_branch = exports.git_user_email = exports.git_user_name = exports.cd = exports.pwd = void 0;
const child_process_1 = __importStar(require("child_process"));
const helpers = __importStar(require("./helpers"));
const chalk_1 = __importDefault(require("chalk"));
const sync_request_1 = __importDefault(require("sync-request"));
function pwd() {
    let pwd = (0, child_process_1.execSync)("pwd", {
        encoding: "utf8"
    });
    pwd = pwd.trim();
    return pwd.replace(/\s/g, "\\ ");
}
exports.pwd = pwd;
function cd(path) {
    const cd = (0, child_process_1.execSync)(`cd ${path}`, {
        encoding: "utf8"
    });
    return cd.trim();
}
exports.cd = cd;
function git_user_name() {
    const result = child_process_1.default.spawnSync("git", ["config", "user.name"], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.git_user_name = git_user_name;
function git_user_email() {
    const result = child_process_1.default.spawnSync("git", ["config", "user.email"], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.git_user_email = git_user_email;
function git_current_branch() {
    const result = child_process_1.default.spawnSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.git_current_branch = git_current_branch;
function git_branch_from_commit(commit) {
    const result = child_process_1.default.spawnSync("git", [
        "branch",
        "--no-color",
        "--format",
        "\"%(refname:lstrip=2)\"",
        "--no-column",
        `--contains`,
        commit
    ], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.git_branch_from_commit = git_branch_from_commit;
function git_repository_url() {
    const result = child_process_1.default.spawnSync("git", ["config", "--get", "remote.origin.url"], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.git_repository_url = git_repository_url;
function git_fetch_origin() {
    const result = child_process_1.default.spawnSync("git", ["fetch", "origin"], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.git_fetch_origin = git_fetch_origin;
function git_current_commit() {
    const result = child_process_1.default.spawnSync("git", ["rev-parse", "HEAD"], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.git_current_commit = git_current_commit;
function git_current_commit_short() {
    const result = child_process_1.default.spawnSync("git", ["rev-parse", "--short", "HEAD"], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.git_current_commit_short = git_current_commit_short;
function git_commit_tag(commit) {
    const result = child_process_1.default.spawnSync("git", ["tag", "--contains", commit], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.git_commit_tag = git_commit_tag;
function git_add_tag(tag) {
    const result = child_process_1.default.spawnSync("git", ["tag", "-a", tag, "-m", tag], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.git_add_tag = git_add_tag;
function git_delete_tag(tag) {
    const result = child_process_1.default.spawnSync("git", ["tag", "-d", tag], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.git_delete_tag = git_delete_tag;
function git_delete_tag_origin(tag) {
    const result = child_process_1.default.spawnSync("git", ["push", "--delete", "origin", tag], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.git_delete_tag_origin = git_delete_tag_origin;
function git_push_tag(tag) {
    const result = child_process_1.default.spawnSync("git", ["push", "origin", tag], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.git_push_tag = git_push_tag;
function git_origin_commit_tag(tag) {
    const result = child_process_1.default.spawnSync("git", ["ls-remote", "origin", "--contains", `"refs/tags/${tag}"`], {
        encoding: "utf8"
    });
    console.log(`"refs/tags/${tag}"`);
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.git_origin_commit_tag = git_origin_commit_tag;
function git_get_last_remote_tags(options, tag_format) {
    // let tag_format = "v[0-9]\.[0-9]\.[0-9]*"
    const cmd = `git ls-remote origin --contains "refs\/tags\/${tag_format}" | grep ".*[^}]$" | cut -f 2 | tail -n1 | awk '{gsub(/refs\\/tags\\//,"")}1'`;
    helpers.print_if_debug(options, cmd);
    const last_tag = (0, child_process_1.execSync)(cmd, { encoding: "utf8" });
    return last_tag.trim();
}
exports.git_get_last_remote_tags = git_get_last_remote_tags;
function git_current_status(options) {
    const result = child_process_1.default.spawnSync("git", ["status", "-s"], {
        encoding: "utf8"
    });
    helpers.print_if_debug(options, "Untracked changes: " + result.stdout.trim());
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.git_current_status = git_current_status;
function git_repo_name(options) {
    const cmd = "basename `git rev-parse --show-toplevel`";
    helpers.print_if_debug(options, cmd);
    const name = (0, child_process_1.execSync)(cmd, { encoding: 'utf8' });
    return name.trim();
}
exports.git_repo_name = git_repo_name;
function git_check_commit_remote(commit, branch) {
    if (typeof branch === 'undefined') {
        branch = 'master';
    }
    const result = child_process_1.default.spawnSync('git', ['branch', `--contains=${commit}`, `--points-at=origin/${branch}`], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.git_check_commit_remote = git_check_commit_remote;
function kubectl_cluster() {
    const result = child_process_1.default.spawnSync('kubectl', ['config', 'current-context'], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.kubectl_cluster = kubectl_cluster;
function kubectl_pods_admin(options) {
    const result = child_process_1.default.spawnSync('kubectl', ['get', 'pods', '-n', 'kube-system', '--request-timeout=3'], {
        encoding: 'utf8',
    });
    helpers.print_if_debug(options, `kubectl get pods admin: ${result.stdout}\n ${result.stderr}`);
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.kubectl_pods_admin = kubectl_pods_admin;
function kubectl_pods(options) {
    const result = child_process_1.default.spawnSync('kubectl', ['get', 'pods', '-n', options.namespace, '--request-timeout=3'], {
        encoding: 'utf8',
    });
    helpers.print_if_debug(options, `kubectl get pods: ${result.stdout}\n ${result.stderr}`);
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.kubectl_pods = kubectl_pods;
function kubectl_pull_secret(options) {
    const result = child_process_1.default.spawnSync('kubectl', [
        'get',
        'secret',
        helpers.pull_secret_name(options),
        `--namespace=${options.namespace}`,
    ], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.kubectl_pull_secret = kubectl_pull_secret;
function docker() {
    const result = child_process_1.default.spawnSync('docker', ['-v'], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.docker = docker;
function docker_build(options) {
    const cmd = `docker buildx build --platform=linux/amd64 --tag=${helpers.image_tag(options)} --target=prod . `;
    helpers.print_if_debug(options, `docker build command: ${cmd}`);
    (0, child_process_1.execSync)(cmd, {
        stdio: "inherit"
    });
}
exports.docker_build = docker_build;
function docker_tag(sourcetag, targettag) {
    const result = child_process_1.default.spawnSync("docker", ["tag", sourcetag, targettag], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.docker_tag = docker_tag;
function docker_check_image(options) {
    const result = child_process_1.default.spawnSync("docker", ["image", `inspect`, helpers.image_tag(options)], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.docker_check_image = docker_check_image;
function docker_delete_image(options) {
    const result = child_process_1.default.spawnSync("docker", ["image", `rm`, helpers.image_tag(options)], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.docker_delete_image = docker_delete_image;
function docker_push_image(options, tag) {
    child_process_1.default.spawnSync("docker", ["push", tag], {
        stdio: "inherit"
    });
}
exports.docker_push_image = docker_push_image;
function docker_check_image_in_registry(options, imagetag) {
    if (options.image) {
        imagetag = options.image;
    }
    helpers.print_if_debug(options, `docker image manifest inspect ${imagetag}`);
    const result = child_process_1.default.spawnSync("docker", ["manifest", "inspect", imagetag], {
        encoding: "utf8"
    });
    helpers.print_if_debug(options, `Res: ${result.stdout.trim()}`);
    helpers.print_if_debug(options, `Err: ${result.stderr}`);
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.docker_check_image_in_registry = docker_check_image_in_registry;
function docker_login(options) {
    helpers.print_if_debug(options, `docker login ${options.registry}`);
    const result = child_process_1.default.spawnSync('docker', ['login', options.registry], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.docker_login = docker_login;
function docker_running(options) {
    helpers.print_if_debug(options, `docker running`);
    const result = child_process_1.default.spawnSync("docker", ["info"], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
exports.docker_running = docker_running;
function get_bratiska_cli_git_package_json() {
    const package_url = "https://raw.githubusercontent.com/bratislava/bratiska-cli/master/package.json";
    const res = (0, sync_request_1.default)("GET", package_url);
    return res.getBody("utf8");
}
exports.get_bratiska_cli_git_package_json = get_bratiska_cli_git_package_json;
function kustomize_build_manifest(options) {
    let path = helpers.kustomize_folder_path(options);
    if (options.kustomize) {
        path = options.kustomize;
    }
    const cmd = `kustomize build --load-restrictor LoadRestrictionsNone ${path} | envsubst > ${helpers.manifest(options)}`;
    helpers.print_if_debug(options, cmd);
    (0, child_process_1.execSync)(cmd, { encoding: "utf8" });
}
exports.kustomize_build_manifest = kustomize_build_manifest;

function kubect_apply_to_kubernetes(manifest_path) {
    helpers.log(chalk_1.default.reset(""));
    child_process_1.default.spawnSync("kubectl", ["apply", `-f=${manifest_path}`], {
        stdio: "inherit"
    });
}

exports.kubect_apply_to_kubernetes = kubect_apply_to_kubernetes;

function kubectl_deployment_status_stdio(options) {
    helpers.log(chalk_1.default.reset(""));
    child_process_1.default.spawnSync("kubectl", [
        "rollout",
        "status",
        "deployment",
        `${options.deployment}-app`,
        `--namespace=${options.namespace}`,
        `--timeout=${options.kubectl_timeout}s`
    ], {
        stdio: "inherit"
    });
}

exports.kubectl_deployment_status_stdio = kubectl_deployment_status_stdio;

function kubectl_deployment_status_utf8(options) {
    helpers.log(chalk_1.default.reset(""));
    const result = child_process_1.default.spawnSync("kubectl", [
        "rollout",
        "status",
        "deployment",
        `${options.deployment}-app`,
        `--namespace=${options.namespace}`,
        `--timeout=${options.kubectl_timeout}s`
    ], {
        encoding: "utf8"
    });
    return { res: result.stdout.trim(), err: result.stderr };
}

exports.kubectl_deployment_status_utf8 = kubectl_deployment_status_utf8;

function kubectl_deployment_events(options) {
    helpers.log(chalk_1.default.reset(""));
    const cmd = `kubectl get events --namespace=${options.namespace} --sort-by='.metadata.creationTimestamp' | grep -i ${options.deployment}-app`;
    helpers.print_if_debug(options, `kubectl deployment logs: ${cmd}`);
    (0, child_process_1.execSync)(cmd, {
        stdio: "inherit"
    });
}

exports.kubectl_deployment_events = kubectl_deployment_events;

function kubectl_deployment_logs(options) {
    helpers.log(chalk_1.default.reset(""));
    child_process_1.default.spawnSync("kubectl", [
        "logs",
        "-f",
        `deployment/${options.deployment}-app`,
        `--namespace=${options.namespace}`
    ], {
        stdio: "inherit"
    });
}

exports.kubectl_deployment_logs = kubectl_deployment_logs;
