import * as helpers from '../helpers';
import * as commands from '../commands';

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
  const iro = JSON.parse(res_json);
  if (iro[0].RepoTags[0] !== helpers.image_tag(options)) {
    throw new Error(
      `The image was not properly created. Tags do not fit! More info: ${
        iro[0].RepoTags[0]
      } != ${helpers.image_tag(options)}`,
    );
  }
  helpers.ok();
}
