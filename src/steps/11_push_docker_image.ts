import * as helpers from '../helpers';
import * as commands from '../commands';

export function push_docker_image(options: any) {
  helpers.line('(11) Pushing image to the regitry ...');
  if (options.image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }
  helpers.br();
  commands.docker_push_image(options);
  helpers.finished();
}
