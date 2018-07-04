<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <router-link class="navbar-brand" :to="{name: 'home'}">
                Hacktiv Overflow
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <router-link tag="li" class="nav-item" :to="{name: 'home'}">
                        <a class="nav-link" href="#">Home</a>
                    </router-link>
                    <li class="nav-item" v-if="currUser.id">
                        <a class="nav-link" href="#" @click="logout">Logout</a>
                    </li>
                    <router-link tag="li" class="nav-item" :to="{name: 'user', params: {id: currUser.id}}">
                        <a href="#" class="nav-link">{{currUser.email}}</a>
                    </router-link>
                    <router-link tag="li" class="nav-item" :to="{name: 'login'}"
                    v-if="!currUser.id">
                        <a class="nav-link" href="#">Login</a>
                    </router-link>
                    <router-link tag="li" class="nav-item" :to="{name: 'register'}"
                    v-if="!currUser.id">
                        <a class="nav-link" href="#">Sign up</a>
                    </router-link>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
    methods:{
        ...mapMutations([
            'setCurrUser',
            'clearCurrUser'
        ]),
        logout(){
            localStorage.clear()
            this.clearCurrUser()
            this.$router.push('/')
        }
    },
    computed: {
        ...mapState([
            'currUser'
        ])
    },
    created(){
    if(localStorage.getItem('curr-token')){
      this.setCurrUser()
    }
}
}
</script>
<style scoped>

</style>


