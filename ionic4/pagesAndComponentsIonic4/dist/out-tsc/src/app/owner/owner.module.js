import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OwnerPage } from './owner.page';
var routes = [
    {
        path: '',
        component: OwnerPage
    }
];
var OwnerPageModule = /** @class */ (function () {
    function OwnerPageModule() {
    }
    OwnerPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [OwnerPage]
        })
    ], OwnerPageModule);
    return OwnerPageModule;
}());
export { OwnerPageModule };
//# sourceMappingURL=owner.module.js.map