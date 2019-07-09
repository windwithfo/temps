<template lang="pug">
  .index {{ userInfo.name }}
    el-menu.el-menu-demo(mode="horizontal")
      template(v-for="(item, index) in pageData.nav")
        el-menu-item(v-if="!item.subNav" :index="item.index" :key="index")
          a.nav-a(target="_blank" :href="item.link") {{ item.title }}
        template(v-else)
          el-submenu(:index="item.index" :key="index")
            template(slot="title") {{ item.title }}
            el-menu-item(v-for="subitem in item.subNav" :index="subitem.index" :key="subitem.index")
              a.subnav-a(target="_blank" :href="subitem.link") {{ subitem.title }}

    el-table(:data="pageData.table" style="width: 100%")
      el-table-column(align="center" prop="date" label="日期" width="180")
      el-table-column(align="center" prop="name" label="姓名" width="180")
      el-table-column(align="center" prop="address" label="地址")
    el-pagination(
      layout="prev, pager, next"
      :total="pageData.list.totalNum"
      :page-size="pageData.list.pageSize"
      @current-change="pageChagen"
    )
    el-tree(:data="pageData.tree" @node-click="handleNodeClick")
    el-radio-group(v-model="sendData.radio")
      el-radio(
        v-for="(item, index) in pageData.radio"
        :label="item.value"
        :key="index"
      ) {{ item.text }}
    el-checkbox-group(v-model="sendData.checkbox")
      el-checkbox(
        v-for="(item, index) in pageData.checkbox"
        :label="item.value"
        :key="index"
      ) {{ item.text }}
    el-select(v-model="sendData.select" placeholder="请选择")
      el-option(
        v-for="(item, index) in pageData.select"
        :label="item.text"
        :value="item.value"
        :key="index"
      )
    el-tabs(type="border-card" :active-name="sendData.tab" @tab-click="handleClick")
      el-tab-pane(
        v-for="(item, index) in pageData.tab"
        :label="item.text"
        :name="item.value"
        :key="index"
      ) {{ item.text }}
    br
    el-breadcrumb(separator=">")
      el-breadcrumb-item(v-for="(item, index) in pageData.bread" :key="index")
        template(v-if="index == (pageData.bread.length - 1)") {{ item.text }}
        template(v-else)
          a(:href="item.url") {{ item.text }}
</template>

<script>
  import { name } from '../js';
  import fetch   from 'isomorphic-fetch';

  import {
    Vue,
    Component
  } from 'vue-property-decorator';

  import {
    namespace
  } from 'vuex-class';

  const userStore = namespace('user');

  @Component
  export default class extends Vue {
    @userStore.State userInfo;

    pageData = {
      list: {}
    }

    sendData = {
      radio: '',
      checkbox: '',
      select: '',
      tab: '0'
    }

    mounted() {
      console.log(name);
      fetch('static/mock/temp.json').then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        // body to json
        return response.json();
      }).then((json) => {
        // success callback
        console.log(json);
        this.pageData = json;
        this.sendData.radio = this.pageData.radioDefaul;
        this.sendData.checkbox = this.pageData.checkboxDefaul;
        this.sendData.select = this.pageData.selectDefault;
        this.sendData.tab = this.pageData.tabDefault;
      }, (error) => {
        // error callback
        console.log(error);
      });
    }

    handleClick(tab) {
      console.log(tab.index);
    }

    pageChagen(pageNum) {
      console.log(pageNum);
    }

    handleNodeClick(data) {
      console.log(data.value);
    }
  }
</script>
