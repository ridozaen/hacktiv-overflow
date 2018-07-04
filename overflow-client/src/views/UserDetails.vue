<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-3">
                <div class="card">
                <img class="card-img-top" src="https://api.adorable.io/avatars/280/" alt="Card image cap">
                <div class="card-body text-left">
                    <p class="card-text">Username: {{currUser.username}}</p>
                    <p class="card-text">Email: {{currUser.email}}</p>
                    <p class="card-text">User Id: {{currUser.id}}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Total question: {{questions.length}}</li>
                    <li class="list-group-item">Total answer: {{answers.length}}</li>
                </ul>
                </div>
            </div>
            <div class="col-sm-9">
                <h1 class="text-center">Your Questions List</h1>
                <div class="list-group">
                    <div class="list-group-item p-1 border-0" v-for="(question,index) in questions" :key="index">
                        <div class="input-group">
                            <div class="input-group-prepend border-warning">
                            <div class="btn btn-light border border-warning p-2">
                                <small class="btn" @click="editQuestionClick(question)">
                                    <a href="#"><i class="fas fa-edit"></i></a>
                                </small>
                            </div>
                            <div class="btn btn-light border border-warning p-2">
                                <small class="btn" @click="delQuestionClick(question)"><i class="fas fa-trash-alt"></i></small>
                            </div>
                            </div>
                            <router-link :to="{ name: 'question_detail', params: { id: question._id } }"
                            tag="div" class="form-control border-warning pointer">
                            <div class="question"> {{question.title}}</div>
                                <div class="meta text-muted mt-3">{{formatedDate(question.createdAt)}}</div>
                            </router-link>   
                        </div>
                    </div>
                </div>
                <h1 class="text-center mt-5">Your Answer List</h1>
                <div class="list-group">
                    <div class="list-group-item p-1 border-0" v-for="(answer,index) in answers" :key="index">
                        <div class="input-group">
                            <div class="input-group-prepend border-warning">
                            <div class="btn btn-light border border-warning p-2">
                                <div></div>
                                <small class="btn" @click="delAnswerClick(answer)"><i class="fas fa-trash-alt"></i></small>
                            </div>
                            <div class="btn btn-light border border-warning p-2">
                                <!-- <div></div> -->
                                <div class="question">
                                    <small> On question: {{answer.questionId.title}}</small></div>
                            </div>
                            </div>
                            <router-link :to="{ name: 'question_detail', params: { id: answer.questionId._id } }"
                            tag="div" class="form-control border-warning pointer">
                            <div class="question" v-html="answer.answer"> {{answer.answer}}</div>
                            <div class="meta text-muted mt-3">{{formatedDate(answer.createdAt)}}</div>
                            </router-link>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import swal from "sweetalert2";
export default {
  name: "userdetails",
  computed: {
    ...mapState(["questions", "currUser", "answers"])
  },
  methods: {
    ...mapActions([
      "findQuestionByUser",
      "findAnswerByUser",
      "editQuestion",
      "deleteQuestion",
      "deleteAnswer"
    ]),
    ...mapMutations(["setQuestion"]),
    votes(question) {
      //   if (this.question.votersId) {
      //     return this.question.votersId.length;
      if (question.votersUpId || question.votersDownId) {
        return question.votersUpId.length - question.votersDownId.length;
      } else {
        return 0;
      }
    },
    delQuestionClick(question) {
      if (this.currUser.role === "admin") {
        this.deleteQuestion(question);
      } else {
        swal({
          type: "error",
          title: "Oops...",
          text: "You must be admin to deleted!"
        });
      }
    },
    delAnswerClick(answer) {
      if (this.currUser.role === "admin") {
        this.deleteAnswer(answer);
      } else {
        swal({
          type: "error",
          title: "Oops...",
          text: "You must be admin to deleted!"
        });
      }
    },
    editQuestionClick(question) {
      this.setQuestion(question)
      this.$router.push({name: 'question_edit', params:{id:question._id}})
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
    }
  },
  created() {
    let id = this.$route.params.id;
    if (localStorage.getItem("curr-token")) {
      this.findQuestionByUser(id);
      this.findAnswerByUser(id);
    }
  }
};
</script>
<style scoped>
.card-body {
  font-size: 12px;
}
.pointer {
  cursor: pointer;
}
.pointer:hover {
  background-color: #e9ecef;
}
.question {
  text-align: left;
}
</style>


