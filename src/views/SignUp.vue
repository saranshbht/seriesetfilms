<template>
  <v-container fill-height fluid>
    <!-- <v-flex xs3 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
        <v-card height="500px"></v-card>
      </v-flex> -->
    <v-flex md4 sm6 xs10 mx-auto my-6>
      <v-container class="text-center">
        <v-card flat>
          <v-card-title class="font-weight-black text-h4 justify-center">
            Register
          </v-card-title>
          <v-form ref="form" v-model="valid" lazy-validation>
            <!-- <v-text-field
              prepend-inner-icon="mdi-account"
              name="Name"
              label="Full Name"
              required
            >
            </v-text-field> -->
            <v-text-field
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
            <!-- <v-radio-group row>
              <v-radio on-icon="mdi-gender-male" label="Male" value="Male">
              </v-radio>
              <v-radio
                on-icon="mdi-gender-female"
                label="Female"
                value="Female"
              >
              </v-radio>
            </v-radio-group> -->
            <!-- <v-checkbox v-model="terms">
              <template v-slot:label>
                <div>I agree to the <a href="">Terms and Conditions</a></div>
              </template>
            </v-checkbox> -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                large
                block
                :disabled="!valid"
                @click="submit"
                >Sign up</v-btn
              >
            </v-card-actions>
          </v-form>

          <!-- <div class="my-6">
            <h2>OR</h2>
            <h3>Continue with...</h3>
          </div>
          <v-row justify="space-around" class="my-6">
            <v-icon color="red" large>mdi-google</v-icon>
            <v-icon color="indigo" large>mdi-facebook</v-icon>
            <v-icon color="black" large>mdi-apple</v-icon>
          </v-row> -->
        </v-card>
      </v-container>
      <v-footer class="justify-center my-6">
        Already have an account?{{ '\xa0' }}
        <strong><router-link to="/signin">Sign in</router-link></strong>
      </v-footer>
      <Snackbar text="Signing up failed!" v-model="showSnackbar" />
    </v-flex>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex';
  import Snackbar from '@/components/Snackbar.vue';
  export default {
    name: 'SignUp',
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
    methods: {
      ...mapActions(['userSignUp']),
      async submit() {
        if (this.$refs.form.validate()) {
          await this.userSignUp({
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
