import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from '../types';

export function check_git_repo_name(options: Options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Checking git repo name...`);
  if (options.image) {
    helpers.skipping();
    return;
  }
  const name_bash = commands.git_repo_name(options);
  if (name_bash === '') {
    throw new Error(
      'There was an issue fetching git repo name from git origin!',
    );
  }
  options.repo_name = name_bash;
  helpers.print_if_debug(options, `reponame: ${options.repo_name}`);
  helpers.spacer_log(`Repository name: `);
  helpers.print_important_info(`${options.repo_name}`);

  // this rule applies only to projects which are not strapi and next
  helpers.print_if_debug(
    options,
    `${options.repo_name} != ${options.deployment}`,
  );
  if (
    options.repo_name != options.deployment &&
    !~options.deployment.toLowerCase().indexOf('strapi') &&
    !~options.deployment.toLowerCase().indexOf('next')
  ) {
    throw Error(
      `You have repository name mismatch. Git repo name: ${options.repo_name} != package.json name: ${options.deployment}. Please fix the names, that they match with the repository name and project.json name.`,
    );
  }

  const repository_bash = commands.git_repository_url();
  helpers.print_if_debug_bash(options, 'repository_bash', repository_bash);
  if (repository_bash.err !== '') {
    throw new Error(
      'There was an issue getting the remote repository URL. Please push your changes to GitHub or azure.\n',
    );
  }
  options.repository_uri = repository_bash.res;
  helpers.print_if_debug(options, `repository_uri: ${options.repository_uri}`);

  return options;
}
