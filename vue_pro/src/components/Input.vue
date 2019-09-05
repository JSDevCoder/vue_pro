<template>
    <div>
        <input class="ipt" ref="input" :type="type" :value="currentValue" @input="handleInput" @blur="handleBlur" />
    </div>
</template>

<script>
import Emitter from '@/mixins/emitter.js'
export default {
    name: 'Input',

    mixins: [Emitter],

    props: {
        type: {
            type: String,
            default: 'text'
        },

        value: {
            type: String,
            default: ''
        }
    },

    watch: {
        value(value) {
            this.currentValue = value;
        }
    },

    data() {
        return {
            currentValue: this.value,
            id: this.lable
        }
    },

    mounted() {
        if(this.$parent.labelFor) this.$refs.input.id = this.$parent.labelFor;
    },

    methods: {
        handleInput(e) {
            const value = e.target.value;
            this.currentValue = value;
            this.$emit('input', value);
            console.log(value)
            this.dispatch('FormItem', 'form-change', value);
        },

        handleBlur() {
            this.dispatch('FromItem', 'form-blur', this.currentValue);
        }
    }
}
</script>

<style lang="less" scoped>
.ipt{
    display:block;
    padding:0 10px;
    height:36px;
    border:1px solid #d8d8d8;
    background-color:#fff;
    transition: all .3s;
}
</style>