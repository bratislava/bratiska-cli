import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from '../types';

export function check_label_commands(options: Options) {
  helpers.line(
    `(${helpers.step(options)}) Checking required label commands... \n`,
  );

  const git_bash = commands.git(options);
  helpers.print_if_debug_bash(options, 'git', git_bash);
  if (git_bash.err !== '') {
    throw new Error(
      `git command is not available on your computer! Please run installation command: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git`,
    );
  } else {
    helpers.spacer_line(`git:`);
    helpers.print_important_info(`       installed`);
  }

  const kubectl_bash = commands.kubectl(options);
  helpers.print_if_debug_bash(options, 'kubectl', kubectl_bash);
  if (kubectl_bash.err !== '') {
    throw new Error(
      `kubectl command is not available on your computer! Please check installation instructions: https://kubernetes.io/docs/tasks/tools/`,
    );
  } else {
    helpers.spacer_line(`kubectl: `);
    helpers.print_important_info(`  installed`);
  }
}
