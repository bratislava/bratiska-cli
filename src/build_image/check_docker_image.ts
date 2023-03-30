import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from './../types';

export function check_docker_image(options: Options) {
  helpers.line(
    `(${helpers.step(options)}) Checking if the image was locally created...`,
  );
  if (options.image) {
    helpers.skipping();
    return;
  }

  const image = commands.docker_check_image(options);
  if (image.err !== '') {
    throw new Error(
      `There was an issue creating a docker image! Check the above docker build log.`,
    );
  }
  const res_json = image.res;
  helpers.print_if_debug(options, `check_docker_image: ${res_json}`);

  const iro = JSON.parse(res_json);
  const local_docker_tags = iro[0].RepoTags;
  const image_tag = helpers.image_tag(options);
  if (!local_docker_tags.includes(image_tag)) {
    throw new Error(
      `The image do not exists in local docker image repository. Tag not found: ${image_tag}`,
    );
  }
  helpers.ok();
}
