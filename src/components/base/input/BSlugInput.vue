<template>
  <ValidationProvider :vid="vid" :name="$attrs.name" :rules="rules">
    <b-form-group
        slot-scope="{ valid, errors }"
        v-bind="$attrs"
    >
      <b-form-input
          v-mask="mask"
          v-model="innerValue"
          v-bind="$attrs"
          :state="errors[0] ? false : (valid ? null : null)"
      >
      </b-form-input>
      <b-form-invalid-feedback id="inputLiveFeedback">
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </b-form-group>
  </ValidationProvider>
</template>

<script>
export default {
  name: "BSlugInput",

  props: {
    vid: {
      type: String
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    // must be included in props
    value: {
      type: null
    },
    mask: {},
    valueByWatch:{}
  },
  data: () => ({
    innerValue: '',

  }),

  methods: {
    transliterate(word) {

      let a = {
        "Ё": "YO",
        "Й": "I",
        "Ц": "TS",
        "У": "U",
        "К": "K",
        "Е": "E",
        "Н": "N",
        "Г": "G",
        "Ш": "SH",
        "Щ": "SCH",
        "З": "Z",
        "Х": "H",
        "Ъ": "'",
        "ё": "yo",
        "й": "i",
        "ц": "ts",
        "у": "u",
        "к": "k",
        "е": "e",
        "н": "n",
        "г": "g",
        "ш": "sh",
        "щ": "sch",
        "з": "z",
        "х": "h",
        "ъ": "'",
        "Ф": "F",
        "Ы": "I",
        "В": "V",
        "А": "a",
        "П": "P",
        "Р": "R",
        "О": "O",
        "Л": "L",
        "Д": "D",
        "Ж": "ZH",
        "Э": "E",
        "ф": "f",
        "ы": "i",
        "в": "v",
        "а": "a",
        "п": "p",
        "р": "r",
        "о": "o",
        "л": "l",
        "д": "d",
        "ж": "zh",
        "э": "e",
        "Я": "Ya",
        "Ч": "CH",
        "С": "S",
        "М": "M",
        "И": "I",
        "Т": "T",
        "Ь": "'",
        "Б": "B",
        "Ю": "YU",
        "я": "ya",
        "ч": "ch",
        "с": "s",
        "м": "m",
        "и": "i",
        "т": "t",
        "ь": "'",
        "б": "b",
        "ю": "yu"
      };
      return word.split('').map(function (char) {
        return a[char] || char;
      }).join("");
    },
    convertTextToSlug(text) {

      /// Временно
      if(text === undefined){return;}

      let str = this.transliterate(text)
      str = str.replace(/^\s+|\s+$/g, '');

      // Make the string lowercase
      str = str.toLowerCase();

      // Remove accents, swap ñ for n, etc
      let from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
      let to = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
      for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }
      // Remove invalid chars
      str = str.replace(/[^a-z0-9 -]/g, '')
          // Collapse whitespace and replace by -
          .replace(/\s+/g, '-')
          // Collapse dashes
          .replace(/-+/g, '-');
      return str;
    }
  },

  watch: {
    // Handles internal model changes.
    innerValue(newVal) {

      this.$emit('input', this.convertTextToSlug(newVal));
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    },

    valueByWatch(newVal){
      this.innerValue = newVal
    },

  },
  created() {
    if (this.valueByWatch) {
      this.innerValue = this.valueByWatch;
    }

    if (this.value) {
      this.innerValue = this.value;
    }

  }

}
</script>

<style scoped>

</style>