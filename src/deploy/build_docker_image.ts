import * as helpers from '../helpers';
import * as commands from '../commands';
import { print_if_debug } from '../helpers';

export function build_docker_image(options: Options) {
  helpers.line(
    `(${helpers.step(
      options,
    )}) Building docker image for platform linux/amd64...`,
  );
  if (options.image) {
    helpers.skipping();
    return;
  }

  const image_tag = helpers.image_tag(options);
  helpers.print_info(`\nDocker image tag: ${image_tag}`);
  /* we will check if we already have an image */
  const image = commands.docker_check_image(options);

  if (image.err === '' && options.force_rebuild === false) {
    helpers.line(`\ndocker image is present...`);
    helpers.skipping();
    return;
  }

  commands.docker_build(options);

  if (options.beta) {
    const latest_tag = helpers.image_latest_tag(options);
    helpers.line(`\n adding latest tag: ${latest_tag} ...`);
    const tag_bash = commands.docker_tag(image_tag, latest_tag);
    print_if_debug(options, tag_bash.res);
    print_if_debug(options, tag_bash.err);
  }
  helpers.finished();
}
