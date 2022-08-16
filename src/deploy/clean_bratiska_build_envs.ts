import * as helpers from '../helpers';
import fs from 'fs';

export function clean_bratiska_build_envs(options: Options) {
  helpers.line(
    `(${helpers.step(options)}) Cleaning for bratiska build envs... `,
  );
  if (options.image || options.dry_run || options.debug) {
    helpers.skipping();
    return;
  }
  const envs_next_file = helpers.docker_build_next_env(options);

  if (!fs.existsSync(envs_next_file)) {
    helpers.not_present();
    helpers.skipping();
    return;
  }
  helpers.line('file is present...');
  try {
    fs.unlinkSync(envs_next_file);
  } catch (err) {
    throw new Error(`We had an error cleaning .env.production.local.`);
  }
  helpers.ok();
}
