export default {

    data(){
        return{

        }
    },


    methods:{
        $_searchInputCleaned(inputId){
            this.$store.commit('BaseComponents/setValueInputSearch', {'key': inputId, 'value': null})
        },

    },

    computed: {

    },


}