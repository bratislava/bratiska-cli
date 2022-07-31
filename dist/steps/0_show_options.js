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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.show_options = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
const path = __importStar(require("path"));
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
function show_options(options) {
    const pwd = commands.pwd();
    if (pwd === '') {
        throw new Error('There was an issue getting the current working directory!');
    }
    options.pwd = pwd;
    if (options.debug) {
        helpers.print_debug(`pwd: ${options.pwd}`);
    }
    if (typeof options.build_image === 'undefined') {
        options.build_image = false;
    }
    if (typeof options.build_image_no_registry === 'undefined') {
        options.build_image_no_registry = false;
    }
    if (typeof options.force_rebuild === 'undefined') {
        options.force_rebuild = false;
    }
    if (typeof options.build_kustomize === 'undefined') {
        options.build_kustomize = false;
    }
    if (typeof options.kustomize === 'undefined') {
        options.kustomize = false;
    }
    if (typeof options.image === 'undefined') {
        options.image = false;
    }
    if (typeof options.namespace === 'undefined') {
        options.namespace = 'stantalone';
    }
    const pack = helpers.load_package(options);
    if (typeof options.deployment === 'undefined') {
        options.deployment = pack.name;
    }
    if (typeof options.version === 'undefined') {
        options.version = pack.version;
    }
    if (typeof options.debug === 'undefined') {
        options.debug = false;
    }
    if (typeof options.force === 'undefined') {
        options.force = false;
    }
    else {
        const pass = crypto_1.default
            .createHash('sha256')
            .update(options.force)
            .digest('base64');
        if (pass === '8pJV46gp8KmFsVSNN5DBRmF/1N7AUmBzXAvFsJKmOXU=') {
            options.force = true;
            helpers.star_wars();
        }
        else {
            throw new Error(helpers.game_over());
        }
    }
    if (typeof options.staging !== 'undefined' &&
        typeof options.production !== 'undefined') {
        throw new Error('Staging and production flags can`t be used at the same time!');
    }
    helpers.line('(0) Starting with options... \n');
    options.kustomize_default_path = false;
    const path_ku_local = helpers.kustomize_folder_path(options);
    if (fs_1.default.existsSync(path_ku_local)) {
        options.kustomize_default_path = true;
    }
    options.repository_uri = path.basename(options.pwd);
    helpers.print_options(options);
    helpers.log('Summary:');
    helpers.line(`Application name: `);
    helpers.print_important_info(`${options.deployment}`);
    helpers.line(`Directory of application: `);
    helpers.print_important_info(`${options.pwd}`);
    helpers.line(`Package.json: `);
    helpers.print_important_info('present');
    helpers.line(`Kubernetes folder with kustomize files included: `);
    helpers.print_important_info(`${options.kustomize_default_path}`);
    return options;
}
exports.show_options = show_options;
