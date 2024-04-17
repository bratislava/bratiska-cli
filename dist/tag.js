"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const tag_options_1 = require("./tag/tag_options");
const delete_tag_1 = require("./tag/delete_tag");
const create_tag_1 = require("./tag/create_tag");
const check_tag_commands_1 = require("./tag/check_tag_commands");
class Tag {
  tag_options(options, env) {
    (0, tag_options_1.tag_options)(options, env);
  }

  delete_tag(options) {
    (0, delete_tag_1.delete_tag)(options);
  }

  create_tag(options) {
    (0, create_tag_1.create_tag)(options);
  }

  check_tag_commands(options) {
    (0, check_tag_commands_1.check_tag_commands)(options);
  }
}
exports.Tag = Tag;
