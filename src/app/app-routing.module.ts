import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { GlobesComponent } from './globes/globes.component';
import { PopulationComponent } from './population/population.component';
import { CountryComponent } from './country/country.component';
import { EbolaComponent } from './ebola/ebola.component';
import { HeatmapComponent } from './heatmap/heatmap.component';

const routes: Routes = [
  {path: '', component:LandingComponent},
  {path: 'globes', component:GlobesComponent},
  {path: 'population', component:PopulationComponent},
  {path: 'country', component:CountryComponent},
  {path: 'ebola', component:EbolaComponent},
  {path: 'heatmap', component:HeatmapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
