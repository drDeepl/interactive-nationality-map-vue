<template>
  <PhPlayCircle :size="32" color="hotpink" @click="onClickPlay" />
  <Suspense>
    <highcharts
      :constructor-type="'mapChart'"
      :options="chartOptions"
      :callback="chartCallback"
    />
  </Suspense>
</template>

<script setup>
import { ref } from "vue";
import { MAP_DATA, MAP_COLORS } from "@/utils/Constants";
import ApiUserAudio from "@/api/api.user-audio";
import { PhPlayCircle } from "@phosphor-icons/vue";

// const data = prepareData(topology);
const topology = await fetch("/geo/russian_regions.json").then((response) =>
  response.json()
);

const onClickPlay = async () => {
  const response = await ApiUserAudio.getById(27);
  console.warn(response.data);
};

const chartCallback = (chart) => {
  console.error(chart);
};

const onClickSeries = async (event) => {
  //   const idSelectedArea = event.point.index;
  // console.warn(event);
  // const hcKey = event.point.properties["hc-key"];
  // console.log(chartOptions.value);
  // const selectedSerie = chartOptions.value.series[0].data.filter(
  //   (serie) => serie[0] === hcKey
  // );
  // console.error(selectedSerie[0]);
  console.log(event);
};

const chartOptions = ref({
  chart: {
    map: topology,
    plotBackgroundColor: MAP_COLORS.chart.plotBackgroundColor,
    plotBackgroundImage: MAP_COLORS.chart.plotBackgroundImage,
    height: (9 / 16) * 100 + "%",
  },
  colorAxis: null,
  mapNavigation: {
    enabled: true,
  },
  series: [
    {
      name: "",
      color: MAP_COLORS.series.color,
      borderColor: MAP_COLORS.series.borderColor,
      cursor: "pointer",
      events: {
        click: onClickSeries,
      },
      states: {
        hover: {
          color: MAP_COLORS.series.states.hover.color,
        },
      },
      //   dataLabels: {
      //     enabled: true,
      //     format: "{point.name}",
      //   },
      allAreas: false,
      data: MAP_DATA,
    },
  ],
});
</script>
