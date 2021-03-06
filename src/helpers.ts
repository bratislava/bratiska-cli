import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import fs from 'fs';
import dotenv from 'dotenv';
import * as commands from './commands';
import crypto from 'crypto';

export const log = console.log.bind(console);

export function line(content: string) {
  process.stdout.write('\x1b[37m' + content);
}

export function ok(): void {
  log(chalk.green(' OK'));
}

export function skipping(): void {
  log(chalk.yellow(' SKIPPING'));
}

export function not_present(): void {
  log(chalk.yellow(' NOT PRESENT'));
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

export function print_important_info_line(cmd: string): void {
  process.stdout.write(chalk.green(cmd));
}

export function print_warning(cmd: string): void {
  log(chalk.yellow(cmd));
}

export function print_info(cmd: string): void {
  log(chalk.grey(cmd));
}

export function print_info_line(cmd: string): void {
  process.stdout.write(chalk.grey(cmd));
}

export function print_debug(cmd: string | undefined): void {
  process.stdout.write(chalk.cyan(`\nDEBUG: ${cmd}\n`));
}

export function print_if_debug(options: any, cmd: string | undefined): void {
  if (options.debug) {
    print_debug(cmd);
  }
}

export function print_line_if_debug(options: any, content: string) {
  if (options.debug) {
    process.stdout.write('\x1b[37m' + content);
  }
}

export function message(content: string): void {
  log(chalk.white(content));
}

export function image(options: any) {
  return `${options.registry}/${options.namespace}/${options.deployment}`;
}

export function image_tag(options: any) {
  if (options.image) {
    return options.image;
  }

  return `${image(options)}:${tag(options)}`;
}

export function tag(options: any) {
  if (options.image) {
    const tmp_split = options.image.split(':');
    return tmp_split[1];
  }

  let untracked = '';
  let pipelines = '';
  let tag = '';
  let branch = '-' + options.branch;
  if (options.untracked) {
    untracked = '-untracked';
  }
  if (options.branch === 'origin/master') {
    branch = '';
  }
  let force_rebuild = '';
  if (options.force_rebuild) {
    force_rebuild = '-force-rebuild-' + crypto.randomBytes(20).toString('hex');
  }
  branch = branch.replace(/\//g, '');

  if (options.pipelines) {
    pipelines = 'pipelines-';
  }

  if (options.gittag) {
    tag = `-tag-${options.gittag}`;
  }

  return `bratiska-cli-${options.version}-${pipelines}${options.commit}${tag}${branch}${untracked}${force_rebuild}`;
}

export function manifest(options: any) {
  return `manifest-${tag(options)}.yaml`;
}

export function manifest_path(options: any) {
  return `${options.pwd}/${manifest(options)}`;
}

export function dockerfile_path(options: any) {
  return `${options.pwd}/Dockerfile`;
}

export function kustomize_folder_path(options: any) {
  return `${options.pwd}/kubernetes/envs/${capitalize(options.env)}`;
}

export function kustomize_folder_base(options: any) {
  return `${options.pwd}/kubernetes/base`;
}

export function pull_secret_name(options: any): string {
  return `harbor-secret-${options.env}-${options.namespace}-bratiska-cli`;
}

export function capitalize(s: any) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function check_ports(options: any): void {
  const env_path_specific = kustomize_folder_path(options) + '/.env';
  const env_path_base = kustomize_folder_base(options) + '/.env';
  const env_path_main = options.pwd + '/.env';

  print_if_debug(options, `env_path_specific: ${env_path_specific}`);
  print_if_debug(options, `env_path_base: ${env_path_base}`);
  print_if_debug(options, `env_path_main: ${env_path_main}`);

  print_if_debug(options, process.env['PORT']);
  dotenv.config({ path: env_path_main });
  print_if_debug(options, process.env['PORT']);
  dotenv.config({ override: true, path: env_path_base });
  print_if_debug(options, process.env['PORT']);
  dotenv.config({ override: true, path: env_path_specific });
  print_if_debug(options, process.env['PORT']);

  if (typeof process.env['PORT'] === 'undefined') {
    options.app_port = 3000;
    line(` using default app port `);
    print_important_info_line(`'PORT' = '${options.app_port}'`);
    line(`...`);
  } else {
    options.app_port = process.env['PORT'];
    line(` using app port from env `);
    print_important_info_line(`'PORT' = '${options.app_port}'`);
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

export function is_master_image(options: any): boolean {
  if (options.image) {
    return options.image.includes('master');
  }
  return false;
}

export function assign_env_vars(options: any) {
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
  }
  if (!process.env['BUILD_REPOSITORY_NAME']) {
    process.env['BUILD_REPOSITORY_NAME'] = options.deployment;
  }
  if (!process.env['DEPLOYMENT_ENV']) {
    process.env['DEPLOYMENT_ENV'] = options.deployment_env;
  }
  if (!process.env['HOSTNAME']) {
    process.env['HOSTNAME'] = options.host;
  }
  if (!process.env['IMAGE_TAG']) {
    process.env['IMAGE_TAG'] = image_tag(options);
  }
  if (!process.env['IMAGE']) {
    process.env['IMAGE'] = image(options);
  }
  if (!process.env['TAG']) {
    process.env['TAG'] = tag(options);
  }
  if (!process.env['COMMIT']) {
    process.env['COMMIT'] = options.commit;
  }
  if (!process.env['NAMESPACE']) {
    process.env['NAMESPACE'] = options.namespace;
  }
  if (!process.env['IMAGE_PULL_SECRET']) {
    process.env['IMAGE_PULL_SECRET'] = pull_secret_name(options);
  }
  if (!process.env['INTERNAL_APP_PORT']) {
    process.env['INTERNAL_APP_PORT'] = options.app_port;
  }
  if (!process.env['GIT_TAG']) {
    process.env['GIT_TAG'] = options.gittag;
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

export function load_package(options?: any) {
  if (typeof options === 'undefined') {
    const pwd = commands.pwd();
    if (pwd === '') {
      throw new Error(
        'There was an issue getting the current working directory!',
      );
    }
    options = { pwd: pwd };
  }

  const path = options.pwd + '/package.json';
  if (!fs.existsSync(path)) {
    throw new Error('We haven`t found package.json in path: ' + path);
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

export function print_options(options: any) {
  if (options.staging) {
    print_important_info('--staging');
  }

  if (options.production) {
    print_important_info('--production');
  }

  if (options.debug) {
    print_important_info('--debug');
  }

  if (options.dry_run) {
    print_important_info('--dry_run');
  }

  if (options.force) {
    print_important_info('--force');
  }

  if (options.build_kustomize) {
    print_important_info('--build_kustomize');
  }

  if (options.force_rebuild) {
    print_important_info('--force_rebuild');
  }

  if (options.build_image) {
    print_important_info('--build_image');
  }

  if (options.build_image_no_registry) {
    print_important_info('--build_image_no_registry');
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
