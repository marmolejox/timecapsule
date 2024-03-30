import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Globe from 'globe.gl';
import * as d3 from "d3";

@Component({
  selector: 'app-population',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.scss']
})
export class PopulationComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd)
            .domain([0, 1e7]);

    this.http.get('assets/datashets/world_population.csv', { responseType: 'text' })
      .subscribe(csv => {
        const data = d3.csvParse(csv, ({ lat, lng, pop }) => ({ lat: +lat, lng: +lng, pop: +pop }));
        console.log(data);

        const globeVizElement = document.getElementById('globeViz');

        if (globeVizElement) {

          const world = Globe()
                .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
                .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
                .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
                .hexBinPointWeight('pop')
                .hexAltitude(d => d.sumWeight * 6e-8)
                .hexBinResolution(4)
                .hexTopColor(d => weightColor(d.sumWeight))
                .hexSideColor(d => weightColor(d.sumWeight))
                .hexBinMerge(true)
                .enablePointerInteraction(false)
                .hexBinPointsData(data)
                .width(1480)
            (globeVizElement);
    
        } else {
    
          console.error('Element with ID "globeViz" not found.');
    
        }

      });

  }

}
