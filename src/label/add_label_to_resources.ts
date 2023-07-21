import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from './../types';

export function add_label_to_resources(options: Options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Adding label to resources...\n`);

  commands.kubectl_label_resources(options);

  return options;
}
