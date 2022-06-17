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
      'There was an issue obtaining the git branch name! Do you have git installed?',
    );
  }
  options.branch = branch_bash.res;
  helpers.print_if_debug(options, `branch: ${options.branch}`);

  const repository_bash = commands.git_repository_url();
  if (repository_bash.err !== '') {
    throw new Error(
      'There was an issue getting the remote repository URL. Please push your changes to GitHub or azure.\n',
    );
  }
  options.repository_uri = repository_bash.res;
  helpers.print_if_debug(options, `repository_uri: ${options.repository_uri}`);

  const name_bash = commands.git_repo_name(options);
  if (name_bash === '') {
    throw new Error('There was an issue fetching git repo name from git origin!');
  }
  options.repo_name = name_bash
  helpers.print_if_debug(options, `reponame: ${options.repo_name}`);


  const fetch_bash = commands.git_fetch_origin();
  if (fetch_bash.err !== '') {
    throw new Error('There was an issue fetching changes from git origin! Error:' + fetch_bash.err);
  }
  options.fetch = fetch_bash.res;
  helpers.print_if_debug(options, `fetch: ${options.fetch}`);

  const commit_bash = commands.git_current_commit();
  if (commit_bash.err !== '') {
    throw new Error('There was an issue getting commit status!\n');
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
      '\nWe have untracked changes in the repo, adding the tag "untracked"...',
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
  
  helpers.line('(1) Continue Checking git...');

  options.merged = remote_commit_bash.err === '';
  helpers.ok();
  return options;
}
