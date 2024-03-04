<template>
  <div>
    <HighchartsVue
      :constructor-type="componentType"
      :options="mapConfig"
      @click="handleMapClick"
    />
  </div>
</template>

<script>
import Highcharts from "highcharts";
import drilldown from "highcharts/modules/drilldown";

drilldown(Highcharts);

export default {
  data() {
    return {
      componentType: "mapChart",
      mapConfig: {
        chart: {
          map: "custom/world",
        },
        title: {
          text: "My Map",
        },
        series: [
          {
            type: "map",
            name: "Countries",
            allowPointSelect: true,
            cursor: "pointer",
            states: {
              select: {
                color: "#a4edba",
                borderColor: "black",
                dashStyle: "shortdot",
              },
              hover: {
                color: "#bddae7",
              },
            },
            events: {
              click: this.handleRegionClick,
            },
            data: [
              // Add your map data here
              {
                name: "Africa",
                value: 100,
                // Add drilldown data here
                drilldown: "africa",
              },
              {
                name: "Asia",
                value: 200,
                drilldown: "asia",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    handleRegionClick(e) {
      const region = e.point.name;
      const mapName = `custom/${region.toLowerCase()}`;

      // Dynamically load the clicked region's map
      import(`@highcharts/map-collection/${mapName}.geo.json`).then(
        (mapData) => {
          // Set up the new map config
          const newMapConfig = {
            chart: {
              map: mapData,
            },
            title: {
              text: `My Map - ${region}`,
            },
            series: [
              // Add series specific to the clicked region
              {
                type: "map",
                name: "Countries",
                allowPointSelect: true,
                cursor: "pointer",
                states: {
                  select: {
                    color: "#a4edba",
                    borderColor: "black",
                    dashStyle: "shortdot",
                  },
                  hover: {
                    color: "#bddae7",
                  },
                },
                events: {
                  click: this.handleRegionClick,
                },
                data: [
                  // Add your region-specific map data here
                ],
              },
            ],
          };

          // Set the new map config to update the chart
          this.mapConfig = newMapConfig;
        }
      );
    },
  },
};
</script>
