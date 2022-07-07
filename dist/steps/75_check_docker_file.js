"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true, get: function() {
                return m[k];
            }
        };
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
var __importStar = (this && this.__importStar) || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_docker_file = void 0;
const helpers = __importStar(require("../helpers"));
const fs_1 = __importDefault(require("fs"));
function check_docker_file(options) {
    helpers.line("(7.5) Checking docker file...");
    if (options.image) {
        helpers.skipping();
        return;
    }
    const docker_path = helpers.dockerfile_path(options);
    if (!fs_1.default.existsSync(docker_path)) {
        throw new Error(`Please add proper Dockerfile, because there is no Dockerfile available in path: ${docker_path}.  `);
    }
    const stats = fs_1.default.statSync(docker_path);
    if (stats.size < 10) {
        throw new Error(`Please add proper Dockerfile, because your Dockerfile is empty!`);
    }
    helpers.ok();
}
exports.check_docker_file = check_docker_file;
