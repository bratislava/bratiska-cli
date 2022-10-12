import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from './../types';
import { git_get_last_remote_tags } from '../commands';

export function check_git_resources(options: Options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Checking git...`);
  if (options.image) {
    helpers.skipping();
    return;
  }

  const user_name_bash = commands.git_user_name();
  helpers.print_if_debug_bash(options, 'user_name_bash', user_name_bash);

  if (user_name_bash.err !== '') {
    throw new Error('There was an issue getting git user name!\n');
  }
  options.user_name = user_name_bash.res.toLowerCase();

  helpers.line('\n');
  helpers.spacer_line(`User name: `);
  helpers.print_important_info(`${options.user_name}`);

  const user_email_bash = commands.git_user_email();
  helpers.print_if_debug_bash(options, 'user_email_bash', user_email_bash);

  if (user_email_bash.err !== '') {
    throw new Error('There was an issue getting git user email!\n');
  }
  options.user_email = user_email_bash.res;

  helpers.spacer_line(`User email: `);
  helpers.print_important_info(`${options.user_email}`);

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

  helpers.spacer_line(`Last commit: `);
  helpers.print_important_info(`${options.commit}`);

  const branch_bash = commands.git_current_branch();
  helpers.print_if_debug_bash(options, 'branch_bash', branch_bash);

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
      helpers.print_if_debug_bash(options, 'branch_bash', branch_bash);
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
  helpers.spacer_line(`Current branch: `);
  helpers.print_important_info(`${options.branch}`);

  const repository_bash = commands.git_repository_url();
  helpers.print_if_debug_bash(options, 'repository_bash', repository_bash);
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
  helpers.print_if_debug_bash(options, 'fetch_bash', fetch_bash);

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
  helpers.print_if_debug_bash(options, 'status_bash', status_bash);

  if (status_bash.err !== '') {
    throw new Error('There was an issue getting git status!');
  }

  options.untracked = false;
  if (status_bash.res !== '') {
    options.untracked = true;
    helpers.spacer_line(`Untracked: `);
    helpers.print_warning(
      'We have untracked changes in the repo, adding the flag "untracked"',
    );
  }

  const remote_commit_bash = commands.git_check_commit_remote(
    options.commit,
    options.branch,
  );
  helpers.print_if_debug_bash(
    options,
    'remote_commit_bash',
    remote_commit_bash,
  );

  const gittag_bash = commands.git_commit_tag(options.commit);
  helpers.print_if_debug_bash(options, 'gittag_bash', gittag_bash);

  options.gittag = false;
  options.origin_gittag = false;
  if (gittag_bash.res !== '') {
    options.gittag_list = gittag_bash.res.split(/\n/g);
    const len = options.gittag_list.length;
    //latest tag is important
    options.gittag = options.gittag_list[len - 1];
  }
  helpers.print_if_debug(options, `options.gittag: '${options.gittag}'`);

  if (options.gittag) {
    const gittag_origin_raw = commands.git_get_last_remote_tags(
      options,
      options.gittag,
    );
    helpers.print_if_debug(options, `gittag_origin_raw: ${gittag_origin_raw}`);
    if (gittag_origin_raw !== '') {
      options.origin_gittag = gittag_origin_raw;
    }
  }

  helpers.spacer_line(`Last git tag: `);
  helpers.print_important_info(`${options.gittag}`);
  helpers.print_if_debug(
    options,
    `options.origin_gittag: ${options.origin_gittag}`,
  );

  helpers.print_if_debug(
    options,
    `Possible image tag: ${helpers.image_tag(options)}`,
  );
  options.merged = remote_commit_bash.err === '';

  helpers.spacer_line(`Last commit merged: `);
  helpers.print_important_info(`${options.merged}`);

  helpers.line('(1) Continue Checking git...');
  helpers.ok();
  return options;
}
