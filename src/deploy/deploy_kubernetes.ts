import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from './../types';

//TODO return deployment status

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
  const apply_to_kubernetes_bash = commands.kubect_apply_to_kubernetes(
    helpers.manifest_path(options),
  );
  helpers.print_if_debug_bash(
    options,
    'apply_to_kubernetes_bash',
    apply_to_kubernetes_bash,
  );

  if (apply_to_kubernetes_bash.err) {
    throw new Error(
      `We had an error applying the kustomize manifest to kubernetes. ${apply_to_kubernetes_bash.err}`,
    );
  }

  helpers.log(apply_to_kubernetes_bash.res);
  helpers.ok();
}
