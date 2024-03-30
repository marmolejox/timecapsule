import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Globe from 'globe.gl';
import * as d3 from "d3";

@Component({
  selector: 'app-ebola',
  templateUrl: './ebola.component.html',
  styleUrls: ['./ebola.component.scss']
})
export class EbolaComponent implements OnInit {

  ngOnInit(): void {
    
    const N_PATHS = 10;
    const MAX_POINTS_PER_LINE = 10000;
    const MAX_STEP_DEG = 1;
    const MAX_STEP_ALT = 0.015;
    const gData = [...Array(N_PATHS).keys()].map(() => {
    let lat = (Math.random() - 0.5) * 90;
    let lng = (Math.random() - 0.5) * 360;
    let alt = 0;

    return [[lat, lng, alt], ...[...Array(Math.round(Math.random() * MAX_POINTS_PER_LINE)).keys()].map(() => {
      lat += (Math.random() * 2 - 1) * MAX_STEP_DEG;
      lng += (Math.random() * 2 - 1) * MAX_STEP_DEG;
      alt += (Math.random() * 2 - 1) * MAX_STEP_ALT;
      alt = Math.max(0, alt);

        return [lat, lng, alt];
      })];
    });

    const globeVizElement = document.getElementById('globeViz');

    if (globeVizElement) {

      const world = Globe()
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
            .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
            .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
            .pathsData(gData)
      .pathColor(() => ['rgba(0,0,255,0.6)', 'rgba(255,0,0,0.6)'])
      .pathDashLength(0.01)
      .pathDashGap(0.004)
      .pathDashAnimateTime(100000)
            .width(1480)
        (globeVizElement);

        setTimeout(() => {
          world
            .pathPointAlt(pnt => pnt[0.7]) // set altitude accessor
            .pathTransitionDuration(4000)
        }, 6000);

    } else {

      console.error('Element with ID "globeViz" not found.');

    }

  }

}
