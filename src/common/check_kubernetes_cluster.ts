import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from './../types';

export function check_kubernetes_cluster(options: Options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Checking the current Kubernetes cluster...`);

  if (
    options.build_image ||
    options.build_image_no_registry ||
    options.dry_run
  ) {
    helpers.skipping();
    return;
  }

  const response_cluster = commands.kubectl_cluster();
  options.cluster = response_cluster.res;

  if (response_cluster.err !== '' && options.tag_command === false) {
    helpers.print_if_debug(options, `current cluster: ${options.cluster}`);
    throw new Error(
      'There is no Kubernetes context available. Please log in to the Kubernetes cluster! \n More info:' +
        response_cluster.err,
    );
  }

  if (typeof options.cluster !== 'undefined') {
    helpers.line(`\n${helpers.spacer()}Detected cluster: `);
    helpers.print_important_info(`${options.cluster}`);
  }

  if (options.cluster === 'prod-k8s-ns-01') {
    throw new Error(
      `You cannot use '${options.cluster}' cluster! It is forbidden.`,
    );
  }
  helpers.line(`(${step}) Checking the current Kubernetes cluster...`);
  helpers.ok();
  return options;
}
