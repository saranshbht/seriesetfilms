<template>
  <v-snackbar color="red" v-model="snackbar" :timeout="timeout">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  export default {
    name: 'Snackbar',
    props: {
      text: String,
      value: Boolean
    },
    computed: {
      snackbar: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        }
      }
    },
    data() {
      return {
        timeout: 2000
      };
    }
  };
</script>

<style scoped></style>
