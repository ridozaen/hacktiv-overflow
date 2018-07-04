<template>
    <div class="container">
        <div class="row">
          <div class="col-sm-8 offset-sm-2">
          <div class="card mt-3 mb-5" v-if="currUser.id">
            <h5 class="card-header">Edit Your Question?</h5>
            <div class="card-body">
              <div class="card-title">
                <input type="text" class="form-control" placeholder="title" v-model="title">
              </div>
              <form>
                <div class="form-group">
                  <Vueditor></Vueditor>
                </div>
                <button type="submit" class="btn btn-warning"
                @click.prevent="editQuestionClick">Edit Question</button>
              </form>
            </div>
          </div>
          </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "formquestion",
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    ...mapActions(["getQuestionById", "editQuestion"]),
    ...mapMutations(["setQuestion"]),
    editQuestionClick() {
      let id = this.$route.params.id;
      let title = this.title;
      this.content = this.$children[0].getContent()
      this.editQuestion({ id, title, content: this.content });
      this.$router.push({name:'user', params:{id:this.currUser.id}})
    }
  },
  computed: {
    ...mapState(["question", "currUser", "questions"])
  },
  created() {
    console.log("created at form question");
    let id = this.$route.params.id;
    this.getQuestionById(id);
  },
  mounted() {
      this.$children[0].setContent(this.question.content);
      this.title = this.question.title
  }
}
</script>

