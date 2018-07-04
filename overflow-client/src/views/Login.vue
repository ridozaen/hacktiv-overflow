<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-4 offset-sm-4 p-2">
                <div class="card border-warning">
                    <article class="card-body">
                        <router-link class="float-right btn btn-outline-warning" to="/register">Sign up</router-link>
                        <h4 class="card-title mb-4 mt-1">Sign in</h4>
                        <p>
                            <a href="" class="btn btn-block btn-primary" @click.prevent="loginFacebook"> <i class="fab fa-facebook-f"></i>   Login via facebook</a>
                        </p>
                        <hr>
                        <form>
                            <div class="form-group" :class="{invalid: $v.email.$error}">
                                <input name="email" class="form-control" placeholder="email" type="email"
                                @blur="$v.email.$touch()"
                                v-model="email">
                                <p v-if="!$v.email.required  && $v.email.$dirty" class="error">Field is required</p>
                                <p v-if="!$v.email.email" class="error">Invalid email address</p>
                            </div> <!-- form-group// -->
                            <div class="form-group" :class="{invalid: $v.password.$error}">
                                <input name="password" class="form-control" placeholder="password" type="password"
                                @blur="$v.password.$touch()"
                                v-model="password">
                                <p v-if="!$v.password.required && $v.password.$dirty" class="error">Field is required</p>
                            </div> <!-- form-group// -->                                      
                            <div class="form-group">
                                <button type="submit" class="btn btn-warning btn-block" @click.prevent="login"> Login  </button>
                            </div> <!-- form-group// --> 
                            <div class="alert alert-danger" v-if="submitStatus === 'ERROR'">
                                {{messages}}
                            </div>
                            <div class="alert alert-success" v-if="submitStatus === 'OK'">
                                {{messages}}
                            </div>
                            <div class="alert alert-info" v-if="submitStatus === 'PENDING'">
                                {{messages}}
                            </div>                                                               
                        </form>
                    </article>
                </div> <!-- card.// -->
            </div>
        </div>
    </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import axios from "axios";
import { eventBus } from "../main";
import { mapActions } from 'vuex';

export default {
  /* eslint-disable */
  data() {
    return {
      email: "",
      password: "",
      username: "",
      token: null,
      submitStatus: null,
      messages: null
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
      ...mapActions([
          'loginActions'
      ]),
    login: function() {
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        this.messages = "Please fill the form correctly";
      } else {
        let loginData = {
          email: this.email,
          password: this.password,
          fbId: this.fbId
        };
        axios
          .post(`users/login`, loginData)
          .then(result => {
            console.log(result);
            this.token = result.data.token;
            this.email = result.data.email;
            this.username = result.data.username;
            localStorage.setItem("curr-token", this.token);
            localStorage.setItem("curr-email", this.email);
            localStorage.setItem("curr-user", this.username);
            this.loginActions({
              username: this.username,
              email: this.email,
              token: this.token
            })
            this.submitStatus = "OK";
            this.messages = `Thanks  for your submission!`;
            this.$router.push({ name: "home" });
          })
          .catch(err => {
            //   console.log(err.response.data);
            let error = err.response.data.error.message;
            this.submitStatus = "ERROR";
            this.messages = `${error}`;
          });
        this.submitStatus = "PENDING";
        this.messages = "Sending...";
      }
    },
    loginFacebook: function() {
      // console.log("this: ", this);
      console.log("login with facebook");
      let self = this;
      FB.getLoginStatus(function(response) {
        console.log('staus: ',response.status)
        if (response.status !== "connected") {
          FB.login(
            function(response) {
              if (response.authResponse) {
                self.statusChangeCallback(response);
              } else {
                console.log("User cancelled login or did not fully authorize.");
              }
            },
            { scope: "public_profile,email" }
          );
        } else {
          self.statusChangeCallback(response);
        }
      });
    },
    statusChangeCallback: function(response) {
      // get token from backend
      let fbtoken = response.authResponse.accessToken;
      axios
        .post(`users/login/viafb`, {}, { headers: { fbtoken } })
        .then(result => {
          console.log(result.data);
          this.username = result.data.username
          this.token = result.data.token;
          this.email = result.data.email;
          localStorage.setItem("curr-token", this.token);
          localStorage.setItem("curr-email", this.email);
          localStorage.setItem("curr-user", this.username);
          this.loginActions({
              username: this.username,
              email: this.email,
              token: this.token
          })
          this.submitStatus = "OK";
          this.messages = `Thanks  for your submission!`;
          this.$router.push({ name: "home" });
        })
        .catch(err => {
          // console.log(err.response);
          let error = err.response;
          this.submitStatus = "ERROR";
          this.messages = `${error}`;
        });

      FB.api("/me?fields=id,name,email", function(profile) {
        console.log("Successful login for: " + profile.id);
        console.log("Successful login for: " + profile.name);
        console.log("Successful login for: " + profile.email);
        let email = profile.email;
      });
    }
  },
  created: function() {
    this.token = localStorage.getItem("curr-token");
    if (this.token) {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style scoped>
.form-group.invalid input {
  border: 1px solid red;
  background-color: #f2dede;
}
.form-group input:focus {
  border: none;
  outline: 0;
  box-shadow: 0px;
}
.error {
  font-size: 11px;
  color: red;
}
.alert {
  font-size: 12px;
}
</style>
