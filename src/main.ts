import Vue from "vue"
import App from "./App.vue"

import "ol/ol.css"

// configuration & run app
Vue.config.productionTip = false

new Vue({
    render: (h) => h(App),
}).$mount("#app")
