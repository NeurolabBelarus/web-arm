<template>
    <div class="px-3" style="min-height: 830px;">
        <!-- Connection: {{connection}} -->
        <b-row align-v="center" align-h="center" class="m-0 pt-3">
            <h3 v-if="archive">Записи о пациенте в архиве</h3>
            <h3 v-else>Записи о пациенте</h3>
        </b-row>
        <nuxt-link to="/">На главную</nuxt-link>
        <b-alert :show="on_load" variant="info" class="alert_block">Загрузка</b-alert>
        <b-alert :show="wait_pdf" variant="info" class="alert_block">Идет создание pdf файла</b-alert>
        <b-row align-v="center" align-h="between" class="m-0 p-3" v-if="patient != null">
            <b-row class="m-0">
                <div class="pr-3"><b>ID:</b> {{patient.patient_id}}</div>
                <div class="pr-3"><b>Имя пациента:</b> {{patient.name}}</div>
                <div class="pr-1"><b>Статус:</b></div>
                <div class="mr-6" id="circle" v-for="element in patient.status" :key="element.id" :style="[element.status == 'Не обработан' ? {'background': 'red'} : {'background': 'yellow'}, {'margin-right': '10px'}]"></div>
                <div class="pr-3">
                    <b>Записей:</b> {{patient.pictures_count.all}}
                    <span v-if="patient.pictures_count.all != 0">
                        <b>(В архиве:</b> {{patient.pictures_count.archived}})
                    </span>
                </div>
                <!-- <div class="pr-3 d-flex"><b>Диагноз: </b>{{patient.diagnosis}}</div> -->
                <!-- <div class="pr-3 d-flex"><b>Комментарий: </b>{{patient.comment}}</div> -->
                    <!-- <div v-if="!change"> {{patient.diagnosis}}</div>
                    <div v-else>
                        <b-form-input v-model="newDiagnosis" placeholder="Enter new diagnosis"></b-form-input>
                    </div> -->
                <!-- <div v-if="!change" class="change-btn">
                    <img @click="changeMode()" src="@/assets/img/change.png">
                </div>
                <div v-else class="change-btn">
                    <img @click="confirm()" src="@/assets/img/confirm.png">
                    <img @click="changeMode()" src="@/assets/img/cancel.png">
                </div> -->
            </b-row>
            <div class="change-btn">
                <img v-if="!archive" @click="showArchive()" src="@/assets/img/docs.png" title="Показать архивные записи">
                <img v-else @click="hideArchive()" src="@/assets/img/hideArchive.png" title="Скрыть архивные записи">
            </div>
        </b-row>
        <div v-if="patient != null">
            <b-row align-h="center" class="m-0 img-list">
                <b-col cols="4" v-for="item in patient.pictures" :key="item.id" class="p-3 img-item">
                    <b-row class="m-0" align-h="center">
                        <b-row style="width: 500px" align-h="end" class="m-0">
                            <div class="pb-1 change-btn d-flex">
                                <div class="pr-3"><img v-if="item.pict_property.archived == 0" @click="addToArchive(item)" src="@/assets/img/addArchive.png" title="Добавить в архив"></div>
                                <div class="pr-3"><img @click="getEventLog(item)" src="@/assets/img/log.png" title="Журнал"></div>
                                <div class="pr-3"><img @click="printDocument(item)" src="@/assets/img/print.png" title="Печать PDF"></div>
                                <div><img @click="deleteRecord(item)" src="@/assets/img/cancel.png" title="Удалить"></div>
                            </div>
                        </b-row>
                        <Canvas :img="item.pict_prefix + item.pict" :data="item.pict_property" :edit="{editing: item.diagnosisEditing, x_coord_upd: item.x_coord_upd, y_coord_upd: item.y_coord_upd, radius_upd: item.radius_upd}" />
                        <div style="width: 500px">
                            <b-collapse :id="'collapse-' + item.pict_id">
                                <div class="property p-1"><b>Тип груди:</b> {{item.pict_property.selectedBreastType == 'left' ? 'Левая':'Правая'}}</div>
                                <div class="property p-1"><b>Разрешение:</b> {{item.pict_property.resolutionW}}x{{item.pict_property.resolutionH}} {{item.pict_property.selectedResolution}}</div>
                                <div class="property p-1"><b>Аппроксимация:</b> {{item.pict_property.approximationW}}x{{item.pict_property.approximationH}} {{item.pict_property.selectedApproximation}}</div>
                                <div class="property p-1"><b>Фоновая ткань:</b> {{item.pict_property.back_fabric}}</div>
                                <div class="property p-1"><b>Аномалия:</b> {{item.pict_property.anomaly}}</div>
                                <div class="property p-1"><b>Тип:</b> {{item.pict_property.type}}</div>
                                <div class="property p-1">
                                    <b-row v-if="!item.diagnosisEditing" class="m-0">
                                        <b>Координаты:</b> x={{item.pict_property.x_coord}} y={{item.pict_property.y_coord}} r={{item.pict_property.radius}}
                                        <div v-if="!archive" class="pl-3 change-btn">
                                            <img @click="diagnosisEdit(item)" src="@/assets/img/change.png" title="Изменить координаты">
                                        </div>
                                    </b-row>
                                    <b-row v-else class="m-0">
                                        <b-form-input min="0" type="number" v-model="item.x_coord_upd" class="w-25"></b-form-input>
                                        <b-form-input min="0" type="number" v-model="item.y_coord_upd" class="w-25"></b-form-input>
                                        <b-form-input min="0" type="number" v-model="item.radius_upd" class="w-25"></b-form-input>
                                        <div class="pl-3 change-btn">
                                            <img @click="diagnosisConfirm(item)" src="@/assets/img/confirm.png"  title="Подтвердить изменения">
                                            <img @click="diagnosisCancel(item)" src="@/assets/img/cancel.png" title="Отменить изменения">
                                        </div>    
                                    </b-row>
                                </div>
                                <div class="property p-1"><b>Статус:</b> <span :style="item.pict_property.status == 'Обработан' ? 'color: green' : item.pict_property.status == 'В обработке' ? 'color:yellow' : 'color:red'">{{item.pict_property.status}}</span></div>
                                <div class="property p-1" v-if="item.pict_property.status == 'Обработан'"><b-row class="m-0" align-h="between"><b-button @click="userConfirmDiagnosis(item, true)">Подтвердить диагноз</b-button><b-button @click="userConfirmDiagnosis(item, false)">Отклонить диагноз</b-button></b-row></div>
                                <div class="property p-1" v-if="item.pict_property.statusConfirm == 1">Подтвержден врачом</div>
                                <div class="property p-1" v-else-if="item.pict_property.statusConfirm == 0">Опровергнут врачом</div>
                                <div class="property p-1">
                                     <b-row v-if="!item.remarkEditing" class="m-0">
                                        <b>Примечание:</b> {{item.pict_property.remark}}
                                        <div v-if="!archive" class="pl-3 change-btn">
                                            <img @click="remarkEdit(item)" src="@/assets/img/change.png" title="Изменить примечание">
                                        </div>
                                    </b-row>
                                    <b-row v-else class="m-0">
                                        <b-form-input v-model="item.remark" class="w-75"></b-form-input>
                                        <div class="pl-3 change-btn">
                                            <img @click="remarkConfirm(item)" src="@/assets/img/confirm.png"  title="Подтвердить изменения">
                                            <img @click="remarkCancel(item)" src="@/assets/img/cancel.png" title="Отменить изменения">
                                        </div>    
                                    </b-row>
                                </div>
                            </b-collapse>
                            <b-row class="m-0" align-h="center"><b-button v-b-toggle="'collapse-' + item.pict_id"><span class="when-open">&#9650;</span><span class="when-closed">&#9660;</span></b-button></b-row>
                        </div>
                    </b-row>
                    <!-- <img :src="item.pict_prefix + item.pict"> -->
                </b-col>
                <b-row align-v="center" class="add-picture-button p-3 m-0" v-if="!archive"><b-button v-b-modal.modal-1>+</b-button></b-row>
            </b-row>
        </div>


        <b-modal id="modal-1" title="Добавить изображение" hide-footer>
            <b-form @submit="onSubmit">
                <b-row class="m-0" align-h="center">
                    <b-form-file
                    accept="image/*, .dcm"
                    v-model="form.file"
                    size="sm"
                    placeholder="Выберите файл или перетащите его сюда..."
                    drop-placeholder="Перетащите файл сюда..."
                    required
                    ></b-form-file>
                </b-row>
                <b-row class="m-0 pt-3">
                    <div class="pr-2">Разрешение:</div>
                    <b-form-radio-group
                        v-model="form.selectedResolution"
                        :options="resolutionOptions"
                        required
                    ></b-form-radio-group>
                    <b-row align-v="center" class="m-0 pt-2"><div class="pr-1">W:</div><div class="w-50"><b-form-input type="number" size="sm" v-model="form.resolutionW" required></b-form-input></div></b-row>
                    <b-row align-v="center" class="m-0 pt-2"><div class="pr-1">H:</div><div class="w-50"><b-form-input type="number" size="sm" v-model="form.resolutionH" required></b-form-input></div></b-row>
                </b-row>
                <b-row class="m-0 pt-3">
                    <div class="pr-2">Аппроксимация:</div>
                    <b-form-radio-group
                        v-model="form.selectedApproximation"
                        :options="resolutionOptions"
                        required
                    ></b-form-radio-group>
                    <b-row align-v="center" class="m-0 pt-2"><div class="pr-1">W:</div><div class="w-50"><b-form-input type="number" size="sm" v-model="form.approximationW" required></b-form-input></div></b-row>
                    <b-row align-v="center" class="m-0 pt-2"><div class="pr-1">H:</div><div class="w-50"><b-form-input type="number" size="sm" v-model="form.approximationH" required></b-form-input></div></b-row>
                </b-row>
                <b-row class="m-0 pt-3">
                    <div class="pr-2">Тип груди:</div>
                    <b-form-radio-group
                        v-model="form.selectedBreastType"
                        :options="breastTypeOptions"
                        required
                    ></b-form-radio-group>
                </b-row>
                <b-row class="m-0 pt-3" align-h="center">
                    <b-button size="sm" type="submit">Добавить изображение</b-button>
                </b-row>
            </b-form>
        </b-modal>


        <b-modal id="modal-2" title="Журнал" hide-footer>
            <b-table :items="events" :fields="fields" bordered></b-table>
        </b-modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            archive: false,
            patient_id: null,
            change: false,
            newDiagnosis: '',
            form: {
                file: null,
                selectedResolution: null,
                selectedApproximation: null,
                selectedBreastType: null,
                resolutionW: null,
                resolutionH: null,
                approximationW: null,
                approximationH: null,
            },
            resolutionOptions: [
                { text: 'Микрон', value: 'micron' },
                { text: 'Пиксель', value: 'pixel' },
            ],
            breastTypeOptions: [
                { text: 'Левая', value: 'left' },
                { text: 'Правая', value: 'right' },
            ],
            fields: [
                {
                    "key": "event",
                    "label": "Событие"
                },
                {
                    "key": "datetime",
                    "label": "Дата"
                },
                {
                    "key": "user",
                    "label": "Пользователь"
                },
            ]
        }
    },
    computed:{
        connection(){
            if(this.$store.state.connection != null){
                return this.$store.state.connection.readyState
            }
            else{
                return 'null'
            }
        },
        patient(){
            return this.$store.state.patients_json.patients_list.find(el => el.patient_id == this.patient_id)
        },
        events(){
            return this.$store.state.events
        },
        on_load(){
            return this.$store.state.load
        },
        wait_pdf(){
            return this.$store.state.waitPDF
        }
    },
    methods: {
        onSubmit(event){
            event.preventDefault()
            var p_data = {
                form: this.form,
                patient: this.patient,
                user: this.$auth.user.name
            }
            this.$store.dispatch('sendMessage', p_data)
            setTimeout(() => {
                    this.$store.dispatch('getPicture', this.$route.query)
                }, "2000")
            this.$bvModal.hide('modal-1')
        },
        // changeMode(){
        //     this.newDiagnosis = ''
        //     this.change = !this.change
        // },
        // confirm(){
        //      var data = {
        //         newDiagnosis: this.newDiagnosis,
        //         patient_id: this.patient.patient_id
        //     }
        //     this.$store.dispatch('changeDiagnosis', data)
        //     this.changeMode()
        // },
        diagnosisEdit(item) {
            this.$set(item, 'diagnosisEditing', true)
            this.$set(item, 'x_coord_upd', item.pict_property.x_coord)
            this.$set(item, 'y_coord_upd', item.pict_property.y_coord)
            this.$set(item, 'radius_upd', item.pict_property.radius)
        },
        diagnosisCancel(item) {
            this.$set(item, 'diagnosisEditing', false)
        },
        diagnosisConfirm(item){
            var data = {
                new_x: item.x_coord_upd,
                new_y: item.y_coord_upd,
                new_r: item.radius_upd,
                pict_id: item.pict_id,
                patient_id: this.patient.patient_id,
                user: this.$auth.user.name
            }
            this.$store.dispatch('changeDiagnosisCoords', data)
            this.diagnosisCancel(item)
        },
        addToArchive(item){
            var data = {
                patient_id: this.patient.patient_id,
                pict_id: item.pict_id,
                user: this.$auth.user.name
            }
            this.$store.dispatch('addToArchive', data)
        },
        deleteRecord(item){
            var data = {
                patient_id: this.patient.patient_id,
                pict_id: item.pict_id,
                user: this.$auth.user.name
            }
            this.$store.dispatch('deleteRecord', data)
            // this.$store.dispatch('getPicture', this.$route.query)
        },
        showArchive(){
            this.$store.dispatch('showArchive', this.patient.patient_id)
            this.archive = true
        },
        hideArchive(){
            this.$store.dispatch('getPicture', this.$route.query)
            this.archive = false
        },
        printDocument(item){
            var data = {
                patient_id: this.patient.patient_id,
                pict_id: item.pict_id
            }
            this.$store.dispatch('printDocument', data)
        },
        getEventLog(item){
            var data = {
                patient_id: this.patient.patient_id,
                pict_id: item.pict_id
            }
            this.$store.dispatch('getEventLog', data)
            this.$bvModal.show('modal-2')
        },
        userConfirmDiagnosis(item, value){
            var data = {
                patient_id: this.patient.patient_id,
                pict_id: item.pict_id,
                value: value,
                user: this.$auth.user.name
            }
            this.$store.dispatch('userConfirmDiagnosis', data)
        },
        remarkEdit(item){
            this.$set(item, 'remarkEditing', true)
            this.$set(item, 'remark', item.pict_property.remark)
        },
        remarkCancel(item) {
            this.$set(item, 'remarkEditing', false)
        },
        remarkConfirm(item){
            var data = {
                new_remark: item.remark,
                pict_id: item.pict_id,
                patient_id: this.patient.patient_id,
                user: this.$auth.user.name
            }
            this.$store.dispatch('changeRemark', data)
            this.remarkCancel(item)
        },
    },
    mounted(){
        this.patient_id = this.$route.query.patient
        if(this.$store.state.connection != null){
            this.$store.dispatch('getPicture', this.$route.query)
        }
        else{
            setTimeout(() => {
                this.$store.dispatch('getPicture', this.$route.query)
            }, "2000")
        }
        
    }
}
</script>

<style scoped>
    .alert_block{
        position: fixed;
        bottom: 0;
    }
    .property{
        border: solid #36bec2 1px;
        font-size: 1.5rem;
    }
    .table{
        color: black;
    }
</style>

<style>
    .custom-control-input:checked ~ .custom-control-label::before {
        color: #fff;
        border-color: #1e8d84;
        background-color: #1e8d84;
    }
    .custom-radio .custom-control-input:checked ~ .custom-control-label::after {
        background-image: none;
    }
    .custom-control-input:not(:disabled):active ~ .custom-control-label::before {
        color: #fff;
        background-color: #36bec2;
        border-color: #36bec2;
    }
    .custom-control-input:focus ~ .custom-control-label::before {
        box-shadow: 0 0 0 0;
    }
    .collapsed > .when-open,
    .not-collapsed > .when-closed {
        display: none;
    }
</style>