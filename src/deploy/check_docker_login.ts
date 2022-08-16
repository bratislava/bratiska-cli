import * as helpers from '../helpers';
import * as commands from '../commands';

export function check_docker_login(options: Options) {
  helpers.line(`(${helpers.step(options)}) Checking docker login...`);
  if (options.image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }

  const docker = commands.docker_login(options);
  helpers.print_if_debug(
    options,
    `docker_login res: ${docker.res.trim()} err: ${docker.err}`,
  );

  if (
    !(
      docker.res.includes('Login Succeeded') ||
      docker.res.includes('Already logged in to')
    )
  ) {
    throw new Error(
      `You are unauthorized. Please login to docker registry ${options.registry} with command "docker login ${options.registry}".`,
    );
  }

  if (
    docker.err !== '' &&
    !docker.err.includes('Your password will be stored unencrypted in')
  ) {
    throw new Error(
      `There was an error checking docker registry ${options.registry} Error: ${docker.err}`,
    );
  }
  helpers.ok();
}
