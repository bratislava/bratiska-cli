import * as helpers from '../helpers';
import * as commands from '../commands';

export function check_docker() {
  helpers.line('(7) Checking docker...');
  const docker = commands.docker();
  if (docker.err !== '') {
    throw new Error(
      `Docker is not present. Please install docker. More info: ${docker.err}`,
    );
  }
  helpers.ok();
}
