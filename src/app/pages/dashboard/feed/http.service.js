var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//ｰｰｰｰｰｰｰ-------------------
// 通信処理
//ｰｰｰｰｰｰｰ-------------------
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var HttpService = (function () {
    function HttpService(jsonp) {
        this.jsonp = jsonp;
        //Web API URL
        // WEB_API_URL: string = "https://connpass.com/api/v1/event/";
        // WEB_API_URL:string = "http://ec2-52-88-160-219.us-west-2.compute.amazonaws.com/eventSearch/src/php/api.php";
        this.WEB_API_URL = "http://localhost:8888/ng2-admin/src/server/api.php";
        this.CALLBACK = "JSONP_CALLBACK";
    }
    // APIからイベント情報取得
    HttpService.prototype.getEventData = function (model, page) {
        //接続設定
        var option = this.setParam(model, page);
        //データ取得
        return this.reqData(option);
    };
    //通信設定値作成
    HttpService.prototype.setParam = function (model, page) {
        console.log(model);
        //Urlパラメータオブジェクト作成
        var param = new http_1.URLSearchParams();
        param.set("keyword", model.name);
        if (model.date != null) {
            var date = model.date.formatted.replace(/-/, '');
            var date2 = date.replace(/-/, '');
            param.set("ymd", date2);
        }
        else {
            param.set("ymd", '');
        }
        param.set("place", model.place);
        param.set("format", "jsonp");
        param.set("start", page);
        //param.set("callback", this.CALLBACK);
        param.set('callback', '__ng_jsonp__.__req' + model.requestCount + '.finished');
        //通信設定オブジェクト作成
        var options = {
            method: "get",
            url: this.WEB_API_URL,
            search: param
        };
        return new http_1.RequestOptions(options);
    };
    //HTTPリクエストとレスポンス処理
    HttpService.prototype.reqData = function (config) {
        return this.jsonp.request(config.url, config)
            .map(function (response) {
            var eventData;
            var obj = response.json();
            //Web APIリクエスト成功
            var dataObj = obj;
            eventData = {
                data: dataObj
            };
            // }
            return eventData;
        });
    };
    ;
    HttpService = __decorate([
        core_1.Injectable()
    ], HttpService);
    return HttpService;
})();
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map