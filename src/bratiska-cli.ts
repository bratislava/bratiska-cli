#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { program } from 'commander';
import { Steps } from './steps';
import * as helpers from './helpers';

const version = '1.5.72';
const steps = new Steps();

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
    .action((commandAndOptions: any) => {
      console.log(
        chalk.green(
          'Please choose from selected commands based on yur needs. My favourite command is `deploy`.',
        ),
      );
      program.help();
    });

  program
    .command('deploy')
    .summary('Deploy to kubernetes')
    .description(
      'If you need to deploy app to kubernetes, this is tool for you',
    )
    //.argument('[source_path]', 'Path to main folder for app')
    .option('-build_image, --build_image', 'Build image only.')
    .option('-force_rebuild, --force_rebuild', 'Forcing image rebuild.')
    .option(
      '-build_image_no_registry, --build_image_no_registry',
      'Don`t push to rezgistry',
    )
    .option('-build_kustomize, --build_kustomize', 'Build kustomize file only.')
    .option('-dry_run, --dry_run', 'Run without deploying to kubernetes')
    .option(
      '-k, --kustomize <file_or_direcotry>',
      'Specify kustomize file or kustomize directory',
    )
    .option('-i, --image <url>', 'Specify image from harbour via url')
    .option('-n, --namespace <namespace>', 'Namespace', 'standalone')
    .option('-d, --deployment <deployment>', 'Deployment app')
    .option('-h, --host <host>', 'Host url address')
    .option('-e, --env <env>', 'Deployment environment')
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
    .option('-debug, --debug', 'Debuging')
    .option('-force, --force <pass>', 'Force')
    .action((options) => {
      /* step 0 */
      steps.show_version(options, version);
      /* step 1 */
      steps.show_options(options);
      /* step 2 */
      steps.check_git_resources(options);
      /* step 3 */
      steps.check_kubernetes_cluster(options);
      /* step 4 */
      steps.check_kubernetes_connection(options);
      /* step 5 */
      steps.check_kubernetes_enviroment(options);
      /* step 6 */
      options = steps.check_kubernetes_enviroment_configuration(options);
      /* step 7 */
      steps.check_kubernetes_cluster_conditions(options);
      /* step 8 */
      steps.check_hosts(options);
      /* step 9 */
      steps.check_ports_numbers(options);
      /* step 10 */
      steps.check_kubernetes_harbor_key(options);
      /* step 11 */
      steps.check_docker_file(options);
      /* step 12 */
      steps.check_docker(options);
      /* step 13 */
      steps.check_docker_running(options);
      /* step 14 */
      steps.check_docker_login(options);
      /* step 15 */
      steps.build_docker_image(options);
      /* step 16 */
      steps.check_docker_image(options);
      /* step 17 */
      steps.push_docker_image(options);
      /* step 18 */
      steps.check_pushed_image(options);
      /* step 19 */
      steps.clean_docker_image(options);
      /* step 20 */
      steps.create_env_vars(options);
      /* step 21 */
      steps.build_kustomize(options);
      /* step 22 */
      steps.check_kustomize(options);
      /* step 23 */
      steps.deploy_kubernetes(options);
      /* step 24 */
      steps.clean_kustomize(options);
      /* step 25 */
      steps.check_deployment(options);
    });

  program.parse(process.argv);
} catch (e: any) {
  helpers.log('');
  helpers.log('\x1b[31m', `HOUSTON, WE HAVE A PROBLEM: ${e.message}`);
  process.exit(1);
}
