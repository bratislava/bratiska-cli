import * as helpers from '../helpers';
import { Options } from '../types';

export function check_kubernetes_cluster_conditions(options: Options) {
  helpers.line(
    `(${helpers.step(options)}) Checking Kubernetes cluster conditions...`,
  );

  if (
    options.build_kustomize ||
    options.build_image ||
    options.build_image_no_registry ||
    options.dry_run
  ) {
    helpers.skipping();
    return;
  }

  switch (options.cluster) {
    case 'tkg-innov-staging':
      if (typeof options.staging === 'undefined' && options.force === false) {
        throw new Error(
          "You cannot deploy to 'tkg-innov-staging' without a staging flag! Please add the flag `--staging` to the command.",
        );
      }
      if (options.untracked === true && options.force === false) {
        throw new Error(
          `You cannot deploy to 'tkg-innov-staging' when you have untracked changes. Please commit and push changes to your branch origin/${options.branch}!`,
        );
      }

      if (options.merged === false && options.force === false) {
        throw new Error(
          `You cannot deploy to 'tkg-innov-staging' when the changes are not pushed in-branch origin/${options.branch}. Please push your changes!`,
        );
      }
      break;
    case 'tkg-innov-prod':
      if (typeof options.production === 'undefined') {
        throw new Error(
          "You cannot deploy to 'tkg-innov-prod' without a production flag! Please add the flag `--production` to the command.",
        );
      }

      if (options.untracked === true && options.force === false) {
        throw new Error(
          `You cannot deploy to 'tkg-innov-prod' when you have untracked changes. Please commit, and PR merge your changes to master!`,
        );
      }
      break;
  }
  helpers.line(` we will use `);
  helpers.print_important_info_line(`${options.cluster}`);
  helpers.line(`...`);
  helpers.ok();
  return options;
}
