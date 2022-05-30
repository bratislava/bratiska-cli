'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.check_docker_image = void 0;
const helpers = __importStar(require('../helpers'));
const commands = __importStar(require('../commands'));
function check_docker_image(options) {
  helpers.line('(9) Checking if image was localy created...');
  if (options.image) {
    helpers.skipping();
    return;
  }
  const image = commands.docker_check_image(options);
  if (image.err !== '') {
    throw new Error(
      `There was an issue creating docker image! Check above docker build log.`,
    );
  }
  const res_json = image.res;
  const iro = JSON.parse(res_json);
  if (iro[0].RepoTags[0] !== helpers.image_tag(options)) {
    throw new Error(
      `Image was not properly created. Tags do not fit! More info: ${
        iro[0].RepoTags[0]
      } != ${helpers.image_tag(options)}`,
    );
  }
  helpers.ok();
}
exports.check_docker_image = check_docker_image;
