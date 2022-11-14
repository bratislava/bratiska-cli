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
exports.check_git_merge_status = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function check_git_merge_status(options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Checking git merge status...`);
  if (options.image) {
    helpers.skipping();
    return;
  }
  const remote_commit_bash = commands.git_check_commit_remote(options.commit, options.branch);
  helpers.print_if_debug_bash(options, "remote_commit_bash", remote_commit_bash);
  options.merged = remote_commit_bash.err === "";
  helpers.spacer_log(`Last commit merged: `);
  helpers.print_important_info(`${options.merged}`);
  return options;
}
exports.check_git_merge_status = check_git_merge_status;
