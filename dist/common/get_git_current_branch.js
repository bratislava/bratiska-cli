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
exports.get_git_current_branch = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function get_git_current_branch(options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Getting current git branch...`);
  if (options.image) {
    helpers.skipping();
    return;
  }
  options.branch = "";
  const branch_bash = commands.git_current_branch();
  helpers.print_if_debug_bash(options, "branch_bash", branch_bash);
  if (branch_bash.err !== "") {
    throw new Error("There was an issue obtaining the git branch name! Do you have git installed?");
  }
  options.branch = branch_bash.res;
  helpers.print_if_debug(options, `branch: ${options.branch}`);
  helpers.spacer_log(`Current git branch from HEAD: `);
  if (options.branch !== "HEAD" && options.branch !== "") {
    helpers.print_important_info(`${options.branch}`);
  } else {
    helpers.print_warning(`Branch is unknown for now, we will determine it later.`);
  }
  return options;
}
exports.get_git_current_branch = get_git_current_branch;
