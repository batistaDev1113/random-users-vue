<template>
  <div class="w-3/4 lg:w-2/4 inset-x-0 mx-auto">
    <div
      v-if="userProp"
      class="border-2 border-gray-300 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 ease-in-out w-full flex flex-col items-center justify-center ml-0 sm:first:ml-4"
    >
      <img
        :src="userProp.picture.large"
        :alt="userProp.name.first"
        class="rounded-full"
      />
      <h2
        class="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 ease-in-out pt-5"
      >
        {{ userProp.name.title }}. {{ userProp.name.first }}
        {{ userProp.name.last }}
      </h2>
      <p class="text-gray-600">{{ userProp.email }}</p>
      <p class="text-gray-600">{{ userProp.cell }}</p>
      <p class="text-gray-600">
        {{ userProp.location.street.number }}
        {{ userProp.location.street.name }}
      </p>
      <p class="text-gray-600">
        {{ userProp.location.city }},{{ userProp.location.state }},
        {{ userProp.location.country }}
      </p>
      <p class="text-gray-600">{{ userProp.dob.age }} years old</p>
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";

export default {
  props: ["user"],
  setup(props) {
    const { user: userProp } = toRefs(props);
    return { userProp };
  },
};
</script>
