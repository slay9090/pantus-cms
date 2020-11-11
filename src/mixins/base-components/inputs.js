export default {

    data(){
        return{
            storeNameOfBaseComponents: 'BaseComponents',
            inputType:{
                search: '/setValueInputSearch',
                index: '/setValueInputIndex',
                htmlEditor: '/setValueHtmlEditor',
                text: '/setValueInputText',
            }
        }
    },


    methods:{
        $_inputCleaned(nameMutations,inputId){
            this.$store.commit(this.storeNameOfBaseComponents+nameMutations, {'key': inputId, 'value': null})
        },

    },

    computed: {

    },


}