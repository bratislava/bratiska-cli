import * as helpers from '../helpers';
import fs from 'fs';
import { Options } from '../types';

export function check_docker_ignore(options: Options) {
  helpers.line(
    `(${helpers.step(options)}) Checking docker ignore for its content: `,
  );

  if (options.image) {
    helpers.skipping();
    return;
  }

  const docker_ignore_file = helpers.docker_ignore_path(options);
  helpers.print_if_debug(options, `docker_ignore_file: ${docker_ignore_file}`);

  if (!fs.existsSync(docker_ignore_file)) {
    helpers.not_present();
    helpers.skipping();
    return;
  }

  const docker_ignore_content = fs.readFileSync(docker_ignore_file, 'utf8');
  helpers.print_if_debug(
    options,
    `docker_ignore_content: ${docker_ignore_content}`,
  );

  if (docker_ignore_content.includes('.env.production.local')) {
    throw new Error(
      `The dockerignore file should not include .env.production.local! We need this for propagating bratiska build envs to the docker build time variables!`,
    );
  }

  helpers.ok();
}
