import * as helpers from '../helpers';
import * as commands from '../commands';

export function check_git_resources(options: any) {
  helpers.line('(1) Checking git...');
  if (options.image) {
    helpers.skipping();
    return;
  }

  const branch_bash = commands.git_current_branch();
  if (branch_bash.err !== '') {
    throw new Error(
      'There was an issue obtaining git branch name! Do you have git installed?',
    );
  }
  options.branch = branch_bash.res;
  helpers.print_if_debug(options, `branch: ${options.branch}`);

  const repository_bash = commands.git_repository_url();
  if (repository_bash.err !== '') {
    throw new Error(
      'There was an issue getting remote repository url. Please push your changes to github or azure.',
    );
  }
  options.repository_uri = repository_bash.res;
  helpers.print_if_debug(options, `repository_uri: ${options.repository_uri}`);

  const fetch_bash = commands.git_fetch_origin();
  if (fetch_bash.err !== '') {
    throw new Error('There was an issue fetching changes from git origin!');
  }
  options.fetch = fetch_bash.res;
  helpers.print_if_debug(options, `fetch: ${options.fetch}`);

  const commit_bash = commands.git_current_commit();
  if (commit_bash.err !== '') {
    throw new Error('There was an issue getting commit!');
  }
  options.commit = commit_bash.res;
  helpers.print_if_debug(options, `commit: ${options.commit}`);

  const status_bash = commands.git_current_status();
  if (status_bash.err !== '') {
    throw new Error('There was an issue getting git status!');
  }

  options.untracked = false;
  if (status_bash.res !== '') {
    options.untracked = true;
    helpers.print_warning(
      '\nWe have untracked changes in repo, adding tag "untracked"...',
    );
  }

  const remote_commit_bash = commands.git_check_commit_remote(
    options.commit,
    options.branch,
  );

  helpers.print_if_debug(
    options,
    `remote_commit_bash: ${remote_commit_bash.err}`,
  );
  helpers.print_line_if_debug(options, '(1) Continue Checking git...');

  options.merged = remote_commit_bash.err === '';
  helpers.ok();
  return options;
}
