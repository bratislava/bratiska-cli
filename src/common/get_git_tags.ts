import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from '../types';

export function get_git_tags(options: Options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Checking git tags...`);
  if (options.image || options.github_ref === 'refs/heads/master') {
    helpers.skipping();
    return;
  }

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

  helpers.spacer_log(`Last git tag: `);
  helpers.print_important_info(`${options.gittag}`);
  helpers.print_if_debug(
    options,
    `options.origin_gittag: ${options.origin_gittag}`,
  );

  helpers.print_if_debug(
    options,
    `Possible image tag: ${helpers.image_tag(options)}`,
  );

  return options;
}
