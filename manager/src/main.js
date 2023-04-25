import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

//按需引入elementUI组件
import {
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    Button,
    Tabs,
    TabPane,
    Table,
    TableColumn,
    Popover,
    Tag,
    Pagination,
    Drawer,
    Form,
    FormItem,
    Option,
    Select,
    Col,
    DatePicker,
    TimePicker,
    Switch,
    CheckboxGroup,
    Checkbox,
    Radio,
    RadioGroup,
    Upload,
    MessageBox,
    Message,
    Tooltip
} from 'element-ui';
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(Button);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Popover);
Vue.use(Tag);
Vue.use(Pagination);
Vue.use(Drawer);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Option);
Vue.use(Select);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Switch);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Upload);
Vue.use(Tooltip);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

//引入less
import less from 'less'
Vue.use(less);

//导入路由模块
import router from './router/index';

//导入vuex仓库
import store from './store/index';

new Vue({
    render: h => h(App),
    //注册路由
    router,
    //注册仓库
    store,
    //配置全局数据总线
    beforeCreate() {
        Vue.prototype.$bus = this;
    }
}).$mount('#app')