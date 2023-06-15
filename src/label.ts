import { Options } from './types';

import { add_label_to_resources } from './label/add_label_to_resources';
import { show_label_info } from './label/show_label_info';
import { add_label_to_secrets } from './label/add_label_to_secrets';

export class Label {
  add_label_to_resources(options: Options) {
    add_label_to_resources(options);
  }

  add_label_to_secrets(options: Options) {
    add_label_to_secrets(options);
  }

  show_label_info(label_value: string, options: Options) {
    show_label_info(label_value, options);
  }
}
