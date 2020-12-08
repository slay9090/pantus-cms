<template>
  <div>
    <input type="text" class="" v-model="task" @change="eventTodoAdd">
  </div>
</template>
<script>

export default {
name: "Test",
  data() {
    return {
    task: null,
      todos: ['1','2','3','4', '5'],
    }
  },
  methods: {
    eventTodoAdd(){
      let isUniq = true;
        this.todos.forEach(item => {
         item === this.task ? isUniq=false : null
        })
      isUniq ? this.todos.push(this.task) : null

    },
  },

}
</script>

<style scoped>
</style>
