import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PetPage } from './pet.page';
var routes = [
    {
        path: '',
        component: PetPage
    }
];
var PetPageModule = /** @class */ (function () {
    function PetPageModule() {
    }
    PetPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PetPage]
        })
    ], PetPageModule);
    return PetPageModule;
}());
export { PetPageModule };
//# sourceMappingURL=pet.module.js.map