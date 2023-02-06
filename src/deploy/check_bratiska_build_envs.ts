import * as helpers from '../helpers';
import fs from 'fs';
import { Options } from '../types';

export function check_bratiska_build_envs(options: Options) {
  helpers.line(
    `(${helpers.step(options)}) Checking for bratiska-cli build envs file: `,
  );
  if (options.image) {
    helpers.skipping();
    return;
  }

  const envs_file = helpers.bratiska_cli_build_dot_env_path(options);
  helpers.print_if_debug(options, `bratiska-cli.build envs file: ${envs_file}`);
  if (!fs.existsSync(envs_file)) {
    helpers.not_present();
    helpers.skipping();
    return;
  }

  helpers.print_important_info_line(
    `'${helpers.bratiska_cli_build_env_filename(options)}'`,
  );
  helpers.line(`...`);

  const envs_next_file = helpers.docker_build_next_env(options);
  helpers.print_if_debug(options, `envs_next_file: ${envs_next_file}`);

  fs.copyFileSync(envs_file, envs_next_file);
  if (!fs.existsSync(envs_next_file)) {
    throw new Error(`We had problem creating next env.production.local!`);
  } else {
    helpers.line(` loaded and created...`);
  }

  if (options.sentry) {
    fs.appendFileSync(envs_next_file, `\nSENTRY_AUTH_TOKEN=${options.sentry}`);
    helpers.print_if_debug(
      options,
      `SENTRY_AUTH_TOKEN=${options.sentry} added to env file ${envs_next_file} for build`,
    );
  }
  helpers.ok();
}
