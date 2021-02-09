export default {

    data() {
        return{
            initFailed: true,

        }
    },

    methods: {
        async dataInit () {

            try {
                await this.$store.dispatch("NewsArticles/pullNewsItemDetails", this.$route.params.id);
                await this.$store.dispatch('NewsCategory/GetData')

                // this.$store.commit('BaseComponents/setValueInputText', {'key': 'news-article-edit-name-input', 'value': this.initDataSet.name})
                // this.$store.commit('BaseComponents/setValueTextArea', {'key': this.descriptionInputId, 'value': this.initDataSet.preview.text})
                // this.$store.commit('BaseComponents/setValueInputIndex', {'key': 'news-articles-edit-id-input', 'value': this.initDataSet.id})

                // this.$store.commit('BaseComponents/setValueHtmlEditor', {'key': 'news-article-edit-html-editor', 'value': this.initDataSet.content})

                // this.$store.commit('TempDataCatalog/setValueInputCatalog', {'key': this.categoriesNewsId, 'value': this.initDataSet.category})
                this.initFailed = false
            }
            catch (err){
                console.error('Ошибка инициализации данных', err)
                this.initFailed = true;
            }
        },
    },
}