import * as helpers from '../helpers';
import fs from 'fs';
import { Options } from './../types';

export function check_docker_file(options: Options) {
  helpers.line(`(${helpers.step(options)}) Checking docker file...`);
  if (options.image) {
    helpers.skipping();
    return;
  }
  const docker_path = helpers.dockerfile_path(options);
  if (!fs.existsSync(docker_path)) {
    throw new Error(
      `Please add proper Dockerfile, because there is no Dockerfile available in path: ${docker_path}.  `,
    );
  }
  const stats = fs.statSync(docker_path);
  if (stats.size < 10) {
    throw new Error(
      `Please add proper Dockerfile, because your Dockerfile is empty!`,
    );
  }
  helpers.ok();
}
