"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const add_label_to_resources_1 = require("./label/add_label_to_resources");
const show_label_info_1 = require("./label/show_label_info");
const add_label_to_secrets_1 = require("./label/add_label_to_secrets");
const check_label_commands_1 = require("./label/check_label_commands");
class Label {
  add_label_to_resources(options) {
    (0, add_label_to_resources_1.add_label_to_resources)(options);
  }

  add_label_to_secrets(options) {
    (0, add_label_to_secrets_1.add_label_to_secrets)(options);
  }

  show_label_info(label_value, options) {
    (0, show_label_info_1.show_label_info)(label_value, options);
  }

  check_label_commands(options) {
    (0, check_label_commands_1.check_label_commands)(options);
  }
}
exports.Label = Label;
