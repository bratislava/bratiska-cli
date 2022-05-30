import * as helpers from '../helpers';

export function check_kubernetes_cluster_conditions(options: any) {
  helpers.line('(5) Checking kubernetes cluster conditions...');

  if (
    options.build_kustomize ||
    options.build_image ||
    options.build_image_no_registry
  ) {
    helpers.skipping();
    return;
  }

  switch (options.cluster) {
    case 'tkg-innov-prod':
      if (typeof options.production === 'undefined') {
        throw new Error(
          "You cannot deploy to 'tkg-innov-prod' without production flag! Please add flag `--production` to the command.",
        );
      }
      if (options.untracked === true && options.force === false) {
        throw new Error(
          `You cannot deploy to 'tkg-innov-prod' when you have untracked changes. Please commit and PR merge your changes to master!`,
        );
      }
      if (options.branch !== 'master' && options.force === false) {
        throw new Error(
          `You cannot deploy to 'tkg-innov-prod' when your current branch is not master. Please checkout git branch to master. Run 'git checkout master'`,
        );
      }
      if (options.merged === false && options.force === false) {
        throw new Error(
          `You cannot deploy to 'tkg-innov-prod' when the changes are not merged in 'master' branch. Please create PR to propagate your changes to master!`,
        );
      }
      break;
    case 'tkg-innov-staging':
      if (typeof options.staging === 'undefined' && options.force === false) {
        throw new Error(
          "You cannot deploy to 'tkg-innov-staging' without staging flag! Please add flag `--staging` to the command.",
        );
      }
      if (options.untracked === true && options.force === false) {
        throw new Error(
          `You cannot deploy to 'tkg-innov-staging' when you have untracked changes. Please commit and push changes to you branch origin/${options.branch}!`,
        );
      }

      if (options.merged === false && options.force === false) {
        throw new Error(
          `You cannot deploy to 'tkg-innov-staging' when the changes are not pushed in branch origin/${options.branch}. Please push your changes!`,
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
