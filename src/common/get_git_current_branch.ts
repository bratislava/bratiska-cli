import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from '../types';

export function get_git_current_branch(options: Options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Getting current git branch...`);

  if (options.image) {
    helpers.skipping();
    return;
  }

  options.branch = '';

  const branch_bash = commands.git_current_branch();
  helpers.print_if_debug_bash(options, 'branch_bash', branch_bash);
  if (branch_bash.err !== '') {
    throw new Error(
      'There was an issue obtaining the git branch name! Do you have git installed?',
    );
  }
  options.branch = branch_bash.res;
  helpers.print_if_debug(options, `branch: ${options.branch}`);
  helpers.spacer_log(`Current git branch from HEAD: `);
  if (options.branch !== 'HEAD' && options.branch !== '') {
    helpers.print_important_info(`${options.branch}`);
  } else {
    helpers.print_warning(
      `Branch is unknown for now, we will determine it later.`,
    );
  }

  return options;
}
