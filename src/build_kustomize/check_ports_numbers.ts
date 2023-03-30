import * as helpers from '../helpers';
import { Options } from './../types';

export function check_ports_numbers(options: Options) {
  helpers.line(`(${helpers.step(options)}) Checking the ports numbers...`);
  if (options.build_image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }
  helpers.check_ports(options);
  helpers.ok();
}
