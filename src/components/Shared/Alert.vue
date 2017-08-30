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
      error: true,
      info: false,
      warning: false,
      success: false
    }
  },
  created () {
    if (this.response.type === 'error') {
      this.error = true
    } else if (this.type === 'info') {
      this.response.type = true
    } else if (this.type === 'warning') {
      this.response.type = true
    } else if (this.type === 'success') {
      this.response.type = true
    }
  },
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>
