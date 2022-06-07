import * as helpers from '../helpers';
import * as commands from '../commands';

export function check_kubernetes_connection(options: any) {
  helpers.line('(3) Checking Kubernetes connection to the cluster...');
  if (
    options.dry_run ||
    options.build_kustomize ||
    options.build_image ||
    options.build_image_no_registry
  ) {
    helpers.skipping();
    return;
  }
  const pods = commands.kubectl_pods();
  if (pods.err !== '') {
    throw new Error(
      `Kubernetes cluster ${options.cluster} is not reachable from your computer! Maybe turn on VPN or check the internet connection or sign in to the cluster.`,
    );
  }
  helpers.ok();
  return options;
}
