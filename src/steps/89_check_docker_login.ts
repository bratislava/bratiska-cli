import * as helpers from '../helpers';
import * as commands from '../commands';

export function check_docker_login(options: any) {
  helpers.line('(8.9) Checking docker login...');
  if (options.image) {
    helpers.skipping();
    return;
  }

  const docker = commands.docker_login(options);
  helpers.print_if_debug(
    options,
    `docker_login res: ${docker.res.trim()} err: ${docker.res}`,
  );

  if (!docker.res.includes('Login Succeeded')) {
    throw new Error(
      `You are unauthorized. Please login to docker registry ${options.registry} with command "docker login ${options.registry}".`,
    );
  } else if (docker.err !== '') {
    throw new Error(
      `There was an error checking docker registry ${options.registry} Error: ${docker.err}`,
    );
  }
  helpers.ok();
}
