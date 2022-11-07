<template>
    <div>
        <svg id="svg" width="537" height="500" viewBox="-70 -50 1050 1050" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" style="border:2px solid #36bec2">
   <defs> 
    
      <pattern id="p10" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.5"/>
      </pattern>
      <pattern id="p100" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="url(#p10)"/>
               <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="1000" height="1000" fill="url(#p100)" />
    
      <circle cx="500" cy="500" r="5" fill="black" />
      
     <!-- Вертикальный блок цифр -->

      <text x="-25" y="-10">0,0</text> 
       <text x="-50" y="100" >100</text> 
        <text x="-50" y="200">200</text> 
         <text x="-50" y="300">300</text> 
          <text x="-50" y="400">400</text> 
           <text x="-50" y="500">500</text> 
          <text x="-50" y="600">600</text> 
         <text x="-50" y="700">700</text> 
        <text x="-50" y="800">800</text>
       <text x="-50" y="900">900</text> 
      <text x="-70" y="1000">1000</text> 
          <!-- Горизонтальный блок --> 
     <text x="100" y="-10" >100</text> 
       <text x="200" y="-10" >200</text> 
        <text x="300" y="-10">300</text> 
         <text x="400" y="-10">400</text> 
          <text x="500" y="-10">500</text>    
         <text x="600" y="-10">600</text> 
         <text x="700" y="-10">700</text> 
        <text x="800" y="-10">800</text>
       <text x="900" y="-10">900</text>  
      <text x="990" y="-10">1000</text>   
      <!-- Ракета      -->
      <g transform="scale(1)" fill="purple">
        <!-- <path  d="m308.167 241.52c0-28.766-23.403-52.169-52.17-52.169s-52.17 23.403-52.17 52.169c0 28.767 23.403 52.17 52.17 52.17s52.17-23.404 52.17-52.17zm-52.169 22.169c-12.225 0-22.17-9.945-22.17-22.17 0-12.224 9.945-22.169 22.17-22.169s22.17 9.945 22.17 22.169c-.001 12.225-9.946 22.17-22.17 22.17z"/>
        <path   d="m425.684 424.352v-132.322l-51.65-32.948c.615-14.332.261-28.762-1.117-43.191-7.162-74.973-41.384-144.771-96.362-196.535l-20.557-19.356-20.558 19.356c-54.978 51.765-89.2 121.563-96.362 196.535-1.378 14.429-1.732 28.859-1.117 43.191l-51.65 32.948v132.321l90.003-28.282c3.744 6.784 7.752 13.436 12.017 19.945v62.315h30v-48.333h22.667v23.252h30v-23.252h22.667v48.333h30v-62.315c4.265-6.508 8.273-13.161 12.017-19.945zm-30-115.874v75.001l-46.66-14.662c10.468-24.35 17.778-49.975 21.762-76.222zm-139.694-267.28c27.301 25.706 48.392 55.971 63.081 88.684h-126.153c14.687-32.713 35.775-62.979 63.072-88.684zm-139.679 342.281v-75.001l24.898-15.883c3.983 26.247 11.293 51.872 21.762 76.222zm124.687-10.983v27.499h-27.316c-47.563-72.299-57.394-161.126-32.242-240.114h149.112c25.156 78.987 15.325 167.815-32.238 240.114h-27.316v-27.499z"/>
        <path  d="m240.998 483.495h30v28.5h-30z"/>  -->
        <image :href="img" fill-opacity="0.25" />
        </g>
  </svg> 
    </div>
</template>

<script>
export default {
    props: {
        img: String
    }
}
</script>

<style>
text {
font-size:30px;
fill:rgb(255, 255, 255);
}
p {
display:inline-block;
font-weight:bold;
margin: 1em ;
}
</style>