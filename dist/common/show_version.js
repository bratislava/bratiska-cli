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
exports.show_version = void 0;
const helpers = __importStar(require("../helpers"));
const commands = __importStar(require("../commands"));
function show_version(options, version) {
    options.bratiska_cli_version = version;
    options.step = 0;
    console.log(version);
    const package_json = commands.get_bratiska_cli_git_package_json();
  if (package_json !== "") {
    const package_obj = JSON.parse(package_json);
    const package_version = package_obj.version;
    helpers.print_if_debug(options, `Github bratiska-cli version: ${package_version}`);
    if (package_version !== version) {
      helpers.print_important_info(`There is a newer bratiska-cli version (${package_version}) for you available. Please update with \`yarn global upgrade\` `);
    }
    console.log();
  }
}
exports.show_version = show_version;
