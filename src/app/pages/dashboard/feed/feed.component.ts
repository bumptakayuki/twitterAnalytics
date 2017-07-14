import {Component} from '@angular/core';

import {FeedService} from './feed.service';

import 'style-loader!./feed.scss';


import {OnInit} from '@angular/core';
import {HttpService} from "./http.service";

import {ChartistJsService} from '../../charts/components/chartistJs/chartistJs.service';

//import {DetailComponent} from './detail.component';
import {ViewContainerRef, ViewChild} from '@angular/core';
import {HostListener} from '@angular/core';
import {Hero}    from './hero';
import {empty} from "rxjs/Observer";
import {isEmpty} from "rxjs/operator/isEmpty";


@Component({
  selector: 'feed',
  templateUrl: './feed.html',
  styleUrls: ['./feed.css']
})
export class Feed {

  public feed: Array<Object>;


  expandMessage(message) {
    message.expanded = !message.expanded;
  }

  //
  // constructor(private _feedService:FeedService) {
  // }
  //
  // ngOnInit() {
  //   this._loadFeed();
  // }
  //
  // expandMessage (message){
  //   message.expanded = !message.expanded;
  // }
  //
  // private _loadFeed() {
  //   this.feed = this._feedService.getData();
  // }

  bookmarks;

  //選択したイベント情報
  selectedData;

  // イベント情報
  events;

  simpleBarData={};

  //
  tweetData;

  chartData = {
    labelsPieData: {
      labels: [],
      series: []
    },
    labelsPieOptions: {}
  };

  lineChartData={};

  //PCとモバイルの判定
  isMobile = false;

  //モバイル判定画面幅
  MOBILE_SCREEN_WIDTH = 768;

  // 開閉制御
  isCollapsed = false;

  myModel = '';

  isRunning = false;

  delay = true;

  results_returned;

  results_start;


  // デフォルト値
  places = ['東京都'];

  // デフォルト値
  model = new Hero(18, 'test', this.places[0], null, false, 0, 'test');

  public existsFlg = true;

  submitted = false;

  // onSubmit() { this.submitted = true; }

  newHero() {
    this.model = new Hero(42, '', '', null, false, 0);
  }

  //modal 表示用
  viewContainerRef;

  /**
   * コンストラクタ
   *
   * @param httpService
   * @param viewContainerRef
   */
  public constructor(private httpService: HttpService, private _chartistJsService: ChartistJsService, viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  //
  // private _loadFeed() {
  //   this.feed = this.httpService.loadFeed();
  // }

  /**
   * アプリ起動時の処理
   */
  public ngOnInit() {

    // 保存したブックマークの取得
    this.initBookmarks();

    // PCとモバイルデバイスの判定
    this.onScreenResize();

    // this._loadFeed();

    // this.chartData = this._chartistJsService.getAll();

  }


  /**
   * イベント検索実行
   *
   * @param index
   */
  onSubmit(page) {

    this.getEvent(this.model, page);
  }

  /**
   * イベント情報の取得
   */
  private getEvent(model, page) {

    this.selectedData = null;
    this.events = null;
    this.existsFlg = true;

    this.model.spinner = true;

    this.httpService.getEventData(model, page).subscribe((result) => {
        this.setEvent(result);
        model.requestCount++;

      },
      (err) => alert("通信エラー\n" + err),
      () => {
        this.model.spinner = false;
      });

  }

  /**
   * イベント情報を設定する
   *
   * @param result
   * @param i
   */
  private setEvent(result) {

    //Web APIデータ取得エラー発生時
    if (result.error) {
      alert("Web APIエラー\n" + result.message);
      return;
    }

    let testarray = [];

    for (var key in result.data) {
      var data = result.data[key];
      testarray.push(data);

      // keyやdataを使った処理
    }
    // testarray.reverse();

    console.log(testarray);

    this.tweetData = testarray;
    this.results_returned = result.data.results_returned;
    this.results_start = result.data.results_start;

    if (this.results_returned != 0) {
      this.existsFlg = true;
    } else {
      this.existsFlg = false;
    }

    // for (var key in result.data.wordList) {
    //   var data = result.wordList[key];
    // }

    let labels=[];
    let series=[];

    for(var num in result.data.wordList) {
      let wordObj = result.data.wordList[num];
      labels.push(wordObj.word);
      series.push(wordObj.count);
    }
    console.log(labels);
    console.log(series);


    this.chartData = {
      labelsPieData: {
        labels: labels,
        series:series
      },
      labelsPieOptions: {
        // fullWidth: true,
        height: '300px',
        weight: '300px',
        labelDirection: 'explode',
        // labelInterpolationFnc: function (value) {
        //   return value[0];
        // }
      }
    }
    let dateCount=[];
    for(var num in result.data.timeZoneList) {
      let count = result.data.timeZoneList[num];
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
  }


  /**
   * 保存したブックマーク情報の読み取り
   */
  private initBookmarks() {
    let storeData = localStorage.getItem("bookmarks");
    if (storeData) {
      this.bookmarks = JSON.parse(storeData);
    } else {
      this.bookmarks = {};
    }
  }

  /**
   * ブックマークボタンのクリック時
   *
   * @param tourID
   * @param index
   */
  private onBookmarkClick(tourID, index) {
    //登録が無い場合はブックマーク情報に追加
    if (!this.isMarked(tourID)) {
      //登録件数の確認
      if (Object.keys(this.bookmarks).length === 10) {
        return alert("Bookmarkは最大10件です");
      }
      //登録
      this.bookmarks[tourID] = this.selectedData[index];
    } else {
      //登録済みの場合はブックマーク情報から削除
      delete this.bookmarks[tourID];
    }
    //更新されたブックマーク情報の保存
    localStorage.setItem(
      "bookmarks", JSON.stringify(this.bookmarks));
  }

  /**
   * ブックマーク登録済み確認
   *
   * @param tourID
   */
  private isMarked(tourID) {
    return this.bookmarks[tourID];
  }


  /**
   * resizeイベント
   */
  @HostListener('window:resize')
  onScreenResize() {
    this.isMobile = (innerWidth < this.MOBILE_SCREEN_WIDTH);
  }

  public itemsPerPage: number = 3;
  public currentPage: number = 1;
  private _maxPage: number;

  range() {
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

  setPage(n) {
    this.currentPage = n;
    this.onSubmit(this.currentPage);
  };

  prevPage() {
    if (this.currentPage > 1) {
      --this.currentPage;
    }
    this.onSubmit(this.currentPage);
  };

  nextPage() {
    if (this.currentPage < this._maxPage) {
      ++this.currentPage;
    }
    this.onSubmit(this.currentPage);
  };

  prevPageDisabled() {
    return this.currentPage === 1 ? "disabled" : "";
  };

  nextPageDisabled() {
    return this.currentPage === this._maxPage ? "disabled" : "";
  };

  getResponsive(padding, offset) {
    return this._chartistJsService.getResponsive(padding, offset);
  }
}
