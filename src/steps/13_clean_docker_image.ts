import * as helpers from '../helpers';
import * as commands from '../commands';

export function clean_docker_image(options: any) {
  helpers.line('(13) Cleaning local docker image...');
  if (
    options.debug ||
    options.image ||
    options.dry_run ||
    options.build_image ||
    options.build_image_no_registry
  ) {
    helpers.skipping();
    return;
  }

  const image_r = commands.docker_delete_image(options);
  if (image_r.err !== '') {
    throw new Error(
      `There was an issue cleaning the local docker image with tag ${helpers.image_tag(
        options,
      )}`,
    );
  }
  helpers.ok();
}
