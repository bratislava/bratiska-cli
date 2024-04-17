import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from '../types';

export function check_docker_running(options: Options) {
  helpers.line(`(${helpers.step(options)}) Checking docker running...`);

  const docker = commands.docker_running(options);

  if (docker.status !== 0) {
    helpers.print_if_debug(
      options,
      `docker running red: ${docker.res} err: ${docker.err} status: ${docker.status}`,
    );
    throw new Error(
      `Docker is not running! Please start docker. Docker status: ${docker.status}`,
    );
  }
  helpers.ok();
}
