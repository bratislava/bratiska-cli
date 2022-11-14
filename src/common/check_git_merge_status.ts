import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from '../types';

export function check_git_merge_status(options: Options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Checking git merge status...`);
  if (options.image) {
    helpers.skipping();
    return;
  }

  const remote_commit_bash = commands.git_check_commit_remote(
    options.commit,
    <string>options.branch,
  );
  helpers.print_if_debug_bash(
    options,
    'remote_commit_bash',
    remote_commit_bash,
  );

  options.merged = remote_commit_bash.err === '';

  helpers.spacer_log(`Last commit merged: `);
  helpers.print_important_info(`${options.merged}`);

  return options;
}
