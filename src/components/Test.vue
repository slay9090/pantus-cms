<template>
  <div>
<!--    <b-form   >-->


      <b-form-group id="input-group-2" label="Your city:" label-for="input-2">
        <b-form-input
            id="input-2"
            v-model="form.name"
            required
            placeholder="Enter city"
            @input="getCity"
        ></b-form-input>
      </b-form-group>



<!--      <b-button type="submit" variant="primary">Submit</b-button>-->

<!--    </b-form>-->
<div >
  <autocomplete  :items=arr />
</div>


   <div v-if="searchResponse.length!==0">  {{searchResponse[1]}} </div>



  </div>
</template>

<script>
 import Autocomplete from '../components/vue-suggestion';
import Axios from 'axios';
export default {

name: "Test",

  components:{
    Autocomplete,
  },

  data() {
    return {
      form: {

        name: '',

      },
      searchResponse:{},
      arr: [],

    }

  },
  methods: {

    getCity(){
      console.log(this.form.name)
      //delete Axios.defaults.headers.common["Host"];
      this.login();

    },


    login(){

      let axiosConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Headers': '*'
        }
      };

      Axios.get(`https://cors-anywhere.herokuapp.com/https://kladr-api.ru/api.php?query=${this.form.name}&contentType=city&withParent=1&token=ADy8fErZKZsbezdF37QbihtZSbiaabza&limit=10`, axiosConfig)
          .then((res) => {

            this.searchResponse=res.data.result

            console.log("RESPONSE RECEIVED: ", this.searchResponse.length);
            this.arr=[]
            this.arr.push(res.data.result[1].name)

          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          })
    },


  },
  computed:{

  },


}
</script>

<style scoped>

</style>
