/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "b3513bd5065eb714bb83";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"login": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "https://localhost:3030/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = this["webpackJsonp"] = this["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../build-tools/node_modules/css-loader/dist/cjs.js?!../../build-tools/node_modules/postcss-loader/src/index.js?!../../build-tools/node_modules/resolve-url-loader/index.js?!../../build-tools/node_modules/less-loader/dist/cjs.js?!./client/assets/less/login.less":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/dk/Mine/sites/build-tools/node_modules/css-loader/dist/cjs.js??ref--4-oneOf-3-1!/Users/dk/Mine/sites/build-tools/node_modules/postcss-loader/src??postcss!/Users/dk/Mine/sites/build-tools/node_modules/resolve-url-loader??ref--4-oneOf-3-3!/Users/dk/Mine/sites/build-tools/node_modules/less-loader/dist/cjs.js??ref--4-oneOf-3-4!./client/assets/less/login.less ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _build_tools_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../build-tools/node_modules/css-loader/dist/runtime/api.js */ "../../build-tools/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _build_tools_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_build_tools_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _build_tools_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../build-tools/node_modules/css-loader/dist/runtime/getUrl.js */ "../../build-tools/node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _build_tools_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_build_tools_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pictures_undraw_noted_pc9f_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pictures/undraw_noted_pc9f.svg */ "./client/assets/pictures/undraw_noted_pc9f.svg");
/* harmony import */ var _pictures_undraw_sentiment_analysis_jp6w_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pictures/undraw_sentiment_analysis_jp6w.svg */ "./client/assets/pictures/undraw_sentiment_analysis_jp6w.svg");
// Imports




var ___CSS_LOADER_EXPORT___ = _build_tools_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _build_tools_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(_pictures_undraw_noted_pc9f_svg__WEBPACK_IMPORTED_MODULE_2__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _build_tools_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(_pictures_undraw_sentiment_analysis_jp6w_svg__WEBPACK_IMPORTED_MODULE_3__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".wtl-form-bottom {\n  box-sizing: border-box;\n  float: left;\n  border: 1px solid #ccd0d4;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  margin-top: 14px;\n  padding: 8px;\n}\n.wtl-form-bottom * {\n  box-sizing: border-box;\n}\n.wtl-form-bottom-text {\n  flex: 1 1;\n  font-size: 11px;\n  padding: 0 !important;\n}\n.wtl-form-bottom-image {\n  background-size: contain;\n  width: 70px;\n  height: 70px;\n  background-repeat: no-repeat;\n  background-position: center;\n  margin-right: 10px;\n}\n.wtl-form-bottom-image--noted {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n.wtl-form-bottom-image--sentiment {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n.wtl-login-form {\n  display: flex;\n  flex-direction: column;\n  margin-top: 20px;\n  margin-left: 0;\n  font-weight: 400;\n  overflow: hidden;\n  background: #fff;\n  border: 1px solid #ccd0d4;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n}\n.wtl-login-form__items {\n  display: flex;\n  flex-direction: column;\n}\n.wtl-login-form__user {\n  padding: 14px 24px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  cursor: pointer;\n}\n.wtl-login-form__user-name {\n  font-size: 14px;\n  line-height: 1.5;\n  display: inline-block;\n}\n.wtl-login-form__user .dashicons {\n  font-size: 16px;\n  height: 16px;\n  transition: 0.5s ease all;\n}\n.wtl-login-form__user:hover {\n  background: #f1f1f1;\n}\n.wtl-login-form__user:hover .dashicons {\n  transform: translateX(4px);\n}\n.wtl-login-form .wtl-error {\n  padding: 14px 24px;\n  color: red;\n  display: none;\n}\n.wtl-login-form__desc {\n  padding: 14px 24px;\n  color: #5f5f5f;\n  text-align: center;\n  font-size: 12px;\n}\n.wtl-login-form h1 {\n  font-size: 14px;\n  line-height: 1.5;\n  display: inline-block;\n  margin-bottom: 3px;\n  font-weight: normal;\n  color: #3f3d56;\n  margin: 10px 50px;\n  border-bottom: 1px solid #ccd0d4;\n  font-size: 20px;\n}\n#loginform.wtl-bottom-block {\n  padding-bottom: 30px;\n}\n", "",{"version":3,"sources":["/Users/dk/Mine/sites/wp-image-directory3/wp-touch-login/client/assets/less/common.less","/Users/dk/Mine/sites/wp-image-directory3/wp-touch-login/client/assets/less/login.less"],"names":[],"mappings":"AACE;EACE,sBAAA;EAKA,WAAA;EACA,yBAAA;EACA,WAAA;EACA,aAAA;EACA,mBAAA;EACA,2BAAA;EACA,gBAAA;EACA,YAAA;ACJJ;ADTE;EAGI,sBAAA;ACSN;ADGI;EACE,SAAA;EACA,eAAA;EACA,qBAAA;ACDN;ADGI;EACE,wBAAA;EACA,WAAA;EACA,YAAA;EACA,4BAAA;EACA,2BAAA;EACA,kBAAA;ACDN;ADGM;EACE,yDAAA;ACDR;ADGM;EACE,yDAAA;ACDR;AA9BA;EACE,aAAA;EACA,sBAAA;EAEA,gBAAA;EACA,cAAA;EACA,gBAAA;EACA,gBAAA;EACA,gBAAA;EACA,yBAAA;EACA,yCAAA;AA+BF;AA7BE;EACE,aAAA;EACA,sBAAA;AA+BJ;AA7BE;EACE,kBAAA;EACA,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,eAAA;AA+BJ;AA7BI;EACE,eAAA;EACA,gBAAA;EACA,qBAAA;AA+BN;AAzCE;EAcI,eAAA;EACA,YAAA;EACA,yBAAA;AA8BN;AA3BI;EACE,mBAAA;AA6BN;AA9BI;EAII,0BAAA;AA6BR;AApEA;EA6CI,kBAAA;EACA,UAAA;EACA,aAAA;AA0BJ;AAvBE;EACE,kBAAA;EACA,cAAA;EACA,kBAAA;EACA,eAAA;AAyBJ;AA/EA;EA0DI,eAAA;EACA,gBAAA;EACA,qBAAA;EACA,kBAAA;EACA,mBAAA;EACA,cAAA;EACA,iBAAA;EACA,gCAAA;EACA,eAAA;AAwBJ;AAnBE;EACE,oBAAA;AAqBJ","file":"login.less","sourcesContent":[".wtl {\n  &-form-bottom {\n    box-sizing: border-box;\n    * {\n      box-sizing: border-box;\n    }\n\n    float: left;\n    border: 1px solid #ccd0d4;\n    width: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    margin-top: 14px;\n    padding: 8px;\n\n    &-text {\n      flex: 1;\n      font-size: 11px;\n      padding: 0 !important;\n    }\n    &-image {\n      background-size: contain;\n      width: 70px;\n      height: 70px;\n      background-repeat: no-repeat;\n      background-position: center;\n      margin-right: 10px;\n\n      &--noted {\n        background-image: url('./../pictures/undraw_noted_pc9f.svg');\n      }\n      &--sentiment {\n        background-image: url('./../pictures/undraw_sentiment_analysis_jp6w.svg');\n      }\n    }\n  }\n}\n","@import './common.less';\n\n.wtl-login-form {\n  display: flex;\n  flex-direction: column;\n\n  margin-top: 20px;\n  margin-left: 0;\n  font-weight: 400;\n  overflow: hidden;\n  background: #fff;\n  border: 1px solid #ccd0d4;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n\n  &__items {\n    display: flex;\n    flex-direction: column;\n  }\n  &__user {\n    padding: 14px 24px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    cursor: pointer;\n\n    &-name {\n      font-size: 14px;\n      line-height: 1.5;\n      display: inline-block;\n    }\n\n    .dashicons {\n      font-size: 16px;\n      height: 16px;\n      transition: 0.5s ease all;\n    }\n\n    &:hover {\n      background: #f1f1f1;\n\n      .dashicons {\n        transform: translateX(4px);\n      }\n    }\n  }\n\n  .wtl-error {\n    padding: 14px 24px;\n    color: red;\n    display: none;\n  }\n\n  &__desc {\n    padding: 14px 24px;\n    color: #5f5f5f;\n    text-align: center;\n    font-size: 12px;\n  }\n\n  h1 {\n    font-size: 14px;\n    line-height: 1.5;\n    display: inline-block;\n    margin-bottom: 3px;\n    font-weight: normal;\n    color: #3f3d56;\n    margin: 10px 50px;\n    border-bottom: 1px solid #ccd0d4;\n    font-size: 20px;\n  }\n}\n\n#loginform {\n  &.wtl-bottom-block {\n    padding-bottom: 30px;\n  }\n}\n"]}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./client/assets/less/login.less":
/*!***************************************!*\
  !*** ./client/assets/less/login.less ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../build-tools/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../build-tools/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../build-tools/node_modules/css-loader/dist/cjs.js??ref--4-oneOf-3-1!../../../../../build-tools/node_modules/postcss-loader/src??postcss!../../../../../build-tools/node_modules/resolve-url-loader??ref--4-oneOf-3-3!../../../../../build-tools/node_modules/less-loader/dist/cjs.js??ref--4-oneOf-3-4!./login.less */ "../../build-tools/node_modules/css-loader/dist/cjs.js?!../../build-tools/node_modules/postcss-loader/src/index.js?!../../build-tools/node_modules/resolve-url-loader/index.js?!../../build-tools/node_modules/less-loader/dist/cjs.js?!./client/assets/less/login.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);


if (true) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = content.locals;

    module.hot.accept(
      /*! !../../../../../build-tools/node_modules/css-loader/dist/cjs.js??ref--4-oneOf-3-1!../../../../../build-tools/node_modules/postcss-loader/src??postcss!../../../../../build-tools/node_modules/resolve-url-loader??ref--4-oneOf-3-3!../../../../../build-tools/node_modules/less-loader/dist/cjs.js??ref--4-oneOf-3-4!./login.less */ "../../build-tools/node_modules/css-loader/dist/cjs.js?!../../build-tools/node_modules/postcss-loader/src/index.js?!../../build-tools/node_modules/resolve-url-loader/index.js?!../../build-tools/node_modules/less-loader/dist/cjs.js?!./client/assets/less/login.less",
      function () {
        content = __webpack_require__(/*! !../../../../../build-tools/node_modules/css-loader/dist/cjs.js??ref--4-oneOf-3-1!../../../../../build-tools/node_modules/postcss-loader/src??postcss!../../../../../build-tools/node_modules/resolve-url-loader??ref--4-oneOf-3-3!../../../../../build-tools/node_modules/less-loader/dist/cjs.js??ref--4-oneOf-3-4!./login.less */ "../../build-tools/node_modules/css-loader/dist/cjs.js?!../../build-tools/node_modules/postcss-loader/src/index.js?!../../build-tools/node_modules/resolve-url-loader/index.js?!../../build-tools/node_modules/less-loader/dist/cjs.js?!./client/assets/less/login.less");

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.i, content, '']];
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);
      }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

module.exports = content.locals || {};

/***/ }),

/***/ "./client/assets/pictures/undraw_noted_pc9f.svg":
/*!******************************************************!*\
  !*** ./client/assets/pictures/undraw_noted_pc9f.svg ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IkxheWVyIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9Ijc0Ny43NTgiIGhlaWdodD0iNjY4Ljg0MSIgdmlld0JveD0iMCAwIDc0Ny43NTggNjY4Ljg0MSI+PHBhdGggZD0iTTcwMC4wNSAxMzAuMjg1YzI2LjcyIDM4Ljk4NSAyMC44MDcgODkuNDg3IDIwLjgwNyA4OS40ODdzLTQ5LjIzNS0xMi43MDUtNzUuOTU1LTUxLjY5LTIwLjgwNy04OS40ODgtMjAuODA3LTg5LjQ4OCA0OS4yMzQgMTIuNzA1IDc1Ljk1NCA1MS42OXoiIGZpbGw9IiMyZjJlNDEiLz48cGF0aCBkPSJNNjgwLjgyNCAxMzcuNzI5YzMuMTI2IDQ3LjE2IDM5LjAxNyA4My4xNzggMzkuMDE3IDgzLjE3OHMzMC44Mi00MC40NDIgMjcuNjk0LTg3LjYwMS0zOS4wMTctODMuMTc5LTM5LjAxNy04My4xNzktMzAuODIgNDAuNDQyLTI3LjY5NCA4Ny42MDJ6IiBmaWxsPSIjMDA3Y2JhIi8+PHBhdGggZD0iTTM3NC4wNDYuOTgybDM2Mi43NzUgMTgyLjM5YTE3LjE1NSAxNy4xNTUgMCAwMTkuNDEgMTYuNDgybC0yMS4wNzcgMzEyLjIwNGE4LjUgOC41IDAgMDEtMTIuMzE1IDcuMDEzTDM0MS43OTIgMzI5LjcwNyAzNjAuODQgOC41OTNBOS4xMjMgOS4xMjMgMCAwMTM3NC4wNDYuOTgyeiIgZmlsbD0iI2QwY2RlMSIvPjxwYXRoIGQ9Ik0zNzguMjIxIDcuMzQ0bDM1My44NjQgMTc3LjkxYTE2LjczMyAxNi43MzMgMCAwMTkuMTggMTYuMDc3bC0yMC41NiAzMDQuNTM2YTguMjkgOC4yOSAwIDAxLTEyLjAxMyA2Ljg0TDM0Ni43NiAzMjcuOTk2bDE4LjU4LTMxMy4yMjhhOC45IDguOSAwIDAxMTIuODgxLTcuNDI0eiIgZmlsbD0iIzNmM2Q1NiIvPjxwYXRoIGQ9Ik0zOTMuNzMgMzAuOTc1bDMyMC43NjcgMTYxLjI3YTE1LjE2OCAxNS4xNjggMCAwMTguMzIgMTQuNTczTDcwNC4xOCA0ODIuODdhNy41MTUgNy41MTUgMCAwMS0xMC44ODggNi4yTDM2NS4yMSAzMjEuNjM2bDE2Ljg0My0yODMuOTNhOC4wNjcgOC4wNjcgMCAwMTExLjY3Ni02LjczeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik02Mi43NDYgNDgzLjMzbDM2My4yMzggMTgyLjkzM2EyNC4xODUgMjQuMTg1IDAgMDAyMS43ODYtLjAyOWwyNjguNzEzLTEzNi40MDdjMy4xNTEtMy4xNTEgMi43MTEtNy44MiAxLjcwMy0xMS4zMjZhMjUuMjI5IDI1LjIyOSAwIDAwLTEuOTg3LTQuODk3bC0zNi42MTctMTkuMjZMMzcxLjcxIDM0MC43MzZsLTE4LjM5NC05Ljc2NWEzNC4wNiAzNC4wNiAwIDAwLTMxLjYzNi0uMTI3TDYyLjYzMiA0NjUuNDA1YTEwLjA1OCAxMC4wNTggMCAwMC4xMTQgMTcuOTI2eiIgZmlsbD0iI2QwY2RlMSIvPjxwYXRoIGQ9Ik02Mi43NDYgNDgzLjMzbDM2My4yMzggMTgyLjkzM2EyNC4xODUgMjQuMTg1IDAgMDAyMS43ODYtLjAyOWwyNjguNzEzLTEzNi40MDdjMy4xNTEtMy4xNTEgMi43MTEtNy44MiAxLjcwMy0xMS4zMjZsLTI2Ny45MSAxMzkuMjUzYTIzLjM3IDIzLjM3IDAgMDEtMjEuMi4xODJMNTcuMzI0IDQ3Mi43MjlhMTAuMDE3IDEwLjAxNyAwIDAwNS40MjIgMTAuNjAyeiIgb3BhY2l0eT0iLjEiLz48cGF0aCBkPSJNNDA3LjUxNyA1MzguMTQxTDI4OS44OCA0NzguNjk2YTE2LjUzIDE2LjUzIDAgMDAtMTUuMjQ0LjE3M2wtNjguMjQgMzYuNDU4YTQuODgyIDQuODgyIDAgMDAuMTAyIDguNjY0bDExOS45NCA2MC40ODNhMTMuNTg2IDEzLjU4NiAwIDAwMTIuNzg3LS4yOTRsNjguNTEzLTM4LjU5OWE0LjIwMyA0LjIwMyAwIDAwLS4yMjItNy40NHptMjc3LjA0OC05Ljk0MUw1NTcuOTggNTk1LjQ0N2ExMC4yOTcgMTAuMjk3IDAgMDEtOS40NzcuMDk2bC0zNTcuNjYtMTgwLjg3YTYuMDgyIDYuMDgyIDAgMDEuMDQ2LTEwLjg4bDEyMy42MTUtNjEuMTgyYTEzLjQwNCAxMy40MDQgMCAwMTExLjk3Ny4wNDJsMzU4LjAzIDE4MC4zOTJhMi45MDEgMi45MDEgMCAwMS4wNTUgNS4xNTN6IiBvcGFjaXR5PSIuMSIvPjxwYXRoIGZpbGw9IiMwMDdjYmEiIGQ9Ik00ODEuOTg0IDE5NC4wOWwuNjM0LTEuMjY4TDU5OSAyNTEuMDEybC0uNjM0IDEuMjd6bS0uMDIyIDE3LjA2bC42NDYtMS4yNjMgMTE2LjQxMyA1OS41NDgtLjY0NiAxLjI2MnptMjEuMzEgMzIuNjA0bC42NDYtMS4yNjQgNjYuNjk3IDM0LjA4LS42NDYgMS4yNjR6Ii8+PHBhdGggZD0iTTEzOS41MjcgMzEzLjU0N3MtMjguMzgtMTIuMzY3LTQxLjcxLjY5NyAzNS42OSA4Ljc2MyA0MS43MS0uNjk3eiIgZmlsbD0iIzNmM2Q1NiIvPjxwYXRoIGQ9Ik05MC41MjEgMjU0Ljg5OGM5LjUzOC0xNi4xMTUgMjguNDA3LTE2Ljg2NiAyOC40MDctMTYuODY2czE4LjM4Ny0yLjM1MiAzMC4xODIgMjIuMTkyYzEwLjk5MyAyMi44NzcgMjYuMTY2IDQ0Ljk2NSAyLjQ0MiA1MC4zMmwtNC4yODUtMTMuMzM3LTIuNjU0IDE0LjMzYTkyLjgyNyA5Mi44MjcgMCAwMS0xMC4xNS4xNzRjLTI1LjQwNy0uODItNDkuNjAzLjI0LTQ4LjgyNC04Ljg3NyAxLjAzNi0xMi4xMi00LjI5NS0zMi40MyA0Ljg4Mi00Ny45MzZ6IiBmaWxsPSIjMmYyZTQxIi8+PHBhdGggZD0iTTc3LjE3NiA1NDcuMDRzMTIuMDQgMjIuMzYgMTkuNzggMjIuMzYgNi44OCAxNC42MjEgNS4xNiAxOC4wNjEtNi4wMiAxMS4xOC44NiAyMi4zNmMyLjQwNCAzLjkwNiAxLjk3NCA4LjMzNi4zOTcgMTIuNDQ3LTQuNDE5IDExLjUyLTIxLjYwNyA4LjAzLTIxLjA1OS00LjI5NmwuMDIyLS40MWMuODYtMTMuNzYtNi4wMi0zNS4yNi0xMi45LTQwLjQycy0xMi45LTE4LjkyMS0xMi45LTE4LjkyMXptODIuNTYxLTUuMTZzLTEyLjA0IDIyLjM2LTE5Ljc4IDIyLjM2LTYuODggMTQuNjIxLTUuMTYgMTguMDYxIDYuMDIgMTEuMTgtLjg2IDIyLjM2Yy0yLjQwMyAzLjkwNi0xLjk3MyA4LjMzNi0uMzk2IDEyLjQ0NyA0LjQxOCAxMS41MiAyMS42MDYgOC4wMyAyMS4wNTgtNC4yOTZxLS4wMDktLjIwNC0uMDIyLS40MWMtLjg2LTEzLjc2IDYuMDItMzUuMjYgMTIuOS00MC40MjFzMTIuOS0xOC45MiAxMi45LTE4LjkyeiIgZmlsbD0iI2ZmYjhiOCIvPjxwYXRoIGQ9Ik0xNTAuMjc3IDQzMS43OTlsNS4xNiAxMS4xOHM3NS42ODEgMjQuOTQgNjguODAxIDU0LjE4LTQwLjQyIDc0LjgyMi00NS41OCA3My4xMDItMzIuNjgxLTYuODgtMzMuNTQxLTIxLjUgMTkuNzgtNDAuNDIxIDE5Ljc4LTQwLjQyMWwtMjguMzgtMjUuOC00MS4yOTgtLjg2LTM1LjI0MyAyNi42NnMzNi45OCAzMi42OCAyMC42NCA0NS41OC00MC40MiAyMS41MDEtNDMuODYgMTYuMzQxUy01LjM4NiA0ODguNTYuNjM0IDQ4MS42OHM2Ny4wOC0zMi42ODEgNjcuMDgtMzIuNjgxbDE2LjM0MS0yMy4yMiA2My42NDEtMy40NHoiIGZpbGw9IiMyZjJlNDEiLz48cGF0aCBkPSJNMTM0Ljc5NyAyODkuODk2cy00LjMgMjguMzggNC4zIDMxLjgyMS0xNy4yIDE4LjA2LTE3LjIgMTguMDZoLTE0LjYybC05LjQ2LTE5Ljc4czguNi0xNS40OCAzLjQ0LTMwLjEgMzMuNTQgMCAzMy41NCAweiIgZmlsbD0iI2ZmYjhiOCIvPjxwYXRoIGQ9Ik0xMzQuNzk3IDI4OS44OTZzLTQuMyAyOC4zOCA0LjMgMzEuODIxLTE3LjIgMTguMDYtMTcuMiAxOC4wNmgtMTQuNjJsLTkuNDYtMTkuNzhzOC42LTE1LjQ4IDMuNDQtMzAuMSAzMy41NCAwIDMzLjU0IDB6IiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik0xNDAuODE3IDMxMy45NzdzLTkuNDYgMTAuMzItMTEuMTggMTIuMDQtOS40NiAxMS4xOC0yNS44LTIuNTgtMTguMDYgMi41OC0xOC4wNiAyLjU4VjQyOS4yMnMxMy43Ni02LjAyIDI0Ljk0IDAgMzQuNC0xLjcyIDM0LjQtMS43Mmw0LjMtMTA2LjY0MnoiIGZpbGw9IiNkMGNkZTEiLz48cGF0aCBkPSJNMTM0LjUgMzEzLjk3N3M4LjAzNy0zLjQ0IDE0LjkxNyAwIDMwLjk2IDIwLjY0IDI5LjI0IDI4LjM4LTI0LjA4IDYxLjkyMS04LjYgODcuNzIyIDE4LjA2IDMyLjY4IDE4LjA2IDMyLjY4bC0zNy44NC0xOS43OHMtMjkuMjQtMTguMDYtMjYuNjYtMjkuMjQgMTAuODgzLTk5Ljc2MiAxMC44ODMtOTkuNzYyem0tMzQuMTE0IDBzLTE4LjA1IDEuNzItMTguOTEgMy40NC0yNy4wOSA5LjAzLTI1LjM3IDE2Ljc3IDI1LjM3IDc2Ljk3MSAxNS4wNSA4OS44NzItMjcuNTIgMzAuOTYtMjEuNSAzMi42OCAxNi4zNC0yLjU4IDI2LjY2IDAgMzQuNC0xOC45MiAzMS44Mi00Mi4xNC0uMDItOTQuNjAyLTcuNzUtMTAwLjYyMnoiIGZpbGw9IiMzZjNkNTYiLz48cGF0aCBkPSJNMTQzLjM5NyA0NzguMjR2OC42czQuMyAxOS43OC05LjQ2IDE4LjkyLTUuMTYtMjQuMDgtNS4xNi0yNC4wOGwuODYtNy43NHptLTM4LjcwMS44NnM5LjQ2IDE5Ljc4IDAgMjEuNS0xNi4zNC0xMS4xOC0xNi4zNC0xNC42MiAxNi4zNC02Ljg4IDE2LjM0LTYuODh6IiBmaWxsPSIjZmZiOGI4Ii8+PGVsbGlwc2UgY3g9IjkyLjIyNiIgY3k9IjI3OC4yODYiIHJ4PSIxLjcyIiByeT0iMy40NCIgZmlsbD0iI2ZmYjhiOCIvPjxlbGxpcHNlIGN4PSIxNDIuOTY3IiBjeT0iMjc4LjI4NiIgcng9IjEuNzIiIHJ5PSIzLjQ0IiBmaWxsPSIjZmZiOGI4Ii8+PHBhdGggZD0iTTc3LjE3NiAzMjUuMTU3cy0yMS41IDAtMjAuNjQgOC42IDI5LjI0IDE1Ni41MjMgMjkuMjQgMTU2LjUyMyAxMi4wNC0xMS4xOCAyMi4zNi04LjZ6bTgzLjQyMSAyLjU4czIxLjUgNC4zIDIxLjUgMTcuMi0zMC45NiAxMzYuNzQzLTM1LjI2IDEzNi43NDMtMjAuNjQtMi41OC0yMC42NC02Ljg4IDM0LjQtMTQ3LjA2MyAzNC40LTE0Ny4wNjN6IiBmaWxsPSIjM2YzZDU2Ii8+PHBhdGggZD0iTTE1NS44NjcgMzUzLjEwOGwtMTkuMzUgNzUuNjczczkuMDMtNjYuMjEzIDE5LjM1LTc1LjY3NHptLTc1LjI2Ni0xMC42MzRsMTkuNTcgOTguOTRzLTYuMjU0LTkzLjIzMi0xOS41Ny05OC45NHoiIG9wYWNpdHk9Ii4yIi8+PGNpcmNsZSBjeD0iMTE3LjU5NyIgY3k9IjI3OC43MTYiIHI9IjI0Ljk0IiBmaWxsPSIjZmZiOGI4Ii8+PHBhdGggZmlsbD0iIzJmMmU0MSIgZD0iTTk0LjczOCAyNTMuMzQ0bDE4LjY0Mi05Ljc2NCAyNS43NDMgMy45OTQgNS4zMjYgMjMuNTI0LTEzLjI1OC0uNTA5LTMuNzA0LTguNjQzdjguNWwtNi4xMTgtLjIzNS0zLjU1MS0xMy43Ni0yLjIxOSAxNC42NDctMjEuNzQ5LS40NDMuODg4LTE3LjMxMXoiLz48cGF0aCBmaWxsPSIjZjJmMmYyIiBkPSJNMzc0LjI4IDEwOC41NTFMMzY0IDEzM2w4Ni43NjggNDUuNTQ1TDQ4MCA5MyIvPjxwYXRoIGZpbGw9IiMwMDdjYmEiIGQ9Ik00NDguNzY4IDE2My41NDVsMzguMzMxLTkwLjE5M0wzOTkgMzBsLTM3IDg4IDg2Ljc2OCA0NS41NDV6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTM5Ni4yNzIgNjUuNzU0bC42NDYtMS4yNjQgNjYuNjk3IDM0LjA4LS42NDYgMS4yNjR6bS01IDEybC42NDYtMS4yNjQgNjYuNjk3IDM0LjA4LS42NDYgMS4yNjR6Ii8+PC9zdmc+");

/***/ }),

/***/ "./client/assets/pictures/undraw_sentiment_analysis_jp6w.svg":
/*!*******************************************************************!*\
  !*** ./client/assets/pictures/undraw_sentiment_analysis_jp6w.svg ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IkxheWVyIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjYwOC4xNTciIGhlaWdodD0iNzg3LjE0MSIgdmlld0JveD0iMCAwIDYwOC4xNTcgNzg3LjE0MSI+PHBhdGggZD0iTTYwOC4xNTcgNTA4LjAzN2wtMTA4Ljg5My03OS4yOXMtNjIuMzc1LTEwNS43MjEtNzIuOTQ3LTE3My4zODNTMzY4LjE3IDY3LjE4MSAzNjguMTcgNjcuMTgxVjMuNzVzLTU0Ljk3NC0yMS4xNDUtNTkuMjAzIDM3LjAwMiAxMS42MjkgMTMzLjIwOCAxMS42MjkgMTMzLjIwOCAxNS44NTggOTUuMTUtMjAuMDg3IDExOS40NjVMMTY5LjQxNSA1MDguMDM3czEyNS44MDggMTE1LjIzNiAyMjQuMTI4IDEzMC4wMzdsMjE0LjYxNCAxNDkuMDY3ek00Mi4wMjEgMjA0LjA5aC0zLjU5Yy0zMi4zNCAwLTUwLjUyIDM4LjE4MS0yOS4yNjkgNjIuNTYgNi44NCA3Ljg0NyAxNy4yMzYgMTMuMjggMzIuODYgMTMuNTU5em0wIDc2LjExOWgtMy41OWMtMzIuMzQgMC01MC41MiAzOC4xODItMjkuMjY5IDYyLjU2IDYuODQgNy44NDcgMTcuMjM2IDEzLjI4IDMyLjg2IDEzLjU1OXptMCA3Ni4xMTloLTMuNTljLTMyLjM0IDAtNTAuNTIgMzguMTgyLTI5LjI2OSA2Mi41NiA2Ljg0IDcuODQ3IDE3LjIzNiAxMy4yOCAzMi44NiAxMy41NTl6bTAgNzYuMTE5aC0zLjU5Yy0zMi4zNCAwLTUwLjUyIDM4LjE4Mi0yOS4yNjkgNjIuNTYgNi44NCA3Ljg0OCAxNy4yMzYgMTMuMjggMzIuODYgMTMuNTU5eiIgZmlsbD0iI2ZmYjhiOCIvPjxwYXRoIGQ9Ik0zMjIuNzEgMTg1LjkxNWgtMy4xNDZWOTkuNzIyYTQ5Ljg4NiA0OS44ODYgMCAwMC00OS44ODYtNDkuODg2SDg3LjA2OEE0OS44ODYgNDkuODg2IDAgMDAzNy4xOCA5OS43MjJ2NDcyLjg2YTQ5Ljg4NiA0OS44ODYgMCAwMDQ5Ljg4NiA0OS44ODZoMTgyLjYxMWE0OS44ODYgNDkuODg2IDAgMDA0OS44ODYtNDkuODg2VjI0Ny4yNjhoMy4xNDZ6IiBmaWxsPSIjM2YzZDU2Ii8+PHBhdGggZD0iTTMwOC45NDYgMTAwLjA3djQ3Mi4xNjFhMzcuNDAzIDM3LjQwMyAwIDAxLTEzLjY4IDI4Ljg2MiAzNC42MTcgMzQuNjE3IDAgMDEtMi45NSAyLjE2NyAzNy4wODYgMzcuMDg2IDAgMDEtMjAuNjI3IDYuMjI3SDg4LjJhMzYuODI4IDM2LjgyOCAwIDAxLTguODI3LTEuMDU3IDM3LjI1NSAzNy4yNTUgMCAwMS0yOC40MjktMzYuMTk5di00NzIuMTZBMzcuMjYgMzcuMjYgMCAwMTg4LjIgNjIuODE1aDIyLjI2NWExNy42OTUgMTcuNjk1IDAgMDAxNi4zODcgMjQuMzhoMTA0LjYxYTE3LjcxNyAxNy43MTcgMCAwMDE2LjM5OC0yNC4zOGgyMy44M2EzNy4yNiAzNy4yNiAwIDAxMzcuMjU2IDM3LjI1NnoiIGZpbGw9IiMwMDdjYmEiLz48cGF0aCBkPSJNMTQxLjQzOSA0MTguNjIzczE4LjAxMSA1MC4wMzIgNC4wMDIgNzguMDUgMjIuMDE0IDYwLjAzOSAyMi4wMTQgNjAuMDM5IDk0LjA2MS00OC4wMzEgODIuMDUzLTcyLjA0Ny0zMi4wMi01Ni4wMzYtMjguMDE4LTc2LjA0OXoiIGZpbGw9IiNmZmI4YjgiLz48Y2lyY2xlIGN4PSIxNzYuNDYxIiBjeT0iMzczLjU5NCIgcj0iNjQuMDQxIiBmaWxsPSIjZmZiOGI4Ii8+PHBhdGggZD0iTTMwMC45NzQgNTk4LjMxNGEzNy4yNTMgMzcuMjUzIDAgMDEtNS43MDkgNS44MzYgMzQuNjE3IDM0LjYxNyAwIDAxLTIuOTUgMi4xNjdjLTUuOTEgMy45MzMtMTIuOTkyIDUuMTctMjAuNjI2IDUuMTdIMTA5LjYybDIuODAyLTc3Ljc5IDE4LjAxNS00MC4wMjVhODMuNTk0IDgzLjU5NCAwIDAwMTIuOTMgOC4zNDEgNzguNzA3IDc4LjcwNyAwIDAwMy40MTQgMS43MzRjMTYuODczIDguMTUxIDQ0LjQ1NiAxNS4zMTkgNzEuMTkzLTQuNjQxIDguNDE1LTYuMjggMTYuNzQ2LTE1LjI1NiAyNC42NDMtMjcuNzNsNDkuOTIyIDI4LjMgMi42MjIgMzAuNjZ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE1MC42MDcgNDYzLjcyMWwtMi41MDUgMjYuMTg3LTEuMzIyIDEzLjgzOS0xLjk3NyAyMC42MDUtOC40NDcgODguMTkySDg4LjJhMzYuODI4IDM2LjgyOCAwIDAxLTguODI3LTEuMDU3bC0xOC45ODgtODcuODAxLjU1LS4zNnptMTU4LjMzOSAxNy45OTR2OTMuNTczYTM3LjQwMyAzNy40MDMgMCAwMS0xMy42OCAyOC44NjIgMzQuNjE3IDM0LjYxNyAwIDAxLTIuOTUgMi4xNjcgMzcuMDg2IDM3LjA4NiAwIDAxLTIwLjYyNyA2LjIyN2gtNjQuNDM2YzEuNDA2LTI5LjU3IDMuODktNTguNDMyIDYuNzk3LTgzLjU3MiAxLjI0OC0xMC43MSAyLjU3LTIwLjc0MiAzLjkyMy0yOS44NjYgNC4zNTUtMjkuNDEyIDkuMDI4LTQ5LjM4MiAxMi4zOC01Mi4wNzhsMjIuMTU5IDE0LjYyeiIgZmlsbD0iIzJmMmU0MSIvPjxwYXRoIGQ9Ik0xMDYuNDE2IDU5NS43MzVsLTIuMzA1IDE2LjgxaC0xNS45MWEzNi44MjggMzYuODI4IDAgMDEtOC44MjgtMS4wNTggMzcuMjU1IDM3LjI1NSAwIDAxLTI4LjQyOS0zNi4xOTl2LTMuMzgzbDcuNDQzLTQ4LjIyIDIuNTQ4LS4zNTkgMTEuNDYtMS42Mzh6bTIwMi41My0xMDEuODJ2ODEuMzczYTM3LjQwMyAzNy40MDMgMCAwMS0xMy42OCAyOC44NjIgMzQuNjE3IDM0LjYxNyAwIDAxLTIuOTUgMi4xNjdsLTkuNzktNDIuNjA1IDEyLjYzNC0zMy4zNzZ6bS03MS40MTUtMTc4LjI0M2E3NC44MTYgNzQuODE2IDAgMDAtNDIuNTU4LTMyLjUzNWwtMTMuMDEyIDEwLjQxIDUuMDYtMTIuMTQyYTY4Ljg3MSA2OC44NzEgMCAwMC0xMi44NjEtLjc0M2wtMTEuNzA3IDE1LjA1MiA0Ljg0NS0xNC41MzdjLTIwLjIyOSAyLjU4LTM5LjQ2IDEzLjU5OC01MS4xMTggMzAuNDA3LTE0LjkgMjEuNDg1LTE3LjQxNSA1MS4zNjQtMi43NiA3My4wMTcgNC4wMjQtMTIuMzYzIDguOTA2LTIzLjk2NCAxMi45My0zNi4zMjcuOTI4LjM5NyA0LjQ0Ni4zNzIgOS41MzEuMDQ2bDQuODk1LTExLjQyIDEuMzY3IDEwLjkzN2MxNS4xNzEtMS4zMjIgMzcuNjczLTQuMjIzIDUyLjA1NS02Ljg4MmwtMS4zOTgtOC4zOSA4LjM2NyA2Ljk3MmM0LjQwNi0xLjAxNSA3LjAyMi0xLjkzNSA2LjgwNi0yLjYzOCAxMC42OTcgMTcuMjQ0IDIxLjI5NSAyOC4yNTggMzEuOTkxIDQ1LjUwMiA0LjA2LTI0LjMyMyAxMS4yMjktNDQuNTQtMi40MzMtNjYuNzN6IiBmaWxsPSIjMmYyZTQxIi8+PGVsbGlwc2UgY3g9IjIzMy45ODUiIGN5PSIzNzEuNTgyIiByeD0iNC4zMzUiIHJ5PSI4LjY3MSIgZmlsbD0iI2ZmYjhiOCIvPjxlbGxpcHNlIGN4PSIzNzUuMDQyIiBjeT0iNDE5LjIzMiIgcng9Ijc5LjgxOSIgcnk9IjE3OC42NjgiIGZpbGw9IiNmZmI4YjgiLz48cGF0aCBkPSJNODcuOTY5IDE5Ni4xNmEyMS4xNDQgMjEuMTQ0IDAgMTEyMS4xNDQtMjEuMTQ0IDIxLjE2OCAyMS4xNjggMCAwMS0yMS4xNDQgMjEuMTQ1em0wLTQwLjE3M2ExOS4wMyAxOS4wMyAwIDEwMTkuMDMgMTkuMDMgMTkuMDUxIDE5LjA1MSAwIDAwLTE5LjAzLTE5LjAzeiIgb3BhY2l0eT0iLjIiLz48Y2lyY2xlIGN4PSI3OS41MTEiIGN5PSIxNjkuNzMiIHI9IjMuMTcyIiBvcGFjaXR5PSIuMiIvPjxjaXJjbGUgY3g9Ijk1LjM2OSIgY3k9IjE2OS43MyIgcj0iMy4xNzIiIG9wYWNpdHk9Ii4yIi8+PHBhdGggZD0iTTk1LjM3IDE4Mi40MTdINzkuNTFhMS4wNTcgMS4wNTcgMCAwMTAtMi4xMTVoMTUuODZhMS4wNTcgMS4wNTcgMCAwMTAgMi4xMTV6bTE3Ni41NTMgMTMuNzQzYTIxLjE0NCAyMS4xNDQgMCAxMTIxLjE0NC0yMS4xNDQgMjEuMTY4IDIxLjE2OCAwIDAxLTIxLjE0NCAyMS4xNDV6bTAtNDAuMTczYTE5LjAzIDE5LjAzIDAgMTAxOS4wMyAxOS4wMyAxOS4wNTIgMTkuMDUyIDAgMDAtMTkuMDMtMTkuMDN6IiBvcGFjaXR5PSIuMiIvPjxjaXJjbGUgY3g9IjI2My40NjUiIGN5PSIxNjkuNzMiIHI9IjMuMTcyIiBvcGFjaXR5PSIuMiIvPjxjaXJjbGUgY3g9IjI3OS4zMjMiIGN5PSIxNjkuNzMiIHI9IjMuMTcyIiBvcGFjaXR5PSIuMiIvPjxwYXRoIGQ9Ik0yNzkuMzIyIDE4NC41MzFhMS4wNTUgMS4wNTUgMCAwMS0uNTI2LS4xNCAxMy44MjIgMTMuODIyIDAgMDAtMTQuODAzIDAgMS4wNTcgMS4wNTcgMCAxMS0xLjA1NS0xLjgzMyAxNS45NzggMTUuOTc4IDAgMDExNi45MTMgMCAxLjA1NyAxLjA1NyAwIDAxLS41MjkgMS45NzN6IiBvcGFjaXR5PSIuMiIvPjxwYXRoIGQ9Ik0xODEuMDAzIDIxNy45NDZhNDIuOTMgNDIuOTMgMCAxMTQyLjkzLTQyLjkzIDQyLjk3OCA0Mi45NzggMCAwMS00Mi45MyA0Mi45M3ptMC04MS41NjZhMzguNjM2IDM4LjYzNiAwIDEwMzguNjM2IDM4LjYzNiAzOC42OCAzOC42OCAwIDAwLTM4LjYzNi0zOC42MzZ6IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMTYzLjgzMSIgY3k9IjE2NC4yODQiIHI9IjYuNDM5IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMTk2LjAyOCIgY3k9IjE2NC4yODQiIHI9IjYuNDM5IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTE4MS4wMjYgMTk1Ljk3NXEtOC42NiAwLTE4LjM2Mi02LjI4YTIuMTQ2IDIuMTQ2IDAgMDEyLjMzNS0zLjZjMTEuMzc3IDcuMzc1IDIxLjA3IDcuNDI4IDI5LjY0Mi4xNjNhMi4xNDYgMi4xNDYgMCAwMTIuNzc1IDMuMjc0Yy01LjA2NCA0LjI5NS0xMC41NDMgNi40NDMtMTYuMzkgNi40NDN6bTcwLjgxIDQ5Ljg3NGgtMjcuOTA0di00LjI5MmgyMy42MTF2LTIzLjYxMWg0LjI5M3YyNy45MDN6TTExNC40NjMgMTMyLjA4N2gtNC4yOTN2LTI3LjkwNGgyNy45MDR2NC4yOTNoLTIzLjYxMXYyMy42MTF6IiBmaWxsPSIjZmZmIi8+PC9zdmc+");

/***/ }),

/***/ "./client/common.js":
/*!**************************!*\
  !*** ./client/common.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! /Users/dk/Mine/sites/build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault */ "../../build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleResponse = exports.addUserToLast = exports.isSupport = exports.debug = exports.getBottomBlock = exports.serverAction = exports.errorHook = exports.fetchEndpoint = exports.isSSL = exports.nonce = exports.hasCredentials = exports.ajaxUrl = exports.t = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! /Users/dk/Mine/sites/build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator */ "../../build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! /Users/dk/Mine/sites/build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ "../../build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"));

var _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ "jquery"));

var _webauthn = __webpack_require__(/*! ./webauthn */ "./client/webauthn.js");

var _ref = window.WP_TOUCH_LOGIN || {},
    t = _ref.t,
    ajaxUrl = _ref.ajaxUrl,
    pluginUrl = _ref.pluginUrl,
    hasCredentials = _ref.hasCredentials,
    nonce = _ref.nonce,
    isSSL = _ref.isSSL;

exports.isSSL = isSSL;
exports.nonce = nonce;
exports.hasCredentials = hasCredentials;
exports.ajaxUrl = ajaxUrl;
exports.t = t;

if (false) {}

var fetchEndpoint = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(action, data) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _jquery["default"].ajax({
              url: ajaxUrl + "?action=".concat(action, "&nonce=").concat(nonce),
              method: 'POST',
              data: JSON.stringify(data),
              contentType: 'application/json',
              dataType: 'json',
              redirect: 'error',
              xhrFields: {
                withCredentials: true
              },
              crossDomain: false
            });

          case 2:
            result = _context.sent;
            handleResponse(result);
            return _context.abrupt("return", result);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchEndpoint(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.fetchEndpoint = fetchEndpoint;

var errorHook = function errorHook() {
  var $error = (0, _jquery["default"])('.wtl-error');
  $error.slideUp();
  return function (message, error) {
    if ((error === null || error === void 0 ? void 0 : error.name) === 'NotAllowedError') {
      message = t.errorNoCreds + '<br/><br/>' + message;
    }

    $error.html(message).slideDown();
  };
};

exports.errorHook = errorHook;

var serverAction = function serverAction(type) {
  return /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
      var json, publicKey, credentials, publicKeyCredential;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return fetchEndpoint("plwp_".concat(type, "_options"), data);

            case 2:
              json = _context2.sent;
              publicKey = (0, _webauthn.preparePublicKeyOptions)(json.data);
              credentials = false;

              if (!(type === 'register')) {
                _context2.next = 11;
                break;
              }

              _context2.next = 8;
              return navigator.credentials.create({
                publicKey: publicKey
              });

            case 8:
              credentials = _context2.sent;
              _context2.next = 15;
              break;

            case 11:
              if (!(type === 'login')) {
                _context2.next = 15;
                break;
              }

              _context2.next = 14;
              return navigator.credentials.get({
                publicKey: publicKey
              });

            case 14:
              credentials = _context2.sent;

            case 15:
              publicKeyCredential = (0, _webauthn.preparePublicKeyCredentials)(credentials);
              _context2.next = 18;
              return fetchEndpoint("plwp_".concat(type), publicKeyCredential);

            case 18:
              json = _context2.sent;
              return _context2.abrupt("return", json);

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
};

exports.serverAction = serverAction;

var getBottomBlock = function getBottomBlock(_ref4) {
  var text = _ref4.text,
      image = _ref4.image;
  return "<div class=\"wtl-form-bottom\">\n<div class=\"wtl-form-bottom-image wtl-form-bottom-image--".concat(image, "\"></div>\n<div class=\"wtl-form-bottom-text\">").concat(text, "</div>\n</div>");
};

exports.getBottomBlock = getBottomBlock;

var debug = function debug(v) {
  console.log(v);
};

exports.debug = debug;

var isSupport = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = window.PublicKeyCredential !== undefined && navigator.credentials.create !== undefined && typeof navigator.credentials.create === 'function';

            if (!_context3.t0) {
              _context3.next = 5;
              break;
            }

            _context3.next = 4;
            return PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();

          case 4:
            _context3.t0 = _context3.sent;

          case 5:
            return _context3.abrupt("return", _context3.t0);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function isSupport() {
    return _ref5.apply(this, arguments);
  };
}();

exports.isSupport = isSupport;

var addUserToLast = function addUserToLast(user) {
  if (user) {
    var wtl = JSON.parse(localStorage.getItem('wtl')) || {};
    wtl.users = wtl.users || {};
    wtl.users[user.name] = user;
    localStorage.setItem('wtl', JSON.stringify(wtl));
  }
};

exports.addUserToLast = addUserToLast;

var handleResponse = function handleResponse(_ref6) {
  var success = _ref6.success,
      data = _ref6.data;

  if (!success) {
    if (data.redirect_to) {
      if (data.message) {
        if (confirm(data.message)) {
          location.href = data.redirect_to;
        }
      } else {
        location.href = data.redirect_to;
      }
    }

    throw new Error(data.message || 'Unknown Error');
  }
};

exports.handleResponse = handleResponse;

/***/ }),

/***/ "./client/login.js":
/*!*************************!*\
  !*** ./client/login.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! /Users/dk/Mine/sites/build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault */ "../../build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _regenerator = _interopRequireDefault(__webpack_require__(/*! /Users/dk/Mine/sites/build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator */ "../../build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! /Users/dk/Mine/sites/build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ "../../build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"));

var _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ "jquery"));

__webpack_require__(/*! ./assets/less/login.less */ "./client/assets/less/login.less");

var _common = __webpack_require__(/*! ./common */ "./client/common.js");

var doLogin = function doLogin() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var error, _yield$serverAction, data, success;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            error = (0, _common.errorHook)();
            _context.prev = 1;
            _context.next = 4;
            return (0, _common.serverAction)('login')({
              id: id
            });

          case 4:
            _yield$serverAction = _context.sent;
            data = _yield$serverAction.data;
            success = _yield$serverAction.success;

            if (!success) {} else {
              if (data.user) {
                (0, _common.addUserToLast)(data.user);
              }

              if (data.redirect_to) {
                location.href = data.redirect_to;
              }
            }

            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            error(_context.t0.message, _context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));
};

var doForm = function doForm() {
  return (0, _jquery["default"])("\n  <div class=\"wtl-login-form\">\n    <h1>Passwordless Login</h1>\n    \n    <div class=\"wtl-login-form__items\"></div>\n    <div class=\"wtl-error\"></div>\n    <div class=\"wtl-login-form__desc\">".concat(_common.t.loginDesc, "</div>\n  </div>\n"));
};

var doUserLine = function doUserLine(_ref2) {
  var displayName = _ref2.displayName,
      id = _ref2.id;
  return (0, _jquery["default"])("\n  <div class=\"wtl-login-form__user\">\n    <div class=\"wtl-login-form__user-name\">\n      ".concat(displayName, "\n    </div>\n    <span class=\"dashicons dashicons-arrow-right-alt\"></span>\n  </div>\n")).click(doLogin(id));
};

var showForm = function showForm() {
  var $loginForm = (0, _jquery["default"])('#loginform');
  var $form = doForm().hide();
  $loginForm.before($form);
  var wtl = JSON.parse(localStorage.getItem('wtl')) || {};
  wtl.users = wtl.users || {};
  var $items = (0, _jquery["default"])('.wtl-login-form__items');

  for (var u in wtl.users) {
    var user = wtl.users[u];
    $items.append(doUserLine({
      displayName: user.displayName,
      id: user.id
    }));
  }

  $items.append(doUserLine({
    displayName: _common.t.anotherUser,
    id: undefined
  }));
  $form.slideDown('fast');
};

(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  var isSupported, $loginForm, text;
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _common.isSupport)();

        case 2:
          isSupported = _context2.sent;
          $loginForm = (0, _jquery["default"])('#loginform');

          if (isSupported) {
            if (_common.hasCredentials) {
              showForm();
            }

            $loginForm.addClass('wtl-bottom-block').append((0, _common.getBottomBlock)({
              image: 'sentiment',
              text: _common.t.suportedText
            }));
            $loginForm.append("<input name=\"plwp_supported\" value=\"1\" type=\"hidden\" />");
          } else {
            text = _common.t.useCorrectBrowserOrLogin + '<br/>' + _common.t.unsuportedText;

            if (!_common.isSSL) {
              text = '<strong>' + _common.t.requiredSSL + '</strong><br/><br/>' + text;
            }

            $loginForm.addClass('wtl-bottom-block').append((0, _common.getBottomBlock)({
              image: 'noted',
              text: text
            }));
          }

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
}))();

/***/ }),

/***/ "./client/webauthn.js":
/*!****************************!*\
  !*** ./client/webauthn.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! /Users/dk/Mine/sites/build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault */ "../../build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preparePublicKeyCredentials = exports.preparePublicKeyOptions = void 0;

var _objectSpread2 = _interopRequireDefault(__webpack_require__(/*! /Users/dk/Mine/sites/build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2 */ "../../build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js"));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! /Users/dk/Mine/sites/build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray */ "../../build-tools/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"));

// Decodes a Base64Url string
var base64UrlDecode = function base64UrlDecode(input) {
  input = input.replace(/-/g, '+').replace(/_/g, '/');
  var pad = input.length % 4;

  if (pad) {
    if (pad === 1) {
      throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
    }

    input += new Array(5 - pad).join('=');
  }

  return window.atob(input);
}; // Converts an array of bytes into a Base64Url string


var arrayToBase64String = function arrayToBase64String(a) {
  return btoa(String.fromCharCode.apply(String, (0, _toConsumableArray2["default"])(a)));
}; // Prepares the public key options object returned by the Webauthn Framework


var preparePublicKeyOptions = function preparePublicKeyOptions(publicKey) {
  //Convert challenge from Base64Url string to Uint8Array
  publicKey.challenge = Uint8Array.from(base64UrlDecode(publicKey.challenge), function (c) {
    return c.charCodeAt(0);
  }); //Convert the user ID from Base64 string to Uint8Array

  if (publicKey.user !== undefined) {
    publicKey.user = (0, _objectSpread2["default"])({}, publicKey.user, {
      id: Uint8Array.from(window.atob(publicKey.user.id), function (c) {
        return c.charCodeAt(0);
      })
    });
  } //If excludeCredentials is defined, we convert all IDs to Uint8Array


  if (publicKey.excludeCredentials !== undefined) {
    publicKey.excludeCredentials = publicKey.excludeCredentials.map(function (data) {
      return (0, _objectSpread2["default"])({}, data, {
        id: Uint8Array.from(base64UrlDecode(data.id), function (c) {
          return c.charCodeAt(0);
        })
      });
    });
  }

  if (publicKey.allowCredentials !== undefined) {
    publicKey.allowCredentials = publicKey.allowCredentials.map(function (data) {
      return (0, _objectSpread2["default"])({}, data, {
        id: Uint8Array.from(base64UrlDecode(data.id), function (c) {
          return c.charCodeAt(0);
        })
      });
    });
  }

  return publicKey;
}; // Prepares the public key credentials object returned by the authenticator


exports.preparePublicKeyOptions = preparePublicKeyOptions;

var preparePublicKeyCredentials = function preparePublicKeyCredentials(data) {
  var publicKeyCredential = {
    id: data.id,
    type: data.type,
    rawId: arrayToBase64String(new Uint8Array(data.rawId)),
    response: {
      clientDataJSON: arrayToBase64String(new Uint8Array(data.response.clientDataJSON))
    }
  };

  if (data.response.attestationObject !== undefined) {
    publicKeyCredential.response.attestationObject = arrayToBase64String(new Uint8Array(data.response.attestationObject));
  }

  if (data.response.authenticatorData !== undefined) {
    publicKeyCredential.response.authenticatorData = arrayToBase64String(new Uint8Array(data.response.authenticatorData));
  }

  if (data.response.signature !== undefined) {
    publicKeyCredential.response.signature = arrayToBase64String(new Uint8Array(data.response.signature));
  }

  if (data.response.userHandle !== undefined) {
    publicKeyCredential.response.userHandle = arrayToBase64String(new Uint8Array(data.response.userHandle));
  }

  return publicKeyCredential;
};

exports.preparePublicKeyCredentials = preparePublicKeyCredentials;

/***/ }),

/***/ 0:
/*!***********************************************************!*\
  !*** multi (webpack)/hot/dev-server.js ./client/login.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/dk/Mine/sites/build-tools/node_modules/webpack/hot/dev-server.js */"../../build-tools/node_modules/webpack/hot/dev-server.js");
module.exports = __webpack_require__(/*! /Users/dk/Mine/sites/wp-image-directory3/wp-touch-login/client/login.js */"./client/login.js");


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=login.js.map