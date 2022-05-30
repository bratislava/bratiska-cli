import * as helpers from '../helpers';
import * as commands from '../commands';

export function check_kubernetes_cluster(options: any) {
  helpers.line('(2) Checking current kubernetes cluster...');

  if (options.build_image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }

  const response_cluster = commands.kubectl_cluster();
  options.cluster = response_cluster.res;
  helpers.print_if_debug(options, `current cluster: ${options.cluster}`);
  if (response_cluster.err !== '') {
    throw new Error(
      'There is no kubernetes context available. Please log in to kubernetes cluster! \n More info: ' +
        response_cluster.err,
    );
  }
  helpers.print_line_if_debug(
    options,
    '(2) Continue Checking current kubernetes cluster...',
  );
  helpers.ok();
  return options;
}
