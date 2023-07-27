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
exports.check_label_commands = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));

function check_label_commands(options) {
  helpers.line(`(${helpers.step(options)}) Checking required label commands... \n`);
  const git_bash = commands.git(options);
  helpers.print_if_debug_bash(options, "git", git_bash);
  if (git_bash.err !== "") {
    throw new Error(`git command is not available on your computer! Please run installation command: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git`);
  } else {
    helpers.spacer_line(`git:`);
    helpers.print_important_info(`       installed`);
  }
  const kubectl_bash = commands.kubectl(options);
  helpers.print_if_debug_bash(options, "kubectl", kubectl_bash);
  if (kubectl_bash.err !== "") {
    throw new Error(`kubectl command is not available on your computer! Please check installation instructions: https://kubernetes.io/docs/tasks/tools/`);
  } else {
    helpers.spacer_line(`kubectl: `);
    helpers.print_important_info(`  installed`);
  }
}

exports.check_label_commands = check_label_commands;
