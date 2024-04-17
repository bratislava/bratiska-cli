import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from '../types';

export function check_build_image_commands(options: Options) {
  helpers.line(
    `(${helpers.step(options)}) Checking required build_image commands... \n`,
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

  const docker_bash = commands.docker();
  if (docker_bash.err !== '') {
    helpers.print_if_debug_bash(options, 'docker', docker_bash);
    throw new Error(
      `docker command is not available on your computer! Please check installation instructions: https://docs.docker.com/engine/install`,
    );
  } else {
    helpers.spacer_line(`docker: `);
    helpers.print_important_info(`   installed`);
  }
}
