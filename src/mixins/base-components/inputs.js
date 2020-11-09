export default {

    data(){
        return{

        }
    },


    methods:{
        $_searchInputCleaned(inputId){
            this.$store.commit('BaseComponents/setValueNewsInputSearch', {'key': inputId, 'value': null})
        },

    },

    computed: {

    },


}