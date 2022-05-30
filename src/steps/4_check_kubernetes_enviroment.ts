import * as helpers from '../helpers';

export function check_kubernetes_enviroment(options: any) {
  helpers.line('(4) Checking chosen kubernetes cluster with environment...');
  if (options.build_image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }

  if (typeof options.env === 'undefined') {
    options.env = helpers.map_cluster_to_env(options.cluster);
  } else if (options.env != helpers.map_cluster_to_env(options.cluster)) {
    const cluster_env = helpers.map_cluster_to_env(options.cluster);
    throw new Error(
      `Your kubernetes context "${options.cluster}" (${cluster_env}) do not match chosen context (${options.env})! Change with --env or kubernetes cluster context!`,
    );
  }

  helpers.ok();
  return options;
}
