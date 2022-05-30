import * as helpers from '../helpers';
import * as commands from '../commands';

export function build_kustomize(options: any) {
  helpers.line('(15) Building kustomize manifest...');
  if (options.build_image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }
  commands.kustomize_build_manifest(options);
  helpers.ok();
}
