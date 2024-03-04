import { createApp } from "vue";
import App from "./App.vue";

import Highcharts from "highcharts";
import MapsModule from "highcharts/modules/map";
import HighchartsVue from "highcharts-vue";

MapsModule(Highcharts);

const app = createApp(App);

app.use(HighchartsVue);

app.mount("#app");
