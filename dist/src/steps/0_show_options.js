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
exports.show_options = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
const path = __importStar(require("path"));
function show_options(options) {
    helpers.line('(0) Starting with options... \n');
    if (options.deploy) {
        helpers.print_important_info('deploy');
    }
    if (options.debug) {
        helpers.print_important_info('--debug');
    }
    if (options.dry_run) {
        helpers.print_important_info('--dry_run');
    }
    if (options.force) {
        helpers.print_important_info('--force');
    }
    if (options.build_kustomize) {
        helpers.print_important_info('--build_kustomize');
    }
    if (options.build_image) {
        helpers.print_important_info('--build_image');
    }
    if (options.build_image_no_registry) {
        helpers.print_important_info('--build_image_no_registry');
    }
    if (options.deployment) {
        helpers.print_important_info(`--deployment=${options.deployment}`);
    }
    if (options.image) {
        helpers.print_important_info(`--image=${options.image}`);
    }
    if (options.kustomize) {
        helpers.print_important_info(`--kustomize=${options.kustomize}`);
    }
    if (options.namespace) {
        helpers.print_important_info(`--namespace=${options.namespace}`);
    }
    if (options.registry) {
        helpers.print_important_info(`--registry=${options.registry}`);
    }
    const pwd = commands.pwd();
    if (pwd === '') {
        throw new Error('There was an issue getting current working directory!');
    }
    options.pwd = pwd;
    if (options.debug) {
        helpers.print_debug(`pwd: ${options.pwd}`);
    }
    options.repository_uri = path.basename(options.pwd);
    return options;
}
exports.show_options = show_options;
