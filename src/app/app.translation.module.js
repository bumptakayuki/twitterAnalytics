var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var core_3 = require('@ngx-translate/core');
function createTranslateLoader(http) {
    return new http_loader_1.TranslateHttpLoader(http, './assets/i18n/US/', '.json');
}
exports.createTranslateLoader = createTranslateLoader;
var translationOptions = {
    loader: {
        provide: core_2.TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [http_1.Http]
    }
};
var AppTranslationModule = (function () {
    function AppTranslationModule(translate) {
        this.translate = translate;
        translate.addLangs(["en"]);
        translate.setDefaultLang('en');
        translate.use('en');
    }
    AppTranslationModule = __decorate([
        core_1.NgModule({
            imports: [core_2.TranslateModule.forRoot(translationOptions)],
            exports: [core_2.TranslateModule],
            providers: [core_3.TranslateService]
        })
    ], AppTranslationModule);
    return AppTranslationModule;
})();
exports.AppTranslationModule = AppTranslationModule;
//# sourceMappingURL=app.translation.module.js.map