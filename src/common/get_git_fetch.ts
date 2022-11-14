import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from '../types';

export function get_git_fetch(options: Options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Fetching git repo changes...`);

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

  helpers.ok();
  return options;
}
