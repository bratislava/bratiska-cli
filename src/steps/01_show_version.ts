import * as helpers from '../helpers';
import * as commands from '../commands';
import { get_bratiska_cli_git_package_json } from '../commands';

export function show_version(options: any, version: string) {
  options.bratiska_cli_version = version;
  console.log(version);

  const package_json = commands.get_bratiska_cli_git_package_json(options);
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
