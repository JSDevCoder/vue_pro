<template>
    <div>
        <label class="label" :for="labelFor" v-if="label" :class="{'label-required': isRequired}">{{label}}</label>
        <slot></slot>
        <div v-if="isShowMsg" class="message">{{message}}</div>
    </div>
</template>

<script>
import Emitter from '@/mixins/emitter.js'
import AsyncValidator from 'async-validator'
export default {
    name: 'FormItem',

    mixins: [Emitter],

    props: {
        label: {
            type: String,
            default: ''
        },

        prop: {
            type: String
        }
    },

    data() {
        return {
            labelFor: 'input_' + new Date().valueOf(),
            isRequired: false,
            isShowMsg: false,
            message: ''
        }
    },

    inject: ['form'],

    computed: {
        fieldValue() {
            console.log(this.form)
            return this.form.model[this.prop];
        }
    },

    mounted() {
        if(this.prop){
            this.dispatch('Form', 'form-add', this);
            this.initialValue = this.fieldValue;
            this.setRules();
        }
    },

    beforeDestroy() {
        this.dispatch('Form', 'form-remove', this);
    },

    methods: {
        setRules() {
            let rules = this.getRules();
            if(rules.length){
                rules.forEach(rule => {
                    if(rule.required !== undefined) this.isRequired = rule.required;
                });
            }

            this.$on('form-blur', this.onFieldBlur);
            this.$on('form-change', this.onFieldChange);
        },

        getRules() {
            let formRules = this.form.rules;
            formRules = formRules ? formRules[this.prop] : [];
            return formRules;
        },

        getFilteredRule(trigger) {
            const rules = this.getRules();
            return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
        },

        validate(trigger, cb) {
            let rules = this.getFilteredRule(trigger);
            if(!rules || rules.length === 0) return true;
            const validator = new AsyncValidator({[this.prop]: rules});
            let model = {[this.prop]: this.fieldValue};
            validator.validate(model, {firstField: true}, errors => {
                this.isShowMsg = errors ? true : false;
                this.message = errors ? errors[0].message : '';
                if(cb) cb(this.message);
            });
        },

        resetField() {
            this.message = '';
            this.form.model[this.prop] = this.initialValue;
        },

        onFieldBlur() {
            this.validate('blur');
        },

        onFieldChange() {
            this.validate('change');
        }
    }
}
</script>

<style lang="less" scoped>
.label-required:before {
    content: '*';
    color: red;
  }
  .message {
    font-size: 12px;
    color: red;
  }
  .label{
      display:block;
      height:36px;
      line-height:36px;
  }
</style>