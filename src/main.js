let token = JSON.parse( window.localStorage.getItem('token') );
if( token ){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
axios.defaults.baseURL = 'http://127.0.0.1:8000';


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import axios from 'axios'
import VueAxios from 'vue-axios'
import { MotionPlugin } from '@vueuse/motion';


//Theme and icons
import 'primevue/resources/themes/tailwind-light/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons

//PrimeVue Components
import Button from 'primevue/button';
import TabMenu from 'primevue/tabmenu';
import Card from 'primevue/card';
import Chip from 'primevue/chip';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import StyleClass from 'primevue/styleclass';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import DataView from 'primevue/dataview';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import FileUpload from 'primevue/fileupload';
import Menu from 'primevue/menu';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';
import InputNumber from 'primevue/inputnumber';
import Toolbar from 'primevue/toolbar';
import RadioButton from 'primevue/radiobutton';
import Badge from 'primevue/badge';
import ProgressBar from 'primevue/progressbar';
import Sidebar from 'primevue/sidebar';

import '@/assets/styles.scss';
const app = createApp(App)
app.use(PrimeVue, { ripple: true});
app.use(router)
app.use(ToastService);
app.use(MotionPlugin);
app.use(VueAxios, axios)

//Use components
app.component('Button', Button)
app.component('TabMenu', TabMenu)
app.component('Card', Card)
app.component('Chip', Chip)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('Checkbox', Checkbox)
app.component('Calendar', Calendar)
app.component('Dialog', Dialog)
app.component('Divider', Divider)
app.component('Dropdown', Dropdown)
app.component('DataView', DataView)
app.component('Toast', Toast)
app.component('FileUpload', FileUpload)
app.component('Menu', Menu)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('InputNumber', InputNumber)
app.component('Toolbar', Toolbar)
app.component('RadioButton', RadioButton)
app.component('Badge', Badge)
app.component('ProgressBar', ProgressBar)
app.component('Sidebar', Sidebar)

//Use directives
app.directive('styleclass', StyleClass);

app.mount('#app')
