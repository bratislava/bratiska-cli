"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildKustomize = void 0;
const create_kustomize_env_vars_1 = require("./build_kustomize/create_kustomize_env_vars");
const build_kustomize_1 = require("./build_kustomize/build_kustomize");
const check_kustomize_1 = require("./build_kustomize/check_kustomize");
const clean_kustomize_1 = require("./build_kustomize/clean_kustomize");
const check_ports_numbers_1 = require("./build_kustomize/check_ports_numbers");
const check_hosts_1 = require("./build_kustomize/check_hosts");

class BuildKustomize {
  check_hosts(options) {
    (0, check_hosts_1.check_hosts)(options);
  }

  check_ports_numbers(options) {
    (0, check_ports_numbers_1.check_ports_numbers)(options);
  }

  create_kustomize_env_vars(options) {
    (0, create_kustomize_env_vars_1.create_kustomize_env_vars)(options);
  }

  build_kustomize(options) {
    (0, build_kustomize_1.build_kustomize)(options);
  }

  check_kustomize(options) {
    (0, check_kustomize_1.check_kustomize)(options);
  }

  clean_kustomize(options) {
    (0, clean_kustomize_1.clean_kustomize)(options);
  }
}

exports.BuildKustomize = BuildKustomize;
