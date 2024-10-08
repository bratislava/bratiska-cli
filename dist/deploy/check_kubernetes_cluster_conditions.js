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
exports.check_kubernetes_cluster_conditions = void 0;
const helpers = __importStar(require("../helpers"));
function check_kubernetes_cluster_conditions(options) {
    helpers.line(`(${helpers.step(options)}) Checking Kubernetes cluster conditions...`);
    if (options.build_kustomize ||
      options.build_image ||
      options.build_image_no_registry ||
      options.dry_run) {
        helpers.skipping();
        return;
    }
    switch (options.cluster) {
      case "tkg-innov-staging":
        if (typeof options.staging === "undefined" && options.force === false) {
                throw new Error("You cannot deploy to 'tkg-innov-staging' without a staging flag! Please add the flag `--staging` to the command.");
            }
            if (options.untracked === true && options.force === false) {
                throw new Error(`You cannot deploy to 'tkg-innov-staging' when you have untracked changes. Please commit and push changes to your branch origin/${options.branch}!`);
            }
            if (options.merged === false && options.force === false) {
                throw new Error(`You cannot deploy to 'tkg-innov-staging' when the changes are not pushed in-branch origin/${options.branch}. Please push your changes!`);
            }
            break;
      case "tkg-innov-prod":
        if (typeof options.production === "undefined") {
                throw new Error("You cannot deploy to 'tkg-innov-prod' without a production flag! Please add the flag `--production` to the command.");
            }
            if (options.untracked === true && options.force === false) {
                throw new Error(`You cannot deploy to 'tkg-innov-prod' when you have untracked changes. Please commit, and PR merge your changes to master!`);
            }
            break;
    }
    helpers.line(` we will use `);
    helpers.print_important_info_line(`${options.cluster}`);
    helpers.line(`...`);
    helpers.ok();
    return options;
}
exports.check_kubernetes_cluster_conditions = check_kubernetes_cluster_conditions;
