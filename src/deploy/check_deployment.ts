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
  commands.kubectl_deployment_status_stdio(options);

  const status_bash = commands.kubectl_deployment_status_utf8(options);
  helpers.print_if_debug_bash(options, 'status_bash', status_bash);

  if (status_bash.err) {
    helpers.print_warning(
      `Deployment was not successfully rolled out. Showing kubernetes deployment events for ${options.deployment}:`,
    );
    commands.kubectl_deployment_events(options);
    helpers.print_warning(
      `Showing kubernetes container logs for ${options.deployment}:`,
    );
    commands.kubectl_deployment_logs(options);
    throw Error(
      `Exiting bratiska-cli with status code 1, because deployment was not successfully rolled out in kubernetes.`,
    );
  }

  helpers.finished();
}
