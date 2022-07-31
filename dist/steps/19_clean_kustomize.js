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
exports.clean_kustomize = void 0;
const helpers = __importStar(require("../helpers"));
const fs_1 = __importDefault(require("fs"));
function clean_kustomize(options) {
    helpers.line('(19) Cleaning kustomize manifest...');
    if (options.debug ||
        options.dry_run ||
        options.build_kustomize ||
        options.build_image ||
        options.build_image_no_registry) {
        helpers.skipping();
        return;
    }
    try {
        fs_1.default.unlinkSync(helpers.manifest_path(options));
    }
    catch (err) {
        throw new Error(`We had an error by cleaning the manifest file.`);
    }
    helpers.ok();
}
exports.clean_kustomize = clean_kustomize;
