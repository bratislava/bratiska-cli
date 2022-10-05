import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from './../types';

export function show_version(options: Options, version: string) {
  options.bratiska_cli_version = version;
  options.step = 0;
  console.log(version);

  const package_json = commands.get_bratiska_cli_git_package_json();
  if (package_json !== '') {
    const package_obj = JSON.parse(package_json);
    const package_version = package_obj.version;
    helpers.print_if_debug(
      options,
      `Github bratiska-cli version: ${package_version}`,
    );

    if (package_version !== version) {
      helpers.print_important_info(
        `There is a newer bratiska-cli version (${package_version}) for you available. Please update with \`yarn global upgrade\` `,
      );
    }

    console.log();
  }
}