/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/dotenv/config.js":
/*!***************************************!*\
  !*** ./node_modules/dotenv/config.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("(function () {\n  (__webpack_require__(/*! ./lib/main */ \"./node_modules/dotenv/lib/main.js\").config)(\n    Object.assign(\n      {},\n      __webpack_require__(/*! ./lib/env-options */ \"./node_modules/dotenv/lib/env-options.js\"),\n      __webpack_require__(/*! ./lib/cli-options */ \"./node_modules/dotenv/lib/cli-options.js\")(process.argv)\n    )\n  )\n})()\n\n\n//# sourceURL=webpack://crud-api/./node_modules/dotenv/config.js?");

/***/ }),

/***/ "./node_modules/dotenv/lib/cli-options.js":
/*!************************************************!*\
  !*** ./node_modules/dotenv/lib/cli-options.js ***!
  \************************************************/
/***/ ((module) => {

eval("const re = /^dotenv_config_(encoding|path|debug|override|DOTENV_KEY)=(.+)$/\n\nmodule.exports = function optionMatcher (args) {\n  return args.reduce(function (acc, cur) {\n    const matches = cur.match(re)\n    if (matches) {\n      acc[matches[1]] = matches[2]\n    }\n    return acc\n  }, {})\n}\n\n\n//# sourceURL=webpack://crud-api/./node_modules/dotenv/lib/cli-options.js?");

/***/ }),

/***/ "./node_modules/dotenv/lib/env-options.js":
/*!************************************************!*\
  !*** ./node_modules/dotenv/lib/env-options.js ***!
  \************************************************/
/***/ ((module) => {

eval("// ../config.js accepts options via environment variables\nconst options = {}\n\nif (process.env.DOTENV_CONFIG_ENCODING != null) {\n  options.encoding = process.env.DOTENV_CONFIG_ENCODING\n}\n\nif (process.env.DOTENV_CONFIG_PATH != null) {\n  options.path = process.env.DOTENV_CONFIG_PATH\n}\n\nif (process.env.DOTENV_CONFIG_DEBUG != null) {\n  options.debug = process.env.DOTENV_CONFIG_DEBUG\n}\n\nif (process.env.DOTENV_CONFIG_OVERRIDE != null) {\n  options.override = process.env.DOTENV_CONFIG_OVERRIDE\n}\n\nif (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {\n  options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY\n}\n\nmodule.exports = options\n\n\n//# sourceURL=webpack://crud-api/./node_modules/dotenv/lib/env-options.js?");

/***/ }),

/***/ "./node_modules/dotenv/lib/main.js":
/*!*****************************************!*\
  !*** ./node_modules/dotenv/lib/main.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const fs = __webpack_require__(/*! fs */ \"?a0c3\")\nconst path = __webpack_require__(/*! path */ \"?fd46\")\nconst os = __webpack_require__(/*! os */ \"?613f\")\nconst crypto = __webpack_require__(/*! crypto */ \"?d107\")\nconst packageJson = __webpack_require__(/*! ../package.json */ \"./node_modules/dotenv/package.json\")\n\nconst version = packageJson.version\n\nconst LINE = /(?:^|^)\\s*(?:export\\s+)?([\\w.-]+)(?:\\s*=\\s*?|:\\s+?)(\\s*'(?:\\\\'|[^'])*'|\\s*\"(?:\\\\\"|[^\"])*\"|\\s*`(?:\\\\`|[^`])*`|[^#\\r\\n]+)?\\s*(?:#.*)?(?:$|$)/mg\n\n// Parse src into an Object\nfunction parse (src) {\n  const obj = {}\n\n  // Convert buffer to string\n  let lines = src.toString()\n\n  // Convert line breaks to same format\n  lines = lines.replace(/\\r\\n?/mg, '\\n')\n\n  let match\n  while ((match = LINE.exec(lines)) != null) {\n    const key = match[1]\n\n    // Default undefined or null to empty string\n    let value = (match[2] || '')\n\n    // Remove whitespace\n    value = value.trim()\n\n    // Check if double quoted\n    const maybeQuote = value[0]\n\n    // Remove surrounding quotes\n    value = value.replace(/^(['\"`])([\\s\\S]*)\\1$/mg, '$2')\n\n    // Expand newlines if double quoted\n    if (maybeQuote === '\"') {\n      value = value.replace(/\\\\n/g, '\\n')\n      value = value.replace(/\\\\r/g, '\\r')\n    }\n\n    // Add to object\n    obj[key] = value\n  }\n\n  return obj\n}\n\nfunction _parseVault (options) {\n  const vaultPath = _vaultPath(options)\n\n  // Parse .env.vault\n  const result = DotenvModule.configDotenv({ path: vaultPath })\n  if (!result.parsed) {\n    const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`)\n    err.code = 'MISSING_DATA'\n    throw err\n  }\n\n  // handle scenario for comma separated keys - for use with key rotation\n  // example: DOTENV_KEY=\"dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=prod,dotenv://:key_7890@dotenvx.com/vault/.env.vault?environment=prod\"\n  const keys = _dotenvKey(options).split(',')\n  const length = keys.length\n\n  let decrypted\n  for (let i = 0; i < length; i++) {\n    try {\n      // Get full key\n      const key = keys[i].trim()\n\n      // Get instructions for decrypt\n      const attrs = _instructions(result, key)\n\n      // Decrypt\n      decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key)\n\n      break\n    } catch (error) {\n      // last key\n      if (i + 1 >= length) {\n        throw error\n      }\n      // try next key\n    }\n  }\n\n  // Parse decrypted .env string\n  return DotenvModule.parse(decrypted)\n}\n\nfunction _log (message) {\n  console.log(`[dotenv@${version}][INFO] ${message}`)\n}\n\nfunction _warn (message) {\n  console.log(`[dotenv@${version}][WARN] ${message}`)\n}\n\nfunction _debug (message) {\n  console.log(`[dotenv@${version}][DEBUG] ${message}`)\n}\n\nfunction _dotenvKey (options) {\n  // prioritize developer directly setting options.DOTENV_KEY\n  if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {\n    return options.DOTENV_KEY\n  }\n\n  // secondary infra already contains a DOTENV_KEY environment variable\n  if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {\n    return process.env.DOTENV_KEY\n  }\n\n  // fallback to empty string\n  return ''\n}\n\nfunction _instructions (result, dotenvKey) {\n  // Parse DOTENV_KEY. Format is a URI\n  let uri\n  try {\n    uri = new URL(dotenvKey)\n  } catch (error) {\n    if (error.code === 'ERR_INVALID_URL') {\n      const err = new Error('INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development')\n      err.code = 'INVALID_DOTENV_KEY'\n      throw err\n    }\n\n    throw error\n  }\n\n  // Get decrypt key\n  const key = uri.password\n  if (!key) {\n    const err = new Error('INVALID_DOTENV_KEY: Missing key part')\n    err.code = 'INVALID_DOTENV_KEY'\n    throw err\n  }\n\n  // Get environment\n  const environment = uri.searchParams.get('environment')\n  if (!environment) {\n    const err = new Error('INVALID_DOTENV_KEY: Missing environment part')\n    err.code = 'INVALID_DOTENV_KEY'\n    throw err\n  }\n\n  // Get ciphertext payload\n  const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`\n  const ciphertext = result.parsed[environmentKey] // DOTENV_VAULT_PRODUCTION\n  if (!ciphertext) {\n    const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`)\n    err.code = 'NOT_FOUND_DOTENV_ENVIRONMENT'\n    throw err\n  }\n\n  return { ciphertext, key }\n}\n\nfunction _vaultPath (options) {\n  let possibleVaultPath = null\n\n  if (options && options.path && options.path.length > 0) {\n    if (Array.isArray(options.path)) {\n      for (const filepath of options.path) {\n        if (fs.existsSync(filepath)) {\n          possibleVaultPath = filepath.endsWith('.vault') ? filepath : `${filepath}.vault`\n        }\n      }\n    } else {\n      possibleVaultPath = options.path.endsWith('.vault') ? options.path : `${options.path}.vault`\n    }\n  } else {\n    possibleVaultPath = path.resolve(process.cwd(), '.env.vault')\n  }\n\n  if (fs.existsSync(possibleVaultPath)) {\n    return possibleVaultPath\n  }\n\n  return null\n}\n\nfunction _resolveHome (envPath) {\n  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath\n}\n\nfunction _configVault (options) {\n  _log('Loading env from encrypted .env.vault')\n\n  const parsed = DotenvModule._parseVault(options)\n\n  let processEnv = process.env\n  if (options && options.processEnv != null) {\n    processEnv = options.processEnv\n  }\n\n  DotenvModule.populate(processEnv, parsed, options)\n\n  return { parsed }\n}\n\nfunction configDotenv (options) {\n  const dotenvPath = path.resolve(process.cwd(), '.env')\n  let encoding = 'utf8'\n  const debug = Boolean(options && options.debug)\n\n  if (options && options.encoding) {\n    encoding = options.encoding\n  } else {\n    if (debug) {\n      _debug('No encoding is specified. UTF-8 is used by default')\n    }\n  }\n\n  let optionPaths = [dotenvPath] // default, look for .env\n  if (options && options.path) {\n    if (!Array.isArray(options.path)) {\n      optionPaths = [_resolveHome(options.path)]\n    } else {\n      optionPaths = [] // reset default\n      for (const filepath of options.path) {\n        optionPaths.push(_resolveHome(filepath))\n      }\n    }\n  }\n\n  // Build the parsed data in a temporary object (because we need to return it).  Once we have the final\n  // parsed data, we will combine it with process.env (or options.processEnv if provided).\n  let lastError\n  const parsedAll = {}\n  for (const path of optionPaths) {\n    try {\n      // Specifying an encoding returns a string instead of a buffer\n      const parsed = DotenvModule.parse(fs.readFileSync(path, { encoding }))\n\n      DotenvModule.populate(parsedAll, parsed, options)\n    } catch (e) {\n      if (debug) {\n        _debug(`Failed to load ${path} ${e.message}`)\n      }\n      lastError = e\n    }\n  }\n\n  let processEnv = process.env\n  if (options && options.processEnv != null) {\n    processEnv = options.processEnv\n  }\n\n  DotenvModule.populate(processEnv, parsedAll, options)\n\n  if (lastError) {\n    return { parsed: parsedAll, error: lastError }\n  } else {\n    return { parsed: parsedAll }\n  }\n}\n\n// Populates process.env from .env file\nfunction config (options) {\n  // fallback to original dotenv if DOTENV_KEY is not set\n  if (_dotenvKey(options).length === 0) {\n    return DotenvModule.configDotenv(options)\n  }\n\n  const vaultPath = _vaultPath(options)\n\n  // dotenvKey exists but .env.vault file does not exist\n  if (!vaultPath) {\n    _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`)\n\n    return DotenvModule.configDotenv(options)\n  }\n\n  return DotenvModule._configVault(options)\n}\n\nfunction decrypt (encrypted, keyStr) {\n  const key = Buffer.from(keyStr.slice(-64), 'hex')\n  let ciphertext = Buffer.from(encrypted, 'base64')\n\n  const nonce = ciphertext.subarray(0, 12)\n  const authTag = ciphertext.subarray(-16)\n  ciphertext = ciphertext.subarray(12, -16)\n\n  try {\n    const aesgcm = crypto.createDecipheriv('aes-256-gcm', key, nonce)\n    aesgcm.setAuthTag(authTag)\n    return `${aesgcm.update(ciphertext)}${aesgcm.final()}`\n  } catch (error) {\n    const isRange = error instanceof RangeError\n    const invalidKeyLength = error.message === 'Invalid key length'\n    const decryptionFailed = error.message === 'Unsupported state or unable to authenticate data'\n\n    if (isRange || invalidKeyLength) {\n      const err = new Error('INVALID_DOTENV_KEY: It must be 64 characters long (or more)')\n      err.code = 'INVALID_DOTENV_KEY'\n      throw err\n    } else if (decryptionFailed) {\n      const err = new Error('DECRYPTION_FAILED: Please check your DOTENV_KEY')\n      err.code = 'DECRYPTION_FAILED'\n      throw err\n    } else {\n      throw error\n    }\n  }\n}\n\n// Populate process.env with parsed values\nfunction populate (processEnv, parsed, options = {}) {\n  const debug = Boolean(options && options.debug)\n  const override = Boolean(options && options.override)\n\n  if (typeof parsed !== 'object') {\n    const err = new Error('OBJECT_REQUIRED: Please check the processEnv argument being passed to populate')\n    err.code = 'OBJECT_REQUIRED'\n    throw err\n  }\n\n  // Set process.env\n  for (const key of Object.keys(parsed)) {\n    if (Object.prototype.hasOwnProperty.call(processEnv, key)) {\n      if (override === true) {\n        processEnv[key] = parsed[key]\n      }\n\n      if (debug) {\n        if (override === true) {\n          _debug(`\"${key}\" is already defined and WAS overwritten`)\n        } else {\n          _debug(`\"${key}\" is already defined and was NOT overwritten`)\n        }\n      }\n    } else {\n      processEnv[key] = parsed[key]\n    }\n  }\n}\n\nconst DotenvModule = {\n  configDotenv,\n  _configVault,\n  _parseVault,\n  config,\n  decrypt,\n  parse,\n  populate\n}\n\nmodule.exports.configDotenv = DotenvModule.configDotenv\nmodule.exports._configVault = DotenvModule._configVault\nmodule.exports._parseVault = DotenvModule._parseVault\nmodule.exports.config = DotenvModule.config\nmodule.exports.decrypt = DotenvModule.decrypt\nmodule.exports.parse = DotenvModule.parse\nmodule.exports.populate = DotenvModule.populate\n\nmodule.exports = DotenvModule\n\n\n//# sourceURL=webpack://crud-api/./node_modules/dotenv/lib/main.js?");

/***/ }),

/***/ "./src/Controllers/controller.ts":
/*!***************************************!*\
  !*** ./src/Controllers/controller.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst database_1 = __importDefault(__webpack_require__(/*! ../database/database */ \"./src/database/database.ts\"));\nconst url_1 = __webpack_require__(/*! url */ \"?429f\");\nconst Get_1 = __importDefault(__webpack_require__(/*! ../utils/Get */ \"./src/utils/Get.ts\"));\nconst Post_1 = __importDefault(__webpack_require__(/*! ../utils/Post */ \"./src/utils/Post.ts\"));\nconst Put_1 = __importDefault(__webpack_require__(/*! ../utils/Put */ \"./src/utils/Put.ts\"));\nconst Delete_1 = __importDefault(__webpack_require__(/*! ../utils/Delete */ \"./src/utils/Delete.ts\"));\nconst _404_1 = __importDefault(__webpack_require__(/*! ../utils/404 */ \"./src/utils/404.ts\"));\nconst controller = (req, res) => {\n    const parsedUrl = (0, url_1.parse)(req.url || '', true);\n    const method = req.method;\n    const { pathname } = parsedUrl;\n    try {\n        if ((0, _404_1.default)(pathname, method)) {\n            (0, Get_1.default)(pathname, method, res, database_1.default);\n            (0, Post_1.default)(pathname, method, req, res, database_1.default);\n            (0, Put_1.default)(pathname, method, req, res, database_1.default);\n            (0, Delete_1.default)(pathname, method, res, database_1.default);\n        }\n        else {\n            res.writeHead(404, { 'Content-Type': 'application/json' });\n            res.end('Endpoint not found');\n        }\n    }\n    catch (error) {\n        res.writeHead(500, { 'Content-Type': 'application/json' });\n        res.end('Internal Server Error');\n    }\n};\nexports[\"default\"] = controller;\n\n\n//# sourceURL=webpack://crud-api/./src/Controllers/controller.ts?");

/***/ }),

/***/ "./src/database/database.ts":
/*!**********************************!*\
  !*** ./src/database/database.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nlet users = [];\nexports[\"default\"] = users;\n\n\n//# sourceURL=webpack://crud-api/./src/database/database.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__webpack_require__(/*! dotenv/config */ \"./node_modules/dotenv/config.js\");\nconst http_1 = __webpack_require__(/*! http */ \"?1749\");\nconst controller_1 = __importDefault(__webpack_require__(/*! ./Controllers/controller */ \"./src/Controllers/controller.ts\"));\nconst PORT = process.env.PORT;\nconst server = (0, http_1.createServer)(controller_1.default);\nserver.listen(PORT, () => console.log('СЕРВЕР ПУЩЕН'));\n\n\n//# sourceURL=webpack://crud-api/./src/index.ts?");

/***/ }),

/***/ "./src/utils/404.ts":
/*!**************************!*\
  !*** ./src/utils/404.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst is404 = (pathname, method) => {\n    return ((pathname === '/api/users' && method === 'GET') ||\n        ((pathname === null || pathname === void 0 ? void 0 : pathname.startsWith('/api/users')) &&\n            pathname.split('/').length === 4 &&\n            method === 'GET') ||\n        (pathname === '/api/users' && method === 'POST') ||\n        ((pathname === null || pathname === void 0 ? void 0 : pathname.startsWith('/api/users')) &&\n            pathname.split('/').length === 4 &&\n            method === 'PUT') ||\n        ((pathname === null || pathname === void 0 ? void 0 : pathname.startsWith('/api/users')) &&\n            pathname.split('/').length === 4 &&\n            method === 'DELETE'));\n};\nexports[\"default\"] = is404;\n\n\n//# sourceURL=webpack://crud-api/./src/utils/404.ts?");

/***/ }),

/***/ "./src/utils/Delete.ts":
/*!*****************************!*\
  !*** ./src/utils/Delete.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst uuid_1 = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/commonjs-browser/index.js\");\nconst deleteFunc = (pathname, method, res, users) => {\n    if ((pathname === null || pathname === void 0 ? void 0 : pathname.startsWith('/api/users')) &&\n        pathname.split('/').length === 4 &&\n        method === 'DELETE') {\n        const id = pathname.split('/')[3];\n        if (!(0, uuid_1.validate)(id)) {\n            res.writeHead(400, { 'Content-Type': 'application/json' });\n            res.end('userId is invalid (not uuid)');\n        }\n        else {\n            if (users.filter((x) => {\n                return x.id === id;\n            }).length === 0) {\n                res.writeHead(404, { 'Content-Type': 'application/json' });\n                res.end('User with this userId not found');\n            }\n            else {\n                const userIndex = users.findIndex((user) => user.id === id);\n                users.splice(userIndex, 1);\n                res.writeHead(204, { 'Content-Type': 'application/json' });\n                res.end('User with this userId delete');\n            }\n        }\n    }\n};\nexports[\"default\"] = deleteFunc;\n\n\n//# sourceURL=webpack://crud-api/./src/utils/Delete.ts?");

/***/ }),

/***/ "./src/utils/Get.ts":
/*!**************************!*\
  !*** ./src/utils/Get.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst uuid_1 = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/commonjs-browser/index.js\");\nconst getFunc = (pathname, method, res, users) => {\n    if (pathname === '/api/users' && method === 'GET') {\n        res.writeHead(200, { 'Content-Type': 'application/json' });\n        res.end(JSON.stringify(users));\n    }\n    else if ((pathname === null || pathname === void 0 ? void 0 : pathname.startsWith('/api/users')) &&\n        pathname.split('/').length === 4 &&\n        method === 'GET') {\n        const id = pathname.split('/')[3];\n        if (!(0, uuid_1.validate)(id)) {\n            res.writeHead(400, { 'Content-Type': 'application/json' });\n            res.end('userId is invalid (not uuid)');\n        }\n        else {\n            if (users.filter((x) => {\n                return x.id === id;\n            }).length === 0) {\n                res.writeHead(404, { 'Content-Type': 'application/json' });\n                res.end('User with this userId not found');\n            }\n            else {\n                res.writeHead(200, { 'Content-Type': 'application/json' });\n                res.end(JSON.stringify(users.filter((x) => {\n                    return (x.id = id);\n                })[0]));\n            }\n        }\n    }\n};\nexports[\"default\"] = getFunc;\n\n\n//# sourceURL=webpack://crud-api/./src/utils/Get.ts?");

/***/ }),

/***/ "./src/utils/Post.ts":
/*!***************************!*\
  !*** ./src/utils/Post.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst uuid_1 = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/commonjs-browser/index.js\");\nconst postFunc = (pathname, method, req, res, users) => {\n    if (pathname === '/api/users' && method === 'POST') {\n        let body = '';\n        req.on('data', (chunk) => {\n            body += chunk.toString();\n        });\n        req.on('end', () => {\n            try {\n                const { username, age, hobbies } = JSON.parse(body);\n                if (!username ||\n                    typeof age !== 'number' ||\n                    !Array.isArray(hobbies) ||\n                    hobbies.some((x) => typeof x !== 'string')) {\n                    res.writeHead(400, { 'Content-Type': 'text/plain' });\n                    res.end('Missing required fields');\n                }\n                else {\n                    const user = {\n                        username,\n                        age,\n                        hobbies,\n                        id: (0, uuid_1.v4)(),\n                    };\n                    res.writeHead(201, { 'Content-Type': 'text/plain' });\n                    res.end(JSON.stringify(user));\n                    users.push(user);\n                }\n            }\n            catch (error) {\n                res.writeHead(400, { 'Content-Type': 'text/plain' });\n                res.end('Missing required fields');\n            }\n        });\n    }\n};\nexports[\"default\"] = postFunc;\n\n\n//# sourceURL=webpack://crud-api/./src/utils/Post.ts?");

/***/ }),

/***/ "./src/utils/Put.ts":
/*!**************************!*\
  !*** ./src/utils/Put.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst uuid_1 = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/commonjs-browser/index.js\");\nconst putFunc = (pathname, method, req, res, users) => {\n    if ((pathname === null || pathname === void 0 ? void 0 : pathname.startsWith('/api/users')) &&\n        pathname.split('/').length === 4 &&\n        method === 'PUT') {\n        const id = pathname.split('/')[3];\n        if (!(0, uuid_1.validate)(id)) {\n            res.writeHead(400, { 'Content-Type': 'application/json' });\n            res.end('userId is invalid (not uuid)');\n        }\n        else {\n            if (users.filter((x) => {\n                return x.id === id;\n            }).length === 0) {\n                res.writeHead(404, { 'Content-Type': 'application/json' });\n                res.end('User with this userId not found');\n            }\n            else {\n                let body = '';\n                const userIndex = users.findIndex((user) => user.id === id);\n                req.on('data', (chunk) => {\n                    body += chunk.toString();\n                });\n                req.on('end', () => {\n                    try {\n                        const { username, age, hobbies } = JSON.parse(body);\n                        users[userIndex] = Object.assign(Object.assign({}, users[userIndex]), { username, age, hobbies });\n                        res.writeHead(200, { 'Content-Type': 'application/json' });\n                        res.end(JSON.stringify(users[userIndex]));\n                    }\n                    catch (error) {\n                        res.writeHead(400, { 'Content-Type': 'text/plain' });\n                        res.end('Missing required fields');\n                    }\n                });\n            }\n        }\n    }\n};\nexports[\"default\"] = putFunc;\n\n\n//# sourceURL=webpack://crud-api/./src/utils/Put.ts?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nObject.defineProperty(exports, \"MAX\", ({\n  enumerable: true,\n  get: function get() {\n    return _max.default;\n  }\n}));\nObject.defineProperty(exports, \"NIL\", ({\n  enumerable: true,\n  get: function get() {\n    return _nil.default;\n  }\n}));\nObject.defineProperty(exports, \"parse\", ({\n  enumerable: true,\n  get: function get() {\n    return _parse.default;\n  }\n}));\nObject.defineProperty(exports, \"stringify\", ({\n  enumerable: true,\n  get: function get() {\n    return _stringify.default;\n  }\n}));\nObject.defineProperty(exports, \"v1\", ({\n  enumerable: true,\n  get: function get() {\n    return _v.default;\n  }\n}));\nObject.defineProperty(exports, \"v1ToV6\", ({\n  enumerable: true,\n  get: function get() {\n    return _v1ToV.default;\n  }\n}));\nObject.defineProperty(exports, \"v3\", ({\n  enumerable: true,\n  get: function get() {\n    return _v2.default;\n  }\n}));\nObject.defineProperty(exports, \"v4\", ({\n  enumerable: true,\n  get: function get() {\n    return _v3.default;\n  }\n}));\nObject.defineProperty(exports, \"v5\", ({\n  enumerable: true,\n  get: function get() {\n    return _v4.default;\n  }\n}));\nObject.defineProperty(exports, \"v6\", ({\n  enumerable: true,\n  get: function get() {\n    return _v5.default;\n  }\n}));\nObject.defineProperty(exports, \"v6ToV1\", ({\n  enumerable: true,\n  get: function get() {\n    return _v6ToV.default;\n  }\n}));\nObject.defineProperty(exports, \"v7\", ({\n  enumerable: true,\n  get: function get() {\n    return _v6.default;\n  }\n}));\nObject.defineProperty(exports, \"validate\", ({\n  enumerable: true,\n  get: function get() {\n    return _validate.default;\n  }\n}));\nObject.defineProperty(exports, \"version\", ({\n  enumerable: true,\n  get: function get() {\n    return _version.default;\n  }\n}));\nvar _max = _interopRequireDefault(__webpack_require__(/*! ./max.js */ \"./node_modules/uuid/dist/commonjs-browser/max.js\"));\nvar _nil = _interopRequireDefault(__webpack_require__(/*! ./nil.js */ \"./node_modules/uuid/dist/commonjs-browser/nil.js\"));\nvar _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ \"./node_modules/uuid/dist/commonjs-browser/parse.js\"));\nvar _stringify = _interopRequireDefault(__webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/commonjs-browser/stringify.js\"));\nvar _v = _interopRequireDefault(__webpack_require__(/*! ./v1.js */ \"./node_modules/uuid/dist/commonjs-browser/v1.js\"));\nvar _v1ToV = _interopRequireDefault(__webpack_require__(/*! ./v1ToV6.js */ \"./node_modules/uuid/dist/commonjs-browser/v1ToV6.js\"));\nvar _v2 = _interopRequireDefault(__webpack_require__(/*! ./v3.js */ \"./node_modules/uuid/dist/commonjs-browser/v3.js\"));\nvar _v3 = _interopRequireDefault(__webpack_require__(/*! ./v4.js */ \"./node_modules/uuid/dist/commonjs-browser/v4.js\"));\nvar _v4 = _interopRequireDefault(__webpack_require__(/*! ./v5.js */ \"./node_modules/uuid/dist/commonjs-browser/v5.js\"));\nvar _v5 = _interopRequireDefault(__webpack_require__(/*! ./v6.js */ \"./node_modules/uuid/dist/commonjs-browser/v6.js\"));\nvar _v6ToV = _interopRequireDefault(__webpack_require__(/*! ./v6ToV1.js */ \"./node_modules/uuid/dist/commonjs-browser/v6ToV1.js\"));\nvar _v6 = _interopRequireDefault(__webpack_require__(/*! ./v7.js */ \"./node_modules/uuid/dist/commonjs-browser/v7.js\"));\nvar _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/commonjs-browser/validate.js\"));\nvar _version = _interopRequireDefault(__webpack_require__(/*! ./version.js */ \"./node_modules/uuid/dist/commonjs-browser/version.js\"));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/index.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/max.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/max.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nvar _default = exports[\"default\"] = 'ffffffff-ffff-ffff-ffff-ffffffffffff';\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/max.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/md5.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/md5.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\n/*\n * Browser-compatible JavaScript MD5\n *\n * Modification of JavaScript MD5\n * https://github.com/blueimp/JavaScript-MD5\n *\n * Copyright 2011, Sebastian Tschan\n * https://blueimp.net\n *\n * Licensed under the MIT license:\n * https://opensource.org/licenses/MIT\n *\n * Based on\n * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message\n * Digest Algorithm, as defined in RFC 1321.\n * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009\n * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet\n * Distributed under the BSD License\n * See http://pajhome.org.uk/crypt/md5 for more info.\n */\nfunction md5(bytes) {\n  if (typeof bytes === 'string') {\n    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape\n\n    bytes = new Uint8Array(msg.length);\n    for (var i = 0; i < msg.length; ++i) {\n      bytes[i] = msg.charCodeAt(i);\n    }\n  }\n  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));\n}\n\n/*\n * Convert an array of little-endian words to an array of bytes\n */\nfunction md5ToHexEncodedArray(input) {\n  var output = [];\n  var length32 = input.length * 32;\n  var hexTab = '0123456789abcdef';\n  for (var i = 0; i < length32; i += 8) {\n    var x = input[i >> 5] >>> i % 32 & 0xff;\n    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);\n    output.push(hex);\n  }\n  return output;\n}\n\n/**\n * Calculate output length with padding and bit length\n */\nfunction getOutputLength(inputLength8) {\n  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;\n}\n\n/*\n * Calculate the MD5 of an array of little-endian words, and a bit length.\n */\nfunction wordsToMd5(x, len) {\n  /* append padding */\n  x[len >> 5] |= 0x80 << len % 32;\n  x[getOutputLength(len) - 1] = len;\n  var a = 1732584193;\n  var b = -271733879;\n  var c = -1732584194;\n  var d = 271733878;\n  for (var i = 0; i < x.length; i += 16) {\n    var olda = a;\n    var oldb = b;\n    var oldc = c;\n    var oldd = d;\n    a = md5ff(a, b, c, d, x[i], 7, -680876936);\n    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);\n    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);\n    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);\n    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);\n    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);\n    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);\n    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);\n    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);\n    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);\n    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);\n    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);\n    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);\n    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);\n    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);\n    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);\n    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);\n    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);\n    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);\n    b = md5gg(b, c, d, a, x[i], 20, -373897302);\n    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);\n    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);\n    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);\n    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);\n    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);\n    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);\n    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);\n    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);\n    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);\n    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);\n    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);\n    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);\n    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);\n    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);\n    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);\n    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);\n    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);\n    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);\n    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);\n    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);\n    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);\n    d = md5hh(d, a, b, c, x[i], 11, -358537222);\n    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);\n    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);\n    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);\n    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);\n    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);\n    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);\n    a = md5ii(a, b, c, d, x[i], 6, -198630844);\n    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);\n    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);\n    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);\n    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);\n    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);\n    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);\n    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);\n    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);\n    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);\n    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);\n    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);\n    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);\n    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);\n    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);\n    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);\n    a = safeAdd(a, olda);\n    b = safeAdd(b, oldb);\n    c = safeAdd(c, oldc);\n    d = safeAdd(d, oldd);\n  }\n  return [a, b, c, d];\n}\n\n/*\n * Convert an array bytes to an array of little-endian words\n * Characters >255 have their high-byte silently ignored.\n */\nfunction bytesToWords(input) {\n  if (input.length === 0) {\n    return [];\n  }\n  var length8 = input.length * 8;\n  var output = new Uint32Array(getOutputLength(length8));\n  for (var i = 0; i < length8; i += 8) {\n    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;\n  }\n  return output;\n}\n\n/*\n * Add integers, wrapping at 2^32. This uses 16-bit operations internally\n * to work around bugs in some JS interpreters.\n */\nfunction safeAdd(x, y) {\n  var lsw = (x & 0xffff) + (y & 0xffff);\n  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);\n  return msw << 16 | lsw & 0xffff;\n}\n\n/*\n * Bitwise rotate a 32-bit number to the left.\n */\nfunction bitRotateLeft(num, cnt) {\n  return num << cnt | num >>> 32 - cnt;\n}\n\n/*\n * These functions implement the four basic operations the algorithm uses.\n */\nfunction md5cmn(q, a, b, x, s, t) {\n  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);\n}\nfunction md5ff(a, b, c, d, x, s, t) {\n  return md5cmn(b & c | ~b & d, a, b, x, s, t);\n}\nfunction md5gg(a, b, c, d, x, s, t) {\n  return md5cmn(b & d | c & ~d, a, b, x, s, t);\n}\nfunction md5hh(a, b, c, d, x, s, t) {\n  return md5cmn(b ^ c ^ d, a, b, x, s, t);\n}\nfunction md5ii(a, b, c, d, x, s, t) {\n  return md5cmn(c ^ (b | ~d), a, b, x, s, t);\n}\nvar _default = exports[\"default\"] = md5;\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/md5.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/native.js":
/*!***********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/native.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nvar randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);\nvar _default = exports[\"default\"] = {\n  randomUUID\n};\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/native.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/nil.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/nil.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nvar _default = exports[\"default\"] = '00000000-0000-0000-0000-000000000000';\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/nil.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/parse.js":
/*!**********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/parse.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nvar _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/commonjs-browser/validate.js\"));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\nfunction parse(uuid) {\n  if (!(0, _validate.default)(uuid)) {\n    throw TypeError('Invalid UUID');\n  }\n  var v;\n  var arr = new Uint8Array(16);\n\n  // Parse ########-....-....-....-............\n  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;\n  arr[1] = v >>> 16 & 0xff;\n  arr[2] = v >>> 8 & 0xff;\n  arr[3] = v & 0xff;\n\n  // Parse ........-####-....-....-............\n  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;\n  arr[5] = v & 0xff;\n\n  // Parse ........-....-####-....-............\n  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;\n  arr[7] = v & 0xff;\n\n  // Parse ........-....-....-####-............\n  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;\n  arr[9] = v & 0xff;\n\n  // Parse ........-....-....-....-############\n  // (Use \"/\" to avoid 32-bit truncation when bit-shifting high-order bytes)\n  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;\n  arr[11] = v / 0x100000000 & 0xff;\n  arr[12] = v >>> 24 & 0xff;\n  arr[13] = v >>> 16 & 0xff;\n  arr[14] = v >>> 8 & 0xff;\n  arr[15] = v & 0xff;\n  return arr;\n}\nvar _default = exports[\"default\"] = parse;\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/parse.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/regex.js":
/*!**********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/regex.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nvar _default = exports[\"default\"] = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/regex.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/rng.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/rng.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = rng;\n// Unique ID creation requires a high quality random # generator. In the browser we therefore\n// require the crypto API and do not support built-in fallback to lower quality random number\n// generators (like Math.random()).\n\nvar getRandomValues;\nvar rnds8 = new Uint8Array(16);\nfunction rng() {\n  // lazy load so that environments that need to polyfill have a chance to do so\n  if (!getRandomValues) {\n    // getRandomValues needs to be invoked in a context where \"this\" is a Crypto implementation.\n    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);\n    if (!getRandomValues) {\n      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');\n    }\n  }\n  return getRandomValues(rnds8);\n}\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/sha1.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/sha1.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\n// Adapted from Chris Veness' SHA1 code at\n// http://www.movable-type.co.uk/scripts/sha1.html\nfunction f(s, x, y, z) {\n  switch (s) {\n    case 0:\n      return x & y ^ ~x & z;\n    case 1:\n      return x ^ y ^ z;\n    case 2:\n      return x & y ^ x & z ^ y & z;\n    case 3:\n      return x ^ y ^ z;\n  }\n}\nfunction ROTL(x, n) {\n  return x << n | x >>> 32 - n;\n}\nfunction sha1(bytes) {\n  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];\n  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];\n  if (typeof bytes === 'string') {\n    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape\n\n    bytes = [];\n    for (var i = 0; i < msg.length; ++i) {\n      bytes.push(msg.charCodeAt(i));\n    }\n  } else if (!Array.isArray(bytes)) {\n    // Convert Array-like to Array\n    bytes = Array.prototype.slice.call(bytes);\n  }\n  bytes.push(0x80);\n  var l = bytes.length / 4 + 2;\n  var N = Math.ceil(l / 16);\n  var M = new Array(N);\n  for (var _i = 0; _i < N; ++_i) {\n    var arr = new Uint32Array(16);\n    for (var j = 0; j < 16; ++j) {\n      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];\n    }\n    M[_i] = arr;\n  }\n  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);\n  M[N - 1][14] = Math.floor(M[N - 1][14]);\n  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;\n  for (var _i2 = 0; _i2 < N; ++_i2) {\n    var W = new Uint32Array(80);\n    for (var t = 0; t < 16; ++t) {\n      W[t] = M[_i2][t];\n    }\n    for (var _t = 16; _t < 80; ++_t) {\n      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);\n    }\n    var a = H[0];\n    var b = H[1];\n    var c = H[2];\n    var d = H[3];\n    var e = H[4];\n    for (var _t2 = 0; _t2 < 80; ++_t2) {\n      var s = Math.floor(_t2 / 20);\n      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;\n      e = d;\n      d = c;\n      c = ROTL(b, 30) >>> 0;\n      b = a;\n      a = T;\n    }\n    H[0] = H[0] + a >>> 0;\n    H[1] = H[1] + b >>> 0;\n    H[2] = H[2] + c >>> 0;\n    H[3] = H[3] + d >>> 0;\n    H[4] = H[4] + e >>> 0;\n  }\n  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];\n}\nvar _default = exports[\"default\"] = sha1;\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/sha1.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/stringify.js":
/*!**************************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/stringify.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nexports.unsafeStringify = unsafeStringify;\nvar _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/commonjs-browser/validate.js\"));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\n/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\nvar byteToHex = [];\nfor (var i = 0; i < 256; ++i) {\n  byteToHex.push((i + 0x100).toString(16).slice(1));\n}\nfunction unsafeStringify(arr, offset = 0) {\n  // Note: Be careful editing this code!  It's been tuned for performance\n  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434\n  //\n  // Note to future-self: No, you can't remove the `toLowerCase()` call.\n  // REF: https://github.com/uuidjs/uuid/pull/677#issuecomment-1757351351\n  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();\n}\nfunction stringify(arr, offset = 0) {\n  var uuid = unsafeStringify(arr, offset);\n  // Consistency check for valid UUID.  If this throws, it's likely due to one\n  // of the following:\n  // - One or more input array values don't map to a hex octet (leading to\n  // \"undefined\" in the uuid)\n  // - Invalid input values for the RFC `version` or `variant` fields\n  if (!(0, _validate.default)(uuid)) {\n    throw TypeError('Stringified UUID is invalid');\n  }\n  return uuid;\n}\nvar _default = exports[\"default\"] = stringify;\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/stringify.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v1.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v1.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nvar _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/commonjs-browser/rng.js\"));\nvar _stringify = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/commonjs-browser/stringify.js\");\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\n// **`v1()` - Generate time-based UUID**\n//\n// Inspired by https://github.com/LiosK/UUID.js\n// and http://docs.python.org/library/uuid.html\n\nvar _nodeId;\nvar _clockseq;\n\n// Previous uuid creation time\nvar _lastMSecs = 0;\nvar _lastNSecs = 0;\n\n// See https://github.com/uuidjs/uuid for API details\nfunction v1(options, buf, offset) {\n  var i = buf && offset || 0;\n  var b = buf || new Array(16);\n  options = options || {};\n  var node = options.node;\n  var clockseq = options.clockseq;\n\n  // v1 only: Use cached `node` and `clockseq` values\n  if (!options._v6) {\n    if (!node) {\n      node = _nodeId;\n    }\n    if (clockseq == null) {\n      clockseq = _clockseq;\n    }\n  }\n\n  // Handle cases where we need entropy.  We do this lazily to minimize issues\n  // related to insufficient system entropy.  See #189\n  if (node == null || clockseq == null) {\n    var seedBytes = options.random || (options.rng || _rng.default)();\n\n    // Randomize node\n    if (node == null) {\n      node = [seedBytes[0], seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];\n\n      // v1 only: cache node value for reuse\n      if (!_nodeId && !options._v6) {\n        // per RFC4122 4.5: Set MAC multicast bit (v1 only)\n        node[0] |= 0x01; // Set multicast bit\n\n        _nodeId = node;\n      }\n    }\n\n    // Randomize clockseq\n    if (clockseq == null) {\n      // Per 4.2.2, randomize (14 bit) clockseq\n      clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;\n      if (_clockseq === undefined && !options._v6) {\n        _clockseq = clockseq;\n      }\n    }\n  }\n\n  // v1 & v6 timestamps are 100 nano-second units since the Gregorian epoch,\n  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so time is\n  // handled internally as 'msecs' (integer milliseconds) and 'nsecs'\n  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.\n  var msecs = options.msecs !== undefined ? options.msecs : Date.now();\n\n  // Per 4.2.1.2, use count of uuid's generated during the current clock\n  // cycle to simulate higher resolution clock\n  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;\n\n  // Time since last uuid creation (in msecs)\n  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;\n\n  // Per 4.2.1.2, Bump clockseq on clock regression\n  if (dt < 0 && options.clockseq === undefined) {\n    clockseq = clockseq + 1 & 0x3fff;\n  }\n\n  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new\n  // time interval\n  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {\n    nsecs = 0;\n  }\n\n  // Per 4.2.1.2 Throw error if too many uuids are requested\n  if (nsecs >= 10000) {\n    throw new Error(\"uuid.v1(): Can't create more than 10M uuids/sec\");\n  }\n  _lastMSecs = msecs;\n  _lastNSecs = nsecs;\n  _clockseq = clockseq;\n\n  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch\n  msecs += 12219292800000;\n\n  // `time_low`\n  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;\n  b[i++] = tl >>> 24 & 0xff;\n  b[i++] = tl >>> 16 & 0xff;\n  b[i++] = tl >>> 8 & 0xff;\n  b[i++] = tl & 0xff;\n\n  // `time_mid`\n  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;\n  b[i++] = tmh >>> 8 & 0xff;\n  b[i++] = tmh & 0xff;\n\n  // `time_high_and_version`\n  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version\n  b[i++] = tmh >>> 16 & 0xff;\n\n  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)\n  b[i++] = clockseq >>> 8 | 0x80;\n\n  // `clock_seq_low`\n  b[i++] = clockseq & 0xff;\n\n  // `node`\n  for (var n = 0; n < 6; ++n) {\n    b[i + n] = node[n];\n  }\n  return buf || (0, _stringify.unsafeStringify)(b);\n}\nvar _default = exports[\"default\"] = v1;\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/v1.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v1ToV6.js":
/*!***********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v1ToV6.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = v1ToV6;\nvar _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ \"./node_modules/uuid/dist/commonjs-browser/parse.js\"));\nvar _stringify = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/commonjs-browser/stringify.js\");\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\n/**\n * Convert a v1 UUID to a v6 UUID\n *\n * @param {string|Uint8Array} uuid - The v1 UUID to convert to v6\n * @returns {string|Uint8Array} The v6 UUID as the same type as the `uuid` arg\n * (string or Uint8Array)\n */\nfunction v1ToV6(uuid) {\n  var v1Bytes = typeof uuid === 'string' ? (0, _parse.default)(uuid) : uuid;\n  var v6Bytes = _v1ToV6(v1Bytes);\n  return typeof uuid === 'string' ? (0, _stringify.unsafeStringify)(v6Bytes) : v6Bytes;\n}\n\n// Do the field transformation needed for v1 -> v6\nfunction _v1ToV6(v1Bytes, randomize = false) {\n  return Uint8Array.of((v1Bytes[6] & 0x0f) << 4 | v1Bytes[7] >> 4 & 0x0f, (v1Bytes[7] & 0x0f) << 4 | (v1Bytes[4] & 0xf0) >> 4, (v1Bytes[4] & 0x0f) << 4 | (v1Bytes[5] & 0xf0) >> 4, (v1Bytes[5] & 0x0f) << 4 | (v1Bytes[0] & 0xf0) >> 4, (v1Bytes[0] & 0x0f) << 4 | (v1Bytes[1] & 0xf0) >> 4, (v1Bytes[1] & 0x0f) << 4 | (v1Bytes[2] & 0xf0) >> 4, 0x60 | v1Bytes[2] & 0x0f, v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);\n}\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/v1ToV6.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v3.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v3.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nvar _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ \"./node_modules/uuid/dist/commonjs-browser/v35.js\"));\nvar _md = _interopRequireDefault(__webpack_require__(/*! ./md5.js */ \"./node_modules/uuid/dist/commonjs-browser/md5.js\"));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\nvar v3 = (0, _v.default)('v3', 0x30, _md.default);\nvar _default = exports[\"default\"] = v3;\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/v3.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v35.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v35.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.URL = exports.DNS = void 0;\nexports[\"default\"] = v35;\nvar _stringify = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/commonjs-browser/stringify.js\");\nvar _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ \"./node_modules/uuid/dist/commonjs-browser/parse.js\"));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\nfunction stringToBytes(str) {\n  str = unescape(encodeURIComponent(str)); // UTF8 escape\n\n  var bytes = [];\n  for (var i = 0; i < str.length; ++i) {\n    bytes.push(str.charCodeAt(i));\n  }\n  return bytes;\n}\nvar DNS = exports.DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';\nvar URL = exports.URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';\nfunction v35(name, version, hashfunc) {\n  function generateUUID(value, namespace, buf, offset) {\n    var _namespace;\n    if (typeof value === 'string') {\n      value = stringToBytes(value);\n    }\n    if (typeof namespace === 'string') {\n      namespace = (0, _parse.default)(namespace);\n    }\n    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {\n      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');\n    }\n\n    // Compute hash of namespace and value, Per 4.3\n    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =\n    // hashfunc([...namespace, ... value])`\n    var bytes = new Uint8Array(16 + value.length);\n    bytes.set(namespace);\n    bytes.set(value, namespace.length);\n    bytes = hashfunc(bytes);\n    bytes[6] = bytes[6] & 0x0f | version;\n    bytes[8] = bytes[8] & 0x3f | 0x80;\n    if (buf) {\n      offset = offset || 0;\n      for (var i = 0; i < 16; ++i) {\n        buf[offset + i] = bytes[i];\n      }\n      return buf;\n    }\n    return (0, _stringify.unsafeStringify)(bytes);\n  }\n\n  // Function#name is not settable on some platforms (#270)\n  try {\n    generateUUID.name = name;\n  } catch (err) {}\n\n  // For CommonJS default export support\n  generateUUID.DNS = DNS;\n  generateUUID.URL = URL;\n  return generateUUID;\n}\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/v35.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v4.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v4.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nvar _native = _interopRequireDefault(__webpack_require__(/*! ./native.js */ \"./node_modules/uuid/dist/commonjs-browser/native.js\"));\nvar _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/commonjs-browser/rng.js\"));\nvar _stringify = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/commonjs-browser/stringify.js\");\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\nfunction v4(options, buf, offset) {\n  if (_native.default.randomUUID && !buf && !options) {\n    return _native.default.randomUUID();\n  }\n  options = options || {};\n  var rnds = options.random || (options.rng || _rng.default)();\n\n  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n  rnds[6] = rnds[6] & 0x0f | 0x40;\n  rnds[8] = rnds[8] & 0x3f | 0x80;\n\n  // Copy bytes to buffer, if provided\n  if (buf) {\n    offset = offset || 0;\n    for (var i = 0; i < 16; ++i) {\n      buf[offset + i] = rnds[i];\n    }\n    return buf;\n  }\n  return (0, _stringify.unsafeStringify)(rnds);\n}\nvar _default = exports[\"default\"] = v4;\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/v4.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v5.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v5.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nvar _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ \"./node_modules/uuid/dist/commonjs-browser/v35.js\"));\nvar _sha = _interopRequireDefault(__webpack_require__(/*! ./sha1.js */ \"./node_modules/uuid/dist/commonjs-browser/sha1.js\"));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\nvar v5 = (0, _v.default)('v5', 0x50, _sha.default);\nvar _default = exports[\"default\"] = v5;\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/v5.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v6.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v6.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = v6;\nvar _stringify = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/commonjs-browser/stringify.js\");\nvar _v = _interopRequireDefault(__webpack_require__(/*! ./v1.js */ \"./node_modules/uuid/dist/commonjs-browser/v1.js\"));\nvar _v1ToV = _interopRequireDefault(__webpack_require__(/*! ./v1ToV6.js */ \"./node_modules/uuid/dist/commonjs-browser/v1ToV6.js\"));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\nfunction ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }\nfunction _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }\nfunction _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == typeof i ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != typeof i) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n/**\n *\n * @param {object} options\n * @param {Uint8Array=} buf\n * @param {number=} offset\n * @returns\n */\nfunction v6(options = {}, buf, offset = 0) {\n  // v6 is v1 with different field layout, so we start with a v1 UUID, albeit\n  // with slightly different behavior around how the clock_seq and node fields\n  // are randomized, which is why we call v1 with _v6: true.\n  var bytes = (0, _v.default)(_objectSpread(_objectSpread({}, options), {}, {\n    _v6: true\n  }), new Uint8Array(16));\n\n  // Reorder the fields to v6 layout.\n  bytes = (0, _v1ToV.default)(bytes);\n\n  // Return as a byte array if requested\n  if (buf) {\n    for (var i = 0; i < 16; i++) {\n      buf[offset + i] = bytes[i];\n    }\n    return buf;\n  }\n  return (0, _stringify.unsafeStringify)(bytes);\n}\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/v6.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v6ToV1.js":
/*!***********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v6ToV1.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = v6ToV1;\nvar _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ \"./node_modules/uuid/dist/commonjs-browser/parse.js\"));\nvar _stringify = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/commonjs-browser/stringify.js\");\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\n/**\n * Convert a v6 UUID to a v1 UUID\n *\n * @param {string|Uint8Array} uuid - The v6 UUID to convert to v6\n * @returns {string|Uint8Array} The v1 UUID as the same type as the `uuid` arg\n * (string or Uint8Array)\n */\nfunction v6ToV1(uuid) {\n  var v6Bytes = typeof uuid === 'string' ? (0, _parse.default)(uuid) : uuid;\n  var v1Bytes = _v6ToV1(v6Bytes);\n  return typeof uuid === 'string' ? (0, _stringify.unsafeStringify)(v1Bytes) : v1Bytes;\n}\n\n// Do the field transformation needed for v6 -> v1\nfunction _v6ToV1(v6Bytes) {\n  return Uint8Array.of((v6Bytes[3] & 0x0f) << 4 | v6Bytes[4] >> 4 & 0x0f, (v6Bytes[4] & 0x0f) << 4 | (v6Bytes[5] & 0xf0) >> 4, (v6Bytes[5] & 0x0f) << 4 | v6Bytes[6] & 0x0f, v6Bytes[7], (v6Bytes[1] & 0x0f) << 4 | (v6Bytes[2] & 0xf0) >> 4, (v6Bytes[2] & 0x0f) << 4 | (v6Bytes[3] & 0xf0) >> 4, 0x10 | (v6Bytes[0] & 0xf0) >> 4, (v6Bytes[0] & 0x0f) << 4 | (v6Bytes[1] & 0xf0) >> 4, v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);\n}\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/v6ToV1.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v7.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v7.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nvar _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/commonjs-browser/rng.js\"));\nvar _stringify = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/commonjs-browser/stringify.js\");\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\n/**\n * UUID V7 - Unix Epoch time-based UUID\n *\n * The IETF has published RFC9562, introducing 3 new UUID versions (6,7,8). This\n * implementation of V7 is based on the accepted, though not yet approved,\n * revisions.\n *\n * RFC 9562:https://www.rfc-editor.org/rfc/rfc9562.html Universally Unique\n * IDentifiers (UUIDs)\n\n *\n * Sample V7 value:\n * https://www.rfc-editor.org/rfc/rfc9562.html#name-example-of-a-uuidv7-value\n *\n * Monotonic Bit Layout: RFC rfc9562.6.2 Method 1, Dedicated Counter Bits ref:\n *     https://www.rfc-editor.org/rfc/rfc9562.html#section-6.2-5.1\n *\n *   0                   1                   2                   3 0 1 2 3 4 5 6\n *   7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1\n *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n *  |                          unix_ts_ms                           |\n *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n *  |          unix_ts_ms           |  ver  |        seq_hi         |\n *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n *  |var|               seq_low               |        rand         |\n *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n *  |                             rand                              |\n *  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n *\n * seq is a 31 bit serialized counter; comprised of 12 bit seq_hi and 19 bit\n * seq_low, and randomly initialized upon timestamp change. 31 bit counter size\n * was selected as any bitwise operations in node are done as _signed_ 32 bit\n * ints. we exclude the sign bit.\n */\n\nvar _seqLow = null;\nvar _seqHigh = null;\nvar _msecs = 0;\nfunction v7(options, buf, offset) {\n  options = options || {};\n\n  // initialize buffer and pointer\n  var i = buf && offset || 0;\n  var b = buf || new Uint8Array(16);\n\n  // rnds is Uint8Array(16) filled with random bytes\n  var rnds = options.random || (options.rng || _rng.default)();\n\n  // milliseconds since unix epoch, 1970-01-01 00:00\n  var msecs = options.msecs !== undefined ? options.msecs : Date.now();\n\n  // seq is user provided 31 bit counter\n  var seq = options.seq !== undefined ? options.seq : null;\n\n  // initialize local seq high/low parts\n  var seqHigh = _seqHigh;\n  var seqLow = _seqLow;\n\n  // check if clock has advanced and user has not provided msecs\n  if (msecs > _msecs && options.msecs === undefined) {\n    _msecs = msecs;\n\n    // unless user provided seq, reset seq parts\n    if (seq !== null) {\n      seqHigh = null;\n      seqLow = null;\n    }\n  }\n\n  // if we have a user provided seq\n  if (seq !== null) {\n    // trim provided seq to 31 bits of value, avoiding overflow\n    if (seq > 0x7fffffff) {\n      seq = 0x7fffffff;\n    }\n\n    // split provided seq into high/low parts\n    seqHigh = seq >>> 19 & 0xfff;\n    seqLow = seq & 0x7ffff;\n  }\n\n  // randomly initialize seq\n  if (seqHigh === null || seqLow === null) {\n    seqHigh = rnds[6] & 0x7f;\n    seqHigh = seqHigh << 8 | rnds[7];\n    seqLow = rnds[8] & 0x3f; // pad for var\n    seqLow = seqLow << 8 | rnds[9];\n    seqLow = seqLow << 5 | rnds[10] >>> 3;\n  }\n\n  // increment seq if within msecs window\n  if (msecs + 10000 > _msecs && seq === null) {\n    if (++seqLow > 0x7ffff) {\n      seqLow = 0;\n      if (++seqHigh > 0xfff) {\n        seqHigh = 0;\n\n        // increment internal _msecs. this allows us to continue incrementing\n        // while staying monotonic. Note, once we hit 10k milliseconds beyond system\n        // clock, we will reset breaking monotonicity (after (2^31)*10000 generations)\n        _msecs++;\n      }\n    }\n  } else {\n    // resetting; we have advanced more than\n    // 10k milliseconds beyond system clock\n    _msecs = msecs;\n  }\n  _seqHigh = seqHigh;\n  _seqLow = seqLow;\n\n  // [bytes 0-5] 48 bits of local timestamp\n  b[i++] = _msecs / 0x10000000000 & 0xff;\n  b[i++] = _msecs / 0x100000000 & 0xff;\n  b[i++] = _msecs / 0x1000000 & 0xff;\n  b[i++] = _msecs / 0x10000 & 0xff;\n  b[i++] = _msecs / 0x100 & 0xff;\n  b[i++] = _msecs & 0xff;\n\n  // [byte 6] - set 4 bits of version (7) with first 4 bits seq_hi\n  b[i++] = seqHigh >>> 4 & 0x0f | 0x70;\n\n  // [byte 7] remaining 8 bits of seq_hi\n  b[i++] = seqHigh & 0xff;\n\n  // [byte 8] - variant (2 bits), first 6 bits seq_low\n  b[i++] = seqLow >>> 13 & 0x3f | 0x80;\n\n  // [byte 9] 8 bits seq_low\n  b[i++] = seqLow >>> 5 & 0xff;\n\n  // [byte 10] remaining 5 bits seq_low, 3 bits random\n  b[i++] = seqLow << 3 & 0xff | rnds[10] & 0x07;\n\n  // [bytes 11-15] always random\n  b[i++] = rnds[11];\n  b[i++] = rnds[12];\n  b[i++] = rnds[13];\n  b[i++] = rnds[14];\n  b[i++] = rnds[15];\n  return buf || (0, _stringify.unsafeStringify)(b);\n}\nvar _default = exports[\"default\"] = v7;\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/v7.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/validate.js":
/*!*************************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/validate.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nvar _regex = _interopRequireDefault(__webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/commonjs-browser/regex.js\"));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\nfunction validate(uuid) {\n  return typeof uuid === 'string' && _regex.default.test(uuid);\n}\nvar _default = exports[\"default\"] = validate;\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/validate.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/version.js":
/*!************************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/version.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nvar _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/commonjs-browser/validate.js\"));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\nfunction version(uuid) {\n  if (!(0, _validate.default)(uuid)) {\n    throw TypeError('Invalid UUID');\n  }\n  return parseInt(uuid.slice(14, 15), 16);\n}\nvar _default = exports[\"default\"] = version;\n\n//# sourceURL=webpack://crud-api/./node_modules/uuid/dist/commonjs-browser/version.js?");

/***/ }),

/***/ "?d107":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://crud-api/crypto_(ignored)?");

/***/ }),

/***/ "?a0c3":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://crud-api/fs_(ignored)?");

/***/ }),

/***/ "?613f":
/*!********************!*\
  !*** os (ignored) ***!
  \********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://crud-api/os_(ignored)?");

/***/ }),

/***/ "?fd46":
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://crud-api/path_(ignored)?");

/***/ }),

/***/ "?429f":
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://crud-api/url_(ignored)?");

/***/ }),

/***/ "?1749":
/*!**********************!*\
  !*** http (ignored) ***!
  \**********************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://crud-api/http_(ignored)?");

/***/ }),

/***/ "./node_modules/dotenv/package.json":
/*!******************************************!*\
  !*** ./node_modules/dotenv/package.json ***!
  \******************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = /*#__PURE__*/JSON.parse('{\"name\":\"dotenv\",\"version\":\"16.4.5\",\"description\":\"Loads environment variables from .env file\",\"main\":\"lib/main.js\",\"types\":\"lib/main.d.ts\",\"exports\":{\".\":{\"types\":\"./lib/main.d.ts\",\"require\":\"./lib/main.js\",\"default\":\"./lib/main.js\"},\"./config\":\"./config.js\",\"./config.js\":\"./config.js\",\"./lib/env-options\":\"./lib/env-options.js\",\"./lib/env-options.js\":\"./lib/env-options.js\",\"./lib/cli-options\":\"./lib/cli-options.js\",\"./lib/cli-options.js\":\"./lib/cli-options.js\",\"./package.json\":\"./package.json\"},\"scripts\":{\"dts-check\":\"tsc --project tests/types/tsconfig.json\",\"lint\":\"standard\",\"lint-readme\":\"standard-markdown\",\"pretest\":\"npm run lint && npm run dts-check\",\"test\":\"tap tests/*.js --100 -Rspec\",\"test:coverage\":\"tap --coverage-report=lcov\",\"prerelease\":\"npm test\",\"release\":\"standard-version\"},\"repository\":{\"type\":\"git\",\"url\":\"git://github.com/motdotla/dotenv.git\"},\"funding\":\"https://dotenvx.com\",\"keywords\":[\"dotenv\",\"env\",\".env\",\"environment\",\"variables\",\"config\",\"settings\"],\"readmeFilename\":\"README.md\",\"license\":\"BSD-2-Clause\",\"devDependencies\":{\"@definitelytyped/dtslint\":\"^0.0.133\",\"@types/node\":\"^18.11.3\",\"decache\":\"^4.6.1\",\"sinon\":\"^14.0.1\",\"standard\":\"^17.0.0\",\"standard-markdown\":\"^7.1.0\",\"standard-version\":\"^9.5.0\",\"tap\":\"^16.3.0\",\"tar\":\"^6.1.11\",\"typescript\":\"^4.8.4\"},\"engines\":{\"node\":\">=12\"},\"browser\":{\"fs\":false}}');\n\n//# sourceURL=webpack://crud-api/./node_modules/dotenv/package.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;