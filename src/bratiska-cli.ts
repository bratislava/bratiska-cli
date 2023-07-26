#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { program } from 'commander';
import { Deploy } from './deploy';
import { BuildImage } from './build_image';
import { BuildKustomize } from './build_kustomize';
import { Tag } from './tag';
import { Label } from './label';
import { Common } from './common';
import * as helpers from './helpers';

const version = '3.0.3';
const deploy = new Deploy();
const tag = new Tag();
const common = new Common();
const build_image = new BuildImage();
const build_kustomize = new BuildKustomize();
const label = new Label();

try {
  clear();
  console.log(
    chalk.blue(figlet.textSync('Bratiska-cli', { horizontalLayout: 'full' })),
  );
  program
    .name('bratiska-cli')
    .version(version)
    .description(
      'Simple Bratiska-cli utility for managing Bratislava Innovation apps',
    )
    .action(() => {
      console.log(
        chalk.green(
          'Please choose from selected commands based on yur needs. My favourite command is `deploy`.',
        ),
      );
      program.help();
    });

  program
    .command('tag')
    .argument('[env]', 'environment', '')
    .summary('Tag a version of app and run pipelines')
    .description('Tag a version of app and run pipelines')
    .option('-tag, --tag <tag>', 'Specify a tag')
    .option('-tech, --tech <tech>', 'Technology in tag used in pipelines')
    .option('-recreate, --recreate', 'Recreate and re-push tag')
    .option('-delete, --delete', 'Delete a tag locally and in origin')
    .option('-local, --local', 'Nothing will be pushed to origin')
    .option(
      '-no_pull, --no_pull',
      'If you dont want to git pull from origin during tag',
    )
    .option(
      '-feature, --feature',
      'Increment version of app with feature level',
    )
    .option('-major, --major', 'Increment version of app with major level')
    .option('-debug, --debug', 'Debugging')
    .option('-dry_run, --dry_run', 'Run without creating an tag')
    .option('-force, --force <pass>', 'Force')
    .action((env, options) => {
      /* step 0 */
      common.show_version(options, version);
      /* step 1 */
      tag.tag_options(options, env);
      /* step 2 */
      common.show_options(env, options);
      /* step 3 */
      common.get_git_current_branch(options);
      /* step 4 */
      common.get_git_fetch(options);
      /* step 5 */
      common.get_git_pull(options);
      /* step 6 */
      common.get_git_user_info(options);
      /* step 7 */
      common.get_git_commits(options);
      /* step 8 */
      common.get_git_branch(options);
      /* step 9 */
      common.get_git_tags(options);
      /* step 10 */
      //common.check_kubernetes_cluster(options);
      /* step 11 */
      //common.check_kubernetes_enviroment(options);
      /* step 12 */
      tag.delete_tag(options);
      /* step 13 */
      tag.create_tag(options);
    });
  program
    .command('deploy')
    .summary('Local build and deploy to kubernetes')
    .description(
      'If you need to deploy app to kubernetes, this is tool for you',
    )
    .argument('[env]', 'environment', '')
    .option('-build_image, --build_image', 'Build image only.')
    .option('-force_rebuild, --force_rebuild', 'Forcing image rebuild.')
    .option(
      '-build_image_no_registry, --build_image_no_registry',
      'Don`t push to registry',
    )
    .option('-build_kustomize, --build_kustomize', 'Build kustomize file only.')
    .option('-dry_run, --dry_run', 'Run without deploying to kubernetes')
    .option(
      '-k, --kustomize <file_or_direcotry>',
      'Specify kustomize file or kustomize directory',
    )
    .option('-i, --image <url>', 'Specify image from harbour via url')
    .option('-tag, --tag <tag>', 'Specify an image tag')
    .option('-n, --namespace <namespace>', 'Namespace')
    .option('-d, --deployment <deployment>', 'Deployment app')
    .option('-h, --host <host>', 'Host url address')
    .option('-e, --env <env>', 'Deployment environment')
    .option('-s, --sentry <token>', 'Specify sentry auth token for build')
    .option(
      '-kubectl_timeout, --kubectl_timeout <timeout_in_seconds>',
      'Specify kubectl timeout in seconds',
    )

    .option(
      '-r, --registry <url>',
      'Docker image registry url',
      'harbor.bratislava.sk',
    )
    .option(
      '-staging, --staging',
      'To deploy on staging, you need to add this flag.',
    )
    .option(
      '-production, --production',
      'To deploy on production, you need to add this flag.',
    )
    .option('-debug, --debug', 'Debugging')
    .option('-beta, --beta', 'Beta features')
    .option(
      '-no_image_repo_check, --no_image_repo_check',
      'No Image repository check',
    )
    .option('-no_pull, --no_pull', 'If you dont want to git pull from origin.')
    .option('-force, --force <pass>', 'Force')
    .action((env, options) => {
      /* step 0 */
      common.show_version(options, version);
      /* step 1 */
      common.show_options(env, options);
      /* step 2 */
      common.get_git_current_branch(options);
      /* step 3 */
      common.get_git_fetch(options);
      /* step 4 */
      common.get_git_status(options);
      /* step 5 */
      common.get_git_user_info(options);
      /* step 6 */
      common.get_git_commits(options);
      /* step 7 */
      common.check_git_repo_name(options);
      /* step 8 */
      common.get_git_branch(options);
      /* step 9 */
      common.check_git_merge_status(options);
      /* step 10 */
      common.get_git_tags(options);
      /* step 11 */
      common.check_kubernetes_cluster(options);
      /* step 12 */
      deploy.check_kubernetes_connection(options);
      /* step 13 */
      common.check_kubernetes_enviroment(options);
      /* step 14 */
      options = deploy.check_kubernetes_enviroment_configuration(options);
      /* step 15 */
      deploy.check_kubernetes_cluster_conditions(options);
      /* step 16 */
      build_kustomize.check_hosts(options);
      /* step 17 */
      build_kustomize.check_ports_numbers(options);
      /* step 18 */
      deploy.check_kubernetes_harbor_key(options);
      /* step 19 */
      build_image.check_docker_file(options);
      /* step 20 */
      build_image.check_docker(options);
      /* step 21 */
      build_image.check_docker_running(options);
      /* step 22 */
      build_image.check_docker_login(options);
      /* step 23 */
      build_image.check_bratiska_build_envs(options);
      /* step 24 */
      build_image.check_docker_ignore(options);
      /* step 25 */
      build_image.build_docker_image(options);
      /* step 26 */
      build_image.check_docker_image(options);
      /* step 27 */
      build_image.clean_bratiska_build_envs(options);
      /* step 28 */
      build_image.push_docker_image(options);
      /* step 29 */
      build_image.check_pushed_image(options);
      /* step 30 */
      build_image.clean_docker_image(options);
      /* step 31 */
      build_kustomize.create_kustomize_env_vars(options);
      /* step 32 */
      build_kustomize.build_kustomize(options);
      /* step 33 */
      build_kustomize.check_kustomize(options);
      /* step 34 */
      deploy.deploy_kubernetes(options);
      /* step 35 */
      build_kustomize.clean_kustomize(options);
      /* step 36 */
      deploy.check_deployment(options);
    });

  program
    .command('build_image')
    .summary('Build and push docker image to registry')
    .description('This command will build and push docker image to registry.')
    .option('-force_rebuild, --force_rebuild', 'Forcing image rebuild.')
    .option(
      '-build_image_no_registry, --build_image_no_registry',
      'Don`t push to registry',
    )
    .option('-s, --sentry <token>', 'Specify sentry auth token for build')
    .option('-tag, --tag <tag>', 'Specify an image tag')
    .option('-n, --namespace <namespace>', 'Namespace')
    .option(
      '-r, --registry <url>',
      'Docker image registry url',
      'harbor.bratislava.sk',
    )
    .option('-debug, --debug', 'Debugging')
    .option('-beta, --beta', 'Beta features')
    .option(
      '-no_image_repo_check, --no_image_repo_check',
      'No Image repository check.',
    )
    .option('-no_pull, --no_pull', 'If you dont want to git pull from origin.')
    .option('-force, --force <pass>', 'Force')
    .action((options) => {
      /* step 0 */
      common.show_version(options, version);
      /* step 1 */
      common.show_options('build_image', options);
      /* step 2 */
      common.get_git_current_branch(options);
      /* step 3 */
      common.get_git_fetch(options);
      /* step 4 */
      common.get_git_status(options);
      /* step 5 */
      common.get_git_user_info(options);
      /* step 6 */
      common.get_git_commits(options);
      /* step 7 */
      common.check_git_repo_name(options);
      /* step 8 */
      common.get_git_branch(options);
      /* step 9 */
      common.check_git_merge_status(options);
      /* step 10 */
      common.get_git_tags(options);
      /* step 19 */
      build_image.check_docker_file(options);
      /* step 20 */
      build_image.check_docker(options);
      /* step 21 */
      build_image.check_docker_running(options);
      /* step 22 */
      build_image.check_docker_login(options);
      /* step 23 */
      build_image.check_bratiska_build_envs(options);
      /* step 24 */
      build_image.check_docker_ignore(options);
      /* step 25 */
      build_image.build_docker_image(options);
      /* step 26 */
      build_image.check_docker_image(options);
      /* step 27 */
      build_image.clean_bratiska_build_envs(options);
      /* step 28 */
      build_image.push_docker_image(options);
      /* step 29 */
      build_image.check_pushed_image(options);
      /* step 30 */
      build_image.clean_docker_image(options);
      /* step 31 */
    });

  program
    .command('build_kustomize')
    .summary('Build kustomize file needed for deployment')
    .description(
      'This command will build kustomize file needed for deployment.',
    )
    .argument('[env]', 'environment', '')
    .option(
      '-k, --kustomize <file_or_direcotry>',
      'Specify kustomize file or kustomize directory',
    )
    .option('-i, --image <url>', 'Specify image from harbour via url')
    .option('-tag, --tag <tag>', 'Specify a image tag')
    .option('-n, --namespace <namespace>', 'Namespace')
    .option('-d, --deployment <deployment>', 'Deployment app')
    .option('-h, --host <host>', 'Host url address')
    .option('-e, --env <env>', 'Deployment environment')
    .option(
      '-r, --registry <url>',
      'Docker image registry url',
      'harbor.bratislava.sk',
    )
    .option('-debug, --debug', 'Debugging')
    .option('-beta, --beta', 'Beta features')
    .option(
      '-no_image_repo_check, --no_image_repo_check',
      'No Image repository check',
    )
    .option('-force, --force <pass>', 'Force')
    .action((env, options) => {
      /* step 0 */
      common.show_version(options, version);
      /* step 1 */
      common.show_options(env, options);
      /* step 2 */
      common.get_git_current_branch(options);
      /* step 3 */
      common.get_git_fetch(options);
      /* step 4 */
      common.get_git_status(options);
      /* step 5 */
      common.get_git_user_info(options);
      /* step 6 */
      common.get_git_commits(options);
      /* step 7 */
      common.check_git_repo_name(options);
      /* step 8 */
      common.get_git_branch(options);
      /* step 9 */
      common.check_git_merge_status(options);
      /* step 10 */
      common.get_git_tags(options);
      /* step 14 */
      options = deploy.check_kubernetes_enviroment_configuration(options);
      /* step 11 */
      build_kustomize.check_hosts(options);
      /* step 12 */
      build_kustomize.check_ports_numbers(options);
      /* step 13 */
      build_image.check_pushed_image(options);
      /* step 14 */
      build_kustomize.create_kustomize_env_vars(options);
      /* step 15 */
      build_kustomize.build_kustomize(options);
      /* step 16 */
      build_kustomize.check_kustomize(options);
    });

  program
    .command('label')
    .summary('Apply labels to kubernetes resources')
    .description(
      'This command will add label to all kubernetes resources based on deployment app.',
    )
    .argument('[label_value]', 'label value like a=xyz', '')
    .option(
      '-r, --resources <resources>',
      'Kubernetes resources types where label will be applied. If none is provided, then all resources all applied. Example in comma separated list: "deployments,services,ingresses"',
    )
    .option(
      '-s, --secrets <secrets>',
      'App secrets where label will be applied without app prefix. If none is provided, then default secrets are applied. Example in comma separated list: "database-secret,redis-secret"',
    )
    .option(
      '-recursive, --recursive',
      'If label will be applied to spec resources inside of resources, like a matchLabels or template labels',
    )
    .option('-n, --namespace <namespace>', 'Namespace')
    .option('-d, --deployment <deployment>', 'Deployment app')
    .option('-staging, --staging', 'Staging flag')
    .option('-production, --production', 'Production flag')
    .option('-debug, --debug', 'Debugging')
    .option('-beta, --beta', 'Beta features')
    .option('-force, --force <pass>', 'Force')
    .action((label_value, options) => {
      /* step 0 */
      common.show_version(options, version);
      /* step 1 */
      common.show_options('', options);
      /* step 2 */
      label.show_label_info(label_value, options);
      /* step 3 */
      common.check_kubernetes_cluster(options);
      /* step 4 */
      deploy.check_kubernetes_connection(options);
      /* step 5 */
      common.check_kubernetes_enviroment(options);
      /* step 6 */
      common.check_kubernetes_deployment(options);
      /* step 7 */
      deploy.check_kubernetes_cluster_conditions(options);
      /* step 8 */
      label.add_label_to_resources(options);
      /* step 9 */
      label.add_label_to_secrets(options);
    });

  program.parse(process.argv);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} catch (e: Error) {
  helpers.log('\x1b[31m', `\nISSUE: ${e.message}`);
  process.exit(1);
}
