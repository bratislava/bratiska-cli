import * as helpers from '../helpers';
import * as commands from '../commands';
import {
  git_branch_from_commit,
  git_commit_tag,
  git_origin_commit_tag,
} from '../commands';

export function check_git_resources(options: Options) {
  helpers.line(`(${helpers.step(options)}) Checking git...`);
  if (options.image) {
    helpers.skipping();
    return;
  }

  const commit_bash = commands.git_current_commit();
  if (commit_bash.err !== '') {
    throw new Error('There was an issue getting commit status!\n');
  }
  options.commit = commit_bash.res;
  helpers.print_if_debug(options, `commit: ${options.commit}`);

  const branch_bash = commands.git_current_branch();
  if (branch_bash.err !== '') {
    throw new Error(
      'There was an issue obtaining the git branch name! Do you have git installed?',
    );
  }
  options.branch = branch_bash.res;
  if (options.branch === 'HEAD') {
    const branch = process.env['GITHUB_BRANCH'];

    helpers.print_if_debug(
      options,
      `Branch is in detached HEAD, getting branch env GITHUB_BRANCH: ${branch}`,
    );

    options.branch = <string>branch;

    if (branch === '') {
      helpers.print_if_debug(
        options,
        `Branch is in detached HEAD, getting branch from commit: ${options.commit}`,
      );

      const branch_bash = commands.git_branch_from_commit(options.commit);
      options.branch = branch_bash.res;

      if (branch_bash.res === '') {
        throw new Error('There was an issue getting branch name.\n');
      }
      if (branch_bash.err !== '') {
        throw new Error(
          `There was an issue getting branch name. Error: ${branch_bash.err}\n`,
        );
      }
    }
  }
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
    throw new Error(
      'There was an issue fetching git repo name from git origin!',
    );
  }
  options.repo_name = name_bash;
  helpers.print_if_debug(options, `reponame: ${options.repo_name}`);

  const fetch_bash = commands.git_fetch_origin();
  /*
  This is throwing error when there are changes which are not fetched
  if (fetch_bash.err !== '') {
    throw new Error(
      'There was an issue fetching changes from git origin! Error:' +
        fetch_bash.err,
    );
  }
   */
  options.fetch = fetch_bash.res;
  helpers.print_if_debug(options, `fetch: ${options.fetch}`);

  const status_bash = commands.git_current_status(options);
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

  const gittag_bash = git_commit_tag(options.commit);
  helpers.print_if_debug(
    options,
    `tag info: ${gittag_bash.res}, ${gittag_bash.err}`,
  );
  options.gittag = false;
  options.origin_gittag = false;
  if (gittag_bash.res !== '') {
    options.gittag = gittag_bash.res;
  }
  helpers.print_if_debug(options, `options.gittag: ${options.gittag}`);

  if (options.gittag) {
    const gittag_origin_bash = git_origin_commit_tag(options.gittag);
    if (gittag_origin_bash.res !== '') {
      options.origin_gittag = gittag_origin_bash.res;
    }
  }
  helpers.print_if_debug(
    options,
    `options.origin_gittag: ${options.origin_gittag}`,
  );

  helpers.print_if_debug(
    options,
    `Possible image tag: ${helpers.image_tag(options)}`,
  );

  helpers.line('(1) Continue Checking git...');

  options.merged = remote_commit_bash.err === '';
  helpers.ok();
  return options;
}
