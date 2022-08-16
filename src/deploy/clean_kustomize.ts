import * as helpers from '../helpers';
import fs from 'fs';

export function clean_kustomize(options: Options) {
  helpers.line(`(${helpers.step(options)}) Cleaning kustomize manifest...`);
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
    throw new Error(`We had an error by cleaning the manifest file.`);
  }
  helpers.ok();
}
