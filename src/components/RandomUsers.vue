<template>
  <div class="flex flex-col md:flex-row h-screen md:h-auto">
    <div
      class="w-full overflow-x-auto md:w-2/6 md:overflow-y-auto flex md:block flex-col md:items-center"
    >
      <h1
        class="text-lg lg:text-2xl text-left uppercase font-semibold pl-0 p-10 md:pl-10 pt-5"
      >
        Random Users
      </h1>
      <div
        class="text-center text-sm font-semibold p-5 absolute top-16 lg:top-20 z-10 mx-auto pl-0"
        v-if="isMobile"
      >
        Swipe to scroll users
      </div>
      <div
        v-if="loading"
        class="flex items-center justify-center h-screen mx-auto flex-col gap-5"
      >
        <img
          src="../assets/images/loading.svg"
          alt="Loading"
          class="w-20 h-20 animate-spin"
        />
        <p class="text-center text-xl font-semibold">Loading...</p>
      </div>

      <div v-else class="flex flex-nowrap relative">
        <ul
          class="flex flex-row md:flex-col justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 gap-5 relative"
        >
          <li
            class="border-2 border-gray-300 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 ease-in-out lg-w-auto w-56 lg:w-80 flex flex-col items-center justify-center h-48 md:h-64 overflow-auto scroll-mt-5 first:mt-4 md:first-mt-0 md:first:ml-4"
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
              class="text-md lg:text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 ease-in-out block text-ellipsis overflow-hidden ..."
            >
              {{ user.name.title }}. {{ user.name.first }} {{ user.name.last }}
            </a>
            <button
              @click="selectUser(user)"
              class="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:shadow-md transition-shadow duration-200 ease-in-out cursor-pointer"
            >
              More Info
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="w-full md:w-7/12 lg:w-8/12 md:fixed md:right-0 md:h-screen flex-col md:items-center md:justify-center mx-auto border-l-0 md:border-l-2 border-gray-300"
    >
      <h1 class="text-lg lg:text-2xl uppercase font-semibold p-5 pt-10 lg:p-10">
        User Details
      </h1>
      <p v-if="!selectedUser">No user has been selected yet</p>
      <UserDetail v-if="selectedUser" :user="selectedUser" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import UserDetail from "./UserDetail.vue";

export default {
  components: {
    UserDetail,
  },
  setup() {
    const users = ref([]);
    const loading = ref(false);
    const selectedUser = ref(null);
    const isMobile = ref(false);

    const fetchUsers = async () => {
      loading.value = true;
      try {
        const response = await fetch("https://randomuser.me/api/?results=20");
        const data = await response.json();
        users.value = data.results;
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    const selectUser = (user) => {
      selectedUser.value = user;
    };

    const checkScreenSize = () => {
      isMobile.value = window.innerWidth <= 640;
    };

    onMounted(() => {
      window.addEventListener("resize", checkScreenSize);
      checkScreenSize();
    });

    onUnmounted(() => {
      window.removeEventListener("resize", checkScreenSize);
    });

    onMounted(fetchUsers);

    return { users, loading, selectedUser, selectUser, isMobile };
  },
};
</script>
