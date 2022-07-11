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
exports.check_hosts = void 0;
const helpers = __importStar(require("../helpers"));
function check_hosts(options) {
  helpers.line("(6) Determining host...");
  if (options.build_image || options.build_image_no_registry) {
    helpers.skipping();
    return;
  }
  let env = options.env + ".";
  if (options.env === "prod") {
    env = "";
  }
  options.deployment_env = env;
  if (typeof options.host === "undefined") {
    options.host = options.deployment + "." + env + "bratislava.sk";
  }
  helpers.line(` using this host `);
  helpers.print_important_info_line(`${options.host}`);
  helpers.line(`...`);
  helpers.ok();
  return options;
}
exports.check_hosts = check_hosts;
