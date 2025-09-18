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
exports.check_docker_login = check_docker_login;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function check_docker_login(options) {
    helpers.line(`(${helpers.step(options)}) Checking docker login...`);
    if (options.build_image_no_registry || options.no_image_repo_check) {
        helpers.skipping();
        return;
    }
    const docker = commands.docker_login(options);
    if (!(docker.res.includes('Login Succeeded') ||
        docker.res.includes('Already logged in to'))) {
        helpers.print_if_debug(options, `docker_login res: ${docker.res.trim()} err: ${docker.err}`);
        throw new Error(`You are unauthorized. Please login to docker registry ${options.registry} with command "docker login ${options.registry}".`);
    }
    if (docker.err !== '' &&
        !docker.err.includes('Your password will be stored unencrypted in')) {
        helpers.print_if_debug(options, `docker_login res: ${docker.res.trim()} err: ${docker.err}`);
        throw new Error(`There was an error checking docker registry ${options.registry} Error: ${docker.err}`);
    }
    helpers.ok();
}
