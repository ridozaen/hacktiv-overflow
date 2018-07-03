<template>
    <div class="col-sm-10 offset-sm-1">
        <h1 class="text-center">List of Questions</h1>
        <div class="list-group">
            <div class="list-group-item p-1 border-0" v-for="(question,index) in questions" :key="index">
                <div class="input-group">
                    <div class="input-group-prepend border-info">
                      <div class="btn btn-light border border-info p-2">
                          <div>10</div>
                          <small>Votes</small>
                     </div>
                      <div class="btn btn-light border border-info p-2">
                          <div>10</div>
                          <small>Answer</small>
                     </div>
                    </div>
                    <div class="form-control border-info">
                       <div class="question"> {{question.title}}</div>
                        <div class="meta text-muted mt-3">Created at : Monday, July 12 2018</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'


export default {
    name: 'ListQuestion',
    data(){
        return{
            questions: []
        }
    },
    computed: {
        ...mapState[
            'questions']
    }
}
</script>
<style scoped>
</style>


