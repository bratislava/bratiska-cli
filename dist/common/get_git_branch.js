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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_git_branch = get_git_branch;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function get_git_branch(options) {
    const step = helpers.step(options);
    helpers.line(`(${step}) Getting git branch...`);
    if (options.image) {
        helpers.skipping();
        return;
    }
    if (options.branch === undefined) {
        options.branch = '';
    }
    const github_ref = process.env['GITHUB_REF'];
    const github_head_ref = process.env['GITHUB_HEAD_REF'];
    if (typeof github_ref !== 'undefined' &&
        typeof github_head_ref !== 'undefined') {
        helpers.print_if_debug(options, `Branch is in detached HEAD, getting GITHUB_REF: ${github_ref} and GITHUB_HEAD_REF: ${github_head_ref}`);
        if (github_ref.includes('refs/pull/')) {
            options.branch = github_head_ref;
            helpers.spacer_log(`Current branch from GITHUB_HEAD_REF: `);
            helpers.print_important_info(`${options.branch}`);
            return options;
        }
    }
    if (typeof github_ref !== 'undefined') {
        helpers.print_if_debug(options, `Branch is in detached HEAD, getting ref env GITHUB_REF: ${github_ref}`);
        options.github_ref = github_ref;
        const branch_bash = commands.git_list_of_brnaches_with_refs(github_ref);
        helpers.print_if_debug_bash(options, 'branch_bash', branch_bash);
        options.branch = helpers.get_final_branch(options, branch_bash.res);
        if (options.branch !== false) {
            helpers.print_if_debug(options, `Obtaining branch from tag: ${github_ref} and branch is: ${options.branch}`);
            helpers.spacer_log(`Current branch from tag: `);
            helpers.print_important_info(`${options.branch}`);
            return options;
        }
    }
    helpers.print_if_debug(options, `Branch is in detached HEAD or it was empty, getting branch from commit: ${options.commit}`);
    const branch_commit_bash = commands.git_branch_from_commit(options.commit);
    helpers.print_if_debug_bash(options, 'branch_bash', branch_commit_bash);
    if (branch_commit_bash.res === '') {
        throw new Error('There was an issue getting branch name from commit.\n');
    }
    if (branch_commit_bash.err !== '') {
        throw new Error(`There was an issue getting branch name. Error: ${branch_commit_bash.err}\n`);
    }
    options.branch = helpers.get_final_branch(options, branch_commit_bash.res);
    if (options.branch === false) {
        throw Error('Unable to obtain a branch name! List of branches was received, but none of the list options was good.');
    }
    helpers.spacer_log(`Current branch from commit: `);
    helpers.print_important_info(`${options.branch}`);
    return options;
}
