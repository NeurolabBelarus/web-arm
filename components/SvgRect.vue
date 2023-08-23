<template>
  <div>
    <svg :id="'svg'+ this.p_prop.pict_id" width="1000" height="1000" :viewBox="'-270 -200 ' + (img_width+(img_width/3)) + ' ' + (img_height+(img_height/3))" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" style="border:2px solid #36bec2">
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
      <text x="-250" y="4500">4500</text>      
      <text x="-250" y="5000">5000</text>      
      <text x="-250" y="5500">5500</text>      
      <text x="-250" y="6000">6000</text>      

      <!-- Горизонтальный блок --> 
      <text x="500" y="-50">500</text>     
      <text x="1000" y="-50">1000</text>
      <text x="1500" y="-50">1500</text>
      <text x="2000" y="-50">2000</text>
      <text x="2500" y="-50">2500</text>
      <text x="3000" y="-50">3000</text>
      <text x="3500" y="-50">3500</text>
      <text x="4000" y="-50">4000</text>
      <text x="4500" y="-50">4500</text>
      <text x="5000" y="-50">5000</text>
      <text x="5500" y="-50">5500</text>
      <text x="6000" y="-50">6000</text>
      <!-- Ракета      -->
      <g transform="scale(1)" fill="purple">
        <image id="svg_image" :href="img"/>
      </g>
      <g id="g_circle" class="">
        <rect  v-for="item in prop_coords['0']" :key="item" :x="item.x - (item.size_x/2)" :y="item.y - (item.size_y/2)" :width="item.size_x" :height="item.size_y" fill="transparent" stroke="red" stroke-width="10"/>
        <rect  v-for="item in prop_coords['1']" :key="item" :x="item.x - (item.size_x/2)" :y="item.y - (item.size_y/2)" :width="item.size_x" :height="item.size_y" fill="transparent" stroke="green" stroke-width="10"/>
        <rect  v-for="item in prop_coords['2']" :key="item" :x="item.x - (item.size_x/2)" :y="item.y - (item.size_y/2)" :width="item.size_x" :height="item.size_y" fill="transparent" stroke="yellow" stroke-width="10"/>
        <rect  v-for="item in prop_coords['3']" :key="item" :x="item.x - (item.size_x/2)" :y="item.y - (item.size_y/2)" :width="item.size_x" :height="item.size_y" fill="transparent" stroke="blue" stroke-width="10"/>
        <rect  v-for="item in prop_coords['4']" :key="item" :x="item.x - (item.size_x/2)" :y="item.y - (item.size_y/2)" :width="item.size_x" :height="item.size_y" fill="transparent" stroke="blueviolet" stroke-width="10"/>
        <!-- <rect x="0" y="0" width="500" height="500" fill="transparent" stroke="red" stroke-width="10"/>
        <rect x="500" y="500" width="100" height="100" fill="transparent" stroke="red" stroke-width="1"/>
        <rect x="1000" y="1000" width="100" height="100" fill="transparent" stroke="red" stroke-width="1"/>
        <rect x="1500" y="1500" width="100" height="100" fill="transparent" stroke="red" stroke-width="1"/>
        <rect x="2000" y="2000" width="100" height="100" fill="transparent" stroke="red" stroke-width="1"/> -->
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
      <line x1="-10" y1="4500" x2="40" y2="4500" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="-10" y1="5000" x2="40" y2="5000" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="-10" y1="5500" x2="40" y2="5500" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="-10" y1="6000" x2="40" y2="6000" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <!-- Горизональные линии -->
      <line x1="500" y1="-10" x2="500" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="1000" y1="-10" x2="1000" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="1500" y1="-10" x2="1500" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="2000" y1="-10" x2="2000" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="2500" y1="-10" x2="2500" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="3000" y1="-10" x2="3000" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="3500" y1="-10" x2="3500" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="4000" y1="-10" x2="4000" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="4500" y1="-10" x2="4500" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="5000" y1="-10" x2="5000" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="5500" y1="-10" x2="5500" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
      <line x1="6000" y1="-10" x2="6000" y2="40" style="stroke-linecap: round; stroke: white; stroke-width:15px;" />
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
        p_prop: Object
    },
    data(){
      return{
        img_height: 4000,
        img_width: 4000,
        g_circle: null,
        red_rect: [],
        green_rect: [],
        blue_rect: [],
        yellow_rect: []
      }
    },
    computed:{
      // if_edit(){
      //   if(this.edit.editing){
      //     this.g_circle.draggable(true)
      //   }
      //   else{
      //     this.g_circle.draggable(false)
      //   }
      // }
      prop_coords(){
        if(this.p_prop.pict_property.type != '-'){
          console.log(this.p_prop.pict_property.type)
          return this.p_prop.pict_property.type
        }
        else{
          return []
        }
      }
    },
    // watch: {
    //   edit: function (val) {
    //     if(val.editing){
    //       this.g_circle.draggable(true)
    //     }
    //     else{
    //       this.g_circle.draggable(false)
    //     }
        
    //   },
    //   g_circle: function(val){
    //     if(val == null){
    //       val.draggable(false)
    //     }
    //   }
    // },
    mounted(){
      let svg = SVG('#svg' + this.p_prop.pict_id)
      this.g_circle = svg.findOne('g#g_circle')
      // var that = this
      // this.g_circle.on('dragend', function (event) {
      //   var c_x = parseInt(that.g_circle.x() + that.data.radius, 10)
      //   var c_y = parseInt(that.g_circle.y() + that.data.radius, 10)

      //   var data = {
      //     new_x: c_x,
      //     new_y: c_y,
      //     new_r: that.data.radius,
      //     pict_id: that.p_prop.pict_id,
      //     patient_id: that.p_prop.patient_id,
      //     user: that.$auth.user.name
      //   }
      //   that.edit.editing = false
      //   that.$store.dispatch('changeDiagnosisCoords', data)

      // })

      var image = new Image()
      image.src = this.img
      image.onload = function() {
        this.img_width = this.width
        this.img_height = this.height
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