import { Options } from './types';

import { check_docker_file } from './build_image/check_docker_file';
import { check_docker } from './build_image/check_docker';
import { check_docker_login } from './build_image/check_docker_login';
import { check_docker_running } from './build_image/check_docker_running';
import { check_bratiska_build_envs } from './build_image/check_bratiska_build_envs';
import { check_docker_ignore } from './build_image/check_docker_ignore';
import { build_docker_image } from './build_image/build_docker_image';
import { check_docker_image } from './build_image/check_docker_image';
import { clean_bratiska_build_envs } from './build_image/clean_bratiska_build_envs';
import { push_docker_image } from './build_image/push_docker_image';
import { check_pushed_image } from './build_image/check_pushed_image';
import { clean_docker_image } from './build_image/clean_docker_image';

export class BuildImage {
  check_docker_file(options: Options) {
    check_docker_file(options);
  }

  check_docker(options: Options) {
    check_docker(options);
  }

  check_docker_login(options: Options) {
    check_docker_login(options);
  }

  check_docker_running(options: Options) {
    check_docker_running(options);
  }

  check_bratiska_build_envs(options: Options) {
    check_bratiska_build_envs(options);
  }

  check_docker_ignore(options: Options) {
    check_docker_ignore(options);
  }

  build_docker_image(options: Options) {
    build_docker_image(options);
  }

  check_docker_image(options: Options) {
    check_docker_image(options);
  }

  clean_bratiska_build_envs(options: Options) {
    clean_bratiska_build_envs(options);
  }

  push_docker_image(options: Options) {
    push_docker_image(options);
  }

  check_pushed_image(options: Options) {
    check_pushed_image(options);
  }

  clean_docker_image(options: Options) {
    clean_docker_image(options);
  }
}
