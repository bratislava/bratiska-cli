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
exports.tag_options = void 0;
const helpers = __importStar(require("../helpers"));
function tag_options(options, env) {
  options.tag_command = true;
  if (typeof env !== "undefined" && env !== "") {
    const envArray = env.split("-");
    helpers.print_if_debug(options, `envArray[0]: ${envArray[0]}, envArray[1]: ${envArray[1]}`);
    options.env = envArray[0];
    if (typeof options.tech === "undefined") {
      options.tech = envArray[1];
    }
  }
  helpers.print_if_debug(options, `options.env: ${options.env}, options.tech: ${options.tech}`);
  return options;
}
exports.tag_options = tag_options;
