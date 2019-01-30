var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */


var _GameView = require("./script/GameView");

var _GameView2 = _interopRequireDefault(_GameView);

var _Director = require("./script/Director");

var _Director2 = _interopRequireDefault(_Director);

var _StartGame = require("./script/StartGame");

var _StartGame2 = _interopRequireDefault(_StartGame);

var _Brids = require("./script/Brids");

var _Brids2 = _interopRequireDefault(_Brids);

var _Pencel = require("./script/Pencel");

var _Pencel2 = _interopRequireDefault(_Pencel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameConfig = function () {
				function GameConfig() {
								_classCallCheck(this, GameConfig);
				}

				_createClass(GameConfig, null, [{
								key: "init",
								value: function init() {
												//注册Script或者Runtime引用
												var reg = Laya.ClassUtils.regClass;
												reg("script/GameView.js", _GameView2.default);
												reg("script/Director.js", _Director2.default);
												reg("script/StartGame.js", _StartGame2.default);
												reg("script/Brids.js", _Brids2.default);
												reg("script/Pencel.js", _Pencel2.default);
								}
				}]);

				return GameConfig;
}();

exports.default = GameConfig;

GameConfig.width = 750;
GameConfig.height = 1334;
GameConfig.scaleMode = "fixedwidth";
GameConfig.screenMode = "none";
GameConfig.alignV = "top";
GameConfig.alignH = "left";
GameConfig.startScene = "GameView.scene";
GameConfig.sceneRoot = "";
GameConfig.debug = false;
GameConfig.stat = false;
GameConfig.physicsDebug = false;
GameConfig.exportSceneToJson = true;

GameConfig.init();

},{"./script/Brids":3,"./script/Director":4,"./script/GameView":5,"./script/Pencel":6,"./script/StartGame":7}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameConfig = require("./GameConfig");

var _GameConfig2 = _interopRequireDefault(_GameConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
	function Main() {
		_classCallCheck(this, Main);

		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(_GameConfig2.default.width, _GameConfig2.default.height);else Laya.init(_GameConfig2.default.width, _GameConfig2.default.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = _GameConfig2.default.scaleMode;
		Laya.stage.screenMode = _GameConfig2.default.screenMode;
		Laya.stage.alignV = _GameConfig2.default.alignV;
		Laya.stage.alignH = _GameConfig2.default.alignH;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = _GameConfig2.default.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (_GameConfig2.default.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (_GameConfig2.default.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (_GameConfig2.default.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	_createClass(Main, [{
		key: "onVersionLoaded",
		value: function onVersionLoaded() {
			//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
			Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
		}
	}, {
		key: "onConfigLoaded",
		value: function onConfigLoaded() {
			//加载IDE指定的场景
			_GameConfig2.default.startScene && Laya.Scene.open(_GameConfig2.default.startScene);
		}
	}]);

	return Main;
}();
//激活启动类


new Main();

},{"./GameConfig":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Brids = function (_Laya$Script) {
    _inherits(Brids, _Laya$Script);

    function Brids() {
        _classCallCheck(this, Brids);

        var _this = _possibleConstructorReturn(this, (Brids.__proto__ || Object.getPrototypeOf(Brids)).call(this));

        Brids.instance = _this;
        return _this;
    }

    _createClass(Brids, [{
        key: "onEnable",
        value: function onEnable() {
            //设置初始速度
            this.rig = this.owner.getComponent(Laya.RigidBody);
            this.rig.setVelocity({ x: 0, y: -5 });
        }
    }, {
        key: "onTriggerEnter",
        value: function onTriggerEnter(other, self, contact) {
            console.log(other.label);
        }
    }]);

    return Brids;
}(Laya.Script);

exports.default = Brids;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameView = require('./GameView');

var _GameView2 = _interopRequireDefault(_GameView);

var _Brids = require('./Brids');

var _Brids2 = _interopRequireDefault(_Brids);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Director = function (_Laya$Script) {
    _inherits(Director, _Laya$Script);

    /** @prop {name: PencelUp, tip: '上铅笔', type: prefab} */
    /** @prop {name: PencelDwon, tip: '下铅笔', type: prefab} */
    /** @prop {name: Brids, tip: '小鸟', type: prefab} */
    function Director() {
        _classCallCheck(this, Director);

        var _this = _possibleConstructorReturn(this, (Director.__proto__ || Object.getPrototypeOf(Director)).call(this));

        Director.instance = _this;
        return _this;
    }

    _createClass(Director, [{
        key: 'onEnable',
        value: function onEnable() {
            this.count = 1;
            this.Brid = null;
            this.gameBox = this.owner.getChildByName('gameBox');
            this.createPencel();
            this.createBrids();
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate() {
            _GameView2.default.instance.move();
        }
    }, {
        key: 'onClick',
        value: function onClick() {
            if (this.Brid) {
                _Brids2.default.instance.rig.setVelocity({ x: 0, y: -5 });
            }
        }
    }, {
        key: 'createPencel',
        value: function createPencel() {
            this.count++;
            if (this.count === 2) {
                var min = Laya.stage.height / 18;
                var max = Laya.stage.height / 3;
                var top = min + Math.random() * (max - min);

                var PencelUp = Laya.Pool.getItemByCreateFun('PencelUp', this.PencelUp.create, this.PencelUp);
                PencelUp.pos(Laya.stage.width, top - PencelUp.height);
                this.gameBox.addChild(PencelUp);

                var PencelDwon = Laya.Pool.getItemByCreateFun('PencelDwon', this.PencelDwon.create, this.PencelDwon);
                PencelDwon.pos(Laya.stage.width, top + 400);
                this.gameBox.addChild(PencelDwon);

                this.count = 0;
            }
        }
    }, {
        key: 'createBrids',
        value: function createBrids() {
            this.Brid = Laya.Pool.getItemByCreateFun('Brids', this.Brids.create, this.Brids);
            this.Brid.pos(50, Laya.stage.height / 2);
            this.gameBox.addChild(this.Brid);
        }
    }]);

    return Director;
}(Laya.Script);

exports.default = Director;

},{"./Brids":3,"./GameView":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameView = function (_Laya$Scene) {
    _inherits(GameView, _Laya$Scene);

    function GameView() {
        _classCallCheck(this, GameView);

        var _this = _possibleConstructorReturn(this, (GameView.__proto__ || Object.getPrototypeOf(GameView)).call(this));

        GameView.instance = _this;
        return _this;
    }

    _createClass(GameView, [{
        key: "onEnable",
        value: function onEnable() {
            this.speed = 4;
        }
    }, {
        key: "move",
        value: function move() {
            if (-this.background.x >= 750) {
                this.background.x = -this.speed;
            }
            this.background.x -= this.speed;
        }
    }]);

    return GameView;
}(Laya.Scene);

exports.default = GameView;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Director = require('./Director');

var _Director2 = _interopRequireDefault(_Director);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PencelUp = function (_Laya$Script) {
    _inherits(PencelUp, _Laya$Script);

    function PencelUp() {
        _classCallCheck(this, PencelUp);

        return _possibleConstructorReturn(this, (PencelUp.__proto__ || Object.getPrototypeOf(PencelUp)).call(this));
    }

    _createClass(PencelUp, [{
        key: 'onEnable',
        value: function onEnable() {
            //设置初始速度
            var rig = this.owner.getComponent(Laya.RigidBody);
            rig.setVelocity({ x: -4, y: 0 });
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate() {
            var owner = this.owner;
            if (owner.x <= -owner.width) {
                owner.removeSelf();
                _Director2.default.instance.createPencel();
            }
        }
    }]);

    return PencelUp;
}(Laya.Script);

exports.default = PencelUp;

},{"./Director":4}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameStart = function (_Laya$Scene) {
    _inherits(GameStart, _Laya$Scene);

    function GameStart() {
        _classCallCheck(this, GameStart);

        var _this = _possibleConstructorReturn(this, (GameStart.__proto__ || Object.getPrototypeOf(GameStart)).call(this));

        _this.on(Laya.Event.CLICK, _this, _this.onPageClick);
        return _this;
    }

    _createClass(GameStart, [{
        key: 'onPageClick',
        value: function onPageClick() {
            Laya.Scene.open('./GameView.scene');
        }
    }]);

    return GameStart;
}(Laya.Scene);

exports.default = GameStart;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L+i9r+S7ti9MYXlhQWlySURFL3Jlc291cmNlcy9hcHAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9HYW1lQ29uZmlnLmpzIiwic3JjL01haW4uanMiLCJzcmMvc2NyaXB0L0JyaWRzLmpzIiwic3JjL3NjcmlwdC9EaXJlY3Rvci5qcyIsInNyYy9zY3JpcHQvR2FtZVZpZXcuanMiLCJzcmMvc2NyaXB0L1BlbmNlbC5qcyIsInNyYy9zY3JpcHQvU3RhcnRHYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7cWpCQ1ZBOzs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVxQixVOzs7Ozs7OytCQUNIO0FBQ1Y7QUFDQSxnQkFBSSxNQUFNLEtBQUssVUFBTCxDQUFnQixRQUExQjtBQUNOLGdCQUFJLG9CQUFKLEVBQXlCLGtCQUF6QjtBQUNBLGdCQUFJLG9CQUFKLEVBQXlCLGtCQUF6QjtBQUNBLGdCQUFJLHFCQUFKLEVBQTBCLG1CQUExQjtBQUNBLGdCQUFJLGlCQUFKLEVBQXNCLGVBQXRCO0FBQ0EsZ0JBQUksa0JBQUosRUFBdUIsZ0JBQXZCO0FBQ0c7Ozs7OztrQkFUZ0IsVTs7QUFXckIsV0FBVyxLQUFYLEdBQW1CLEdBQW5CO0FBQ0EsV0FBVyxNQUFYLEdBQW9CLElBQXBCO0FBQ0EsV0FBVyxTQUFYLEdBQXNCLFlBQXRCO0FBQ0EsV0FBVyxVQUFYLEdBQXdCLE1BQXhCO0FBQ0EsV0FBVyxNQUFYLEdBQW9CLEtBQXBCO0FBQ0EsV0FBVyxNQUFYLEdBQW9CLE1BQXBCO0FBQ0EsV0FBVyxVQUFYLEdBQXdCLGdCQUF4QjtBQUNBLFdBQVcsU0FBWCxHQUF1QixFQUF2QjtBQUNBLFdBQVcsS0FBWCxHQUFtQixLQUFuQjtBQUNBLFdBQVcsSUFBWCxHQUFrQixLQUFsQjtBQUNB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OztBQUFBOztBQUVWLGNBQUssRUFBTCxDQUFRLEtBQUssS0FBTCxDQUFXLEtBQW5CLFNBQWdDLE1BQUssV0FBckM7QUFGVTtBQUdiOzs7O3NDQUVhO0FBQ1YsaUJBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0Isa0JBQWhCO0FBQ0g7Ozs7RUFSa0MsS0FBSyxLOztrQkFBdkIsUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cclxuaW1wb3J0IEdhbWVWaWV3IGZyb20gXCIuL3NjcmlwdC9HYW1lVmlld1wiXG5pbXBvcnQgRGlyZWN0b3IgZnJvbSBcIi4vc2NyaXB0L0RpcmVjdG9yXCJcbmltcG9ydCBTdGFydEdhbWUgZnJvbSBcIi4vc2NyaXB0L1N0YXJ0R2FtZVwiXG5pbXBvcnQgQnJpZHMgZnJvbSBcIi4vc2NyaXB0L0JyaWRzXCJcbmltcG9ydCBQZW5jZWwgZnJvbSBcIi4vc2NyaXB0L1BlbmNlbFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlnIHtcclxuICAgIHN0YXRpYyBpbml0KCkge1xyXG4gICAgICAgIC8v5rOo5YaMU2NyaXB05oiW6ICFUnVudGltZeW8leeUqFxyXG4gICAgICAgIGxldCByZWcgPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcblx0XHRyZWcoXCJzY3JpcHQvR2FtZVZpZXcuanNcIixHYW1lVmlldyk7XG5cdFx0cmVnKFwic2NyaXB0L0RpcmVjdG9yLmpzXCIsRGlyZWN0b3IpO1xuXHRcdHJlZyhcInNjcmlwdC9TdGFydEdhbWUuanNcIixTdGFydEdhbWUpO1xuXHRcdHJlZyhcInNjcmlwdC9Ccmlkcy5qc1wiLEJyaWRzKTtcblx0XHRyZWcoXCJzY3JpcHQvUGVuY2VsLmpzXCIsUGVuY2VsKTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLndpZHRoID0gNzUwO1xyXG5HYW1lQ29uZmlnLmhlaWdodCA9IDEzMzQ7XHJcbkdhbWVDb25maWcuc2NhbGVNb2RlID1cImZpeGVkd2lkdGhcIjtcclxuR2FtZUNvbmZpZy5zY3JlZW5Nb2RlID0gXCJub25lXCI7XHJcbkdhbWVDb25maWcuYWxpZ25WID0gXCJ0b3BcIjtcclxuR2FtZUNvbmZpZy5hbGlnbkggPSBcImxlZnRcIjtcclxuR2FtZUNvbmZpZy5zdGFydFNjZW5lID0gXCJHYW1lVmlldy5zY2VuZVwiO1xyXG5HYW1lQ29uZmlnLnNjZW5lUm9vdCA9IFwiXCI7XHJcbkdhbWVDb25maWcuZGVidWcgPSBmYWxzZTtcclxuR2FtZUNvbmZpZy5zdGF0ID0gZmFsc2U7XHJcbkdhbWVDb25maWcucGh5c2ljc0RlYnVnID0gZmFsc2U7XHJcbkdhbWVDb25maWcuZXhwb3J0U2NlbmVUb0pzb24gPSB0cnVlO1xyXG5cclxuR2FtZUNvbmZpZy5pbml0KCk7XHJcbiIsImltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuL0dhbWVDb25maWdcIjtcclxuY2xhc3MgTWFpbiB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHQvL+agueaNrklEReiuvue9ruWIneWni+WMluW8leaTjlx0XHRcclxuXHRcdGlmICh3aW5kb3dbXCJMYXlhM0RcIl0pIExheWEzRC5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0KTtcclxuXHRcdGVsc2UgTGF5YS5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0LCBMYXlhW1wiV2ViR0xcIl0pO1xyXG5cdFx0TGF5YVtcIlBoeXNpY3NcIl0gJiYgTGF5YVtcIlBoeXNpY3NcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhW1wiRGVidWdQYW5lbFwiXSAmJiBMYXlhW1wiRGVidWdQYW5lbFwiXS5lbmFibGUoKTtcclxuXHRcdExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gR2FtZUNvbmZpZy5zY2FsZU1vZGU7XHJcblx0XHRMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBHYW1lQ29uZmlnLnNjcmVlbk1vZGU7XHJcblx0XHRMYXlhLnN0YWdlLmFsaWduViA9IEdhbWVDb25maWcuYWxpZ25WO1xyXG5cdFx0TGF5YS5zdGFnZS5hbGlnbkggPSBHYW1lQ29uZmlnLmFsaWduSDtcclxuXHRcdC8v5YW85a655b6u5L+h5LiN5pSv5oyB5Yqg6L29c2NlbmXlkI7nvIDlnLrmma9cclxuXHRcdExheWEuVVJMLmV4cG9ydFNjZW5lVG9Kc29uID0gR2FtZUNvbmZpZy5leHBvcnRTY2VuZVRvSnNvbjtcclxuXHJcblx0XHQvL+aJk+W8gOiwg+ivlemdouadv++8iOmAmui/h0lEReiuvue9ruiwg+ivleaooeW8j++8jOaIluiAhXVybOWcsOWdgOWinuWKoGRlYnVnPXRydWXlj4LmlbDvvIzlnYflj6/miZPlvIDosIPor5XpnaLmnb/vvIlcclxuXHRcdGlmIChHYW1lQ29uZmlnLmRlYnVnIHx8IExheWEuVXRpbHMuZ2V0UXVlcnlTdHJpbmcoXCJkZWJ1Z1wiKSA9PSBcInRydWVcIikgTGF5YS5lbmFibGVEZWJ1Z1BhbmVsKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgJiYgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0pIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdLmVuYWJsZSgpO1xyXG5cdFx0aWYgKEdhbWVDb25maWcuc3RhdCkgTGF5YS5TdGF0LnNob3coKTtcclxuXHRcdExheWEuYWxlcnRHbG9iYWxFcnJvciA9IHRydWU7XHJcblxyXG5cdFx0Ly/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuXHRcdExheWEuUmVzb3VyY2VWZXJzaW9uLmVuYWJsZShcInZlcnNpb24uanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25WZXJzaW9uTG9hZGVkKSwgTGF5YS5SZXNvdXJjZVZlcnNpb24uRklMRU5BTUVfVkVSU0lPTik7XHJcblx0fVxyXG5cclxuXHRvblZlcnNpb25Mb2FkZWQoKSB7XHJcblx0XHQvL+a/gOa0u+Wkp+Wwj+WbvuaYoOWwhO+8jOWKoOi9veWwj+WbvueahOaXtuWAme+8jOWmguaenOWPkeeOsOWwj+WbvuWcqOWkp+WbvuWQiOmbhumHjOmdou+8jOWImeS8mOWFiOWKoOi9veWkp+WbvuWQiOmbhu+8jOiAjOS4jeaYr+Wwj+WbvlxyXG5cdFx0TGF5YS5BdGxhc0luZm9NYW5hZ2VyLmVuYWJsZShcImZpbGVjb25maWcuanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Db25maWdMb2FkZWQpKTtcclxuXHR9XHJcblxyXG5cdG9uQ29uZmlnTG9hZGVkKCkge1xyXG5cdFx0Ly/liqDovb1JREXmjIflrprnmoTlnLrmma9cclxuXHRcdEdhbWVDb25maWcuc3RhcnRTY2VuZSAmJiBMYXlhLlNjZW5lLm9wZW4oR2FtZUNvbmZpZy5zdGFydFNjZW5lKTtcclxuXHR9XHJcbn1cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IE1haW4oKTtcclxuIiwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCcmlkcyBleHRlbmRzIExheWEuU2NyaXB0e1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIEJyaWRzLmluc3RhbmNlID0gdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIC8v6K6+572u5Yid5aeL6YCf5bqmXHJcbiAgICAgICAgdGhpcy5yaWcgPSB0aGlzLm93bmVyLmdldENvbXBvbmVudChMYXlhLlJpZ2lkQm9keSk7XHJcbiAgICAgICAgdGhpcy5yaWcuc2V0VmVsb2NpdHkoeyB4OiAwLCB5OiAtNSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvblRyaWdnZXJFbnRlcihvdGhlciwgc2VsZiwgY29udGFjdCl7XHJcbiAgICAgICAgY29uc29sZS5sb2cob3RoZXIubGFiZWwpXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IEdhbWVWaWV3IGZyb20gJy4vR2FtZVZpZXcnXHJcbmltcG9ydCBCcmlkcyBmcm9tICcuL0JyaWRzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlyZWN0b3IgZXh0ZW5kcyBMYXlhLlNjcmlwdHtcclxuICAgIC8qKiBAcHJvcCB7bmFtZTogUGVuY2VsVXAsIHRpcDogJ+S4iumTheeslCcsIHR5cGU6IHByZWZhYn0gKi9cclxuICAgIC8qKiBAcHJvcCB7bmFtZTogUGVuY2VsRHdvbiwgdGlwOiAn5LiL6ZOF56yUJywgdHlwZTogcHJlZmFifSAqL1xyXG4gICAgLyoqIEBwcm9wIHtuYW1lOiBCcmlkcywgdGlwOiAn5bCP6bifJywgdHlwZTogcHJlZmFifSAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIERpcmVjdG9yLmluc3RhbmNlID0gdGhpc1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmNvdW50ID0gMVxyXG4gICAgICAgIHRoaXMuQnJpZCA9IG51bGxcclxuICAgICAgICB0aGlzLmdhbWVCb3ggPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKCdnYW1lQm94JylcclxuICAgICAgICB0aGlzLmNyZWF0ZVBlbmNlbCgpXHJcbiAgICAgICAgdGhpcy5jcmVhdGVCcmlkcygpXHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKSB7XHJcbiAgICAgICBHYW1lVmlldy5pbnN0YW5jZS5tb3ZlKClcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKCkge1xyXG4gICAgICAgIGlmICh0aGlzLkJyaWQpIHtcclxuICAgICAgICAgICAgQnJpZHMuaW5zdGFuY2UucmlnLnNldFZlbG9jaXR5KHsgeDogMCwgeTogLTUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVBlbmNlbCgpIHtcclxuICAgICAgICB0aGlzLmNvdW50KytcclxuICAgICAgICBpZiAodGhpcy5jb3VudCA9PT0gMikge1xyXG4gICAgICAgICAgICBsZXQgbWluID0gTGF5YS5zdGFnZS5oZWlnaHQgLyAxOFxyXG4gICAgICAgICAgICBsZXQgbWF4ID0gTGF5YS5zdGFnZS5oZWlnaHQgLyAzXHJcbiAgICAgICAgICAgIGxldCB0b3AgPSBtaW4gKyBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbilcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBQZW5jZWxVcCA9IExheWEuUG9vbC5nZXRJdGVtQnlDcmVhdGVGdW4oJ1BlbmNlbFVwJywgdGhpcy5QZW5jZWxVcC5jcmVhdGUsIHRoaXMuUGVuY2VsVXApXHJcbiAgICAgICAgICAgIFBlbmNlbFVwLnBvcyhMYXlhLnN0YWdlLndpZHRoLCB0b3AgLSBQZW5jZWxVcC5oZWlnaHQpXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUJveC5hZGRDaGlsZChQZW5jZWxVcClcclxuICAgIFxyXG4gICAgICAgICAgICBsZXQgUGVuY2VsRHdvbiA9IExheWEuUG9vbC5nZXRJdGVtQnlDcmVhdGVGdW4oJ1BlbmNlbER3b24nLCB0aGlzLlBlbmNlbER3b24uY3JlYXRlLCB0aGlzLlBlbmNlbER3b24pXHJcbiAgICAgICAgICAgIFBlbmNlbER3b24ucG9zKExheWEuc3RhZ2Uud2lkdGgsIHRvcCArIDQwMClcclxuICAgICAgICAgICAgdGhpcy5nYW1lQm94LmFkZENoaWxkKFBlbmNlbER3b24pXHJcbiAgICBcclxuICAgICAgICAgICAgdGhpcy5jb3VudCA9IDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNyZWF0ZUJyaWRzKCkge1xyXG4gICAgICAgIHRoaXMuQnJpZCA9IExheWEuUG9vbC5nZXRJdGVtQnlDcmVhdGVGdW4oJ0JyaWRzJywgdGhpcy5Ccmlkcy5jcmVhdGUsIHRoaXMuQnJpZHMpXHJcbiAgICAgICAgdGhpcy5CcmlkLnBvcyg1MCwgTGF5YS5zdGFnZS5oZWlnaHQvMiApXHJcbiAgICAgICAgdGhpcy5nYW1lQm94LmFkZENoaWxkKHRoaXMuQnJpZClcclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lVmlldyBleHRlbmRzIExheWEuU2NlbmV7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICBHYW1lVmlldy5pbnN0YW5jZSA9IHRoaXNcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLnNwZWVkID0gNFxyXG4gICAgfVxyXG5cclxuICAgIG1vdmUoKSB7XHJcbiAgICAgICAgaWYgKC10aGlzLmJhY2tncm91bmQueCA+PSA3NTApIHtcclxuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLnggPSAtdGhpcy5zcGVlZFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJhY2tncm91bmQueCAtPSB0aGlzLnNwZWVkXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRGlyZWN0b3IgZnJvbSAnLi9EaXJlY3RvcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlbmNlbFVwIGV4dGVuZHMgTGF5YS5TY3JpcHR7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgLy/orr7nva7liJ3lp4vpgJ/luqZcclxuICAgICAgICB2YXIgcmlnID0gdGhpcy5vd25lci5nZXRDb21wb25lbnQoTGF5YS5SaWdpZEJvZHkpO1xyXG4gICAgICAgIHJpZy5zZXRWZWxvY2l0eSh7IHg6IC00LCB5OiAwIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVXBkYXRlKCkge1xyXG4gICAgICAgbGV0IG93bmVyID0gdGhpcy5vd25lclxyXG4gICAgICAgaWYgKG93bmVyLnggPD0gLW93bmVyLndpZHRoKSB7XHJcbiAgICAgICAgICAgIG93bmVyLnJlbW92ZVNlbGYoKVxyXG4gICAgICAgICAgICBEaXJlY3Rvci5pbnN0YW5jZS5jcmVhdGVQZW5jZWwoKVxyXG4gICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGFydCBleHRlbmRzIExheWEuU2NlbmV7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLm9uUGFnZUNsaWNrKVxyXG4gICAgfVxyXG5cclxuICAgIG9uUGFnZUNsaWNrKCkge1xyXG4gICAgICAgIExheWEuU2NlbmUub3BlbignLi9HYW1lVmlldy5zY2VuZScpXHJcbiAgICB9XHJcbn0iXX0=
