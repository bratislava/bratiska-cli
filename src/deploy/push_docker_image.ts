import * as helpers from '../helpers';
import * as commands from '../commands';

export function push_docker_image(options: Options) {
  helpers.line(`(${helpers.step(options)}) Pushing image to the registry ...`);
  if (options.image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }
  helpers.br();
  commands.docker_push_image(options, helpers.image_tag(options));
  if (options.beta) {
    const latest_tag = helpers.image_latest_tag(options);
    helpers.line(`\n pushing latest tag: ${latest_tag}...`);
    commands.docker_push_image(options, latest_tag);
  }
  helpers.finished();
}
