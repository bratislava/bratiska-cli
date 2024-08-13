import * as helpers from '../helpers';
import * as commands from '../commands';
import * as path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { Options } from '../types';

export function show_options(env: string, options: Options) {
  options.timestamp = Date.now();

  if (
    typeof env !== 'undefined' &&
    env !== '' &&
    typeof options.env === 'undefined'
  ) {
    options.env = env;
  }

  const pwd = commands.pwd();
  if (pwd === '') {
    helpers.print_if_debug(options, `options.env from start: ${options.env}`);
    throw new Error(
      'There was an issue getting the current working directory!',
    );
  }
  options.pwd = pwd;
  options.pipelines = false;

  if (typeof options.build_image === 'undefined') {
    options.build_image = false;
  }

  if (typeof options.build_image_no_registry === 'undefined') {
    options.build_image_no_registry = false;
  }

  if (typeof options.force_rebuild === 'undefined') {
    options.force_rebuild = false;
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

  if (typeof options.no_pull === 'undefined') {
    options.no_pull = false;
  }

  if (typeof options.tag === 'undefined') {
    options.tag = false;
  }

  if (typeof options.build_arg === 'undefined') {
    options.build_arg = false;
  }

  if (typeof options.tag_command === 'undefined') {
    options.tag_command = false;
  }

  if (typeof options.no_image_repo_check === 'undefined') {
    options.no_image_repo_check = false;
  }

  if (typeof options.skip_deployment_check === 'undefined') {
    options.skip_deployment_check = false;
  }

  if (typeof options.namespace === 'undefined') {
    // ignore namespace when not defined during only image build
    options.namespace = 'standalone';
    if (options.build_image || options.build_image_no_registry) {
      options.namespace = false;
    }
  }

  if (typeof options.sentry === 'undefined') {
    options.sentry = false;
  }

  if (typeof options.kubectl_timeout === 'undefined') {
    options.kubectl_timeout = '300';
  }

  if (typeof options.beta === 'undefined') {
    options.beta = false;
  }

  if (typeof options.debug === 'undefined') {
    options.debug = false;
  }

  if (typeof options.dry_run === 'undefined') {
    options.dry_run = false;
  }

  if (typeof options.recreate === 'undefined') {
    options.recreate = false;
  }

  if (typeof options.delete === 'undefined') {
    options.delete = false;
  }

  if (typeof options.tech === 'undefined') {
    options.tech = false;
  }

  if (typeof options.local === 'undefined') {
    options.local = false;
  }

  if (typeof options.feature === 'undefined') {
    options.feature = false;
  }

  if (typeof options.major === 'undefined') {
    options.major = false;
  }

  if (typeof options.resources === 'undefined') {
    options.resources = false;
  }

  if (typeof options.secrets === 'undefined') {
    options.secrets = false;
  }

  if (typeof options.recursive === 'undefined') {
    options.recursive = false;
  }

  if (process.env['CI']) {
    options.pipelines = true;
  }

  if (typeof options.force === 'undefined') {
    options.force = false;
  } else {
    const pass = crypto
      .createHash('sha256')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .update(options.force)
      .digest('base64');
    console.log(pass);
    if (pass === '8pJV46gp8KmFsVSNN5DBRmF/1N7AUmBzXAvFsJKmOXU=') {
      options.force = true;
      helpers.star_wars();
    } else {
      throw new Error(helpers.game_over());
    }
  }

  if (
    typeof options.staging !== 'undefined' &&
    typeof options.production !== 'undefined'
  ) {
    throw new Error(
      'Staging and production flags can`t be used at the same time!',
    );
  }

  if (options.sentry) {
    process.env['SENTRY_AUTH_TOKEN'] = <string>options.sentry;
  }

  const pack = helpers.load_package(options);
  if (typeof options.deployment === 'undefined') {
    options.deployment = pack.name;
    if (options.deployment === 'app' && options.force === false) {
      throw new Error(
        `You are using general package.json project name: ${options.deployment}. Please change the project name in the package.json to a different one.`,
      );
    }
  }

  if (options.image && options.no_image_repo_check === false) {
    const img = <string>options.image;
    if (!img.includes(options.deployment)) {
      throw new Error(
        `Image should include deployment name: ${options.deployment} for security reasons. Now it is: ${img}`,
      );
    }
  }

  if (typeof options.version === 'undefined') {
    options.version = pack.version;
  }

  if (
    !helpers.is_allowed_env(options.env) &&
    typeof options.env !== 'undefined'
  ) {
    throw new Error(
      `Unknown Environment: '${options.env}'. Please use one of the allowed environments: 'dev', 'staging', 'prod'`,
    );
  }

  helpers.line('(0) Starting with options... \n');

  options.kustomize_default_path = false;

  const path_ku_local = helpers.kustomize_folder_path(options);
  if (fs.existsSync(path_ku_local)) {
    options.kustomize_default_path = true;
  }
  options.repository_uri = path.basename(options.pwd);

  helpers.print_options(options);

  helpers.line('(0) Showing detected app info... \n');
  helpers.spacer_line(`Application name: `);
  helpers.print_important_info(`${options.deployment}`);
  if (options.env) {
    helpers.spacer_line(`Environment: `);
    helpers.print_important_info(`${options.env}`);
  }
  helpers.spacer_line(`Directory of application: `);
  helpers.print_important_info(`${options.pwd}`);
  helpers.spacer_line(`Package.json: `);
  helpers.print_important_info('present');
  helpers.spacer_line(`Kubernetes folder with kustomize files included: `);
  helpers.print_important_info(`${options.kustomize_default_path}`);

  return options;
}
