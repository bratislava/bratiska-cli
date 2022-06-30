import * as helpers from '../helpers';
import * as commands from '../commands';

export function check_kubernetes_cluster(options: any) {
  helpers.line('(2) Checking the current Kubernetes cluster...');

  if (options.build_image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }

  const response_cluster = commands.kubectl_cluster();
  options.cluster = response_cluster.res;
  if (options.cluster === 'prod-k8s-ns-01') {
    throw new Error(
      `You cannot deploy to '${options.cluster}' cluster! It is forbidden.`,
    );
  }

  helpers.print_if_debug(options, `current cluster: ${options.cluster}`);
  if (response_cluster.err !== '') {
    throw new Error(
      'There is no Kubernetes context available. Please log in to the Kubernetes cluster! \n More info:' +
        response_cluster.err,
    );
  }
  helpers.print_line_if_debug(
    options,
    '(2) Continue Checking the current Kubernetes cluster...',
  );
  helpers.ok();
  return options;
}
