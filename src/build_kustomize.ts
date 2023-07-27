import { Options } from './types';

import { create_kustomize_env_vars } from './build_kustomize/create_kustomize_env_vars';
import { build_kustomize } from './build_kustomize/build_kustomize';
import { check_kustomize } from './build_kustomize/check_kustomize';
import { clean_kustomize } from './build_kustomize/clean_kustomize';
import { check_ports_numbers } from './build_kustomize/check_ports_numbers';
import { check_hosts } from './build_kustomize/check_hosts';
import { check_build_kustomize_commands } from './build_kustomize/check_build_kustomize_commands';

export class BuildKustomize {
  check_hosts(options: Options) {
    check_hosts(options);
  }

  check_ports_numbers(options: Options) {
    check_ports_numbers(options);
  }

  create_kustomize_env_vars(options: Options) {
    create_kustomize_env_vars(options);
  }

  build_kustomize(options: Options) {
    build_kustomize(options);
  }

  check_kustomize(options: Options) {
    check_kustomize(options);
  }

  clean_kustomize(options: Options) {
    clean_kustomize(options);
  }

  check_build_kustomize_commands(options: Options) {
    check_build_kustomize_commands(options);
  }
}
