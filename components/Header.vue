<template>
    <div class="header">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand to="/"><b-row align-v="center" class="m-0 logo"><b-img center src="@/assets/img/logo.png"></b-img><div class="pl-2">WEB-ARM</div></b-row></b-navbar-brand>

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
    .logo img{
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