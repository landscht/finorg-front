<template>
  <div class="toolbar">
    <h1>Finorg</h1>
    <div class="flex" v-if="this.$store.state.auth.status.loggedIn">
      <el-button style="margin-right: 10px" round type="danger"
                 @click="logout">Se déconnecter
      </el-button>
      <p>{{ this.$store.state.auth.user.username }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex {
  display: flex;
  align-items: center;
}
</style>
