<template>
<!-- Page Content -->
    <div class="container">

      <div class="row">

        <!-- Post Content Column -->
        <div class="col-sm-10 offset-sm-1">

          <!-- Title -->
          <h2 class="mt-4">{{question.title}}</h2>
          <small>by: {{(question.ownerId) ? question.ownerId.email : ''}}</small>

          <hr>

        <div class="content-post text-justify" v-html="question.content"> {{question.content}}</div>

          <hr>
          <div>
              <small class="text-muted float-left"> Posted at : {{formatedDate(question.createdAt)}}</small> 
              <div class="float-right">
                <span class="answerCount">{{(question.answersId)? question.answersId.length : 0 }} Answer</span>
                <i class="far fa-thumbs-up btn" @click="voteQuestionUpClick"></i> <span class="voteScore p-2">{{ votes }}</span> 
                <i class="btn far fa-thumbs-down" @click="voteQuestionDownClick"></i>
              </div>
              <div class="clearfix"></div>
          </div>
          <hr>
          <!-- Answer Form -->
          <div class="card my-4" v-if="currUser.id">
            <h5 class="card-header">Leave a Answer:</h5>
            <div class="card-body">
              <form>
                <div class="form-group">
                  <Vueditor></Vueditor>
                </div>
                <button type="submit" class="btn btn-warning" @click.prevent="addAnswerClick">Answer</button>
              </form>
            </div>
          </div>

          <!-- Single Answer -->
        <div class="card border-warning mb-3" v-for="(answer,index) in question.answersId" :key="index">
          <div class="card-header bg-warning border-warning">
              <span class="float-left">{{answer.ownerId.username}}</span>
              <small class="float-right text-muted">{{formatedDate(answer.createdAt)}}</small>
          </div>
          <div class="card-body">
            <p class="card-text" v-html="answer.answer">{{answer.answer}}</p>
          </div>
          <div class="card-footer bg-transparent border-warning">
              <i class="far fa-thumbs-up btn" @click="voteAnswerUpClick(answer)"></i> <span class="voteScore p-2">{{ votesAnswer(answer) }}</span> 
              <i class="btn far fa-thumbs-down" @click="voteAnswerDownClick(answer)"></i>
          </div>
        </div>
        </div>
      </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import swal from "sweetalert2";

export default {
  methods: {
    ...mapActions([
      "getQuestionById",
      "addAnswer",
      "voteQuestionUp",
      "voteQuestionDown",
      "voteAnswerUp",
      "voteAnswerDown"
    ]),
    votesAnswer(answer) {
      if (answer.votersUpId || answer.votersDownId) {
        return answer.votersUpId.length - answer.votersDownId.length;
      } else {
        return 0;
      }
    },
    formatedDate(strDate) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      const date = new Date(strDate);
      return (
        date.toLocaleDateString("en-US", options) + date.toLocaleTimeString()
      );
    },
    addAnswerClick() {
      console.log("answer click", this.$children[0].getContent());
      const answer = this.$children[0].getContent();
      if (answer) {
        let content = {
          answer,
          questionId: this.$route.params.id
        };
        this.addAnswer(content);
        this.$children[0].setContent("");
      }
    },
    voteQuestionUpClick() {
      if (localStorage.getItem("curr-token")) {
        this.voteQuestionUp(this.$route.params.id);
      } else {
        swal({
          type: "error",
          title: "Oops...",
          text: "Log-in first to vote!"
        });
      }
    },
    voteQuestionDownClick() {
      if (localStorage.getItem("curr-token")) {
        this.voteQuestionDown(this.$route.params.id);
      } else {
        swal({
          type: "error",
          title: "Oops...",
          text: "Log-in first to vote!"
        });
      }
    },
    voteAnswerUpClick(answer) {
      console.log("answer", answer);
      if (localStorage.getItem("curr-token")) {
        this.voteAnswerUp(answer);
      } else {
        swal({
          type: "error",
          title: "Oops...",
          text: "Log-in first to vote!"
        });
      }
    },
    voteAnswerDownClick(answer) {
      if (localStorage.getItem("curr-token")) {
        this.voteAnswerDown(answer);
      } else {
        swal({
          type: "error",
          title: "Oops...",
          text: "Log-in first to vote!"
        });
      }
    }
  },
  computed: {
    ...mapState(["question", "currUser"]),
    votes() {
      //   if (this.question.votersId) {
      //     return this.question.votersId.length;
      if (this.question.votersUpId || this.question.votersDownId) {
        return (
          this.question.votersUpId.length - this.question.votersDownId.length
        );
      } else {
        return 0;
      }
    }
  },
  mounted() {
    console.log("created question detail");
    let id = this.$route.params.id;
    this.getQuestionById(id);
  }
};
</script>

<style scoped>
.voteScore {
  font-weight: bold;
  font-size: 18px;
}

.answerCount {
  font-weight: bold;
  font-size: 18px;
}
.vueditor {
  height: 200px;
  text-align: left;
}
</style>


