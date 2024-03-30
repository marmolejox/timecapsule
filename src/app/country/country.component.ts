import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Globe from 'globe.gl';
import * as d3 from "d3";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})

export class CountryComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    
    const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);
    const getVal = (feat: any) => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

    this.http
      .get('./assets/datashets/ne_110m_admin_0_countries.geojson')
      .subscribe((countries: any) => {
        const maxVal = Math.max(...countries.features.map(getVal));
        colorScale.domain([0, maxVal]);

        const globeVizElement = document.getElementById('globeViz');

        if (globeVizElement) {

          const world = Globe()
                .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
                .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
                .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
                .lineHoverPrecision(0)
                .polygonsData(countries.features.filter((d: { properties: { ISO_A2: string; }; }) => d.properties.ISO_A2 !== 'AQ'))
                .polygonAltitude(0.06)
                .polygonCapColor(feat => colorScale(getVal(feat)))
                .polygonSideColor(() => 'rgba(0, 100, 0, 0.15)')
                .polygonStrokeColor(() => '#111')
                .polygonsTransitionDuration(300)
                .width(1480)
            (globeVizElement);

          } else {
    
            console.error('Element with ID "globeViz" not found.');
      
          }

      });

  }

}
