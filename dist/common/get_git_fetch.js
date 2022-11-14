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
exports.get_git_fetch = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));

function get_git_fetch(options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Fetching git repo changes...`);
  const fetch_bash = commands.git_fetch_origin();
  helpers.print_if_debug_bash(options, "fetch_bash", fetch_bash);
  /*
  This is throwing error when there are changes which are not fetched
  if (fetch_bash.err !== '') {
    throw new Error(
      'There was an issue fetching changes from git origin! Error:' +
        fetch_bash.err,
    );
  }
   */
  options.fetch = fetch_bash.res;
  helpers.print_if_debug(options, `fetch: ${options.fetch}`);
  helpers.ok();
  return options;
}

exports.get_git_fetch = get_git_fetch;
