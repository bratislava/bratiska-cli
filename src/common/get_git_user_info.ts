import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from '../types';

export function get_git_user_info(options: Options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Getting git user info...`);
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

  return options;
}
