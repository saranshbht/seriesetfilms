<template>
  <v-container fill-height fluid>
    <v-flex md4 sm6 xs10 mx-auto my-6>
      <v-container class="text-center">
        <v-card flat>
          <v-card-title primary-title>
            <h3>Welcome Back! &#x1F607;</h3>
          </v-card-title>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              outlined
              prepend-inner-icon="mdi-email"
              name="email"
              label="Email"
              type="email"
              v-model="email"
              :rules="emailRules"
              required
            >
            </v-text-field>

            <v-text-field
              outlined
              prepend-inner-icon="mdi-lock"
              name="password"
              label="Password"
              type="password"
              v-model="password"
              id="password"
              :rules="passwordRules"
              required
            >
            </v-text-field>

            <v-card-actions>
              <v-btn
                color="primary"
                large
                block
                :disabled="!valid"
                @click="submit"
                >Login</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-container>
      <v-footer class="justify-center my-6">
        Don't have an account yet?{{ '\xa0' }}
        <strong><router-link to="/signup">Sign up</router-link></strong>
      </v-footer>
      <Snackbar text="Failed to login!" v-model="showSnackbar" />
    </v-flex>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Snackbar from '@/components/Snackbar.vue';

  export default {
    name: 'Signin',
    components: {
      Snackbar
    },
    data() {
      return {
        valid: false,
        email: '',
        password: '',
        emailRules: [
          v => !!v || 'Email must be valid',
          v => /.+@.+/.test(v) || 'Email must be valid'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 6 || 'Password must be greater than 6 characters'
        ],
        showSnackbar: false
      };
    },
    computed: mapGetters(['getUser']),
    methods: {
      ...mapActions(['userSignIn']),
      async submit() {
        // console.log(this.getUser);
        if (this.$refs.form.validate()) {
          await this.userSignIn({
            email: this.email,
            password: this.password
          });
          if (!this.getUser) {
            this.showSnackbar = true;
          }
        }
      }
    }
  };
</script>

<style scoped></style>
