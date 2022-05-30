import * as helpers from '../helpers';
import * as commands from '../commands';

export function check_pushed_image(options: any) {
  helpers.line('(11) Checking if image is in remote registry...');
  if (options.image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }
  helpers.print_if_debug(options, `image tag: ${helpers.image_tag(options)}`);
  const image_r = commands.docker_check_image_in_registry(options);
  if (image_r.err !== '') {
    throw new Error(
      `There was an issue checking if image is in a registry! Propably you are unauthorised or image is not there. Check above docker push log.`,
    );
  }
  helpers.print_line_if_debug(options, '(11) Continue Checking if image...');
  helpers.ok();
}
