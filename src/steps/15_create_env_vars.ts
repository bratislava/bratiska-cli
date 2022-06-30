import * as helpers from '../helpers';

export function create_env_vars(options: any) {
  helpers.line('(15) Creating the env variables for kustomize...');
  if (options.build_image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }
  helpers.assign_env_vars(options);
  helpers.ok();
}
