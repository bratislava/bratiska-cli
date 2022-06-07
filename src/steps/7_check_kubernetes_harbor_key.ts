import * as helpers from '../helpers';
import * as commands from '../commands';

/*
  CHECKING KUBERNETES PULL SECRET FOR HARBOR
  we need to check if we have a key to download image from harbor in kubernetes cluster.
*/
export function check_kubernetes_harbor_key(options: any) {
  helpers.line(`(6) Checking the Kubernetes harbor pull secret `);
  helpers.print_important_info_line(`'${helpers.pull_secret_name(options)}'`);
  helpers.line(`...`);
  if (
    options.dry_run ||
    options.build_kustomize ||
    options.build_image ||
    options.build_image_no_registry
  ) {
    helpers.skipping();
    return;
  }
  const pull_secret_bash = commands.kubectl_pull_secret(options);
  if (pull_secret_bash.res === '') {
    throw new Error(
      `We have no harbor pull secrets with name '${helpers.pull_secret_name(
        options,
      )}'  on kubernetes cluster '${
        options.cluster
      }'. Don't hesitate to contact Kubernetes admin to create a pull secret.`,
    );
  }
  helpers.ok();
}
