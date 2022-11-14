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
exports.get_git_branch = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function get_git_branch(options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Getting git branch...`);
  if (options.image) {
    helpers.skipping();
    return;
  }
  const branch_bash = commands.git_current_branch();
  helpers.print_if_debug_bash(options, "branch_bash", branch_bash);
  branch_bash.res = "";
  if (branch_bash.err !== "") {
    throw new Error("There was an issue obtaining the git branch name! Do you have git installed?");
  }
  options.branch = branch_bash.res;
  if (options.branch === "HEAD" || options.branch === "") {
    options.branch = "";
    const github_ref = process.env["GITHUB_REF"];
    if (typeof github_ref !== "undefined") {
      helpers.print_if_debug(options, `Branch is in detached HEAD, getting ref env GITHUB_REF: ${github_ref}`);
      const branch_bash = commands.git_list_of_brnaches_with_refs(github_ref);
      helpers.print_if_debug_bash(options, "branch_bash", branch_bash);
      options.branch = helpers.get_final_branch(options, branch_bash.res);
      if (options.branch !== false) {
        helpers.print_if_debug(options, `Obtaining branch from tag: ${github_ref} and branch is: ${options.branch}`);
      }
    }
    if (options.branch === "") {
      helpers.print_if_debug(options, `Branch is in detached HEAD or it was empty, getting branch from commit: ${options.commit}`);
      const branch_bash = commands.git_branch_from_commit(options.commit);
      helpers.print_if_debug_bash(options, "branch_bash", branch_bash);
      if (branch_bash.res === "") {
        throw new Error("There was an issue getting branch name from commit.\n");
      }
      if (branch_bash.err !== "") {
        throw new Error(`There was an issue getting branch name. Error: ${branch_bash.err}\n`);
      }
      options.branch = helpers.get_final_branch(options, branch_bash.res);
      if (options.branch === false) {
        throw Error("Unable to obtain a branch name! List of branches was received, but none of the list options was good.");
      }
    }
  }
  helpers.spacer_log(`Current branch: `);
  helpers.print_important_info(`${options.branch}`);
  return options;
}
exports.get_git_branch = get_git_branch;
