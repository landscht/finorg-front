<template>
  <el-container style="text-align: center">
    <el-header>
      <h1>Bienvenu sur Finorg</h1>
    </el-header>
    <el-main>
      <el-card class="card-center">
        <el-form :model="user" :rules="rules" ref="user" label-position="right" label-width="150px">
          <el-form-item>
            <span><b>Inscrivez vous!</b></span>
          </el-form-item>
          <el-form-item label="Nom d'utilisateur" prop="username">
            <el-input size="medium" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="user.email"></el-input>
          </el-form-item>

          <el-form-item label="Mot de passe" prop="password">
            <el-input show-password show-word-limit v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item label="Confirmation" prop="confirmPassword">
            <el-input show-password show-word-limit v-model="user.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <span>Vous avez deja un compte, <router-link to="/login">connectez vous</router-link></span>
          </el-form-item>
          <el-form-item>
            <el-button round type="primary" @click="signup('user')">S'inscrire</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import {User} from "@/models/user";
import {Profile} from "@/models/profile";

export default {
  name: "Signup",
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Veuillez confirmer votre mot de passe'));
      } else if (value !== this.user.password) {
        callback(new Error('Les mots de passe ne correspondent pas'));
      } else {
        callback();
      }
    };
    let validateEmail = (rule, value, callback) => {
      const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (value === '') {
        callback(new Error('Veuillez entrer votre adresse mail'));
      } else if (!value.match(pattern)) {
        callback(new Error('Adresse mail invalide'));
      } else {
        callback();
      }
    };
    return {
      user: Object.assign(new User(), {
        username: '',
        password: '',
        email: '',
        profile: new Profile(),
        confirmPassword: ''
      }),
      rules: {
        username: [
          {required: true, message: 'Veuillez entrez votre nom d\'utilisateur', trigger: 'blur'},
          {min: 3, max: 20, message: 'Le nom d\'utilisateur doit faire entre 3 et 20 caractères', trigger: 'blur'}
        ],
        email: [
          {required: true, validator: validateEmail, trigger: 'blur'}

        ],
        password: [
          {required: true, message: 'Veuillez entrez votre mot de passe', trigger: 'blur'},
          {min: 6, max: 120, message: 'Le mot de passe doit faire entre 6 et 120 caractères', trigger: 'blur'}

        ],
        confirmPassword: [
          {required: true, validator: validatePass2, trigger: 'blur'}
        ]

      }
    }
  },
  methods: {
    signup(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('auth/register', this.user).then(
              () => {
                this.$router.push('/login');
              },
              error => {
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                this.successful = false;
              }
          );
        }
      })
    }
  }
}
</script>

<style scoped>
  .card-center {
    margin: auto;
    max-width: 600px;
    text-align: left;
  }

</style>
