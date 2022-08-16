import * as helpers from '../helpers';
import * as commands from '../commands';

export function deploy_kubernetes(options: Options) {
  helpers.line(`(${helpers.step(options)}) Deploying to kubernetes...`);
  if (
    options.dry_run ||
    options.build_kustomize ||
    options.build_image ||
    options.build_image_no_registry
  ) {
    helpers.skipping();
    return;
  }
  commands.kubect_apply_to_kubernetes(helpers.manifest_path(options));
  helpers.finished();
}
