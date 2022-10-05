import * as helpers from '../helpers';
import { Options } from './../types';

export function check_kubernetes_cluster_conditions(options: Options) {
  helpers.line(
    `(${helpers.step(options)}) Checking Kubernetes cluster conditions...`,
  );

  if (
    options.build_kustomize ||
    options.build_image ||
    options.build_image_no_registry
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
      if (options.image) {
        //turned off
        if (
          !helpers.is_master_image(options) &&
          options.force === false &&
          false
        ) {
          throw new Error(
            `You cannot deploy to 'tkg-innov-prod' image which is not a master image! Please checkout the git branch to master, build master image, push to harbor and then you can use the master image.'`,
          );
        }

        if (!helpers.is_deployment_image(options) && options.force === false) {
          throw new Error(
            `You cannot deploy to 'tkg-innov-prod' image which is not build from '${options.deployment}'!'`,
          );
        }
      } else {
        if (options.branch !== 'master' && options.force === false) {
          throw new Error(
            `You cannot deploy to 'tkg-innov-prod' when your current branch is not master. Please check out the git branch to master. Run 'git checkout master'`,
          );
        }
        //turned off
        if (options.merged === false && options.force === false && false) {
          throw new Error(
            `You cannot deploy to 'tkg-innov-prod' when the changes are not merged in the 'master' branch. Please create PR to propagate your changes to master!`,
          );
        }

        if (options.gittag === false && options.force === false) {
          throw new Error(
            `You cannot deploy to 'tkg-innov-prod' when the changes are not tagged. Please tag and push your tags.!`,
          );
        }
        //turned off
        if (options.gittag !== 'v' + options.version && false) {
          throw new Error(
            `Git tag version should match your package.json! Git tag: ${options.gittag} !== v${options.version}`,
          );
        }

        if (options.origin_gittag === false) {
          throw new Error(
            `Push your local tag to origin because origin tag is not same as your local.`,
          );
        }
      }
      break;
  }
  helpers.line(` we will use `);
  helpers.print_important_info_line(`${options.cluster}`);
  helpers.line(`...`);
  helpers.ok();
  return options;
}
