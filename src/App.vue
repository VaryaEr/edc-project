<script setup>
import Table from "./components/Table.vue";
</script>

<template>
  <div v-if="!isCreating && !isEditing">
    <a-button @click="createFilm()">Создать признак</a-button>
    <Table
      v-if="dataEl"
      :editMethod="editItem"
      :deleteMethod="deleteItem"
      :data="dataEl"
      :columns="columns"
    />
  </div>
  <div v-if="isCreating || isEditing">
    <div @click="closeAll()" class="close-block">Закрыть</div>
    <a-form :model="formState" @finish="onFinish">
      <a-form-item label="Название">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="Описание">
        <a-textarea v-model:value="formState.description" />
      </a-form-item>
      <a-form-item name="date-time-picker" label="Дата выхода">
        <a-date-picker
          v-model:value="formState.release_date"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>
      <a-button
        :disabled="disabled"
        type="primary"
        html-type="submit"
        class="login-form-button"
      >
        Сохранить
      </a-button>
    </a-form>
  </div>
</template>
<script>
import { useFilmStore } from "../src/stores/film";
export default {
  data() {
    return {
      dataEl: null,
      columns: [
        {
          title: "id",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Название",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Дата выхода",
          key: "release_date",
          dataIndex: "release_date",
        },
        {
          title: "Описание",
          key: "description",
          dataIndex: "description",
        },
        {
          title: "",
          key: "action",
        },
      ],
      formState: {
        name: "",
        description: "",
        release_date: "",
      },
      isCreating: false,
      isEditing: false,
    };
  },
  created() {
    this.updateDate();
  },
  computed: {
    disabled() {
      return (
        this.formState.name.length === 0 ||
        this.formState.description.length === 0 ||
        this.formState.release_date.length === 0
      );
    },
  },
  methods: {
    editItem(idEl) {
      this.isEditing = true;
      let filmsArray = JSON.parse(JSON.stringify(this.dataEl));
      let index = filmsArray.findIndex((el) => el.id == idEl);
      this.formState = filmsArray[index];
    },
    deleteItem(el) {
      useFilmStore().removeFilm(el);
      this.updateDate();
    },
    updateDate() {
      this.dataEl = useFilmStore().films || null;
    },
    createFilm() {
      this.isCreating = true;
    },
    onFinish() {
      if (this.isCreating) {
        useFilmStore().addFilm(JSON.parse(JSON.stringify(this.formState)));
        this.closeAll();
      } else if (this.isEditing) {
        useFilmStore().editFilm(JSON.parse(JSON.stringify(this.formState)));
      }
      this.closeAll();
      this.updateDate();
    },
    closeAll() {
      this.isCreating = false;
      this.isEditing = false;
      this.formState = {
        name: "",
        description: "",
        release_date: "",
      };
    },
  },
};
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
