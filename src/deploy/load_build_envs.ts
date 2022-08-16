import * as helpers from '../helpers';
import fs from 'fs';

export function load_build_envs(options: Options) {
  helpers.line(`(${helpers.step(options)}) Checking for docker build envs: `);
  if (options.image) {
    helpers.skipping();
    return;
  }
  helpers.print_important_info_line(`'.env.${options.env}'`);
  helpers.line(`...`);
  const envs_file = helpers.docker_build_dot_env_file(options);
  if (!fs.existsSync(envs_file)) {
    helpers.not_present();
    helpers.skipping();
    return;
  }

  const envs_next_file = helpers.docker_build_next_env(options);
  fs.copyFileSync(envs_file, envs_next_file);
  if (!fs.existsSync(envs_next_file)) {
    throw new Error(`We had problem creating next env.production.local!`);
  } else {
    helpers.line(` loaded and created...`);
  }

  helpers.ok();
}
