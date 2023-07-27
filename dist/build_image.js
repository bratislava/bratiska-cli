"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildImage = void 0;
const check_docker_file_1 = require("./build_image/check_docker_file");
const check_docker_1 = require("./build_image/check_docker");
const check_docker_login_1 = require("./build_image/check_docker_login");
const check_docker_running_1 = require("./build_image/check_docker_running");
const check_bratiska_build_envs_1 = require("./build_image/check_bratiska_build_envs");
const check_docker_ignore_1 = require("./build_image/check_docker_ignore");
const build_docker_image_1 = require("./build_image/build_docker_image");
const check_docker_image_1 = require("./build_image/check_docker_image");
const clean_bratiska_build_envs_1 = require("./build_image/clean_bratiska_build_envs");
const push_docker_image_1 = require("./build_image/push_docker_image");
const check_pushed_image_1 = require("./build_image/check_pushed_image");
const clean_docker_image_1 = require("./build_image/clean_docker_image");
const check_build_image_commands_1 = require("./build_image/check_build_image_commands");

class BuildImage {
  check_docker_file(options) {
    (0, check_docker_file_1.check_docker_file)(options);
  }

  check_docker(options) {
    (0, check_docker_1.check_docker)(options);
  }

  check_docker_login(options) {
    (0, check_docker_login_1.check_docker_login)(options);
  }

  check_docker_running(options) {
    (0, check_docker_running_1.check_docker_running)(options);
  }

  check_bratiska_build_envs(options) {
    (0, check_bratiska_build_envs_1.check_bratiska_build_envs)(options);
  }

  check_docker_ignore(options) {
    (0, check_docker_ignore_1.check_docker_ignore)(options);
  }

  build_docker_image(options) {
    (0, build_docker_image_1.build_docker_image)(options);
  }

  check_docker_image(options) {
    (0, check_docker_image_1.check_docker_image)(options);
  }

  clean_bratiska_build_envs(options) {
    (0, clean_bratiska_build_envs_1.clean_bratiska_build_envs)(options);
  }

  push_docker_image(options) {
    (0, push_docker_image_1.push_docker_image)(options);
  }

  check_pushed_image(options) {
    (0, check_pushed_image_1.check_pushed_image)(options);
  }

  clean_docker_image(options) {
    (0, clean_docker_image_1.clean_docker_image)(options);
  }

  check_build_image_commands(options) {
    (0, check_build_image_commands_1.check_build_image_commands)(options);
  }
}
exports.BuildImage = BuildImage;
