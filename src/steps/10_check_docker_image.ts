import * as helpers from '../helpers';
import * as commands from '../commands';

export function check_docker_image(options: any) {
  helpers.line('(9) Checking if image was localy created...');
  if (options.image) {
    helpers.skipping();
    return;
  }

  const image = commands.docker_check_image(options);
  if (image.err !== '') {
    throw new Error(
      `There was an issue creating docker image! Check above docker build log.`,
    );
  }
  const res_json = image.res;
  const iro = JSON.parse(res_json);
  if (iro[0].RepoTags[0] !== helpers.image_tag(options)) {
    throw new Error(
      `Image was not properly created. Tags do not fit! More info: ${
        iro[0].RepoTags[0]
      } != ${helpers.image_tag(options)}`,
    );
  }
  helpers.ok();
}
