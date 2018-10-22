"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var ReactDOM = require("react-dom");
var Button_1 = require("@material-ui/core/Button");
var ReduxButton = /** @class */ (function (_super) {
    __extends(ReduxButton, _super);
    // store: Store<any, any>
    function ReduxButton(props, state) {
        var _this = _super.call(this, props) || this;
        _this.color = "primary";
        _this.text = "button text";
        _this.class_names = "button";
        _this.class_name = "button";
        _this.container = null;
        if (state.color !== undefined) {
            _this.color = state.color;
        }
        if (props.container !== undefined) {
            _this.container = props.container;
        }
        if (typeof (state.class_names) !== "string") {
            _this.class_name = state.class_names.join(" ");
        }
        else {
            _this.class_name = state.class_names;
        }
        return _this;
    }
    ReduxButton.prototype.show = function () {
        ReactDOM.render(React.createElement(ReduxButton, { container: this.container }), this.container);
    };
    ReduxButton.prototype.render = function () {
        return (
        // <Provider store={this.store}>
        React.createElement(Button_1["default"], { variant: "contained", color: this.color, className: this.class_name }, this.text)
        // </ Provider>
        );
    };
    return ReduxButton;
}(React.Component));
exports.ReduxButton = ReduxButton;
var StartBtn = /** @class */ (function (_super) {
    __extends(StartBtn, _super);
    function StartBtn(props, state) {
        var _this = _super.call(this, props, state) || this;
        _this.text = "Start";
        return _this;
    }
    return StartBtn;
}(ReduxButton));
exports.StartBtn = StartBtn;
var StopBtn = /** @class */ (function (_super) {
    __extends(StopBtn, _super);
    function StopBtn(props, state) {
        var _this = _super.call(this, props, state) || this;
        _this.text = "Stop";
        _this.color = "secondary";
        return _this;
    }
    return StopBtn;
}(ReduxButton));
exports.StopBtn = StopBtn;
