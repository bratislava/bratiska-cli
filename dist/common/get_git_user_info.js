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
exports.get_git_user_info = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));

function get_git_user_info(options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Getting git user info...`);
  if (options.image) {
    helpers.skipping();
    return;
  }
  const user_name_bash = commands.git_user_name();
  helpers.print_if_debug_bash(options, "user_name_bash", user_name_bash);
  if (user_name_bash.err !== "") {
    throw new Error("There was an issue getting git user name!\n");
  }
  options.user_name = user_name_bash.res.toLowerCase();
  helpers.line("\n");
  helpers.spacer_line(`User name: `);
  helpers.print_important_info(`${options.user_name}`);
  const user_email_bash = commands.git_user_email();
  helpers.print_if_debug_bash(options, "user_email_bash", user_email_bash);
  if (user_email_bash.err !== "") {
    throw new Error("There was an issue getting git user email!\n");
  }
  options.user_email = user_email_bash.res;
  helpers.spacer_line(`User email: `);
  helpers.print_important_info(`${options.user_email}`);
  return options;
}

exports.get_git_user_info = get_git_user_info;
