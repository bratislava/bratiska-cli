import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from './../types';

export function check_deployment(options: Options) {
  helpers.line(`(${helpers.step(options)}) Checking the deployment status...`);
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
