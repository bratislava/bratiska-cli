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

  if (options.branch === undefined) {
    options.branch = '';
  }

  const github_ref = process.env['GITHUB_REF'];
  const github_head_ref = process.env['GITHUB_HEAD_REF'];

  if (
    typeof github_ref !== 'undefined' &&
    typeof github_head_ref !== 'undefined'
  ) {
    helpers.print_if_debug(
      options,
      `Branch is in detached HEAD, getting GITHUB_REF: ${github_ref} and GITHUB_HEAD_REF: ${github_head_ref}`,
    );
    if (github_ref.includes('refs/pull/')) {
      options.branch = github_head_ref;
      helpers.spacer_log(`Current branch from GITHUB_HEAD_REF: `);
      helpers.print_important_info(`${options.branch}`);
      return options;
    }
  }

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
      helpers.spacer_log(`Current branch from tag: `);
      helpers.print_important_info(`${options.branch}`);
      return options;
    }
  }

  helpers.print_if_debug(
    options,
    `Branch is in detached HEAD or it was empty, getting branch from commit: ${options.commit}`,
  );

  const branch_commit_bash = commands.git_branch_from_commit(options.commit);
  helpers.print_if_debug_bash(options, 'branch_bash', branch_commit_bash);

  if (branch_commit_bash.res === '') {
    throw new Error('There was an issue getting branch name from commit.\n');
  }
  if (branch_commit_bash.err !== '') {
    throw new Error(
      `There was an issue getting branch name. Error: ${branch_commit_bash.err}\n`,
    );
  }
  options.branch = helpers.get_final_branch(options, branch_commit_bash.res);

  if (options.branch === false) {
    throw Error(
      'Unable to obtain a branch name! List of branches was received, but none of the list options was good.',
    );
  }

  helpers.spacer_log(`Current branch from commit: `);
  helpers.print_important_info(`${options.branch}`);
  return options;
}
