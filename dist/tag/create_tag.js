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
exports.create_tag = create_tag;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
// TODO be able to create tags with v* easily with counting versions
// TODO be able to add stable tag on repos which have no package json
function create_tag(options) {
    const step = helpers.step(options);
    helpers.line(`(${step}) Creating tag...`);
    if (options.delete) {
        helpers.skipping();
        return;
    }
    const tag_value = helpers.tag_value(options);
    helpers.line('\n');
    helpers.spacer_line(`Tag value: `);
    helpers.print_important_info(`${tag_value}`);
    if (options.dry_run) {
        helpers.skipping();
        return;
    }
    const add_tag_bash = commands.git_add_tag(tag_value);
    helpers.print_if_debug_bash(options, 'add_tag_bash', add_tag_bash);
    helpers.spacer_line(`Created: `);
    if (add_tag_bash.err !== '') {
        if (add_tag_bash.err.includes('already exists')) {
            options.created = false;
            helpers.print_warning(`already exists`);
        }
        else {
            throw new Error(`There was an issue adding a tag! Error: ${add_tag_bash.err}\n`);
        }
    }
    else if (add_tag_bash.res === '') {
        options.created = true;
        helpers.print_important_info(`ok`);
    }
    if (options.local) {
        options.pushed = false;
        helpers.spacer_line(`Pushed: `);
        helpers.print_warning(`skipped because of the --local flag`);
        return options;
    }
    const git_push_tag_bash = commands.git_push_tag(tag_value);
    helpers.print_if_debug_bash(options, 'git_push_tag_bash', git_push_tag_bash);
    if (git_push_tag_bash.err !== '') {
        helpers.spacer_line(`Pushed: `);
        if (git_push_tag_bash.err.includes('Everything up-to-date')) {
            options.pushed = false;
            helpers.print_warning(`already pushed`);
        }
        else if (git_push_tag_bash.err.includes('* [new tag]')) {
            options.pushed = true;
            helpers.print_important_info(`ok`);
        }
        else {
            throw new Error(`There was an issue pushing a tag! Error: ${git_push_tag_bash.err}\n`);
        }
    }
    helpers.print_if_debug(options, `options.created: ${options.created}, options.pushed: ${options.pushed} `);
    if (options.created === false && options.pushed === false) {
        helpers.print_warning(helpers.spacer() +
            'You can recreate and re-push tag by applying --recreate flag. ');
    }
    return options;
}
