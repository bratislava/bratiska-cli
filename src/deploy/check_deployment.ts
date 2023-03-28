import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from '../types';

export function check_deployment(options: Options) {
  helpers.line(`(${helpers.step(options)}) Checking the deployment status...`);
  if (
    options.dry_run ||
    options.build_kustomize ||
    options.build_image ||
    options.build_image_no_registry
  ) {
    helpers.skipping();
    return;
  }

  //check if deployment kind is in kubernetes kinds array
  let kind = 'deployment';
  if (
    options.kustomize_kinds.includes('statefulset') &&
    !options.kustomize_kinds.includes('deployment')
  ) {
    kind = 'statefulset';
  }
  commands.kubectl_deploy_status_stdio(kind, options);

  const status_bash = commands.kubectl_deploy_status_utf8(kind, options);
  helpers.print_if_debug_bash(options, 'status_bash', status_bash);

  if (status_bash.err) {
    helpers.print_warning(
      `Deploy was not successfully rolled out. Showing kubernetes deploy events for ${options.deployment}:`,
    );
    commands.kubectl_deploy_events(kind, options);
    /*
    //currently disables as it was slowing pipeline
    helpers.print_warning(
      `Showing kubernetes container logs for ${options.deployment}:`,
    );
    commands.kubectl_deployment_logs(options);
    */
    throw Error(
      `Exiting bratiska-cli with status code 1, because deploy was not successfully rolled out in kubernetes.`,
    );
  }

  helpers.finished();
}
