import { defineStore } from 'pinia'

export const useMyMenuItemsStore = defineStore({
  id: 'myMenuItemsStore',
  state: () => ({
    normal:[
      {
        label:'home',
        to:'/'
      },
      {
        label:'about',
        to:'/'
      },
      {
        label:'contact',
        to:'/'
      },
    ],
    admin:[
      {
        label: 'Dashboard',
        icon: 'i-heroicons-information-circle',
        to:'/administrator'
        //content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
      }, {
        label: 'Warehouse',
        icon: 'i-material-symbols-light-warehouse-outline-rounded',
        to:'/administrator/warehouse',
        //disabled: true,
        //content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
      },
      {
        label: 'Products',
        icon: 'i-material-symbols-light-grocery-sharp',
        to:'/administrator/products'
        //disabled: true,
        //content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
      },
       {
        label: 'Categories',
        icon: 'i-material-symbols-light-category-outline-rounded',
        to:'/administrator/categories',
        childs:[
          {label:'Create',to:'/administrator/categories/create'},
          {label:'Update',to:'/administrator/categories/update'},
          {label:'Detail',to:'/administrator/categories/detail-?'}
        ]
        //content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
      }, {
        label: 'Customers',
        icon: 'i-material-symbols-light-perm-contact-calendar-outline-rounded',
        to:'/administrator/customers',
        //content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
      }, {
        label: 'Suppliers',
        icon: 'i-material-symbols-light-forklift-rounded',
        to:'/administrator/suppliers',
        //content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
      },
       {
        label: 'Utilities',
        icon: 'i-heroicons-wrench-screwdriver',
        to:'/administrator/utilities',
        //content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
      },
      {
        label: 'Settings',
        icon: 'i-material-symbols-light-settings-rounded',
        to:'/administrator/settings',
        items:[
          {
            label:'Profile',
            to:'/administrator/profile'
          },
          {
            label:'Security',
            to:'/administrator/security'
          },
        ]
        //content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
      }
      ]
    
   }),
  actions: {}
})
