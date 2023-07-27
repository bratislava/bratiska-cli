import { Options } from './types';

import { tag_options } from './tag/tag_options';
import { delete_tag } from './tag/delete_tag';
import { create_tag } from './tag/create_tag';
import { check_tag_commands } from './tag/check_tag_commands';

export class Tag {
  tag_options(options: Options, env: any) {
    tag_options(options, env);
  }

  delete_tag(options: Options) {
    delete_tag(options);
  }

  create_tag(options: Options) {
    create_tag(options);
  }

  check_tag_commands(options: Options) {
    check_tag_commands(options);
  }
}
