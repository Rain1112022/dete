import ScaleBox from './ScaleBox.vue';
import EcahrtItem from './EcahrtItem.vue';
import Screenfull from './Screenfull.vue';
import CpuMonitor from './CpuMonitor.vue';
import SearchField from './SearchField.vue';
import Dialog from './Dialog.vue';
import ScrollTable from './ScrollTable.vue';

import type { App } from 'vue';

export {
  ScaleBox,
  EcahrtItem,
  Screenfull,
  CpuMonitor,
  SearchField,
  Dialog,
  ScrollTable,
};

const component = [
  ScaleBox,
  EcahrtItem,
  Screenfull,
  CpuMonitor,
  SearchField,
  Dialog,
  ScrollTable,
];
const CustomComponent = {
  install(App: App<Element>) {
    component.forEach((item) => {
      App.component(item.name, item);
    });
  },
};

export default CustomComponent;
