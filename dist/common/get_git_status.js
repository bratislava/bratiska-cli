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
exports.get_git_status = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function get_git_status(options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Getting git status info...`);
  if (options.image) {
    helpers.skipping();
    return;
  }
  const status_bash = commands.git_current_status(options);
  helpers.print_if_debug_bash(options, "status_bash", status_bash);
  if (status_bash.err !== "") {
    throw new Error("There was an issue getting git status!");
  }
  options.untracked = false;
  if (status_bash.res !== "" && options.tag_command === false) {
    options.untracked = true;
    helpers.print_warning("We have untracked changes in the repo, adding the flag \"untracked\"");
  } else {
    helpers.ok();
  }
  return options;
}
exports.get_git_status = get_git_status;
