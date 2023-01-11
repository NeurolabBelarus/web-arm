<template>
  <div>
    <svg :id="'svg'+ this.p_prop.pict_id" width="500" height="500" :viewBox="'-270 -200 ' + (img_width+270) + ' ' + (img_height+200)" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" style="border:2px solid #36bec2">
      <defs>
        <pattern id="p10" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.5"/>
        </pattern>
        <pattern id="p100" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#p10)"/>
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="4000" height="4100" fill="url(#p100)"/>
<!-- 
      <circle cx="2000" cy="2050" r="50" fill="black" /> -->

      <!-- Начало   -->
      <text x="-40" y="-40">0,0</text>
      <!-- Вертикальный блок цифр --> 
      <text x="-210" y="500">500</text> 
      <text x="-250" y="1000">1000</text>
      <text x="-250" y="1500">1500</text>
      <text x="-250" y="2000">2000</text>
      <text x="-250" y="2500">2500</text>
      <text x="-250" y="3000">3000</text>
      <text x="-250" y="3500">3500</text>
      <text x="-250" y="4000">4000</text>      

      <!-- Горизонтальный блок --> 
      <text x="500" y="-50">500</text>     
      <text x="1000" y="-50">1000</text>
      <text x="1500" y="-50">1500</text>
      <text x="2000" y="-50">2000</text>
      <text x="2500" y="-50">2500</text>
      <text x="3000" y="-50">3000</text>
      <text x="3500" y="-50">3500</text>
      <!-- Ракета      -->
      <g transform="scale(1)" fill="purple">
        <!-- <path  d="m308.167 241.52c0-28.766-23.403-52.169-52.17-52.169s-52.17 23.403-52.17 52.169c0 28.767 23.403 52.17 52.17 52.17s52.17-23.404 52.17-52.17zm-52.169 22.169c-12.225 0-22.17-9.945-22.17-22.17 0-12.224 9.945-22.169 22.17-22.169s22.17 9.945 22.17 22.169c-.001 12.225-9.946 22.17-22.17 22.17z"/>
        <path   d="m425.684 424.352v-132.322l-51.65-32.948c.615-14.332.261-28.762-1.117-43.191-7.162-74.973-41.384-144.771-96.362-196.535l-20.557-19.356-20.558 19.356c-54.978 51.765-89.2 121.563-96.362 196.535-1.378 14.429-1.732 28.859-1.117 43.191l-51.65 32.948v132.321l90.003-28.282c3.744 6.784 7.752 13.436 12.017 19.945v62.315h30v-48.333h22.667v23.252h30v-23.252h22.667v48.333h30v-62.315c4.265-6.508 8.273-13.161 12.017-19.945zm-30-115.874v75.001l-46.66-14.662c10.468-24.35 17.778-49.975 21.762-76.222zm-139.694-267.28c27.301 25.706 48.392 55.971 63.081 88.684h-126.153c14.687-32.713 35.775-62.979 63.072-88.684zm-139.679 342.281v-75.001l24.898-15.883c3.983 26.247 11.293 51.872 21.762 76.222zm124.687-10.983v27.499h-27.316c-47.563-72.299-57.394-161.126-32.242-240.114h149.112c25.156 78.987 15.325 167.815-32.238 240.114h-27.316v-27.499z"/>
        <path  d="m240.998 483.495h30v28.5h-30z"/>  -->
        <image id="svg_image" :href="img"/>
      </g>
      <g id="g_circle" class="">
        <circle v-if="!edit.editing" :cx="data.x_coord" :cy="data.y_coord" :r="data.radius" fill="transparent" stroke="red" stroke-width="10" />
        <circle id="circle2" v-else :cx="edit.x_coord_upd" :cy="edit.y_coord_upd" :r="edit.radius_upd" fill="transparent" stroke="red" stroke-width="10" />
      </g>
      <!-- Вертикальные линии -->
      <line x1="-10" y1="500" x2="40" y2="500" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="-10" y1="1000" x2="40" y2="1000" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="-10" y1="1500" x2="40" y2="1500" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="-10" y1="2000" x2="40" y2="2000" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="-10" y1="2500" x2="40" y2="2500" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="-10" y1="3000" x2="40" y2="3000" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="-10" y1="3500" x2="40" y2="3500" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="-10" y1="4000" x2="40" y2="4000" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <!-- Горизональные линии -->
      <line x1="500" y1="-10" x2="500" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="1000" y1="-10" x2="1000" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="1500" y1="-10" x2="1500" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="2000" y1="-10" x2="2000" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="2500" y1="-10" x2="2500" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="3000" y1="-10" x2="3000" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="3500" y1="-10" x2="3500" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="4000" y1="-10" x2="4000" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
    </svg>
  </div>
</template>

<script>
import {SVG} from '@svgdotjs/svg.js'
import '@svgdotjs/svg.draggable.js/src/svg.draggable'
export default {
    props: {
        img: String,
        data: Object,
        p_prop: Object,
        edit: Object
    },
    data(){
      return{
        img_height: 4000,
        img_width: 4000,
        g_circle: null
      }
    },
    computed:{
      if_edit(){
        if(this.edit.editing){
          this.g_circle.draggable(true)
        }
        else{
          this.g_circle.draggable(false)
        }
      }
    },
    watch: {
      edit: function (val) {
        if(val.editing){
          this.g_circle.draggable(true)
        }
        else{
          this.g_circle.draggable(false)
        }
        
      },
      g_circle: function(val){
        if(val == null){
          val.draggable(false)
        }
      }
    },
    mounted(){
      let svg = SVG('#svg' + this.p_prop.pict_id)
      this.g_circle = svg.findOne('g#g_circle')
      var that = this
      this.g_circle.on('dragend', function (event) {
        var c_x = parseInt(that.g_circle.x() + that.data.radius, 10)
        var c_y = parseInt(that.g_circle.y() + that.data.radius, 10)

        var data = {
          new_x: c_x,
          new_y: c_y,
          new_r: that.data.radius,
          pict_id: that.p_prop.pict_id,
          patient_id: that.p_prop.patient_id,
          user: that.$auth.user.name
        }
        that.edit.editing = false
        that.$store.dispatch('changeDiagnosisCoords', data)

      })

      var image = new Image()
      image.src = this.img
      image.onload = function() {
        that.img_width = this.width
        that.img_height = this.height
        // console.log(this.width + 'x' + this.height);
      }
    }
}
</script>

<style>
text {
font-size:100px;
fill:rgb(255, 255, 255);
}
p {
display:inline-block;
font-weight:bold;
margin: 1em ;
}
.draggable {
  cursor: move;
}
</style>