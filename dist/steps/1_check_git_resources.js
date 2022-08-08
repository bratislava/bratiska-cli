"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_git_resources = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
const commands_1 = require("../commands");
function check_git_resources(options) {
    helpers.line('(1) Checking git...');
    if (options.image) {
        helpers.skipping();
        return;
    }
    const branch_bash = commands.git_current_branch();
    if (branch_bash.err !== '') {
        throw new Error('There was an issue obtaining the git branch name! Do you have git installed?');
    }
    options.branch = branch_bash.res;
    helpers.print_if_debug(options, `branch: ${options.branch}`);
    const repository_bash = commands.git_repository_url();
    if (repository_bash.err !== '') {
        throw new Error('There was an issue getting the remote repository URL. Please push your changes to GitHub or azure.\n');
    }
    options.repository_uri = repository_bash.res;
    helpers.print_if_debug(options, `repository_uri: ${options.repository_uri}`);
    const name_bash = commands.git_repo_name(options);
    if (name_bash === '') {
        throw new Error('There was an issue fetching git repo name from git origin!');
    }
    options.repo_name = name_bash;
    helpers.print_if_debug(options, `reponame: ${options.repo_name}`);
    const fetch_bash = commands.git_fetch_origin();
    if (fetch_bash.err !== '') {
        throw new Error('There was an issue fetching changes from git origin! Error:' +
            fetch_bash.err);
    }
    options.fetch = fetch_bash.res;
    helpers.print_if_debug(options, `fetch: ${options.fetch}`);
    const commit_bash = commands.git_current_commit();
    if (commit_bash.err !== '') {
        throw new Error('There was an issue getting commit status!\n');
    }
    options.commit = commit_bash.res;
    helpers.print_if_debug(options, `commit: ${options.commit}`);
    const status_bash = commands.git_current_status(options);
    if (status_bash.err !== '') {
        throw new Error('There was an issue getting git status!');
    }
    options.untracked = false;
    if (status_bash.res !== "") {
        options.untracked = true;
        helpers.print_warning("\nWe have untracked changes in the repo, adding the tag \"untracked\"...");
    }
    const remote_commit_bash = commands.git_check_commit_remote(options.commit, options.branch);
    helpers.print_if_debug(options, `remote_commit_bash: ${remote_commit_bash.err}`);
    const gittag_bash = (0, commands_1.git_commit_tag)(options.commit);
    helpers.print_if_debug(options, `tag info: ${gittag_bash.res}, ${gittag_bash.err}`);
    options.gittag = false;
    options.origin_gittag = false;
    if (gittag_bash.res !== "") {
        options.gittag = gittag_bash.res;
    }
    helpers.print_if_debug(options, `options.gittag: ${options.gittag}`);
    if (options.gittag) {
        const gittag_origin_bash = (0, commands_1.git_origin_commit_tag)(options.gittag);
        if (gittag_origin_bash.res !== "") {
            options.origin_gittag = gittag_origin_bash.res;
        }
    }
    helpers.print_if_debug(options, `options.origin_gittag: ${options.origin_gittag}`);
    helpers.print_if_debug(options, `Possible image tag: ${helpers.image_tag(options)}`);
    helpers.line("(1) Continue Checking git...");
    options.merged = remote_commit_bash.err === "";
    helpers.ok();
    return options;
}
exports.check_git_resources = check_git_resources;
