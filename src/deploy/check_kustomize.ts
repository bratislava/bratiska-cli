import * as helpers from '../helpers';
import fs from 'fs';
import { Options } from './../types';

export function check_kustomize(options: Options) {
  helpers.line(`(${helpers.step(options)}) Checking the kustomize manifest...`);
  if (options.build_image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }
  const manifest_path = helpers.manifest_path(options);
  if (!fs.existsSync(manifest_path)) {
    throw new Error(
      `We had an error creating the kustomize manifest. No kustomize file was found!`,
    );
  }
  const stats = fs.statSync(manifest_path);
  if (stats.size < 10) {
    throw new Error(
      `We had an error creating the kustomize manifest. The Kustomize file is empty! Check issue logs on kustomize build.`,
    );
  }
  helpers.ok();
}
