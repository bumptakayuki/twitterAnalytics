var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var pages_menu_1 = require('./pages.menu');
var Pages = (function () {
    function Pages(_menuService) {
        this._menuService = _menuService;
    }
    Pages.prototype.ngOnInit = function () {
        this._menuService.updateMenuByRoutes(pages_menu_1.PAGES_MENU);
    };
    Pages = __decorate([
        core_1.Component({
            selector: 'pages',
            template: "\n    <ba-sidebar></ba-sidebar>\n    <ba-page-top></ba-page-top>\n    <div class=\"al-main\">\n      <div class=\"al-content\">\n        <ba-content-top></ba-content-top>\n        <router-outlet></router-outlet>\n      </div>\n    </div>\n    <footer class=\"al-footer clearfix\">\n      <div class=\"al-footer-right\" translate>{{'general.created_with'}} <i class=\"ion-heart\"></i></div>\n      <div class=\"al-footer-main clearfix\">\n        <div class=\"al-copy\">&copy; <a href=\"http://akveo.com\" translate>{{'general.akveo'}}</a> 2016</div>\n        <ul class=\"al-share clearfix\">\n          <li><i class=\"socicon socicon-facebook\"></i></li>\n          <li><i class=\"socicon socicon-twitter\"></i></li>\n          <li><i class=\"socicon socicon-google\"></i></li>\n          <li><i class=\"socicon socicon-github\"></i></li>\n        </ul>\n      </div>\n    </footer>\n    <ba-back-top position=\"200\"></ba-back-top>\n    "
        })
    ], Pages);
    return Pages;
})();
exports.Pages = Pages;
//# sourceMappingURL=pages.component.js.map