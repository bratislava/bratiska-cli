"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true, get: function() {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
});
var __importStar = (this && this.__importStar) || function(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_tag = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));

function delete_tag(options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Deleting tag...`);
  if (options.recreate === false && options.delete === false) {
    helpers.skipping();
    return;
  }
  const tag_value = helpers.tag_value(options);
  helpers.line("\n");
  helpers.spacer_line(`Tag value: `);
  helpers.print_important_info(`${tag_value}`);
  const delete_tag_bash = commands.git_delete_tag(tag_value);
  helpers.print_if_debug_bash(options, "delete_tag_bash", delete_tag_bash);
  helpers.spacer_line(`Deleted locally: `);
  if (delete_tag_bash.res !== "" && delete_tag_bash.err === "") {
    options.deleted_localy = true;
    helpers.print_important_info(`ok`);
  } else {
    if (delete_tag_bash.err.includes("not found")) {
      options.deleted_localy = false;
      helpers.print_error(`not found`);
    } else {
      throw new Error(`There was an issue deleting a local tag! ${delete_tag_bash.err}\n`);
    }
  }
  const delete_tag_origin_bash = commands.git_delete_tag_origin(tag_value);
  helpers.print_if_debug_bash(options, "delete_tag_origin_bash", delete_tag_origin_bash);
  helpers.spacer_line(`Deleted remote: `);
  if (delete_tag_origin_bash.err !== "") {
    switch (true) {
      case delete_tag_origin_bash.err.includes("[deleted]"):
        options.deleted_origin = true;
        helpers.print_important_info(`ok`);
        break;
      case delete_tag_origin_bash.err.includes("Everything up-to-date"):
        options.deleted_origin = false;
        helpers.print_warning(`already pushed`);
        break;
      case delete_tag_origin_bash.err.includes("remote ref does not exist"):
        options.deleted_origin = false;
        helpers.print_error(`not found`);
        break;
      default:
        throw new Error(`There was an issue deleting a remote tag! Error: ${delete_tag_origin_bash.err}\n`);
    }
  }
  if (options.deleted_localy === false && options.deleted_origin === false) {
    helpers.print_warning(helpers.spacer() +
      "You should create tag first, because no tags were found locally and in remote origin. Or change tag name by --tag some_tag_value ");
  }
  return options;
}

exports.delete_tag = delete_tag;
