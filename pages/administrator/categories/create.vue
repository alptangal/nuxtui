<template>
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
          <h3 class="capitalize text-base font-semibold leading-6 text-white dark:text-white">
            tạo mới thể loại
          </h3>
          
        </div>
        <div class="bottom-0 absolute w-full right-0" v-if="loading.doing">
          <UProgress size="xs" animation="carousel" :ui="{progress:{rounded:'rounded-none'}}" />
        </div>
      </template>
    <AdministratorCategoriesCreateNew
       @doing="loading.doing=$event"/>
      </UCard>
</template>

<script lang="ts" setup>
import CreateForm from '@@/components/administrator/categories/CreateNew.vue'

const notification=useMyNotificationsStore()
const loading=ref({
  doing:false
})

const emits=defineEmits(['newData'])

</script>

<style>

</style>