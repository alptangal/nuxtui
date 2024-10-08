<template>
  <div class="flex flex-col h-full">
    <div class="flex justify-between px-3 py-3.5 border-b border-gray-200 dark:border-gray-700 relative">
    <div class="flex gap-1">
      <UButton class="capitalize" :ui="{ rounded: 'rounded-full' }" @click="modals.createForm.display = true">
        <UIcon class="font-bold text-xl" name="i-material-symbols-light-add" />Create new category
      </UButton>
      <Transition>
        <UChip class="transition-all" v-if="table.selected.length > 0" :text="table.selected.length" size="xl"
          color="red">
          <UButton :loading="loading.delete" :disabled="loading.delete" color="red" :ui="{ rounded: 'rounded-full' }"
            @click="modals.confirmDelete.display = true, loading.delete = true">
            <UIcon class="font-bold text-xl" name="i-material-symbols-light-delete" />Delete
          </UButton>
        </UChip>
      </Transition>
      <TransitionGroup>
        <UDivider v-if="table.selected.length >= pageCount" label="or" type="dotted" />
        <UChip v-if="table.selected.length >= pageCount" class="transition-all" :text="table.data.length" size="xl"
          color="red">
          <UButton :loading="loading.delete" :disabled="loading.delete" color="red" :ui="{ rounded: 'rounded-full' }"
            @click="modals.confirmDeleteAll.display = true, loading.delete = true">
            <UIcon class="font-bold text-xl" name="i-material-symbols-light-delete" />Delete all records
          </UButton>
        </UChip>
      </TransitionGroup>

    </div>
    <UInput v-model="table.keyword" placeholder="Enter to search" />
  </div>
  <div ref="tableEl">
    <UTable :rows="filteredRows" :columns="tableColumns" v-model="table.selected" :loading="table.loading">
    <template #actions-data="{ row }">
      <UButton color="blue" icon="i-material-symbols-light-info-outline-rounded" variant="ghost"
        :ui="{ rounded: 'rounded-full' }" @click="table.detail = { display: true, value: row }" />
    </template>
    <template #name-data="{ row }">
      <div class="w-32 truncate"><span class="w-full truncate">{{ row.name }}</span></div>
    </template>
    <template #images-data="{ row }">
      <div class="relative flex justify-center" @dblclick="router.push('categories/detail-' + row._id)">
        <template v-if="row.images.small.length >= 1">
          <div class="w-12 h-12 bg-gray-400 rounded-md" v-if="row.images.small.length > 1"></div>
          <div :class="row.images.small.length > 1 ? 'absolute top-0 left-2 shadow-2xl' : ''">
            <img :src="row.images.small[0]" class="w-12 drop-shadow-xl rounded-md" />
          </div>
          <UBadge v-if="row.images.small.length > 1" :label="(row.images.small.length - 1) + '+'"
            class="absolute right-0 top-0 " size="xs"></UBadge>
        </template>
        <template v-else>
          <div
            class="w-12 h-12 bg-gray-400 dark:bg-gray-800 rounded-md capitalize text-xs flex justify-center items-center text-gray-800 dark:text-gray-400">
            no data</div>
        </template>
      </div>
    </template>
    <template #created_at-data="{ row }">
      <UBadge variant="soft" size="md">
        {{ reformatDate(row.created_at) }}
      </UBadge>

    </template>
    <template #edited_at-data="{ row }">
      <UBadge size="md" variant="soft" color="blue" v-if="row.edited_at">
        {{ reformatDate(row.edited_at) }}
      </UBadge>
      <span class="capitalize" v-else>
        No data
      </span>
    </template>
  </UTable>
  </div>
  <UDivider class="mb-2" />
  <div class="flex justify-center mt-auto mb-2 w-full">
    <UPagination v-model="table.page" :page-count="pageCount" :total="table.data.length" />
  </div>

  <KeepAlive>
    <UModal :ui="{ width: `sm:max-w-6xl`, overlay: { background: 'backdrop-blur-md' } }"
      v-model="modals.createForm.display" :fullscreen="basicStore.screenSize.w < 800 ? true : false" prevent-close>
      <UCard :ui="{
        base: 'h-fit flex flex-col',
        rounded: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        body: {
          base: 'grow'
        },
        header: {
          base: 'bg-green-500 relative'
        }
      }" class="relative">
        <template #header>
          <div class="flex items-center justify-between">
            <UBadge color="green" class="absolute -top-4 left-0 hidden xl:block">Create new</UBadge>
            <h3 class="capitalize text-base font-semibold leading-6 text-white dark:text-white">
              tạo mới thể loại
            </h3>
            <UButton :disabled="loading.doing" color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click=" modals.confirmClose.display = true, modals.confirmClose.title = 'Bạn có chắc muốn đóng cửa sổ này?'" />
          </div>
          <div class="bottom-0 absolute w-full right-0" v-if="loading.doing">
            <UProgress size="xs" animation="carousel" :ui="{ progress: { rounded: 'rounded-none' } }" />
          </div>
        </template>
        <AdministratorCategoriesCreateNew
          @newData="table.data.unshift($event), store.showNotification({ type: 'success', title: $event.title + ' created success', description: 'You can view in data table', timeout: 3000 })"
          @doing="loading.doing = $event" />
      </UCard>
    </UModal>

  </KeepAlive>
  <ConfirmModal v-model="modals.confirmDelete.display" :title="modals.confirmDelete.title"
    @is-confirmed="$event ? deleteSelected(null) : loading.delete = false" />
  <ConfirmModal v-model="modals.confirmDeleteAll.display" :title="modals.confirmDeleteAll.title"
    @is-confirmed="$event ? deleteSelected('all') : loading.delete = false" />
  <ConfirmModal v-model="modals.confirmClose.display" :title="modals.confirmClose.title"
    @is-confirmed="$event ? modals.createForm.display = false : null" />
  <UModal :ui="{ width: `sm:max-w-6xl`, overlay: { background: 'backdrop-blur-md' } }" v-model="table.detail.display"
    :fullscreen="basicStore.screenSize.w < 800 ? true : false" prevent-close>
    <UCard :ui="{
      base: 'h-fit flex flex-col',
      rounded: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      body: {
        base: 'grow'
      },
      header: {
        base: 'bg-blue-500 relative'
      }
    }">
      <template #header>
        <div class="flex items-center justify-between">
          <UBadge color="blue" class="absolute -top-4 left-0">Update</UBadge>
          <h3 class="capitalize text-base font-semibold leading-6 text-white dark:text-white">
            {{ table.detail.value.name }}
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="table.detail.display = false" />
        </div>
        <div class="bottom-0 absolute w-full right-0" v-if="loading.doing">
          <UProgress size="xs" color="blue" animation="carousel" :ui="{ progress: { rounded: 'rounded-none' } }" />
        </div>
      </template>
      <AdministratorCategoriesDetail :data="table.detail.value" @updateData="updateData"
        @doing="loading.doing = $event" />
    </UCard>
  </UModal>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const route = useRoute()
const store = useMyNotificationsStore()
const basicStore = useMyBasicStore()
onBeforeMount(async () => {
  
  table.value.loading = true
  await $fetch('/api/categories/list').then(res => {
    if (res.length > 0) {
      table.value.data = res.sort((item1, item2) => item1.created_at < item2.created_at)
    }
    table.value.loading = false
  })
})
onMounted(()=>{
  
})
function reformatDate(val) {
  return new Date(Date.parse(val))
}

const modals = ref({
  createForm: {
    display: false
  },
  confirmDelete: {
    display: false,
    title: 'Do you sure delete selected item?'
  },
  confirmDeleteAll: {
    display: false,
    title: 'Do you sure delete all items?'
  },
  confirmClose: {
    display: false,
    title: 'Do you sure close this window?'
  }
})
const loading = ref({
  delete: false,
  create: false,
  doing: false,
})
const tableColumns = computed(() => {
  switch (basicStore.screenSize.name) {
    default:
      return [
        { key: '_id', label: 'ID' },
        { key: 'images', label: 'Images' },
        { key: 'name', label: 'Name' },
        { key: 'created_at', label: 'Created at' },
        { key: 'created_by', label: 'Created by' },
        { key: 'edited_at', label: 'Edited at' },
        { key: 'edited_by', label: 'Edited by' },
        { key: 'actions' }
      ]
    case 'xs':
      return [
        { key: 'name', label: 'Name' },
      ]
  }
})
const tableEl=ref(null)
const table = ref({
  page: 1,
  pageCount: 10,
  selected: [],
  keyword: null,
  data: [],
  loading: false,
  detail: {
    display: false,
    value: null
  }
})
const rows = computed(() => {
  return table.value.data.slice((table.value.page - 1) * pageCount.value, (table.value.page) * pageCount.value)
})
const pageCount = computed(() => {
  if(tableEl.value ){
    console.log(tableEl.value.offsetTop)
    return Math.floor((basicStore.screenSize.h-tableEl.value.offsetTop-32-68.5) / 80.5)
  }
  
  return Math.floor((basicStore.screenSize.h - 84 - 61 - 48.5 - 32) / 65)

})
const filteredRows = computed(() => {
  if (!table.value.keyword) {
    return table.value.data.slice((table.value.page - 1) * pageCount.value, (table.value.page) * pageCount.value)
  }

  return table.value.data.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(table.value.keyword.toLowerCase())
    })
  })
})
async function deleteSelected(type) {
  loading.value.delete = true
  const prom = new Promise(async (resolve1, reject1) => {
    if (type == 'all') {
      table.value.selected = table.value.data
    }
    const arr = Array.from(Array(table.value.selected.length).keys())
    for (const index of arr) {
      const item = table.value.selected[0]
      await $fetch('/api/categories/delete', {
        method: 'DELETE',
        body: {
          _id: item._id
        }
      }).then(res => {
        if (Object.hasOwn(res, 'deletedCount') && res.deletedCount == 1) {
          const promise = new Promise((resolve, reject) => {
            resolve(table.value.data.findIndex(r => r._id == item._id))
          })
          promise.then(rs => {
            table.value.data = table.value.data.filter(item1 => item._id != item1._id)
            table.value.selected = table.value.selected.filter(item1 => item1._id != item._id)
            store.showNotification({
              title: `${item._id} deleted success`,
              description: `with name: <span class="text-red-500 font-bold text-xl">${item.name}</span>`,
              type: 'success'
            })
          })
        }
        if (index == arr.length - 1) {
          resolve1()
        }
      })
    }
  })
  prom.then(res => {
    loading.value.delete = false
  })

}
const confirmDeleteDisplay = computed({
  get() {
    return modals.value.confirmDelete.display
  }
})
const confirmDeleteAllDisplay = computed({
  get() {
    return modals.value.confirmDeleteAll.display
  }
})
function updateData(data) {
  const promise = new Promise((resolve, reject) => {
    resolve(table.value.data.findIndex(item => item._id == data._id))
  })
  promise.then(res => {
    Object.keys(table.value.data[res]).forEach(key => {
      table.value.data[res][key] = data[key]
    })
    table.value.data[res].edited_at = new Date()
  })
}
const modalCreateDisplay = computed({
  get() {
    return modals.value.createForm.display
  }
})
watch(modalCreateDisplay, (newVal, oldVal) => {
  if (newVal) {
    window.history.pushState({}, null, route.fullPath + '/create')
  }
  else {
    window.history.pushState({}, null, route.fullPath)
  }
})
const modalUpdateDisplay = computed({
  get() {
    return table.value.detail.display
  }
})
watch(modalUpdateDisplay, (newVal, oldVal) => {
  if (newVal) {
    window.history.pushState({}, null, route.fullPath + '/detail-' + table.value.detail.value._id)
  }
  else {
    window.history.pushState({}, null, route.fullPath)
  }
})
</script>

<style></style>