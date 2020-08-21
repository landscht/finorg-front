<template>
  <el-container style="text-align: center">
    <el-header>
      <h1>Bienvenu sur Finorg</h1>
    </el-header>
    <el-main>
      <el-card class="card-center" v-loading="loading">
        <el-form :model="user" label-position="right" label-width="150px" :rules="rules" ref="user">
          <el-form-item>
            <span><b>Heureux de vous revoir, Connectez vous!</b></span>
          </el-form-item>
          <el-form-item label="Nom d'utilisateur" prop="username">
            <el-input v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="Mot de passe" prop="password">
            <el-input show-password show-word-limit v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item>
            <span>Vous n'avez pas de compte, <router-link to="/signup">Inscrivez vous</router-link>!</span>
          </el-form-item>
          <el-form-item>
            <el-button round type="primary" @click="handleLogin('user')">Se connecter</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import {User} from "@/models/user";

export default {
  name: "Login",
  data: () => ({
    loading: false,
    user: Object.assign(new User(), {
      username: '',
      password: ''
    }),
    rules: {
      username: [
        {required: true, message: 'Veuillez entrez votre nom d\'utilisateur', trigger: 'blur'}
      ],
      password: [
        {required: true, message: 'Veuillez entrez votre mot de passe', trigger: 'blur'}
      ]
    }
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/home');
    }
  },
  methods: {
    handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.loading = true;
          this.$store.dispatch('auth/login', this.user).then(
              () => {
                this.$notify({
                  title: 'Connexion réussi',
                  customClass: 'notification',
                  message: 'Profitez de Finorg!'
                })
                this.$router.push('/home');
              },
              (error) => {
                console.log(error);
                this.$notify({
                  type: 'error',
                  customClass: 'notification',
                  title: 'Mauvais identifiants',
                  message: 'Le nom d\'utilisateur ou le mot de passe est incorrect'
                })
                this.loading = false;
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
