import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import fs from 'fs';
import dotenv from 'dotenv';
import { compareVersions } from 'compare-versions';
import * as commands from './commands';
import crypto from 'crypto';
import { Bash, Options } from './types';

const ALLOWED_ENVIRONMENTS = [
  'dev',
  'staging',
  'prod',
  'build_image',
  'build_kustomize',
];

export const log = console.log.bind(console);

export function line(content: string) {
  process.stdout.write('\x1b[37m' + content);
}

export function spacer() {
  return '    ';
}

export function double_spacer() {
  return spacer() + spacer();
}

export function spacer_line(content: string) {
  return line(spacer() + content);
}

export function spacer_log(content: string) {
  return line('\n' + spacer() + content);
}

export function ok(): void {
  log(chalk.green(' OK'));
}

export function skipping(): void {
  log(chalk.yellow(' SKIPPING'));
}

export function not_present(): void {
  line(chalk.yellow(' NOT PRESENT'));
}

export function finished(): void {
  log(chalk.green(' FINISHED'));
}

export function br(): void {
  log('\n');
}

export function print_command(cmd: string): void {
  log(chalk.yellow(cmd));
}

export function print_important_info(cmd: string): void {
  log(chalk.green(cmd));
}

export function print_important_info_spacer(cmd: string): void {
  log(chalk.green(spacer() + cmd));
}

export function print_important_info_line(cmd: string): void {
  process.stdout.write(chalk.green(cmd));
}

export function print_warning(cmd: string): void {
  log(chalk.yellow(cmd));
}

export function print_warning_line(cmd: string): void {
  process.stdout.write(chalk.yellow(cmd));
}

export function print_error(cmd: string): void {
  log(chalk.red(cmd));
}

export function print_error_line(cmd: string): void {
  process.stdout.write(chalk.red(cmd));
}

export function print_error_line_spacer(cmd: string): void {
  print_error_line(spacer() + cmd);
}

export function print_info(cmd: string): void {
  log(chalk.grey(cmd));
}

export function print_info_line(cmd: string): void {
  process.stdout.write(chalk.grey(cmd));
}

export function print_debug(cmd: string | undefined): void {
  process.stdout.write(chalk.cyan(`DEBUG: ${cmd}\n`));
}

export function print_if_debug(
  options: Options,
  cmd: string | undefined,
): void {
  if (options.debug) {
    print_debug(cmd);
  }
}

export function print_if_debug_bash(
  options: Options,
  name: string,
  bash: Bash,
): void {
  print_if_debug(
    options,
    `${name}.res: ${bash.res}, ${name}.err: ${bash.err} `,
  );
}

export function print_line_if_debug(options: Options, content: string) {
  if (options.debug) {
    process.stdout.write('\x1b[37m' + content);
  }
}

export function message(content: string): void {
  log(chalk.white(content));
}

export function image(options: Options) {
  let image = `${options.registry}/`;
  if (options.namespace) {
    image += `${options.namespace}/`;
  }
  image += `${options.deployment}`;
  return image;
}

export function image_tag(options: Options) {
  if (options.image) {
    options.image = <string>options.image;
    return options.image;
  }

  return `${image(options)}:${tag(options)}`;
}

export function tag(options: Options) {
  if (options.tag !== false) {
    return <string>options.tag;
  }

  if (options.image) {
    options.image = <string>options.image;
    const tmp_split = options.image.split(':');
    return tmp_split[1];
  }

  let untracked = '';
  let pipelines = '';
  let commit = '';
  let tag = '';
  let branch = '-' + options.branch;
  if (options.untracked) {
    untracked = '-untracked';
  }
  if (options.branch === 'origin/master') {
    branch = '';
  }

  if (options.commit) {
    commit = `-${options.commit}`;
  }

  let force_rebuild = '';
  if (options.force_rebuild) {
    force_rebuild = '-force-rebuild-' + crypto.randomBytes(20).toString('hex');
  }

  if (options.pipelines) {
    pipelines = '-pipelines';
  }

  if (options.gittag) {
    tag = `-tag-${options.gittag}`;
  }

  let tag_value = `bratiska-cli-v${options.bratiska_cli_version}${pipelines}${untracked}${force_rebuild}${branch}${commit}${tag}-v${options.version}`;
  tag_value = tag_value.replace(' ', '-');
  tag_value = tag_value.replace('+', '-');
  tag_value = tag_value.replace(/[#@/\\_]/g, '-');
  tag_value = tag_value.replace(/-+/g, '-');

  return tag_value.substring(0, 128);
}

export function latest_tag(options: Options) {
  return `${options.env}-latest`;
}

export function image_latest_tag(options: Options): string {
  if (options.image) {
    return <string>options.image;
  }

  return `${image(options)}:${latest_tag(options)}`;
}

export function manifest(options: Options) {
  return `manifest-${tag(options)}.yaml`;
}

export function manifest_path(options: Options) {
  return `${options.pwd}/${manifest(options)}`;
}

export function dockerfile_path(options: Options) {
  return `${options.pwd}/Dockerfile`;
}

export function kustomize_folder_path(options: Options) {
  return `${options.pwd}/kubernetes/envs/${capitalize(options.env)}`;
}

export function bratiska_cli_build_env_filename(options: Options) {
  return `.env.bratiska-cli-build.${options.env}`;
}

export function bratiska_cli_build_dot_env_path(options: Options) {
  return `${options.pwd}/${bratiska_cli_build_env_filename(options)}`;
}

export function docker_build_next_env(options: Options) {
  return `${options.pwd}/.env.production.local`;
}

export function docker_ignore_path(options: Options) {
  return `${options.pwd}/.dockerignore`;
}

export function kustomize_folder_base(options: Options) {
  return `${options.pwd}/kubernetes/base`;
}

export function pull_secret_name(options: Options): string {
  return `harbor-secret-${options.env}-${options.namespace}-bratiska-cli`;
}

export function capitalize(s: unknown) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function check_ports(options: Options): void {
  const env_path_specific = kustomize_folder_path(options) + '/.env';
  const env_path_base = kustomize_folder_base(options) + '/.env';
  const env_path_main = options.pwd + '/.env';

  print_if_debug(options, `env_path_specific: ${env_path_specific}`);
  print_if_debug(options, `env_path_base: ${env_path_base}`);
  print_if_debug(options, `env_path_main: ${env_path_main}`);

  print_if_debug(options, `local terminal env['PORT']: ${process.env['PORT']}`);
  dotenv.config({ path: env_path_main });
  print_if_debug(options, `env_path_main env['PORT']: ${process.env['PORT']}`);
  dotenv.config({ override: true, path: env_path_base });
  print_if_debug(options, `env_path_base env['PORT']: ${process.env['PORT']}`);
  dotenv.config({ override: true, path: env_path_specific });
  print_if_debug(
    options,
    `env_path_specific env['PORT']: ${process.env['PORT']}`,
  );

  if (typeof process.env['PORT'] === 'undefined') {
    options.app_port = '3000';
    line(` using default app port `);
    print_important_info_line(`PORT=${options.app_port}`);
    line(`...`);
  } else {
    options.app_port = process.env['PORT'];
    line(` using app port from env `);
    print_important_info_line(`PORT=${options.app_port}`);
    line(`...`);
  }
}

export function map_cluster_to_env(cluster: string): string {
  cluster = cluster.trim();
  if (cluster.trim() === 'tkg-master') {
    throw new Error(
      'Deploying to cluster tkg-master is not supported! Sorry :(',
    );
  }

  const parts = cluster.split('-');
  return parts[2];
}

export function is_master_image(options: Options): boolean {
  if (options.image) {
    options.image = <string>options.image;
    return options.image.includes('master');
  }
  return false;
}

export function is_deployment_image(options: Options): boolean {
  if (options.image) {
    options.image = <string>options.image;
    return options.image.includes(options.deployment);
  }
  return false;
}

export function assign_env_vars(options: Options) {
  if (options.image) {
    options.repository_uri = 'using_external_image';
    options.commit = 'using_external_image';
  }

  if (!options.repository_uri) {
    throw new Error('Git repository URI cannot be false!');
  }
  if (!options.commit) {
    throw new Error('Git Commit cannot be false!');
  }
  if (!options.namespace) {
    throw new Error(
      'Namespace have to be filled! Please use --namespace <namespace_name> for defining namespace in kubernetes.\n',
    );
  }
  if (!options.deployment) {
    throw new Error(
      'Deployment names have to be filled! Please use --deployment <deployment_name> for defining deployment name.\n',
    );
  }
  if (!options.host) {
    throw new Error(
      'The host has to be filled! Please use --host <host> for deployment URL host.\n',
    );
  }
  if (!options.registry) {
    throw new Error(
      'The registry has to be filled! Please use --registry <registry_url>.',
    );
  }
  if (!options.namespace) {
    throw new Error(
      'Namespace has to be filled! Please use --namespace <namespace>.',
    );
  }
  if (image_tag(options) === '//') {
    throw new Error('Image have to be filled! Please use --image <image_tag>.');
  }

  if (!process.env['BUILD_REPOSITORY_URI']) {
    process.env['BUILD_REPOSITORY_URI'] = options.repository_uri;
    print_if_debug(
      options,
      `BUILD_REPOSITORY_URI=${process.env['BUILD_REPOSITORY_URI']}`,
    );
  }
  if (!process.env['BUILD_REPOSITORY_NAME']) {
    process.env['BUILD_REPOSITORY_NAME'] = options.deployment;
    print_if_debug(
      options,
      `BUILD_REPOSITORY_NAME=${process.env['BUILD_REPOSITORY_NAME']}`,
    );
  }
  if (!process.env['DEPLOYMENT_ENV']) {
    process.env['DEPLOYMENT_ENV'] = options.deployment_env;
    print_if_debug(options, `DEPLOYMENT_ENV=${process.env['DEPLOYMENT_ENV']}`);
  }
  if (!process.env['ENV']) {
    process.env['ENV'] = options.env;
    print_if_debug(options, `ENV=${process.env['ENV']}`);
  }
  if (!process.env['HOSTNAME']) {
    process.env['HOSTNAME'] = options.host;
    print_if_debug(options, `HOSTNAME=${process.env['HOSTNAME']}`);
  }
  // sometimes raw HOSTNAME cannot be used, therefore we have this placeholder
  if (!process.env['BRATISKA_HOSTNAME']) {
    process.env['BRATISKA_HOSTNAME'] = options.host;
    print_if_debug(
      options,
      `BRATISKA_HOSTNAME=${process.env['BRATISKA_HOSTNAME']}`,
    );
  }
  if (!process.env['IMAGE_TAG']) {
    process.env['IMAGE_TAG'] = <string>image_tag(options);
    print_if_debug(options, `IMAGE_TAG=${process.env['IMAGE_TAG']}`);
  }
  if (!process.env['IMAGE']) {
    process.env['IMAGE'] = image(options);
    print_if_debug(options, `IMAGE=${process.env['IMAGE']}`);
  }
  if (!process.env['TAG']) {
    process.env['TAG'] = tag(options);
    print_if_debug(options, `TAG=${process.env['TAG']}`);
  }
  if (!process.env['GIT_TAG']) {
    process.env['GIT_TAG'] = <string>options.gittag;
    print_if_debug(options, `GIT_TAG=${process.env['GIT_TAG']}`);
  }
  if (!process.env['COMMIT']) {
    process.env['COMMIT'] = options.commit;
    print_if_debug(options, `COMMIT=${process.env['COMMIT']}`);
  }
  if (!process.env['NAMESPACE']) {
    process.env['NAMESPACE'] = <string>options.namespace;
    print_if_debug(options, `NAMESPACE=${process.env['NAMESPACE']}`);
  }
  if (!process.env['IMAGE_PULL_SECRET']) {
    process.env['IMAGE_PULL_SECRET'] = pull_secret_name(options);
    print_if_debug(
      options,
      `IMAGE_PULL_SECRET=${process.env['IMAGE_PULL_SECRET']}`,
    );
  }
  if (!process.env['INTERNAL_APP_PORT']) {
    process.env['INTERNAL_APP_PORT'] = options.app_port;
    print_if_debug(
      options,
      `INTERNAL_APP_PORT=${process.env['INTERNAL_APP_PORT']}`,
    );
  }

  if (typeof options.envs !== 'undefined') {
    for (const [env_name, env_value] of Object.entries(options.envs)) {
      process.env[env_name.toUpperCase()] = <string>env_value;
      print_if_debug(
        options,
        `${env_name.toUpperCase()}=${process.env[env_name.toUpperCase()]}`,
      );
    }
  }
}

export function star_wars() {
  clear();
  console.log(
    chalk.black(figlet.textSync('Star Wars', { horizontalLayout: 'full' })),
    '\n',
    chalk.red(
      'MAY THE FORCE BE WITH YOU! SECURITY CHECKS ARE DISABLED! YOU SHOULD KNOW WHAT YOU ARE DOING!',
    ),
  );
}

export function game_over() {
  return (
    '\n' +
    figlet.textSync('Game Over', { horizontalLayout: 'full' }) +
    '\n Wrong password for using a --force! It would help if you did not use this option. Incident reported.'
  );
}

export function load_package(options?: Options) {
  if (typeof options === 'undefined') {
    const pwd = commands.pwd();
    if (pwd === '') {
      throw new Error(
        'There was an issue getting the current working directory!',
      );
    }
    options = {
      app_port: '',
      cluster: '',
      commit: '',
      deployment: '',
      deployment_env: '',
      env: '',
      host: '',
      namespace: '',
      registry: '',
      repository_uri: '',
      step: 0,
      pwd: pwd,
      kustomize_kinds: [],
    };
  }

  const path = options.pwd + '/package.json';
  if (!fs.existsSync(path)) {

    if (options.tag) {
      print_warning("There is no package.json, but is omitted when --tag command is used.");
      sleep(2000);
      return {};
    }
    throw new Error("We haven`t found package.json in path: " + path);
  }
  return load_json(path);
}

export function load_json(path: string) {
  if (!fs.existsSync(path)) {
    return false;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(path);
  } catch (e) {
    throw new Error(
      'There was an issue with json file on path: ' + path + ' \n Error' + e,
    );
  }
}

export function print_options(options: Options) {
  if (options.staging) {
    print_important_info_spacer('--staging');
  }

  if (options.production) {
    print_important_info_spacer('--production');
  }

  if (options.beta) {
    print_important_info_spacer(`--beta`);
  }

  if (options.debug) {
    print_important_info_spacer('--debug');
  }

  if (options.no_image_repo_check) {
    print_important_info_spacer('--no_image_repo_check');
  }

  if (options.skip_deployment_check) {
    print_important_info_spacer("--skip_deployment_check");
  }

  if (options.dry_run) {
    print_important_info_spacer('--dry_run');
  }

  if (options.force) {
    print_important_info_spacer('--force');
  }

  if (options.build_kustomize) {
    print_important_info_spacer('--build_kustomize');
  }

  if (options.force_rebuild) {
    print_important_info_spacer('--force_rebuild');
  }

  if (options.build_image) {
    print_important_info_spacer('--build_image');
  }

  if (options.build_image_no_registry) {
    print_important_info_spacer('--build_image_no_registry');
  }

  if (options.no_pull) {
    print_important_info_spacer('--no_pull');
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

  if (options.recursive) {
    print_important_info_spacer(`--recursive`);
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

  if (options.resources) {
    print_important_info_spacer(`--resources=${options.resources}`);
  }

  if (options.secrets) {
    print_important_info_spacer(`--secrets=${options.secrets}`);
  }
}

export function step(options: Options) {
  options.step++;
  return options.step;
}

export function is_allowed_env(env: string) {
  return ALLOWED_ENVIRONMENTS.includes(env);
}

function increment_bug(version: string) {
  const terms = version.split('.').map(function (e) {
    return parseInt(e);
  });
  if (terms.length != 3) {
    return version;
  }
  ++terms[2];
  return terms.join('.');
}

export function calculate_version_diff(v1: string, v2: string) {
  const v1_terms = v1.split('.').map(function (e) {
    return parseInt(e);
  });
  const v2_terms = v2.split('.').map(function (e) {
    return parseInt(e);
  });
  if (v1_terms.length != 3 || v2_terms.length != 3) {
    return 0;
  }
  return (
    (v2_terms[0] - v1_terms[0]) * 100 +
    (v2_terms[1] - v1_terms[1]) * 10 +
    (v2_terms[2] - v1_terms[2])
  );
}

function increment_feature(version: string) {
  const terms = version.split('.').map(function (e) {
    return parseInt(e);
  });
  if (terms.length != 3) {
    return version;
  }
  ++terms[1];
    terms[2] = 0;
  return terms.join('.');
}

function increment_major(version: string) {
  return [parseInt(version.split('.')[0]) + 1, 0, 0].join('.');
}

function tag_overridden_message(options: Options) {
  print_warning_line(
    `\n${spacer()}Automatically generated tag was overridden by --tag: `,
  );
  print_warning_line(` '`);
  print_important_info_line(<string>options.tag);
  print_warning_line(`'`);
}

function tag_new_message(tag_text: string) {
  print_warning_line(`\n${spacer()}This is the first tag with this format: `);
  print_important_info_line(tag_text);
  print_warning_line(
    ` in this repository. Taking and incrementing a version from 'prod'.`,
  );
}

function tag_value_dev(options: Options) {
  let tag_value = '';
  tag_value = options.env;

  if (options.tech !== false) {
    tag_value += `-${options.tech}`;
  }
  tag_value += `-${options.branch}`;
  tag_value += `-${options.commit_short}`;
  tag_value += `-${options.user_name}`;
  tag_value = tag_value.replace(' ', '-');
  tag_value = tag_value.replace(/[#@/\\_]/g, '-');
  tag_value = tag_value.replace(/-+/g, '-');

  return tag_value.substring(0, 64);
}

function tag_get_latest_version(options: Options, tag: string) {
  const tag_format = tag + `*.*.*`;
  const last_tag = commands.git_get_last_remote_tags(options, tag_format);
  print_if_debug(
    options,
    `tag_get_latest_version with tag: ${tag} and result is: "${last_tag}"`
  );

  if (last_tag === '') {
    return false;
  }

  const regex = /\d+\.\d+\.\d+/;
  let version;
  if ((version = regex.exec(last_tag)) !== null) {
    return version[0];
  }
  return false;
}

function tag_value_staging(options: Options) {
  if (options.branch !== 'master') {
    print_warning_line(
      'Be aware, you are not on master branch! We don`t recommend to deploy to staging from other branches than master.',
    );
  }
  let tag_text = options.env;
  if (options.tech !== false) {
    tag_text += `-${options.tech}`;
  }

  let latest_main_version = tag_get_latest_version(options, 'prod');
  let latest_tag_version = tag_get_latest_version(options, tag_text);

  print_if_debug(
    options,
    `latest_main_version with "prod" search : ${<string>(
      latest_main_version
    )}, latest_tag_version with "${tag_text}" search: ${<string>latest_tag_version}`
  );

  if (latest_main_version === false) {
    latest_main_version = '0.0.0';
  }

  if (latest_tag_version === false) {
    if (options.delete) {
      return tag_text;
    }
    latest_tag_version = '0.0.0';
    tag_new_message(tag_text);
  }

  if (options.delete) {
    return tag_text + latest_tag_version;
  }

  let new_tag_version = '';
  print_if_debug(
    options,
    `latest_main_version: ${<string>(
      latest_main_version
    )}, latest_tag_version: ${<string>latest_tag_version}`,
  );
  const compare_result = compareVersions(
    <string>latest_main_version,
    <string>latest_tag_version,
  );

  print_if_debug(options, "compare_result: " + compare_result);

  switch (compare_result) {
    case 1:
      new_tag_version = <string>latest_main_version;
      break;
    case -1:
      new_tag_version = <string>latest_tag_version;
      break;
    default:
      new_tag_version = <string>latest_main_version;
      break;
  }

  print_if_debug(options, "new_tag_version: " + new_tag_version);

  if (options.major === true) {
    return tag_text + increment_major(new_tag_version);
  }

  if (options.feature === true) {
    return tag_text + increment_feature(new_tag_version);
  }

  return tag_text + increment_bug(new_tag_version);
}

function tag_value_prod(options: Options) {
  if (options.branch !== 'master') {
    throw new Error(
      `You need to be on the 'master' branch to be able tag in prod environment. Currently you are on: '${options.branch}'`,
    );
  }
  return tag_value_staging(options);
}

export function tag_value(options: Options) {
  let tag_value = '';

  if (options.tag !== false) {
    if (options.env !== '') {
      tag_overridden_message(options);
    }
    return <string>options.tag;
  }

  switch (options.env) {
    case 'dev':
      tag_value = tag_value_dev(options);
      break;
    case 'staging':
      tag_value = tag_value_staging(options);
      break;
    case 'prod':
      tag_value = tag_value_prod(options);
      break;
  }

  return tag_value;
}

export function get_final_branch(
  options: Options,
  branch_list_in_string: string,
) {
  print_if_debug(options, `branch_list_in_string: ${branch_list_in_string}`);

  const branch_list_dirty = branch_list_in_string.split(/\r?\n/);
  const branch_list = branch_list_dirty.filter((e) => !e.includes('HEAD'));

  print_if_debug(options, `branch_list flattened: ${branch_list.flat()}`);
  print_if_debug(options, `branch_list.length: ${branch_list.length}`);

  const is_master = branch_list.findIndex((e) => e.includes('master'));

  print_if_debug(options, `branch_list has master?: ${is_master}`);

  if (branch_list.length > 0) {
    if (is_master !== -1) {
      return 'master';
    } else {
      return branch_list[0];
    }
  }

  return false;
}

export function sleep(time: number) {
  const stop = new Date().getTime();
  while (new Date().getTime() < stop + time) {}
}

export function kind_to_app(kind: string) {
  switch (kind) {
    case 'deployment':
      return 'app';
    case 'statefulset':
      return 'database';
  }
}
