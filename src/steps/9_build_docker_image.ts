import * as helpers from '../helpers';
import * as commands from '../commands';

export function build_docker_image(options: any) {
  helpers.line('(8) Building docker image for platform linux/amd64...');
  if (options.image) {
    helpers.skipping();
    return;
  }
  helpers.print_info(`\nDocker image tag: ${helpers.image_tag(options)}`);
  commands.docker_build(options);
  helpers.finished();
}
