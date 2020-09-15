import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OwnerPage } from './owner.page';

import { ComponentsModule } from '../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: OwnerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    OwnerPage]
})
export class OwnerPageModule {}
