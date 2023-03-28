import * as helpers from '../helpers';
import { Options } from '../types';

export function check_kubernetes_enviroment_configuration(options: Options) {
  helpers.line(
    `(${helpers.step(
      options,
    )}) Checking Kubernetes environment configuration file...`,
  );
  if (options.build_image || options.build_image_no_registry) {
    helpers.skipping();
    return options;
  }

  const config_path = helpers.kustomize_folder_path(options) + '/config.json';
  const config = helpers.load_json(config_path);

  if (!config) {
    helpers.not_present();
    helpers.skipping();
    return options;
  }

  options = {
    ...options,
    ...config,
  };
  helpers.line(' config.json is present, displaying new options... \n');

  helpers.print_options(options);

  helpers.ok();
  return options;
}
