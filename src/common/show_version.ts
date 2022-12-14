import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from '../types';
import { compareVersions } from 'compare-versions';

export function show_version(options: Options, local_bratiska_version: string) {
  options.bratiska_cli_version = local_bratiska_version;
  options.step = 0;
  console.log(local_bratiska_version);

  const github_package_json = commands.get_bratiska_cli_git_package_json();
  if (github_package_json !== '') {
    const package_obj = JSON.parse(github_package_json);
    const github_package_version = package_obj.version;
    helpers.print_if_debug(
      options,
      `Github bratiska-cli version: ${github_package_version}`,
    );

    const compare_result = compareVersions(
      github_package_version,
      local_bratiska_version,
    );

    if (compare_result === 1) {
      helpers.print_important_info(
        `There is a newer bratiska-cli version (${github_package_version}) for you available. Please update with \`yarn global upgrade\` `,
      );

      const difference = helpers.calculate_version_diff(
        local_bratiska_version,
        github_package_version,
      );

      if (difference >= 4) {
        throw new Error(
          `Your bratiska-cli version (${local_bratiska_version}) is at-least four updates old, please update it, to continue using it!`,
        );
      }
    }

    console.log();
  }
}
