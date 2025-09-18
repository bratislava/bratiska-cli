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
exports.show_version = show_version;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
const compare_versions_1 = require("compare-versions");
function show_version(options, local_bratiska_version) {
    options.bratiska_cli_version = local_bratiska_version;
    options.step = 0;
    console.log(local_bratiska_version);
    if (process.env['CI']) {
        helpers.line(`CI pipelines environment detected. Skipping version check.`);
        console.log();
        return;
    }
    const github_package_json = commands.get_bratiska_cli_git_package_json();
    if (github_package_json !== '') {
        const package_obj = JSON.parse(github_package_json);
        const github_package_version = package_obj.version;
        if (local_bratiska_version !== github_package_version) {
            helpers.print_if_debug(options, `Github bratiska-cli version: ${github_package_version}`);
        }
        const compare_result = (0, compare_versions_1.compareVersions)(github_package_version, local_bratiska_version);
        if (compare_result === 1) {
            helpers.print_warning(`There is a newer bratiska-cli version (${github_package_version}) for you available. Please update with \`yarn global upgrade\` `);
            const difference = helpers.calculate_version_diff(local_bratiska_version, github_package_version);
            if (difference >= 10) {
                throw new Error(`Your bratiska-cli version (${local_bratiska_version}) is too old, please update it, to continue using it!`);
            }
            else {
                helpers.sleep(3000);
            }
        }
        console.log();
    }
}
