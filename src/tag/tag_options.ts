import * as helpers from '../helpers';
import { Options } from './../types';

export function tag_options(options: Options, env: any) {
  options.tag_command = true;
  if (typeof env !== 'undefined' && env !== '') {
    const envArray = env.split('-');
    helpers.print_if_debug(
      options,
      `envArray[0]: ${envArray[0]}, envArray[1]: ${envArray[1]}`,
    );

    options.env = envArray[0];
    if (typeof options.tech === 'undefined') {
      options.tech = envArray[1];
    }
  }

  helpers.print_if_debug(
    options,
    `options.env: ${options.env}, options.tech: ${options.tech}`,
  );

  return options;
}
