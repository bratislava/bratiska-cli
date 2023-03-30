import * as helpers from '../helpers';
import fs from 'fs';
import { Options } from './../types';
import { print_if_debug } from '../helpers';

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
  // load manifest file content
  const manifest_content = fs.readFileSync(manifest_path, 'utf8');
  print_if_debug(options, `manifest_content: ${manifest_content}`);

  const stats = fs.statSync(manifest_path);
  if (stats.size < 10) {
    throw new Error(
      `We had an error creating the kustomize manifest. The Kustomize file is empty! Check issue logs on kustomize build.`,
    );
  }
  // match of kubernetes kinds form the manifest file without kind string
  const kinds = manifest_content.match(/(?<=kind: ).*/g);

  // if no kinds were found in the manifest file, throw an error
  if (!kinds) {
    throw new Error(
      `We had an error creating the kustomize manifest. No Kubernetes kinds were found in the manifest file!`,
    );
  }
  // if no kinds were found in the manifest file, throw an error
  if (kinds.length < 1) {
    throw new Error(
      `We had an error creating the kustomize manifest. No Kubernetes kinds were found in the manifest file!`,
    );
  }

  print_if_debug(options, `${kinds.length} kinds found: ${kinds}`);

  // convert all kinds to lowercase with foreach
  kinds.forEach((kind, index) => {
    kinds[index] = kind.toLowerCase();
  });
  options.kustomize_kinds = kinds;

  helpers.ok();
}
