<template>
    <div id="map_canvas">
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"

import * as ol from "ol"
import * as layer from "ol/layer"
import OSM from "ol/source/OSM"

import { get as getProjection } from "ol/proj"
import { register } from "ol/proj/proj4"
import proj4 from "proj4"

import PointerInteraction from "ol/interaction/Pointer"

proj4.defs("EPSG:2154", "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs")
register(proj4)

class MyInteraction extends PointerInteraction {
    protected handleDownEvent(mapBrowserEvent: ol.MapBrowserPointerEvent): boolean {
        // tslint:disable-next-line:no-console
        console.log("mouse down")
        return true
    }

    protected handleDragEvent(mapBrowserEvent: ol.MapBrowserPointerEvent): boolean {
        // tslint:disable-next-line:no-console
        console.log("mouse drag")
        return true
    }

    protected handleUpEvent(mapBrowserEvent: ol.MapBrowserPointerEvent): boolean {
        // tslint:disable-next-line:no-console
        console.log("mouse up")
        return true
    }
}

// tslint:disable-next-line:max-classes-per-file
@Component
export default class App extends Vue {
    private map!: ol.Map

    public mounted() {
        const tileView = new ol.View({ center: [645059.1353, 6866197.455],
                                       projection: "EPSG:2154",
                                       zoom: 15 })

        const tileLayer = new layer.Tile({
            source: new OSM({ url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" }),
        })

        const map = new ol.Map({
            controls: [],
            interactions: [ new MyInteraction() ],
            layers: [
                tileLayer,
            ],
            target: "map_canvas",
            view: tileView,
        })

        this.map = map
    }
}
</script>


<style scoped>

#map_canvas {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
}
</style>

