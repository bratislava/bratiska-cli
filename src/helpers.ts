import chalk from 'chalk';
import * as pack from '../package.json';
import crypto from 'crypto';
import clear from 'clear';
import figlet from 'figlet';
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

export function print_debug(cmd: string): void {
  process.stdout.write(chalk.cyan(`\nDEBUG: ${cmd}\n`));
}

export function print_if_debug(options: any, cmd: string): void {
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
  let branch = '-' + options.branch;
  if (options.untracked) {
    untracked = '-untracked';
  }
  if (options.branch === 'origin/master') {
    branch = '';
  }
  branch = branch.replace(/\//g, '');
  return `bratiska-cli-${options.commit}${branch}${untracked}`;
}

export function manifest(options: any) {
  return `manifest-${tag(options)}.yaml`;
}

export function manifest_path(options: any) {
  return `${options.pwd}/${manifest(options)}`;
}

export function pull_secret_name(options: any): string {
  return `harbor-secret-${options.env}-${options.namespace}-bratiska-cli`;
}

export function capitalize(s: any) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function check_ports(options: any): void {
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

export function assign_env_vars(options: any) {
  if (options.image) {
    options.repository_uri = 'using_external_image';
    options.commit = 'using_external_image';
  }

  if (!options.repository_uri) {
    throw new Error('Git repository uri cannot be false!');
  }
  if (!options.commit) {
    throw new Error('Git Commit  cannot be false!');
  }
  if (!options.deployment) {
    throw new Error(
      'Deployment name have to be filled! Please use --deployment <deployment_name> for defining deployment name.',
    );
  }
  if (!options.host) {
    throw new Error(
      'Host have to be filled! Please use --host <host> for deployment url host.',
    );
  }
  if (!options.registry) {
    throw new Error(
      'Registry have to be filled! Please use --registry <registry_url>.',
    );
  }
  if (!options.namespace) {
    throw new Error(
      'Namespace have to be filled! Please use --namespace <namespace>.',
    );
  }
  if (image_tag(options) === '//') {
    throw new Error('Image have to be filled! Please use --image <image_tag>.');
  }

  process.env['BUILD_REPOSITORY_URI'] = options.repository_uri;
  process.env['BUILD_REPOSITORY_NAME'] = options.deployment;
  process.env['HOSTNAME'] = options.host;
  process.env['IMAGE_TAG'] = image_tag(options);
  process.env['IMAGE'] = image(options);
  process.env['TAG'] = tag(options);
  process.env['COMMIT'] = options.commit;
  process.env['NAMESPACE'] = options.namespace;
  process.env['IMAGE_PULL_SECRET'] = pull_secret_name(options);
  process.env['INTERNAL_APP_PORT'] = options.app_port;
}

export function initialize_options(options: any) {
  //const options = program.opts();
  //const commands = program.args;
 
  if (typeof options.build_image === 'undefined') {
    options.build_image = false;
  }

  if (typeof options.build_image_no_registry === 'undefined') {
    options.build_image_no_registry = false;
  }

  if (typeof options.build_kustomize === 'undefined') {
    options.build_kustomize = false;
  }

  if (typeof options.kustomize === 'undefined') {
    options.kustomize = false;
  }

  if (typeof options.image === 'undefined') {
    options.image = false;
  }

  if (typeof options.namespace === 'undefined') {
    options.namespace = 'stantalone';
  }

  if (typeof options.deployment === 'undefined') {
    options.deployment = pack.name;
  }

  if (typeof options.version === 'undefined') {
    options.version = pack.version;
  }

  if (typeof options.debug === 'undefined') {
    options.debug = false;
  }

  if (typeof options.force === 'undefined') {
    options.force = false;
  } else {
    const pass = crypto
      .createHash('sha256')
      .update(options.force)
      .digest('base64');
    if (pass === '8pJV46gp8KmFsVSNN5DBRmF/1N7AUmBzXAvFsJKmOXU=') {
      options.force = true;
      clear();
      console.log(
        chalk.black(figlet.textSync('Star Wars', { horizontalLayout: 'full' })),
        '\n',
        chalk.red(
          'MAY THE FORCE BE WITH YOU! SECURITY CHECKS ARE DISABLED! YOU SHOULD KNOW WHAT YOU ARE DOING!',
        ),
      );
    } else {
      throw new Error(
        'Wrong password for using a --force! You should not use this option. Incident reported.',
      );
    }
  }

  if (
    typeof options.staging !== 'undefined' &&
    typeof options.production !== 'undefined'
  ) {
    throw new Error(
      'Staging and production flag can`t be used at the same time!',
    );
  }
  return options;
}
