import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from './../types';

export function check_docker_running(options: Options) {
  helpers.line(`(${helpers.step(options)}) Checking docker running...`);

  const docker = commands.docker_running(options);
  helpers.print_if_debug(
    options,
    `docker_running res: ${docker.res.trim()} err: ${docker.res}`,
  );

  if (docker.err !== '') {
    throw new Error(`Docker is not running! Please start docker.`);
  }
  helpers.ok();
}
