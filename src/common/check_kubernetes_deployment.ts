import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from './../types';

export function check_kubernetes_deployment(options: Options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Checking if deployment exists...`);
  helpers.spacer_log(`Deployment: `);
  helpers.print_important_info(`${options.deployment}-app`);
  const response_deployment = commands.kubect_get_deployment(options);
  helpers.print_if_debug_bash(
    options,
    'kubectl_get_deployment',
    response_deployment,
  );

  //check if response_deployment is empty
  if (response_deployment.res == '') {
    throw new Error(
      `Deployment '${options.deployment}-app' does not exist in kubernetes cluster with namespace '${options.namespace}'.`,
    );
  }

  if (response_deployment.err != '') {
    throw new Error(
      'There was an issue getting the deployment! Error: ${response_deployment.err}',
    );
  }

  helpers.ok();
  return options;
}
