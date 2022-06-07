import * as helpers from '../helpers';
import * as commands from '../commands';

export function check_deployment(options: any) {
  helpers.line('(19) Checking the deployment status...');
  if (
    options.dry_run ||
    options.build_kustomize ||
    options.build_image ||
    options.build_image_no_registry
  ) {
    helpers.skipping();
    return;
  }
  commands.kubectl_deployment_status(options);
  helpers.finished();
}
