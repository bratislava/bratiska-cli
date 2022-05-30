import * as helpers from '../helpers';
import fs from 'fs';

export function clean_kustomize(options: any) {
  helpers.line('(18) Cleaning kustomize manifest...');
  if (
    options.debug ||
    options.dry_run ||
    options.build_kustomize ||
    options.build_image ||
    options.build_image_no_registry
  ) {
    helpers.skipping();
    return;
  }
  try {
    fs.unlinkSync(helpers.manifest_path(options));
  } catch (err) {
    throw new Error(`We had an error by cleaning manifest file`);
  }
  helpers.ok();
}
