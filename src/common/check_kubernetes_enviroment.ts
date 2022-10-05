import * as helpers from '../helpers';
import { Options } from './../types';

export function check_kubernetes_enviroment(options: Options) {
  helpers.line(
    `(${helpers.step(
      options,
    )}) Checking chosen Kubernetes cluster with the environment...`,
  );
  if (options.build_image || options.build_image_no_registry) {
    helpers.skipping();
    options.env = 'dev';
    return;
  }

  if (typeof options.env === 'undefined') {
    options.env = helpers.map_cluster_to_env(options.cluster);
    helpers.print_if_debug(options, `options.env: ${options.env}`);
  } else if (options.env !== helpers.map_cluster_to_env(options.cluster)) {
    const cluster_env = helpers.map_cluster_to_env(options.cluster);

    if (options.tag_command === false) {
      throw new Error(
        `Your kubernetes context "${options.cluster}" (${cluster_env}) do not match chosen context (${options.env})! Change with --env or kubernetes cluster context!`,
      );
    }
  }

  helpers.ok();
  return options;
}
