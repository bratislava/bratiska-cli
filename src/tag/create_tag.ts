import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from "../types";

// TODO be able to create tags with v* easily with counting versions
// TODO be able to add stable tag on repos which have no package json

export function create_tag(options: Options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Creating tag...`);

  if (options.delete) {
    helpers.skipping();
    return;
  }

  const tag_value = helpers.tag_value(options);

  helpers.line('\n');
  helpers.spacer_line(`Tag value: `);
  helpers.print_important_info(`${tag_value}`);

  if (options.dry_run) {
    helpers.skipping();
    return;
  }
  const add_tag_bash = commands.git_add_tag(tag_value);
  helpers.print_if_debug_bash(options, 'add_tag_bash', add_tag_bash);

  helpers.spacer_line(`Created: `);
  if (add_tag_bash.err !== '') {
    if (add_tag_bash.err.includes('already exists')) {
      options.created = false;
      helpers.print_warning(`already exists`);
    } else {
      throw new Error(
        `There was an issue adding a tag! Error: ${add_tag_bash.err}\n`,
      );
    }
  } else if (add_tag_bash.res === '') {
    options.created = true;
    helpers.print_important_info(`ok`);
  }

  if (options.local) {
    options.pushed = false;
    helpers.spacer_line(`Pushed: `);
    helpers.print_warning(`skipped because of the --local flag`);
    return options;
  }

  const git_push_tag_bash = commands.git_push_tag(tag_value);
  helpers.print_if_debug_bash(options, 'git_push_tag_bash', git_push_tag_bash);

  if (git_push_tag_bash.err !== '') {
    helpers.spacer_line(`Pushed: `);
    if (git_push_tag_bash.err.includes('Everything up-to-date')) {
      options.pushed = false;
      helpers.print_warning(`already pushed`);
    } else if (git_push_tag_bash.err.includes('* [new tag]')) {
      options.pushed = true;
      helpers.print_important_info(`ok`);
    } else {
      throw new Error(
        `There was an issue pushing a tag! Error: ${git_push_tag_bash.err}\n`,
      );
    }
  }

  helpers.print_if_debug(
    options,
    `options.created: ${options.created}, options.pushed: ${options.pushed} `,
  );

  if (options.created === false && options.pushed === false) {
    helpers.print_warning(
      helpers.spacer() +
        'You can recreate and re-push tag by applying --recreate flag. ',
    );
  }

  return options;
}
