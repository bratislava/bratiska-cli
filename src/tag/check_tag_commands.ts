import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from '../types';

export function check_tag_commands(options: Options) {
  helpers.line(
    `(${helpers.step(options)}) Checking required tag commands... \n`,
  );

  const git_bash = commands.git(options);
  helpers.print_if_debug_bash(options, 'git', git_bash);
  if (git_bash.err !== '') {
    throw new Error(
      `git command is not available on your computer! Please run installation command: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git`,
    );
  } else {
    helpers.spacer_line(`git:`);
    helpers.print_important_info(` installed`);
  }
}
