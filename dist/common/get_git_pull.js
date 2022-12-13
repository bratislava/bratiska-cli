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
exports.get_git_pull = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function get_git_pull(options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Pulling git repo...`);
  if (options.no_pull) {
    helpers.skipping();
    return;
  }
  if (options.branch !== "HEAD" &&
    options.branch !== "" &&
    options.branch !== "master") {
    helpers.skipping();
    return;
  }
  const pull_bash = commands.git_pull_origin();
  helpers.print_if_debug_bash(options, "pull_bash", pull_bash);
  if (pull_bash.res === "Already up to date.") {
    helpers.print_important_info_line(" Already up to date\n");
  } else if (pull_bash.res !== "Already up to date.") {
    helpers.print_warning(" Repo was updated via git pull\n");
  }
  if (pull_bash.err !== "") {
    throw new Error("There was an issue pulling changes from git origin! Error:" +
      pull_bash.err);
  }
  options.pull = pull_bash.res;
  helpers.print_if_debug(options, `options.pull: ${options.pull}`);
  return options;
}
exports.get_git_pull = get_git_pull;
