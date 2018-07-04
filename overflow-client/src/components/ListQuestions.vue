<template>
    <div class="col-sm-10 offset-sm-1">
        <h1 class="text-center">Latest Questions</h1>
        <div class="list-group">
            <div class="list-group-item p-1 border-0" v-for="(question,index) in questions" :key="index">
                <div class="input-group">
                    <div class="input-group-prepend border-warning">
                      <div class="btn btn-light border border-warning p-2">
                          <div>{{votes(question)}}</div>
                          <small>Votes</small>
                     </div>
                      <div class="btn btn-light border border-warning p-2">
                          <div>{{question.answersId.length}}</div>
                          <small>Answer</small>
                     </div>
                    </div>
                    <router-link :to="{ name: 'question_detail', params: { id: question._id } }"
                    tag="div" class="form-control border-warning pointer">
                       <div class="question"> {{question.title}}</div>
                       <div class="meta text-muted mt-3 float-left">posted by: {{question.ownerId.email}}</div>
                        <div class="meta text-muted mt-3">{{formatedDate(question.createdAt)}}</div>
                    </router-link>   
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ListQuestion",
  data() {
    return {
      // questions: []
    };
  },
  methods: {
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
    votes(question) {
      //   if (this.question.votersId) {
      //     return this.question.votersId.length;
      if (question.votersUpId || question.votersDownId) {
        return (
          question.votersUpId.length - question.votersDownId.length
        );
      } else {
        return 0;
      }
    }
  },
  computed: {
    ...mapState(["questions"])
  }
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
.pointer:hover {
  background-color: #e9ecef;
}
</style>


