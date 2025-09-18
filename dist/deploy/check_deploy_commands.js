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
exports.check_deploy_commands = check_deploy_commands;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function check_deploy_commands(options) {
    helpers.line(`(${helpers.step(options)}) Checking required deploy commands... \n`);
    const git_bash = commands.git(options);
    if (git_bash.err !== '') {
        helpers.print_if_debug_bash(options, 'git', git_bash);
        throw new Error(`git command is not available on your computer! Please run installation command: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git`);
    }
    else {
        helpers.spacer_line(`git:`);
        helpers.print_important_info(`       installed`);
    }
    const envsubst_bash = commands.envsubst(options);
    if (envsubst_bash.err !== '') {
        helpers.print_if_debug_bash(options, 'envsubst', envsubst_bash);
        throw new Error(`envsubst command is not available on your computer! Please run installation command: 'brew install gettext'`);
    }
    else {
        helpers.spacer_line(`envsubst:`);
        helpers.print_important_info(`  installed`);
    }
    const kustomize_bash = commands.kustomize(options);
    if (kustomize_bash.err !== '') {
        helpers.print_if_debug_bash(options, 'kustomize', kustomize_bash);
        throw new Error(`kustomize command is not available on your computer! Please check installation instructions: https://kubectl.docs.kubernetes.io/installation/kustomize/`);
    }
    else {
        helpers.spacer_line(`kustomize:`);
        helpers.print_important_info(` installed`);
    }
    const kubectl_bash = commands.kubectl(options);
    if (kubectl_bash.err !== '') {
        helpers.print_if_debug_bash(options, 'kubectl', kubectl_bash);
        throw new Error(`kubectl command is not available on your computer! Please check installation instructions: https://kubernetes.io/docs/tasks/tools/`);
    }
    else {
        helpers.spacer_line(`kubectl: `);
        helpers.print_important_info(`  installed`);
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
