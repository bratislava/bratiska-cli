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
exports.get_git_commits = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));

function get_git_commits(options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Getting git commits...`);
  if (options.image) {
    helpers.skipping();
    return;
  }
  const commit_short_bash = commands.git_current_commit_short();
  helpers.print_if_debug_bash(options, "commit_short_bash", commit_short_bash);
  if (commit_short_bash.err !== "") {
    throw new Error("There was an issue getting commit short value!\n");
  }
  options.commit_short = commit_short_bash.res;
  const commit_bash = commands.git_current_commit();
  helpers.print_if_debug_bash(options, "commit_bash", commit_bash);
  if (commit_bash.err !== "") {
    throw new Error("There was an issue getting commit value!\n");
  }
  options.commit = commit_bash.res;
  helpers.spacer_log(`Last commit: `);
  helpers.print_important_info(`${options.commit}`);
  return options;
}

exports.get_git_commits = get_git_commits;
