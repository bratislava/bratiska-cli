import * as helpers from '../helpers';

export function check_ports_numbers(options: any) {
  helpers.line('(13) Checking the ports numbers...');
  if (options.build_image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }
  helpers.check_ports(options);
  helpers.ok();
}
