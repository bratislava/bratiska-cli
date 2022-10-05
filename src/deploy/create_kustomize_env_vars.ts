import * as helpers from '../helpers';
import { Options } from './../types';

export function create_kustomize_env_vars(options: Options) {
  helpers.line(
    `(${helpers.step(options)}) Creating the env variables for kustomize...`,
  );
  if (options.build_image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }
  helpers.assign_env_vars(options);
  helpers.ok();
}
