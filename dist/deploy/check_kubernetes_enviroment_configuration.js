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
exports.check_kubernetes_enviroment_configuration = check_kubernetes_enviroment_configuration;
const helpers = __importStar(require("../helpers"));
function check_kubernetes_enviroment_configuration(options) {
    helpers.line(`(${helpers.step(options)}) Checking Kubernetes environment configuration file...`);
    if (options.build_image || options.build_image_no_registry) {
        helpers.skipping();
        return options;
    }
    const config_path = helpers.kustomize_folder_path(options) + '/config.json';
    const config = helpers.load_json(config_path);
    if (!config) {
        helpers.not_present();
        helpers.skipping();
        return options;
    }
    options = Object.assign(Object.assign({}, options), config);
    helpers.line(' config.json is present, displaying new options... \n');
    helpers.print_options(options);
    helpers.ok();
    return options;
}
