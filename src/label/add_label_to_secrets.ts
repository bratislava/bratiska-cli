import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from './../types';

export function add_label_to_secrets(options: Options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Adding label to secrets...\n`);

  commands.kubectl_label_secrets(options);

  return options;
}
