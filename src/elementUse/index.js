import {
  Empty,
  Button,
  Select,
  Option,
  Tabs,
  Pagination,
  MenuItemGroup,
  Submenu,
  Form,
  Menu,
  Breadcrumb,
  Tooltip,
  Switch,
  BreadcrumbItem,
  MenuItem,
  FormItem,
  TabPane,
  Link,
  Input,
  Aside,
  Container,
  Main,
  Checkbox,
  Tree,
  Dialog,
  Card,
  Progress,
  Col,
  Row,
  Popover,
  DatePicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Message,
  Loading,
  MessageBox,
  Notification,
} from "element-ui";
import Vue from "vue";

Vue.component(Button.name, Button);
Vue.component(Tabs.name, Tabs);
Vue.component(Pagination.name, Pagination);
Vue.component(Dialog.name, Dialog);
Vue.component(Card.name, Card);
Vue.component(Progress.name, Progress);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Switch.name, Switch);
Vue.component(Col.name, Col);
Vue.component(Row.name, Row);
Vue.component(Empty.name, Empty);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(Select.name, Select);
Vue.component(Submenu.name, Submenu);
Vue.component(Input.name, Input);
Vue.component(Tree.name, Tree);
Vue.component(Aside.name, Aside);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Container.name, Container);
Vue.component(Main.name, Main);
Vue.component(TabPane.name, TabPane);
Vue.component(Form.name, Form);
Vue.component(Link.name, Link);
Vue.component(Menu.name, Menu);
Vue.component(Option.name, Option);
Vue.component(MenuItem.name, MenuItem);
Vue.component(FormItem.name, FormItem);
Vue.component(Popover.name, Popover);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(BreadcrumbItem.name, BreadcrumbItem);

Vue.use(Loading.directive);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$notify = Notification;
