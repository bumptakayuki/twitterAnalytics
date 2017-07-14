var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('style-loader!./feed.scss');
var core_2 = require('@angular/core');
var hero_1 = require('./hero');
var Feed = (function () {
    /**
     * コンストラクタ
     *
     * @param httpService
     * @param viewContainerRef
     */
    function Feed(httpService, _chartistJsService, viewContainerRef) {
        this.httpService = httpService;
        this._chartistJsService = _chartistJsService;
        this.simpleBarData = {};
        this.chartData = {
            labelsPieData: {
                labels: [],
                series: []
            },
            labelsPieOptions: {}
        };
        this.lineChartData = {};
        //PCとモバイルの判定
        this.isMobile = false;
        //モバイル判定画面幅
        this.MOBILE_SCREEN_WIDTH = 768;
        // 開閉制御
        this.isCollapsed = false;
        this.myModel = '';
        this.isRunning = false;
        this.delay = true;
        // デフォルト値
        this.places = ['東京都'];
        // デフォルト値
        this.model = new hero_1.Hero(18, 'test', this.places[0], null, false, 0, 'test');
        this.existsFlg = true;
        this.submitted = false;
        this.itemsPerPage = 3;
        this.currentPage = 1;
        this.viewContainerRef = viewContainerRef;
    }
    Feed.prototype.expandMessage = function (message) {
        message.expanded = !message.expanded;
    };
    // onSubmit() { this.submitted = true; }
    Feed.prototype.newHero = function () {
        this.model = new hero_1.Hero(42, '', '', null, false, 0);
    };
    //
    // private _loadFeed() {
    //   this.feed = this.httpService.loadFeed();
    // }
    /**
     * アプリ起動時の処理
     */
    Feed.prototype.ngOnInit = function () {
        // 保存したブックマークの取得
        this.initBookmarks();
        // PCとモバイルデバイスの判定
        this.onScreenResize();
        // this._loadFeed();
        // this.chartData = this._chartistJsService.getAll();
    };
    /**
     * イベント検索実行
     *
     * @param index
     */
    Feed.prototype.onSubmit = function (page) {
        this.getEvent(this.model, page);
    };
    /**
     * イベント情報の取得
     */
    Feed.prototype.getEvent = function (model, page) {
        var _this = this;
        this.selectedData = null;
        this.events = null;
        this.existsFlg = true;
        this.model.spinner = true;
        this.httpService.getEventData(model, page).subscribe(function (result) {
            _this.setEvent(result);
            model.requestCount++;
        }, function (err) { return alert("通信エラー\n" + err); }, function () {
            _this.model.spinner = false;
        });
    };
    /**
     * イベント情報を設定する
     *
     * @param result
     * @param i
     */
    Feed.prototype.setEvent = function (result) {
        //Web APIデータ取得エラー発生時
        if (result.error) {
            alert("Web APIエラー\n" + result.message);
            return;
        }
        var testarray = [];
        for (var key in result.data) {
            var data = result.data[key];
            testarray.push(data);
        }
        // testarray.reverse();
        console.log(testarray);
        this.tweetData = testarray;
        this.results_returned = result.data.results_returned;
        this.results_start = result.data.results_start;
        if (this.results_returned != 0) {
            this.existsFlg = true;
        }
        else {
            this.existsFlg = false;
        }
        // for (var key in result.data.wordList) {
        //   var data = result.wordList[key];
        // }
        var labels = [];
        var series = [];
        for (var num in result.data.wordList) {
            var wordObj = result.data.wordList[num];
            labels.push(wordObj.word);
            series.push(wordObj.count);
        }
        console.log(labels);
        console.log(series);
        this.chartData = {
            labelsPieData: {
                labels: labels,
                series: series
            },
            labelsPieOptions: {
                // fullWidth: true,
                height: '300px',
                weight: '300px',
                labelDirection: 'explode'
            }
        };
        var dateCount = [];
        for (var num in result.data.timeZoneList) {
            var count = result.data.timeZoneList[num];
            dateCount.push(count);
        }
        this.lineChartData = {
            areaLineData: {
                labels: ['1', '2', '3', '4', '5', '6',
                    '7', '8', '9', '10', '11', '12',
                    '13', '14', '15', '16', '17', '18',
                    '19', '20', '21', '22', '23', '24'],
                series: [
                    //[5, 9, 7, 8, 5, 3, 5, 4, 3, 13, 4, 3,5, 9, 7, 8, 5, 3, 5, 4, 3, 5, 4, 3]
                    dateCount
                ]
            },
            areaLineOptions: {
                fullWidth: true,
                height: '300px',
                low: 0,
                showArea: true
            }
        };
        this.simpleBarData = {
            simpleBarData: {
                labels: ['1月', '2月', '3月',
                    '4月', '5月', '6月',
                    '7月', '8月', '9月', '10月',
                    '11月', '12月'],
                series: [
                    [],
                    [13, 22, 49, 22, 4, 6, 24, 46, 57, 48, 22, 4]
                ]
            },
            simpleBarOptions: {
                fullWidth: true,
                height: '300px'
            }
        };
        this.model.spinner = false;
        $('.fading-circle-spinner').css('display', 'none');
        //Web APIデータ取得成功時
        // this.areas[i].data = result;
    };
    /**
     * 保存したブックマーク情報の読み取り
     */
    Feed.prototype.initBookmarks = function () {
        var storeData = localStorage.getItem("bookmarks");
        if (storeData) {
            this.bookmarks = JSON.parse(storeData);
        }
        else {
            this.bookmarks = {};
        }
    };
    /**
     * ブックマークボタンのクリック時
     *
     * @param tourID
     * @param index
     */
    Feed.prototype.onBookmarkClick = function (tourID, index) {
        //登録が無い場合はブックマーク情報に追加
        if (!this.isMarked(tourID)) {
            //登録件数の確認
            if (Object.keys(this.bookmarks).length === 10) {
                return alert("Bookmarkは最大10件です");
            }
            //登録
            this.bookmarks[tourID] = this.selectedData[index];
        }
        else {
            //登録済みの場合はブックマーク情報から削除
            delete this.bookmarks[tourID];
        }
        //更新されたブックマーク情報の保存
        localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
    };
    /**
     * ブックマーク登録済み確認
     *
     * @param tourID
     */
    Feed.prototype.isMarked = function (tourID) {
        return this.bookmarks[tourID];
    };
    /**
     * resizeイベント
     */
    Feed.prototype.onScreenResize = function () {
        this.isMobile = (innerWidth < this.MOBILE_SCREEN_WIDTH);
    };
    Feed.prototype.range = function () {
        if (this.events == null) {
            return;
        }
        //this._maxPage = Math.ceil(this.events.length/this.itemsPerPage);
        var ret = [];
        for (var i = 1; i <= 5; i++) {
            ret.push(i);
        }
        return ret;
    };
    ;
    Feed.prototype.setPage = function (n) {
        this.currentPage = n;
        this.onSubmit(this.currentPage);
    };
    ;
    Feed.prototype.prevPage = function () {
        if (this.currentPage > 1) {
            --this.currentPage;
        }
        this.onSubmit(this.currentPage);
    };
    ;
    Feed.prototype.nextPage = function () {
        if (this.currentPage < this._maxPage) {
            ++this.currentPage;
        }
        this.onSubmit(this.currentPage);
    };
    ;
    Feed.prototype.prevPageDisabled = function () {
        return this.currentPage === 1 ? "disabled" : "";
    };
    ;
    Feed.prototype.nextPageDisabled = function () {
        return this.currentPage === this._maxPage ? "disabled" : "";
    };
    ;
    Feed.prototype.getResponsive = function (padding, offset) {
        return this._chartistJsService.getResponsive(padding, offset);
    };
    __decorate([
        core_2.HostListener('window:resize')
    ], Feed.prototype, "onScreenResize");
    Feed = __decorate([
        core_1.Component({
            selector: 'feed',
            templateUrl: './feed.html',
            styleUrls: ['./feed.css']
        })
    ], Feed);
    return Feed;
})();
exports.Feed = Feed;
//# sourceMappingURL=feed.component.js.map