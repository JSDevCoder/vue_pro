<template>
    <div class="login">
        <h3>用户登录</h3>
        <Form ref="form" :model="formData" :rules="rules">
            <FormItem label="名称: " prop="name">
                <Input v-model="formData.name"></Input>
            </FormItem>
            <FormItem label="邮箱: " prop="mail">
                <Input v-model="formData.mail"></Input>
            </FormItem>

            <button class="btn" @click="handleSubmit">提交</button>
            <button class="btn" @click="handleReset">重置</button>
        </Form>
    </div>
</template>

<script>
import Form from '@/components/form/Form'
import FormItem from '@/components/form/FormItem'
import Input from '@/components/Input'
export default {
    data() {
        return {
            formData: {name: '', mail: ''},
            rules: {
                name: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
                mail: [
                    {required: true, message: '邮箱号不能为空', trigger: 'blur'},
                    {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                ]
            }
        }
    },

    components: {
        Form,
        FormItem,
        Input
    },

    methods: {
        handleSubmit() {
            this.$refs.form.validate(valid => {
                if(valid) console.log('提交成功')
                else console.log('效验失败')
            });
        },

        handleReset() {
            this.$refs.form.resetFields();
        }
    }
}
</script>

<style lang="less" scoped>
.btn{
    width:60px;
    height:36px;
    background-color:#fff;
    border:1px solid #d8d8d8;
    margin-top:10px;
    margin-right:10px;
}
</style>