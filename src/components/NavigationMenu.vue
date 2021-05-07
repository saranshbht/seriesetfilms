<template>
  <v-list>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>John Leider</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <template v-for="(item, index) in items">
      <v-list-item :href="item.href" :to="item.href" :key="index">
        <v-list-item-action>
          <v-icon light v-html="item.icon"></v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-html="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  props: ["items"],
};
</script>

<style>
</style>