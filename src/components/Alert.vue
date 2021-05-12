<template>
  <v-alert :type="type" dismissible @input="onClose" :value="true">
    {{ text }}
  </v-alert>
</template>

<script>
  export default {
    name: 'Alert',
    props: ['text', 'type'],
    methods: {
      onClose() {
        this.$emit('dismissed');
      }
    }
  };
</script>
