import * as helpers from '../helpers';
import { Options } from '../types';

export function check_kubernetes_enviroment(options: Options) {
  helpers.line(`(${helpers.step(options)}) Checking kubernetes environment...`);

  if (
    options.build_image ||
    options.build_image_no_registry ||
    options.dry_run
  ) {
    if (typeof options.env === 'undefined') {
      options.env = 'dev';
      helpers.print_if_debug(
        options,
        `Environment is not set for --build_image or --build_image_no_registry, setting default environment: ${options.env}`,
      );
    }

    helpers.spacer_log(`Environment: `);
    helpers.print_important_info(`${options.env}`);
    return options;
  }

  if (typeof options.env === 'undefined') {
    if (options.tag_command === true && options.branch !== 'master') {
      options.env = 'dev';
      helpers.print_if_debug(
        options,
        `Environment is not set for tagging, setting default environment: ${options.env}`,
      );
      helpers.spacer_log(`Environment: `);
      helpers.print_important_info(`${options.env}`);
      return options;
    }

    options.env = helpers.map_cluster_to_env(options.cluster);
    helpers.print_if_debug(
      options,
      `getting Environment from kubernetes cluster: ${options.env}`,
    );
  } else if (options.env !== helpers.map_cluster_to_env(options.cluster)) {
    const cluster_env = helpers.map_cluster_to_env(options.cluster);

    if (options.tag_command === false) {
      throw new Error(
        `Your kubernetes context "${options.cluster}" (${cluster_env}) do not match chosen context (${options.env})! Change with --env or kubernetes cluster context!`,
      );
    }
  }

  helpers.spacer_log(`Environment: `);
  helpers.print_important_info(`${options.env}`);
  return options;
}
