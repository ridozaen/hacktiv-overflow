<template>
  <div class="home">
    <div class="container">
        <div class="row">
          <list-questions></list-questions>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ListQuestions from "@/components/ListQuestions.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "home",
  components: {
    HelloWorld,
    ListQuestions
  },
  methods: {
    ...mapActions(['getQuestionList'])
  },
  created() {
    this.getQuestionList();
  }
};
</script>
