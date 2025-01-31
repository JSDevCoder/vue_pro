export default {
    methods: {
        dispatch(componentName, eventName, params){
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;

            while(parent && (!name || name !== componentName)){
                parent = parent.$parent;
                if(parent) parent.$options.name;
            }

            if(parent) parent.$emit.apply(parent, [eventName].concat(params));
        }
    }
}