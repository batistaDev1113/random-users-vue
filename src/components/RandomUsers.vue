<template>
  <div>
    <h1 class="text-2xl uppercase font-semibold p-10">Random Users</h1>
    <ul
      class="flex flex-col flex-wrap justify-center lg:justify-start sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 gap-5"
    >
      <li
        class="border-2 border-gray-300 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 ease-in-out w-full sm:w-1/2 md:w-1/3 lg:max-w-md xl:max-w-xl flex flex-col items-center justify-center ml-0 sm:first:ml-4"
        v-for="user in users"
        :key="user.email"
      >
        <img
          :src="user.picture.medium"
          :alt="user.name.first"
          class="rounded-full"
        />
        <a
          :href="user.email"
          class="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 ease-in-out"
        >
          {{ user.name.title }}. {{ user.name.first }} {{ user.name.last }}
        </a>
        <router-link
          :to="{ name: 'UserDetail', params: { userId: user.id } }"
          class="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:shadow-md transition-shadow duration-200 ease-in-out cursor-pointer"
        >
          More Info
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const users = ref([]); // Create a reactive reference to an empty array

const fetchUsers = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/?results=20");
    const { results } = await response.json();
    users.value = results;
  } catch (error) {
    console.error("There has been an error fetching your data: ", error);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
