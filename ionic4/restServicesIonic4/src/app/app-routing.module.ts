import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'albums', pathMatch: 'full' },
  { path: 'albums', loadChildren: './pages/albums/albums.module#AlbumsPageModule' },
  { path: 'album/:id', loadChildren: './pages/album/album.module#AlbumPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
