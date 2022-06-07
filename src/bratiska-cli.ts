#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { program } from 'commander';
import { Steps } from './steps';
import * as helpers from './helpers';

const steps = new Steps();

try {
  clear();
  console.log(
    chalk.blue(figlet.textSync('Bratiska-cli', { horizontalLayout: 'full' })),
  );

  program
    .name('bratiska-cli')
    .version('1.3.1')
    .description(
      'Simple Bratiska-cli utility for managing Bratislava Innovation apps',
    )
    .action((commandAndOptions:any) => {
        console.log(chalk.green('Please choose from selected commands based on yur needs. My favourite command is `deploy`.'))
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
      steps.show_options_0(options);
      steps.check_git_resources_1(options);
      steps.check_kubernetes_cluster_2(options);
      steps.check_kubernetes_connection_3(options);
      steps.check_kubernetes_enviroment_4(options);
      steps.check_kubernetes_cluster_conditions_5(options);
      steps.check_hosts_6(options);
      steps.check_kubernetes_harbor_key_7(options);
      steps.check_docker_8();
      steps.build_docker_image_9(options);
      steps.check_docker_image_10(options);
      steps.push_docker_image_11(options);
      steps.check_pushed_image_12(options);
      steps.clean_docker_image_13(options);
      steps.check_ports_numbers_14(options);
      steps.create_env_vars_15(options);
      steps.build_kustomize_16(options);
      steps.check_kustomize_17(options);
      steps.deploy_kubernetes_18(options);
      steps.clean_kustomize_19(options);
      steps.check_deployment_20(options);
    });

  program.parse(process.argv);
} catch (e: any) {
  helpers.log('');
  helpers.log('\x1b[31m', `ERROR: ${e.message}`);
}
