import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from '../types';

export function get_git_commits(options: Options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Getting git commits...`);
  if (options.image) {
    helpers.skipping();
    return;
  }

  const commit_short_bash = commands.git_current_commit_short();
  helpers.print_if_debug_bash(options, 'commit_short_bash', commit_short_bash);

  if (commit_short_bash.err !== '') {
    throw new Error('There was an issue getting commit short value!\n');
  }
  options.commit_short = commit_short_bash.res;

  const commit_bash = commands.git_current_commit();
  helpers.print_if_debug_bash(options, 'commit_bash', commit_bash);

  if (commit_bash.err !== '') {
    throw new Error('There was an issue getting commit value!\n');
  }
  options.commit = commit_bash.res;

  helpers.spacer_log(`Last commit: `);
  helpers.print_important_info(`${options.commit}`);

  return options;
}
