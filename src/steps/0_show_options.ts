import * as helpers from '../helpers';
import * as commands from '../commands';
import * as path from 'path';

export function show_options(options: any) {
  helpers.line('(0) Starting with options... \n');

  if (options.debug) {
    helpers.print_important_info('--debug');
  }

  if (options.dry_run) {
    helpers.print_important_info('--dry_run');
  }

  if (options.force) {
    helpers.print_important_info('--force');
  }

  if (options.build_kustomize) {
    helpers.print_important_info('--build_kustomize');
  }

  if (options.build_image) {
    helpers.print_important_info('--build_image');
  }

  if (options.build_image_no_registry) {
    helpers.print_important_info('--build_image_no_registry');
  }

  if (options.deployment) {
    helpers.print_important_info(`--deployment=${options.deployment}`);
  }

  if (options.image) {
    helpers.print_important_info(`--image=${options.image}`);
  }

  if (options.kustomize) {
    helpers.print_important_info(`--kustomize=${options.kustomize}`);
  }

  if (options.namespace) {
    helpers.print_important_info(`--namespace=${options.namespace}`);
  }

  if (options.registry) {
    helpers.print_important_info(`--registry=${options.registry}`);
  }

  const pwd = commands.pwd();
  if (pwd === '') {
    throw new Error('There was an issue getting current working directory!');
  }
  options.pwd = pwd;
  if (options.debug) {
    helpers.print_debug(`pwd: ${options.pwd}`);
  }

  options.repository_uri = path.basename(options.pwd);

  return options;
}
