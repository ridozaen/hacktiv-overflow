<template>
  <div class="home">
    <div class="container">
        <div class="row">
          <!-- question Form -->
          <div class="col-sm-8 offset-sm-2">
          <div class="card mt-3 mb-5" v-if="currUser.id">
            <h5 class="card-header">What Your Question?</h5>
            <div class="card-body">
              <div class="card-title">
                <input type="text" class="form-control" placeholder="title" v-model="title">
              </div>
              <form>
                <div class="form-group">
                  <Vueditor></Vueditor>
                </div>
                <button type="submit" class="btn btn-warning"
                @click.prevent="addQuestionClick">Question</button>
              </form>
            </div>
          </div>
          </div>
          <list-questions></list-questions>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ListQuestions from "@/components/ListQuestions.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "home",
  data(){
    return{
      title: '',
      content: ''
    }
  },
  components: {
    ListQuestions
  },
  computed: {
    ...mapState([
      'currUser',
      'question'
    ])
  },
  methods: {
    ...mapActions([
    'getQuestionList',
    'loginActions',
    'addQuestion'
    ]),
    addQuestionClick(){
      console.log('add Question click', this.$children[0].getContent())
      this.content = this.$children[0].getContent()
      if(this.content){
        this.addQuestion({title: this.title,content: this.content})
        this.title = ''
        this.$children[0].setContent('');
      }
    }
  },
  created() {
    this.getQuestionList();
    if(localStorage.getItem('curr-token')){
      this.loginActions({
        token: localStorage.getItem('curr-token'),
        email: localStorage.getItem('curr-email'),
        username: localStorage.getItem('curr-user')
      })
    }
  }
};
</script>

<style scoped>
.vueditor{
    height: 200px;
    text-align: left;
}
.ve-toolbar i{
  font-size: 8px;
}
</style>

