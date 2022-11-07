<template>
    <div class="header">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand to="/"><b-row align-v="center" class="m-0 logo">
                <svg viewBox="38 7 50 50">
                    <g xmlns="http://www.w3.org/2000/svg">
                        <path class="cls-29" d="M65.71,45.06c-4.89,0-10.15-1.91-15.22-5.53-3.79-2.7-6.13-5.38-6.22-5.5-.4-.46-.4-1.15,0-1.61,.1-.11,2.44-2.79,6.22-5.5,5.07-3.62,10.33-5.53,15.22-5.53s10.15,1.91,15.22,5.53c3.79,2.7,6.13,5.38,6.22,5.5,.4,.46,.4,1.15,0,1.61-.1,.11-2.44,2.79-6.22,5.5-5.07,3.62-10.33,5.53-15.22,5.53Zm-18.83-11.83c.95,.96,2.73,2.66,5.09,4.34,3.23,2.3,8.24,5.04,13.74,5.04s10.51-2.74,13.74-5.04c2.36-1.68,4.14-3.37,5.09-4.34-.95-.96-2.73-2.66-5.09-4.34-3.23-2.3-8.24-5.04-13.74-5.04s-10.51,2.74-13.74,5.04c-2.36,1.68-4.14,3.37-5.09,4.34Z"/>
                        <path class="cls-3" d="M65.71,40.85c-4.2,0-7.62-3.42-7.62-7.62s3.42-7.62,7.62-7.62c1.85,0,3.63,.67,5.02,1.89,.51,.45,.56,1.22,.11,1.74s-1.22,.56-1.74,.11c-.94-.82-2.15-1.28-3.4-1.28-2.85,0-5.16,2.32-5.16,5.16s2.32,5.16,5.16,5.16,5.16-2.32,5.16-5.16c0-.68,.55-1.23,1.23-1.23s1.23,.55,1.23,1.23c0,4.2-3.42,7.62-7.62,7.62Z"/>
                        <path class="cls-29" d="M65.71,35.68c-1.36,0-2.46-1.1-2.46-2.46s1.1-2.46,2.46-2.46,2.46,1.1,2.46,2.46-1.1,2.46-2.46,2.46Z"/>
                    </g>
                    <style>
                        .cls-29 {
                            fill: #36bec2;
                        }
                        .cls-3 {
                            fill: #fff;
                        }
                    </style>
                </svg>
                <div class="pl-1">FAUST VIEW</div></b-row></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

            <!-- Right aligned nav items -->
            <!-- <b-navbar-nav class="ml-auto">
                <b-col class="p-0 px-2 item">
                    <b-img center src="@/assets/img/chip.png"></b-img>
                    <div class="text text-center">ML</div>
                </b-col>
                <b-col class="p-0 px-2 item">
                    <b-img center src="@/assets/img/docs.png"></b-img>
                    <div class="text text-center">Исследования</div>
                </b-col>
                <b-col class="p-0 px-2 item">
                    <b-img center src="@/assets/img/user.png"></b-img>
                    <div class="text text-center">xxxx_xxxx</div>
                </b-col>
            </b-navbar-nav> -->
            </b-collapse>
        </b-navbar>
    </div>
</template>

<style scoped>
    .header{
        color: rgb(209, 209, 209);
    }
    .logo:hover{
        color: #30d5c8;
    }
    .logo svg{
        width: 55px;
        height: 55px;
    }
    .item img{
        width: 30px;
        height: 30px;
        filter: grayscale(1);
    }
    .item{
        cursor: pointer;
    }
    .item:hover .text{
        color: #30d5c8;
    }
    .item:hover img{
        filter: grayscale(0);
    }
</style>