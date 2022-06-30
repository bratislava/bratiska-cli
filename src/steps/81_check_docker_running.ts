import * as helpers from '../helpers';
import * as commands from '../commands';

export function check_docker_running(options: any) {
  helpers.line('(8.1) Checking docker running...');

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
