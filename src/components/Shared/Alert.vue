<template>
  <v-alert 
    :error="error" 
    :info="info" 
    :warning="warning" 
    :success="success" 
    dismissible 
    @input="onClose" 
    :value="true">
    {{response.message}}
  </v-alert>
</template>

<script>
export default {
  props: ['response'],
  data () {
    return {
      error: false,
      info: false,
      warning: false,
      success: false
    }
  },
  created () {
    if (this.response.type === 'error') {
      this.error = true
    } else if (this.response.type === 'info') {
      this.info = true
    } else if (this.response.type === 'warning') {
      this.warning = true
    } else if (this.response.type === 'success') {
      this.success = true
    } else {
      this.info = true
    }
  },
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>
