#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
//import clear from 'clear';
const figlet = require("figlet");
const commander_1 = require("commander");
const cp = require("child_process");
const child_process_1 = require("child_process");
const fs = require("fs");
const log = console.log.bind(console);
function image_tag(options) {
    return `${image(options)}:${tag(options)}`;
}
function tag(options) {
    let untracked = '';
    let branch = '-' + options.branch;
    if (options.untracked) {
        untracked = '-untracked';
    }
    if (options.branch === 'origin/master') {
        branch = '';
    }
    return `bratiska-cli-${options.commit}${branch}${untracked}`;
}
function image(options) {
    return `${options.registry}/${options.namespace}/${options.deployment}`;
}
function manifest(options) {
    return `manifest-${tag(options)}.yaml`;
}
function pull_secret_name(options) {
    return `harbor-secret-${options.env}-${options.namespace}-bratiska-cli`;
}
function finished() {
    log(chalk_1.default.green(' FINISHED'));
}
function ok() {
    log(chalk_1.default.green(' OK'));
}
function line(content) {
    process.stdout.write('\x1b[37m' + content);
}
function message(content) {
    log(chalk_1.default.white(content));
}
const capitalize = (s) => {
    if (typeof s !== 'string')
        return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};
function assign_env_vars(options) {
    process.env['BUILD_REPOSITORY_URI'] = options.repository_uri;
    process.env['BUILD_REPOSITORY_NAME'] = options.deployment;
    process.env['HOSTNAME'] = options.host;
    process.env['IMAGE'] = image(options);
    process.env['TAG'] = tag(options);
    process.env['COMMIT'] = options.commit;
    process.env['NAMESPACE'] = options.namespace;
    process.env['IMAGE_PULL_SECRET'] = pull_secret_name(options);
}
function get_repository_url() {
    const result = cp.spawnSync('git', ['config', '--get', 'remote.origin.url'], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
function git_fetch_origin() {
    const result = cp.spawnSync('git', ['fetch', 'origin'], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
function get_current_commit() {
    const result = cp.spawnSync('git', ['rev-parse', 'HEAD'], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
function get_current_branch() {
    const result = cp.spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
function git_check_commit_remote(commit, branch) {
    if (typeof branch === 'undefined') {
        branch = 'master';
    }
    const result = cp.spawnSync('git', ['branch', `--contains=${commit}`, `--points-at=origin/${branch}`], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
function get_current_status() {
    const result = cp.spawnSync('git', ['status', '-s'], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
function get_pwd() {
    const result = cp.spawnSync('pwd', {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
function map_cluster_to_env(cluster) {
    cluster = cluster.trim();
    if (cluster.trim() === 'tkg-master') {
        throw new Error('Deploying to cluster tkg-master is not supported! Sorry :(');
    }
    const parts = cluster.split('-');
    return parts[2];
}
function get_cluster() {
    const result = cp.spawnSync('kubectl', ['config', 'current-context'], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
function get_pods() {
    const result = cp.spawnSync('kubectl', ['get', 'pods', '-n', 'kube-system', '--request-timeout=1'], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
function get_pull_secret(options) {
    const result = cp.spawnSync('kubectl', [
        'get',
        'secret',
        pull_secret_name(options),
        `--namespace=${options.namespace}`,
    ], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
function get_docker() {
    const result = cp.spawnSync('docker', ['-v'], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
function docker_build(options) {
    (0, child_process_1.execSync)(`docker buildx build --platform=linux/amd64 --tag=${image_tag(options)} --target=prod . `, {
        stdio: 'inherit',
    });
}
function check_docker_image(options) {
    const result = cp.spawnSync('docker', ['image', `inspect`, image_tag(options)], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
function delete_docker_image(options) {
    const result = cp.spawnSync('docker', ['image', `rm`, image_tag(options)], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
function push_docker_image(options) {
    cp.spawnSync('docker', ['push', image_tag(options)], {
        stdio: 'inherit',
    });
}
function check_image_in_registry(options) {
    const result = cp.spawnSync('docker', ['manifest', 'inspect', image_tag(options)], {
        encoding: 'utf8',
    });
    return { res: result.stdout.trim(), err: result.stderr };
}
function build_kustomize_manifest(options) {
    (0, child_process_1.execSync)(`kustomize build --load-restrictor LoadRestrictionsNone ${options.pwd}/kubernetes/envs/${capitalize(options.env)} | envsubst > ${manifest(options)}`, { encoding: 'utf8' });
}
function apply_to_kubernetes(manifest_path) {
    log(chalk_1.default.reset(''));
    cp.spawnSync('kubectl', ['apply', `-f=${manifest_path}`], {
        stdio: 'inherit',
    });
}
function deployment_status(options) {
    log(chalk_1.default.reset(''));
    cp.spawnSync('kubectl', [
        'rollout',
        'status',
        'deployment',
        `${options.deployment}-app`,
        `--namespace=${options.namespace}`,
    ], {
        stdio: 'inherit',
    });
}
try {
    //clear();
    console.log(chalk_1.default.blue(figlet.textSync('Bratiska-cli', { horizontalLayout: 'full' })));
    commander_1.program
        .version('1.0')
        .description('Simple Bratiska-cli utility for deploying and managing Bratislava Innovation apps')
        .option('-n, --namespace <namespace>', 'Namespace', 'standalone')
        .option('-d, --deployment <deployment>', 'Deployment app')
        .option('-h, --host <host>', 'Host url address')
        .option('-e, --env <env>', 'Deployment environment')
        .option('-r, --registry <url>', 'Docker image registry url', 'harbor.bratislava.sk')
        .option('-staging, --staging', 'To deploy on staging, you need to add this flag.')
        .option('-production, --production', 'To deploy on production, you need to add this flag.')
        .option('-debug, --debug', 'Debuging')
        //.option('-v, --version <version>', 'Image version')
        .parse();
    const options = commander_1.program.opts();
    if (typeof options.namespace === 'undefined') {
        options.namespace = 'stantalone';
    }
    if (typeof options.deployment === 'undefined') {
        /* TODO */
        /* options.deployment = pack.name; */
        options.deployment = 'test';
    }
    if (typeof options.version === 'undefined') {
        /* options.version = pack.version; */
        options.version = '1.0.0';
    }
    if (typeof options.debug === 'undefined') {
        options.debug = false;
    }
    if (typeof options.staging !== 'undefined' &&
        typeof options.production !== 'undefined') {
        throw new Error('Staging and production flag can`t be used at the same time!');
    }
    line('(1) Checking git...');
    const pwd_bash = get_pwd();
    if (pwd_bash.err !== '') {
        throw new Error('There was an issue getting current working directory!');
    }
    options.pwd = pwd_bash.res;
    const branch_bash = get_current_branch();
    if (branch_bash.err !== '') {
        throw new Error('There was an issue obtaining git branch name! Do you have git installed?');
    }
    options.branch = branch_bash.res;
    const repository_bash = get_repository_url();
    if (repository_bash.err !== '') {
        throw new Error('There was an issue getting remote repository url. Please push your changes to github or azure.');
    }
    options.repository_uri = repository_bash.res;
    const fetch_bash = git_fetch_origin();
    if (fetch_bash.err !== '') {
        throw new Error('There was an issue fetching changes from git origin!');
    }
    options.fetch = fetch_bash.res;
    const commit_bash = get_current_commit();
    if (commit_bash.err !== '') {
        throw new Error('There was an issue getting commit!');
    }
    options.commit = commit_bash.res;
    const status_bash = get_current_status();
    if (status_bash.err !== '') {
        throw new Error('There was an issue getting git status!');
    }
    options.untracked = false;
    if (status_bash.res !== '') {
        options.untracked = true;
        line('\nWe have untracked changes in repo, adding tag "untracked"...');
    }
    const remote_commit_bash = git_check_commit_remote(options.commit, options.branch);
    options.merged = remote_commit_bash.err === '';
    ok();
    line('(2) Checking current kubernetes cluster...');
    const response_cluster = get_cluster();
    options.cluster = response_cluster.res;
    if (response_cluster.err !== '') {
        throw new Error('There is no kubernetes context available. Please log in to kubernetes cluster! \n More info: ' +
            response_cluster.err);
    }
    ok();
    line('(3) Checking kubernetes connection to cluster...');
    const pods = get_pods();
    if (pods.err !== '') {
        throw new Error(`Kubernetes cluster ${options.cluster} is not reachable from your computer! Maybe turn on VPN or check internet connection or sign in to cluster.`);
    }
    ok();
    line('(4) Checking chosen kubernetes cluster with environment...');
    if (typeof options.env === 'undefined') {
        options.env = map_cluster_to_env(options.cluster);
    }
    else if (options.env != map_cluster_to_env(options.cluster)) {
        const cluster_env = map_cluster_to_env(options.cluster);
        throw new Error(`Your kubernetes context "${options.cluster}" (${cluster_env}) do not match chosen context (${options.env})! Change with --env or kubernetes cluster context!`);
    }
    switch (options.cluster) {
        case 'tkg-innov-prod':
            if (typeof options.production === 'undefined') {
                throw new Error("You cannot deploy to 'tkg-innov-prod' without production flag! Please add flag `--production` to the command.");
            }
            if (options.untracked === true) {
                throw new Error(`You cannot deploy to 'tkg-innov-prod' when you have untracked changes. Please commit and PR merge your changes to master!`);
            }
            if (options.branch !== 'master') {
                throw new Error(`You cannot deploy to 'tkg-innov-prod' when your current branch is not master. Please checkout git branch to master. Run 'git checkout master'`);
            }
            if (options.merged === false) {
                throw new Error(`You cannot deploy to 'tkg-innov-prod' when the changes are not merged in 'master' branch. Please create PR to propagate your changes to master!`);
            }
            break;
        case 'tkg-innov-staging':
            if (typeof options.staging === 'undefined') {
                throw new Error("You cannot deploy to 'tkg-innov-staging' without staging flag! Please add flag `--staging` to the command.");
            }
            if (options.untracked === true) {
                throw new Error(`You cannot deploy to 'tkg-innov-staging' when you have untracked changes. Please commit and push changes to you branch origin/${options.branch}!`);
            }
            if (options.merged === false) {
                throw new Error(`You cannot deploy to 'tkg-innov-staging' when the changes are not pushed in branch origin/${options.branch}. Please push your changes!`);
            }
            break;
    }
    line(` we will use ${options.cluster}...`);
    ok();
    line('(5) Determining host...');
    if (typeof options.host === 'undefined') {
        let env = options.env;
        if (options.env === 'prod') {
            env = '';
        }
        options.host = options.deployment + '.' + env + '.bratislava.sk';
        line(` using this host '${options.host}'...`);
    }
    ok();
    /*
      CHECKING KUBERNETES PULL SECRET FOR HARBOR
      we need to check if we have a key to download image from harbor in kubernetes cluster.
     */
    line(`(6) Checking kubernetes harbor pull secret '${pull_secret_name(options)}' ...`);
    const pull_secret_bash = get_pull_secret(options);
    if (pull_secret_bash.res === '') {
        throw new Error(`We have no harbor pull secrets with name '${pull_secret_name(options)}'  on kubernetes cluster '${options.cluster}'. Please contact kubernetes admin to create pull secret.`);
    }
    ok();
    line('(7) Checking docker...');
    const docker = get_docker();
    if (docker.err !== '') {
        throw new Error(`Docker is not present. Please install docker. More info: ${docker.err}`);
    }
    ok();
    message('(8) Building docker image for platform linux/amd64...');
    message(`Docker image tag: ${image_tag(options)}`);
    docker_build(options);
    finished();
    line('(9) Checking if image was created...');
    const image = check_docker_image(options);
    if (image.err !== '') {
        throw new Error(`There was an issue creating docker image! Check above docker build log.`);
    }
    const res_json = image.res;
    const iro = JSON.parse(res_json);
    if (iro[0].RepoTags[0] !== image_tag(options)) {
        throw new Error(`Image was not properly created. Tags do not fit! More info: ${iro[0].RepoTags[0]} != ${image_tag(options)}`);
    }
    ok();
    message('(10) Pushing image to regitry ...');
    push_docker_image(options);
    finished();
    line('(11) Checking if image was pushed...');
    const image_r = check_image_in_registry(options);
    if (image_r.err !== '') {
        throw new Error(`There was an issue pushing docker image to registry! Propably you are unauthorised. Check above docker push log`);
    }
    ok();
    if (!options.debug) {
        line('(11) Cleaning local docker image...');
        const image_r = delete_docker_image(options);
        if (image_r.err !== '') {
            throw new Error(`There was an issue cleaning local docker image with tag ${image_tag(options)}`);
        }
        ok();
    }
    line('(12) Creating env variables for kustomize...');
    assign_env_vars(options);
    ok();
    line('(13) Building kustomize manifest...');
    build_kustomize_manifest(options);
    ok();
    line('(14) Checking kustomize manifest...');
    const manifest_path = `${options.pwd}/${manifest(options)}`;
    if (!fs.existsSync(manifest_path)) {
        throw new Error(`We had an error creating kustomize manifest.`);
    }
    ok();
    line('(15) Deploying to kubernetes...');
    apply_to_kubernetes(manifest_path);
    finished();
    if (!options.debug) {
        line('(16) Cleaning manifest...');
        try {
            fs.unlinkSync(manifest_path);
        }
        catch (err) {
            throw new Error(`We had an error by cleaning manifest file`);
        }
        ok();
    }
    line('(17) Checking deployment status...');
    deployment_status(options);
    finished();
}
catch (e) {
    log('');
    log('\x1b[31m', e.message);
}
