<template lang="pug">
block content
  input(v-model="pageData.list.data.length")
  .index {{ userInfo.name }}
    el-menu.el-menu-demo(mode="horizontal")
      template(v-for="(item, index) in pageData.nav")
        el-menu-item(v-if="!item.subNav" :index="item.index" :key="index")
          a.nav-a(target="_blank" :href="item.link") {{ item.title }}
        template(v-else)
          el-sub-menu(:index="item.index" :key="index")
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
      @current-change="pageChange"
    )
    el-tree(:data="pageData.tree" @node-click="handleNodeClick")
    el-radio-group(v-model="sendData.radio")
      el-radio(
        v-for="(item, index) in pageData.radio"
        :value="item.value"
        :key="index"
      ) {{ item.text }}
    el-checkbox-group(v-model="sendData.checkbox")
      el-checkbox(
        v-for="(item, index) in pageData.checkbox"
        :value="item.value"
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
    el-button(@click="showSend") 提交
    br
    el-breadcrumb(separator=">")
      el-breadcrumb-item(v-for="(item, index) in pageData.bread" :key="index")
        template(v-if="index == (pageData.bread.length - 1)") {{ item.text }}
        template(v-else)
          a(:href="item.url") {{ item.text }}
</template>

<script setup>
  import { onMounted, reactive } from 'vue'
  import { useStore } from 'vuex'
  import { name } from '../js'
  import axios   from 'axios'

  const store = useStore()
  console.log(name)
  // variable
  const pageData = reactive({
    list: {
      totalNum: 0,
      pageSize: 10,
      data: []
    },
    checkbox: []
  })

  const sendData = reactive({
    radio: '',
    checkbox: [],
    select: '',
    tab: ''
  })
  const userInfo = store.state.user.userInfo

  const getData = async () => {
    const ret = await axios('./mock/temp.json')
    Object.assign(pageData, ret.data)
    sendData.radio = pageData.radioDefaul
    sendData.checkbox = pageData.checkboxDefaul
    sendData.select = pageData.selectDefault
    sendData.tab = pageData.tabDefault
  }
  
  // alive
  onMounted(async () => {
    getData()
  })

  // method
  const handleClick = (tab) => {
    console.log(tab.index)
  }

  const pageChange = (pageNum) => {
    console.log(pageNum)
  }

  const handleNodeClick = (data) => {
    console.log(data.value)
  }

  const showSend = () => {
    console.log(sendData)
  }
</script>
