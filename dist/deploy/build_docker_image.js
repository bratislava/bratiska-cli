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
Object.defineProperty(exports, "__esModule", { value: true });
exports.build_docker_image = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function build_docker_image(options) {
    helpers.line(`(${helpers.step(options)}) Building docker image for platform linux/amd64...`);
    if (options.image) {
        helpers.skipping();
        return;
    }
    const image_tag = helpers.image_tag(options);
    helpers.spacer_line(`\n${helpers.spacer()}Image tag name: `);
    helpers.print_important_info(`${image_tag}`);
    /* we will check if we already have an image */
    const image = commands.docker_check_image(options);
    if (image.err === "" && options.force_rebuild === false) {
        helpers.line(`\ndocker image is already present on local machine...`);
        helpers.skipping();
        return;
    }
    commands.docker_build(options);
    if (options.beta) {
        const latest_tag = helpers.image_latest_tag(options);
        helpers.line(`\n adding latest tag: ${latest_tag} ...`);
        const tag_bash = commands.docker_tag(image_tag, latest_tag);
        helpers.print_if_debug(options, tag_bash.res);
        helpers.print_if_debug(options, tag_bash.err);
    }
    helpers.finished();
}
exports.build_docker_image = build_docker_image;
