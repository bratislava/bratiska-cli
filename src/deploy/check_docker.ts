import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from './../types';

export function check_docker(options: Options) {
  helpers.line(`(${helpers.step(options)}) Checking docker...`);
  const docker = commands.docker();
  if (docker.err !== '') {
    throw new Error(
      `Docker is not present. Please install docker. More info: ${docker.err}`,
    );
  }
  helpers.ok();
}
