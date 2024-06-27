import { Options } from '../types';
import * as helpers from '../helpers';
import * as commands from '../commands';

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
  helpers.spacer_line(`\n${helpers.spacer()} Registry:  `);
  helpers.print_important_info(`${helpers.image(options)}`);
  helpers.spacer_line(` Tag:   ${helpers.spacer()}`);
  helpers.print_important_info(`${helpers.tag(options)}`);
  helpers.spacer_line(` Image-tag: `);
  helpers.print_important_info(`${image_tag}`);
  helpers.spacer_line(` Build arg: `);
  helpers.print_important_info(`${options.build_arg}`);

  helpers.spacer_line(` Is image already present: `);
  /* we will check if we already have an image */
  const image = commands.docker_check_image(options);

  if (image.err === '' && options.force_rebuild === false) {
    helpers.line(`image is already present on local machine`);
    helpers.skipping();
    return;
  }
  helpers.print_important_info(`image not present, building...`);

  helpers.spacer_line(` Docker build logs: \n`);

  commands.docker_build(options);

  if (options.beta) {
    const latest_tag = helpers.image_latest_tag(options);
    helpers.line(`\n adding latest tag: ${latest_tag} ...`);
    const tag_bash = commands.docker_tag(image_tag, latest_tag);
    helpers.print_if_debug(options, tag_bash.res);
    helpers.print_if_debug(options, tag_bash.err);
  }
  helpers.finished();
}
