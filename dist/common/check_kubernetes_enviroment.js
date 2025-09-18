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
exports.check_kubernetes_enviroment = check_kubernetes_enviroment;
const helpers = __importStar(require("../helpers"));
function check_kubernetes_enviroment(options) {
    helpers.line(`(${helpers.step(options)}) Checking kubernetes environment...`);
    if (options.build_image ||
        options.build_image_no_registry ||
        options.dry_run) {
        if (typeof options.env === 'undefined') {
            options.env = 'dev';
            helpers.print_if_debug(options, `Environment is not set for --build_image or --build_image_no_registry, setting default environment: ${options.env}`);
        }
        helpers.spacer_log(`Environment: `);
        helpers.print_important_info(`${options.env}`);
        return options;
    }
    if (typeof options.env === 'undefined') {
        if (options.tag_command === true && options.branch !== 'master') {
            options.env = 'dev';
            helpers.print_if_debug(options, `Environment is not set for tagging, setting default environment: ${options.env}`);
            helpers.spacer_log(`Environment: `);
            helpers.print_important_info(`${options.env}`);
            return options;
        }
        options.env = helpers.map_cluster_to_env(options.cluster);
        helpers.print_if_debug(options, `getting Environment from kubernetes cluster: ${options.env}`);
    }
    else if (options.env !== helpers.map_cluster_to_env(options.cluster)) {
        const cluster_env = helpers.map_cluster_to_env(options.cluster);
        if (options.tag_command === false) {
            throw new Error(`Your kubernetes context "${options.cluster}" (${cluster_env}) do not match chosen context (${options.env})! Change with --env or kubernetes cluster context!`);
        }
    }
    helpers.spacer_log(`Environment: `);
    helpers.print_important_info(`${options.env}`);
    return options;
}
