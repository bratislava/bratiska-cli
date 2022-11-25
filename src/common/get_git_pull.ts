import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from '../types';

export function get_git_pull(options: Options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Pulling git repo...`);

  if (options.no_pull) {
    helpers.skipping();
    return;
  }

  const pull_bash = commands.git_pull_origin();
  helpers.print_if_debug_bash(options, 'pull_bash', pull_bash);

  if (pull_bash.res === 'Already up to date.') {
    helpers.print_important_info_line(' Already up to date\n');
  } else if (pull_bash.res !== 'Already up to date.') {
    helpers.print_warning(' Repo was updated via git pull\n');
  }

  if (pull_bash.err !== '') {
    throw new Error(
      'There was an issue pulling changes from git origin! Error:' +
        pull_bash.err,
    );
  }

  options.pull = pull_bash.res;
  helpers.print_if_debug(options, `options.pull: ${options.pull}`);

  return options;
}
