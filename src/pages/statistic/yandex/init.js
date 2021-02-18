export default {

    data() {
        return{
            initFailed: true
        }
    },

    methods: {
      async  dataInit () {

            try {
               await this.$store.dispatch('StatisticYandex/getItems', {
                    endpoint: '/data',
                    urlParams: {
                        preset: 'sources_search_phrases',
                        limit: '20',
                    },
                    key: 'sourcesSearchPhrases'

                })

                await this.$store.dispatch('StatisticYandex/getItems', {
                    endpoint: '/data/bytime',
                    urlParams: {
                        metrics:'ym:s:hits',
                        date1:'365daysAgo',
                        date2:'today',
                        group:'day',
                    },
                    key: 'visitsAllMonth'

                })

                await this.$store.dispatch('StatisticYandex/getItems', {
                    endpoint: '/data',
                    urlParams: {
                        metrics: 'ym:s:users',
                        dimensions: 'ym:s:trafficSource',

                    },
                    key: 'sourcesUsers'

                })

                await this.$store.dispatch('StatisticYandex/getItems', {
                    endpoint: '/data/comparison',
                    urlParams: {
                        metrics: 'ym:s:visits',
                        filters_a: `ym:s:isMobile=='Yes'`,
                        filters_b: `ym:s:isMobile=='No'`,

                    },
                    key: 'visitsDevice'

                })



                await this.$store.dispatch('StatisticYandex/getItems', {
                    endpoint: '/data/bytime',
                    urlParams: {
                        date1: '30daysAgo',
                        date2: 'today',
                        group: 'all',
                        dimensions: 'ym:s:regionArea',
                        metrics: 'ym:s:visits',
                        limit: '10'

                    },
                    key: 'visitsGeography'

                })



                this.initFailed = false;
            }
            catch (err){
                console.error('Ошибка инициализации данных', err)
                this.initFailed = true;
            }
        },
    },
}