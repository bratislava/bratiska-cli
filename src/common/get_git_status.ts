import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from '../types';

export function get_git_status(options: Options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Getting git status info...`);
  if (options.image) {
    helpers.skipping();
    return;
  }

  const status_bash = commands.git_current_status(options);
  helpers.print_if_debug_bash(options, 'status_bash', status_bash);

  if (status_bash.err !== '') {
    throw new Error('There was an issue getting git status!');
  }

  options.untracked = false;
  if (status_bash.res !== '' && options.tag_command === false) {
    options.untracked = true;
    helpers.spacer_line(`Untracked: `);
    helpers.print_warning(
      'We have untracked changes in the repo, adding the flag "untracked"',
    );
  }

  helpers.ok();
  return options;
}
