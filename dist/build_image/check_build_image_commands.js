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
exports.check_build_image_commands = check_build_image_commands;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function check_build_image_commands(options) {
    helpers.line(`(${helpers.step(options)}) Checking required build_image commands... \n`);
    const git_bash = commands.git(options);
    helpers.print_if_debug_bash(options, 'git', git_bash);
    if (git_bash.err !== '') {
        throw new Error(`git command is not available on your computer! Please run installation command: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git`);
    }
    else {
        helpers.spacer_line(`git:`);
        helpers.print_important_info(`       installed`);
    }
    const docker_bash = commands.docker();
    if (docker_bash.err !== '') {
        helpers.print_if_debug_bash(options, 'docker', docker_bash);
        throw new Error(`docker command is not available on your computer! Please check installation instructions: https://docs.docker.com/engine/install`);
    }
    else {
        helpers.spacer_line(`docker: `);
        helpers.print_important_info(`   installed`);
    }
}
