import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from './../types';

export function check_pushed_image(options: Options) {
  helpers.line(
    `(${helpers.step(
      options,
    )}) Checking if the image is in the remote registry.\n...`,
  );
  if (
    options.build_image_no_registry ||
    options.no_image_repo_check ||
    options.dry_run
  ) {
    helpers.skipping();
    return;
  }

  const imagetag = helpers.image_tag(options);
  helpers.print_if_debug(options, `image tag: ${imagetag}`);
  const image_r = commands.docker_check_image_in_registry(options, imagetag);
  if (image_r.err !== '') {
    throw new Error(
      `Image (${imagetag}) is not in the registry! Check your repository. Error: ${image_r.err}`,
    );
  }

  if (options.beta) {
    const latestTag = helpers.image_latest_tag(options);
    helpers.print_if_debug(options, `image latest tag: ${latestTag}`);
    const image_r = commands.docker_check_image_in_registry(options, latestTag);
    if (image_r.err !== '') {
      throw new Error(
        `Latest image (${latestTag}) is not in the registry! Check your repository. Error: ${image_r.err}`,
      );
    }
  }

  helpers.ok();
}
