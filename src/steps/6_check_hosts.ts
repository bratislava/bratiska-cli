import * as helpers from '../helpers';

export function check_hosts(options: any) {
  helpers.line('(6) Determining host...');

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
