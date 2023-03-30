import * as helpers from '../helpers';
import { Options } from '../types';

export function check_hosts(options: Options) {
  helpers.line(`(${helpers.step(options)}) Determining host...`);

  if (options.build_image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }

  let env = options.env + '.';
  if (options.env === 'prod') {
    env = '';
  }
  options.deployment_env = env;
  if (typeof options.host === 'undefined') {
    options.host = options.deployment + '.' + env + 'bratislava.sk';
  }
  helpers.line(` using this host `);
  helpers.print_important_info_line(`${options.host}`);
  helpers.line(`...`);

  helpers.ok();
  return options;
}
