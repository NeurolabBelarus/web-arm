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
                <div class="pr-1" v-if="patient.status.length != 0"><b>Статус:</b></div>
                <div class="mr-6 circle" v-for="element in patient.status" :key="element.id" :style="[element.status == 'Не обработан' ? {'background': 'red'} : element.status == 'В обработке' ? {'background': 'yellow'} : {'background': 'green'}, {'margin-right': '10px'}]"></div>
                <div class="pr-3">
                    <b>Записей:</b> {{patient.pictures_count.all}}
                    <!-- <span v-if="patient.pictures_count.all != 0">
                        <b>(В архиве:</b> {{patient.pictures_count.archived}})
                    </span> -->
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
            <!-- <div class="change-btn">
                <img v-if="!archive" @click="showArchive()" src="@/assets/img/docs.png" title="Показать архивные записи">
                <img v-else @click="hideArchive()" src="@/assets/img/hideArchive.png" title="Скрыть архивные записи">
            </div> -->
        </b-row>
        <div v-if="patient != null">
            <b-row align-h="center" class="m-0 img-list">
                <b-col cols="6" v-for="(item, index) in patient.pictures" :key="item.id" class="p-0 img-item">
                    <b-row class="m-0" :align-h="index % 2 == 0 ? 'end': 'start'">
                        <div style="position: relative;">
                            <span v-if="index == 0" style="position: absolute; left: 0; font-weight: bold;">R-CC</span>
                            <span v-else-if="index == 1" style="position: absolute; right: 0; font-weight: bold;">L-CC</span>
                            <span v-else-if="index == 2" style="position: absolute; left: 0; font-weight: bold;">R-MLO</span>
                            <span v-else-if="index == 3" style="position: absolute; right: 0; font-weight: bold;">L-MLO</span>
                            <img @click="zoomImg(index)" :src="item.pict_prefix + item.pict" alt="" width="auto" height="400px" style="cursor: pointer;">
                        </div>
                    </b-row>
                </b-col>
                <b-row align-v="center" class="add-picture-button p-3 m-0" v-if="!archive && patient.pictures_count.all < 4"><b-button v-b-modal.modal-1>+</b-button></b-row>
            </b-row>
        </div>


        <b-modal id="modal-1" title="Добавить изображения" hide-footer>
            <b-form @submit="onSubmit">
                <label for="file1">Проекция R-CC:</label>
                <b-row id="file1" class="m-0" align-h="center">
                    <b-form-file
                    accept="image/*, .dcm"
                    v-model="form.file1"
                    size="sm"
                    placeholder="Выберите файл или перетащите его сюда..."
                    drop-placeholder="Перетащите файл сюда..."
                    required
                    ></b-form-file>
                </b-row>
                <label for="file2">Проекция L-CC:</label>
                <b-row id="file2" class="m-0" align-h="center">
                    <b-form-file
                    accept="image/*, .dcm"
                    v-model="form.file2"
                    size="sm"
                    placeholder="Выберите файл или перетащите его сюда..."
                    drop-placeholder="Перетащите файл сюда..."
                    required
                    ></b-form-file>
                </b-row>
                <label for="file3">Проекция R-MLO:</label>
                <b-row id="file3" class="m-0" align-h="center">
                    <b-form-file
                    accept="image/*, .dcm"
                    v-model="form.file3"
                    size="sm"
                    placeholder="Выберите файл или перетащите его сюда..."
                    drop-placeholder="Перетащите файл сюда..."
                    required
                    ></b-form-file>
                </b-row>
                <label for="file4">Проекция L-MLO:</label>
                <b-row id="file4" class="m-0" align-h="center">
                    <b-form-file
                    accept="image/*, .dcm"
                    v-model="form.file4"
                    size="sm"
                    placeholder="Выберите файл или перетащите его сюда..."
                    drop-placeholder="Перетащите файл сюда..."
                    required
                    ></b-form-file>
                </b-row>
                <!-- <b-row class="m-0 pt-3">
                    <div class="pr-2">Разрешение:</div>
                    <b-form-radio-group
                        v-model="form.selectedResolution"
                        :options="resolutionOptions"
                        required
                    ></b-form-radio-group>
                    <b-row align-v="center" class="m-0 pt-2"><div class="pr-1">W:</div><div class="w-50"><b-form-input type="number" size="sm" v-model="form.resolutionW" required></b-form-input></div></b-row>
                    <b-row align-v="center" class="m-0 pt-2"><div class="pr-1">H:</div><div class="w-50"><b-form-input type="number" size="sm" v-model="form.resolutionH" required></b-form-input></div></b-row>
                </b-row> -->
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
                <!-- <b-row class="m-0 pt-3">
                    <div class="pr-2">Тип груди:</div>
                    <b-form-radio-group
                        v-model="form.selectedBreastType"
                        :options="breastTypeOptions"
                        required
                    ></b-form-radio-group>
                </b-row> -->
                <b-row class="m-0 pt-3" align-h="center">
                    <b-button size="sm" type="submit">Добавить изображения</b-button>
                </b-row>
            </b-form>
        </b-modal>

        <b-modal id="modal-2" title="Журнал" hide-footer>
            <b-table :items="events" :fields="fields" bordered></b-table>
        </b-modal>

        <b-modal id="modal-3" title="Картинка" size="xl" hide-footer hide-header v-if="zoom_image_index != null">
            <b-tabs content-class="mt-3">
                <b-tab title="Изображение" active>
                    <img :src="patient.pictures[zoom_image_index].pict_prefix + patient.pictures[zoom_image_index].pict" alt="" width="100%">
                    <div v-if="$auth.user.role == 'admin'">
                        <b-row id="file1" class="m-0 mt-3" align-h="center">
                            <b-button class="mr-3" v-on:click="downloadOriginal(patient.pictures[zoom_image_index])">Скачать оригинальное изображение</b-button>
                            <b-form-file
                            accept="image/*, .dcm"
                            v-model="form_edit"
                            placeholder="Выберите файл или перетащите его сюда..."
                            drop-placeholder="Перетащите файл сюда..."
                            required
                            ></b-form-file>
                            <b-button class="ml-3" v-on:click="pullNewPict(patient.pictures[zoom_image_index])">Залить новое изображение</b-button>
                        </b-row>
                    </div>
                </b-tab>
                <b-tab title="Этапы обработки">
                    <img @click="zoomStep(patient.pictures[zoom_image_index].pict_prefix + patient.pictures[zoom_image_index].pict)" :src="patient.pictures[zoom_image_index].pict_prefix + patient.pictures[zoom_image_index].pict" alt="" width="100%" id="zoomStep" style="cursor: pointer;">
                    <b-row v-if="!patient.pictures[zoom_image_index].remarkEditing" class="m-0 py-3">
                        <b>Примечание:</b> {{patient.pictures[zoom_image_index].pict_property.remark}}
                        <div v-if="!archive" class="pl-3 change-btn">
                            <img @click="remarkEdit(patient.pictures[zoom_image_index])" src="@/assets/img/change.png" title="Изменить примечание">
                        </div>
                    </b-row>
                    <b-row v-else class="m-0 py-3">
                        <b-form-input v-model="patient.pictures[zoom_image_index].remark" class="w-75"></b-form-input>
                        <div class="pl-3 change-btn">
                            <img @click="remarkConfirm(patient.pictures[zoom_image_index])" src="@/assets/img/confirm.png"  title="Подтвердить изменения">
                            <img @click="remarkCancel(patient.pictures[zoom_image_index])" src="@/assets/img/cancel.png" title="Отменить изменения">
                        </div>    
                    </b-row>
                    <div class="py-3" v-if="patient.pictures[zoom_image_index].pict_property.status == 'Обработан'">
                        <!-- <b>Диагноз:</b> {{patient.pictures[zoom_image_index].pict_property.anomaly}} -->
                        <b-row v-if="!patient.pictures[zoom_image_index].diagnosisEditing" class="m-0">
                            <b>Диагноз:</b> {{patient.pictures[zoom_image_index].pict_property.anomaly}}
                            <div v-if="!archive" class="pl-3 change-btn">
                                <img @click="diagnosisEdit(patient.pictures[zoom_image_index])" src="@/assets/img/change.png" title="Изменить диагноз">
                            </div>
                        </b-row>
                        <b-row v-else class="m-0">
                            <b-form-input min="0" type="text" v-model="patient.pictures[zoom_image_index].diag_upd" class="w-75"></b-form-input>
                            <div class="pl-3 change-btn">
                                <img @click="diagnosisConfirm(patient.pictures[zoom_image_index])" src="@/assets/img/confirm.png"  title="Подтвердить изменения">
                                <img @click="diagnosisCancel(patient.pictures[zoom_image_index])" src="@/assets/img/cancel.png" title="Отменить изменения">
                            </div>    
                        </b-row>
                        <div class="py-1" v-if="patient.pictures[zoom_image_index].pict_property.status == 'Обработан' && patient.pictures[zoom_image_index].pict_property.statusConfirm != 1"><b-row class="m-0" align-h="between"><b-button @click="userConfirmDiagnosis(patient.pictures[zoom_image_index], true)">Подтвердить диагноз</b-button></b-row></div>
                        <div class="py-1" v-if="patient.pictures[zoom_image_index].pict_property.statusConfirm == 1" style="color: green; font-weight: bold;">Подтвержден врачом</div>
                    </div>
                </b-tab>
                <b-tab title="Сведения">
                    <div><b>Статус:</b> {{ patient.pictures[zoom_image_index].pict_property.status }}</div>
                    <div><b>Размер изображения:</b> {{ patient.pictures[zoom_image_index].pict_property.resolutionH }} X {{ patient.pictures[zoom_image_index].pict_property.resolutionW }} пикселей</div>
                    <div><b>Тип апроксимации:</b> {{ patient.pictures[zoom_image_index].pict_property.selectedApproximation }}</div>
                    <div>
                        <b>Тип груди:</b>
                        <span v-if="zoom_image_index == 0">R-CC</span>
                        <span v-else-if="zoom_image_index == 1">L-CC</span>
                        <span v-else-if="zoom_image_index == 2">R-MLO</span>
                        <span v-else-if="zoom_image_index == 3">L-MLO</span>
                    </div>
                </b-tab>
            </b-tabs>
        </b-modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            archive: false,
            zoom_image_index: null,
            patient_id: null,
            change: false,
            newDiagnosis: '',
            form_edit: null,
            form: {
                file1: null,
                file2: null,
                file3: null,
                file4: null,
                selectedResolution: 'pixel',
                selectedApproximation: 'pixel',
                // selectedBreastType: null,
                resolutionW: 4000,
                resolutionH: 4000,
                approximationW: 1,
                approximationH: 1,
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
        watch_file(){
            return this.form.file1
        },
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
        pullNewPict(item){
            var p_data = {
                form: this.form_edit,
                pict_id: item.pict_id,
                patient_id: this.patient.patient_id
            }
            this.$store.dispatch('pullNewPict', p_data)
            this.$bvModal.hide('modal-2')
        },
        downloadOriginal(item){
            var data = {
                patient_id: this.patient.patient_id,
                pict_id: item.pict_id
            }
            this.$store.dispatch('downloadOriginal', data)
        },
        zoomStep(blobUrl){
            // const blobUrl = document.getElementById('zoomStep').getAttribute('src')
            // const link = document.createElement("a");
            // link.href = blobUrl;
            // link.target = "_blank";
            // document.body.appendChild(link);
            // link.dispatchEvent(
            //     new MouseEvent('click', { 
            //     bubbles: true, 
            //     cancelable: true, 
            //     view: window 
            //     })
            // );
            // document.body.removeChild(link);
            var image = new Image();
            image.src = blobUrl;

            var w = window.open("");
            w.document.write(image.outerHTML);
        },
        zoomImg(index){
            this.zoom_image_index = index
            console.log(this.patient)
            this.$bvModal.show('modal-3')
        },
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
            this.$set(item, 'diag_upd', item.pict_property.anomaly)
            // document.getElementById('g_circle').classList.add('draggable')
        },
        diagnosisCancel(item) {
            this.$set(item, 'diagnosisEditing', false)
            //  document.getElementById('g_circle').classList.remove('draggable')
        },
        diagnosisConfirm(item){
            var data = {
                new_diag: item.diag_upd,
                pict_id: item.pict_id,
                patient_id: this.patient.patient_id,
                user: this.$auth.user.name
            }
            console.log(data)
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
    .img_modal{
        background-color: #36bec2;
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