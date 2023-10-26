<template>
  <a-table :columns="columns" :data-source="data" :pagination="false">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <div class="btn-container">
          <button
            @click="editMethod(record.id)"
            id="edit-btn"
            class="ant-dropdown-link"
          >
            <font-awesome-icon icon="pen" />
          </button>
          <button
            @click="deleteMethod(record.id)"
            id="edit-trash"
            class="ant-dropdown-link"
          >
            <font-awesome-icon icon="trash" />
          </button>
        </div>
      </template>
    </template>
  </a-table>
</template>
  
  <script>
export default {
  props: {
    columns: Array,
    data: Array,
    deleteMethod: {
      type: Function,
    },
    editMethod: {
      type: Function,
    },
  },
};
</script>
  
<style scoped>
button {
  background: transparent;
  border: none;
}
button svg {
  width: 20px;
}
</style>