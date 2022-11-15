<template>
    <div class="login">
        <b-container class="h-100">
            <b-row align-h="center" align-v="center" class="h-100 m-0">
                <b-col class="p-0 oneblock" cols="12" lg="4">
                    <b-row align-h="center" align-v="center" class="h-100 m-0">
                        <b-col class="p-0">
                            <b-form class="p-4" @submit="onSubmit">
                                <div class="pb-4"><h2>Вход</h2></div>
                                <b-form-group class="loginform" id="input-group-2" label="Имя пользователя:" label-for="input-2">
                                    <b-form-input
                                    id="input-2"
                                    v-model="form.name"
                                    required
                                    ></b-form-input>
                                </b-form-group>
                                <b-form-group
                                    class="loginform"
                                    id="input-group-1"
                                    label="Пароль:"
                                    label-for="input-1"
                                >
                                    <b-form-input
                                    id="input-1"
                                    v-model="form.password"
                                    type="password"
                                    required
                                    ></b-form-input>
                                </b-form-group>
                                <div class="pt-3"><b-button variant="warning" type="submit">Войти</b-button></div>
                            </b-form>
                            <!-- <p>Нет аккаунта? <NuxtLink to="/registration">Зарегистрируйся</NuxtLink></p> -->
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-alert :show="errorAlert" dismissible @dismissed="errorAlert=0" @dismiss-count-down="countDownErrorChanged" variant="danger">{{alertText}}</b-alert>
        </b-container>
    </div>
</template>

<script>
export default {
    layout: 'logreg',
    data() {
        return {
            form: {
                name: '',
                password: ''
            },
            errorAlert: 0,
            dismissSecs: 5,
            alertText: ''
        }
    },
    methods: {
        countDownErrorChanged(errorAlert) {
            this.errorAlert = errorAlert
        },
        async onSubmit(event) {
            // КАК ОБЫЧНО
            // try {
            //     event.preventDefault()
            //     var data = this.form
            //     this.$axios.post("/api/login", {data}).then((response) => {
            //         if(response.data.status == 'OK'){
            //             this.$store.dispatch('login', response.data.message)
            //             this.$router.replace({ path: '/' })
            //         }
            //         else{
            //             alert(response.data.message)
            //         }
            // })
            // .catch((err) => {
            //     console.error(err);
            // });
            // } catch (error) {
            //     console.log('Login error:', error)
            // }

            // ЧЕРЕЗ nuxt-auth
            try {
                event.preventDefault()
                let response = await this.$auth.loginWith('local', { data: this.form })
                if(response.data.status == 'NO OK'){
                    this.alertText = response.data.message
                    this.errorAlert = 5
                }
                } catch (err) {
                    console.log(err)
                    this.alertText = err
                    this.errorAlert = 5
                }
        }
    }
}
</script>

<style scoped>
.oneblock{
    background-color: #29272e;
    border-radius: 20px;
    height: 400px;
}
.login{
    height: 800px;
    text-align: center;
    color: white;
}
.loginform{
    text-align: left;
}
</style>