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
exports.get_git_tags = get_git_tags;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function get_git_tags(options) {
    const step = helpers.step(options);
    helpers.line(`(${step}) Checking git tags...`);
    if (options.image || options.github_ref === 'refs/heads/master') {
        helpers.skipping();
        return;
    }
    const gittag_bash = commands.git_commit_tag(options.commit);
    helpers.print_if_debug_bash(options, 'gittag_bash', gittag_bash);
    options.gittag = false;
    options.origin_gittag = false;
    if (gittag_bash.res !== '') {
        options.gittag_list = gittag_bash.res.split(/\n/g);
        const len = options.gittag_list.length;
        //latest tag is important
        options.gittag = options.gittag_list[len - 1];
    }
    helpers.print_if_debug(options, `options.gittag: '${options.gittag}'`);
    if (options.gittag) {
        const gittag_origin_raw = commands.git_get_last_remote_tags(options, options.gittag);
        helpers.print_if_debug(options, `gittag_origin_raw: ${gittag_origin_raw}`);
        if (gittag_origin_raw !== '') {
            options.origin_gittag = gittag_origin_raw;
        }
    }
    helpers.spacer_log(`Last git tag: `);
    helpers.print_important_info(`${options.gittag}`);
    helpers.print_if_debug(options, `options.origin_gittag: ${options.origin_gittag}`);
    helpers.print_if_debug(options, `Possible image tag: ${helpers.image_tag(options)}`);
    return options;
}
