import * as helpers from '../helpers';
import * as commands from '../commands';
import * as path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { Options } from './../types';

export function show_options(options: Options) {
  const pwd = commands.pwd();
  if (pwd === '') {
    throw new Error(
      'There was an issue getting the current working directory!',
    );
  }
  options.pwd = pwd;
  options.pipelines = false;
  if (options.debug) {
    helpers.print_debug(`pwd: ${options.pwd}`);
  }

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

  if (typeof options.tag === 'undefined') {
    options.tag = false;
  }

  if (typeof options.tag_command === 'undefined') {
    options.tag_command = false;
  }

  if (typeof options.no_image_repo_check === 'undefined') {
    options.no_image_repo_check = false;
  }

  if (typeof options.namespace === 'undefined') {
    options.namespace = 'standalone';
  }

  if (typeof options.sentry === 'undefined') {
    options.sentry = false;
  }

  const pack = helpers.load_package(options);
  if (typeof options.deployment === 'undefined') {
    options.deployment = pack.name;
  }

  if (typeof options.version === 'undefined') {
    options.version = pack.version;
  }

  if (typeof options.beta === 'undefined') {
    options.beta = false;
  }

  if (typeof options.debug === 'undefined') {
    options.debug = false;
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

  if (typeof options.feature === 'undefined') {
    options.feature = false;
  }

  if (typeof options.major === 'undefined') {
    options.major = false;
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
    if (pass === 'ynqstnhwPpmybNTjkQfHxXJuviKIyMRV66kUWcrspmU=') {
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

  if (
    !helpers.is_allowed_env(options.env) &&
    typeof options.env !== 'undefined'
  ) {
    throw new Error(
      `Unknown environment: '${options.env}'. Please use one of the allowed environments: 'dev', 'staging', 'prod'`,
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
  helpers.spacer_line(`Directory of application: `);
  helpers.print_important_info(`${options.pwd}`);
  helpers.spacer_line(`Package.json: `);
  helpers.print_important_info('present');
  helpers.spacer_line(`Kubernetes folder with kustomize files included: `);
  helpers.print_important_info(`${options.kustomize_default_path}`);

  return options;
}