import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from '../types';

export function get_git_branch(options: Options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Getting git branch...`);
  if (options.image) {
    helpers.skipping();
    return;
  }

  const branch_bash = commands.git_current_branch();
  helpers.print_if_debug_bash(options, 'branch_bash', branch_bash);
  branch_bash.res = '';
  if (branch_bash.err !== '') {
    throw new Error(
      'There was an issue obtaining the git branch name! Do you have git installed?',
    );
  }
  options.branch = branch_bash.res;
  if (options.branch === 'HEAD' || options.branch === '') {
    options.branch = '';
    const github_ref = process.env['GITHUB_REF'];

    if (typeof github_ref !== 'undefined') {
      helpers.print_if_debug(
        options,
        `Branch is in detached HEAD, getting ref env GITHUB_REF: ${github_ref}`,
      );

      const branch_bash = commands.git_list_of_brnaches_with_refs(
        <string>github_ref,
      );
      helpers.print_if_debug_bash(options, 'branch_bash', branch_bash);
      options.branch = helpers.get_final_branch(options, branch_bash.res);

      if (options.branch !== false) {
        helpers.print_if_debug(
          options,
          `Obtaining branch from tag: ${github_ref} and branch is: ${options.branch}`,
        );
      }
    }

    if (options.branch === '') {
      helpers.print_if_debug(
        options,
        `Branch is in detached HEAD or it was empty, getting branch from commit: ${options.commit}`,
      );

      const branch_bash = commands.git_branch_from_commit(options.commit);
      helpers.print_if_debug_bash(options, 'branch_bash', branch_bash);

      if (branch_bash.res === '') {
        throw new Error(
          'There was an issue getting branch name from commit.\n',
        );
      }
      if (branch_bash.err !== '') {
        throw new Error(
          `There was an issue getting branch name. Error: ${branch_bash.err}\n`,
        );
      }
      options.branch = helpers.get_final_branch(options, branch_bash.res);

      if (options.branch === false) {
        throw Error(
          'Unable to obtain a branch name! List of branches was received, but none of the list options was good.',
        );
      }
    }
  }
  helpers.spacer_log(`Current branch: `);
  helpers.print_important_info(`${options.branch}`);

  return options;
}
