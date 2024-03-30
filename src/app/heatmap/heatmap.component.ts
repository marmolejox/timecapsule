import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Globe from 'globe.gl';
import * as d3 from "d3";

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {

  ngOnInit(): void {

    const N = 300;
    const gData = [...Array(N).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 160,
      lng: (Math.random() - 0.5) * 360,
      weight: Math.random()
    }));

    const globeVizElement = document.getElementById('globeViz');

        if (globeVizElement) {

          const world = Globe()
                .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
                .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
                .heatmapsData([gData])
                .heatmapPointLat('lat')
                .heatmapPointLng('lng')
                .heatmapPointWeight('weight')
                .heatmapTopAltitude(0.7)
                .heatmapsTransitionDuration(3000)
                .enablePointerInteraction(false)
                .width(1480)
            (globeVizElement);
    
        } else {
    
          console.error('Element with ID "globeViz" not found.');
    
        }
    
  }

}
