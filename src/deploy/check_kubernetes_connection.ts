import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from './../types';
import { kubectl_service_account } from '../commands';

export function check_kubernetes_connection(options: Options) {
  helpers.line(
    `(${helpers.step(
      options,
    )}) Checking Kubernetes connection to the cluster...`,
  );
  if (
    options.dry_run ||
    options.build_kustomize ||
    options.build_image ||
    options.build_image_no_registry
  ) {
    helpers.skipping();
    return;
  }
  const pods_bash = commands.kubectl_service_account(options);
  if (pods_bash.err !== '') {
    helpers.print_if_debug_bash(options, 'kubectl_service_account', pods_bash);
    throw new Error(
      `Probably Kubernetes cluster ${options.cluster} is not reachable from your computer! But it can be also issue with your CICD account, when it is wrongly selected, or doesnt have proper RoleBinding. Please reach your system administrator.`,
    );
  }
  helpers.ok();
  return options;
}
