import * as helpers from '../helpers';
import * as commands from '../commands';

export function check_pushed_image(options: Options) {
  helpers.line(
    `(${helpers.step(
      options,
    )}) Checking if the image is in the remote registry.\n...`,
  );
  if (options.build_image_no_registry) {
    helpers.skipping();
    return;
  }

  helpers.print_if_debug(options, `image tag: ${helpers.image_tag(options)}`);
  const image_r = commands.docker_check_image_in_registry(options);
  if (image_r.err !== '') {
    throw new Error(
      `Image is not in the registry! Probably you are unauthorized, or the image is simply not there. Check your repository.`,
    );
  }
  helpers.print_line_if_debug(options, '(11) Continue Checking if image...');
  helpers.ok();
}
