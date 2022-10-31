#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { program } from 'commander';
import { Deploy } from './deploy';
import { Tag } from './tag';
import { Common } from './common';
import * as helpers from './helpers';

const version = '2.2.0';
const deploy = new Deploy();
const tag = new Tag();
const common = new Common();

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
      common.show_options(options);
      /* step 3 */
      common.check_git_resources(options);
      /* step 4 */
      common.check_kubernetes_cluster(options);
      /* step 5 */
      common.check_kubernetes_enviroment(options);
      /* step 6 */
      tag.delete_tag(options);
      /* step 7 */
      tag.create_tag(options);
    });
  program
    .command('deploy')
    .summary('Local build and deploy to kubernetes')
    .description(
      'If you need to deploy app to kubernetes, this is tool for you',
    )
    //.argument('[source_path]', 'Path to main folder for app')
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
    .option('-force, --force <pass>', 'Force')
    .action((options) => {
      /* step 0 */
      common.show_version(options, version);
      /* step 1 */
      common.show_options(options);
      /* step 2 */
      common.check_git_resources(options);
      /* step 3 */
      common.check_kubernetes_cluster(options);
      /* step 4 */
      deploy.check_kubernetes_connection(options);
      /* step 5 */
      common.check_kubernetes_enviroment(options);
      /* step 6 */
      options = deploy.check_kubernetes_enviroment_configuration(options);
      /* step 7 */
      deploy.check_kubernetes_cluster_conditions(options);
      /* step 8 */
      deploy.check_hosts(options);
      /* step 9 */
      deploy.check_ports_numbers(options);
      /* step 10 */
      deploy.check_kubernetes_harbor_key(options);
      /* step 11 */
      deploy.check_docker_file(options);
      /* step 12 */
      deploy.check_docker(options);
      /* step 13 */
      deploy.check_docker_running(options);
      /* step 14 */
      deploy.check_docker_login(options);
      /* step 15 */
      deploy.check_bratiska_build_envs(options);
      /* step 16 */
      deploy.build_docker_image(options);
      /* step 17 */
      deploy.check_docker_image(options);
      /* step 18 */
      deploy.clean_bratiska_build_envs(options);
      /* step 19 */
      deploy.push_docker_image(options);
      /* step 20 */
      deploy.check_pushed_image(options);
      /* step 21 */
      deploy.clean_docker_image(options);
      /* step 22 */
      deploy.create_kustomize_env_vars(options);
      /* step 23 */
      deploy.build_kustomize(options);
      /* step 24 */
      deploy.check_kustomize(options);
      /* step 25 */
      deploy.deploy_kubernetes(options);
      /* step 26 */
      deploy.clean_kustomize(options);
      /* step 27 */
      deploy.check_deployment(options);
    });

  program.parse(process.argv);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} catch (e: Error) {
  helpers.log('');
  helpers.log('\x1b[31m', `ISSUE: ${e.message}`);
  process.exit(1);
}
