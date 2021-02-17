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
                        metrics: 'ym:pv:pageviewsPerMinute',
                        group: 'day',
                        dimensions: 'ym:pv:date',
                        sort: 'ym:pv:date'
                    },
                    key: 'performanceWeek'

                })

                await this.$store.dispatch('StatisticYandex/getItems', {
                    endpoint: '/data',
                    urlParams: {
                        metrics: 'ym:pv:users',
                        dimensions: 'ym:pv:title,ym:pv:URLPathFull'
                    },
                    key: 'popularPages'

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