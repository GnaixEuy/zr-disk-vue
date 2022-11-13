<template>
    <div>
        <el-dialog title="修改个人信息" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
            <el-form :model="form" :rules="rules" ref="form" label-width="150px">
                <div class="updateinfo">
                    <div class="left">
                        <el-form-item label="头像" prop="avatar">
                            <img style="width:150px;height:110px" :src="form.avatar" />
                        </el-form-item>
                        <!-- <el-form-item label="账号密码" prop="password">
                            <el-input v-model="form.password"></el-input>
                        </el-form-item> -->
                        <el-form-item label="昵称" prop="nickname">
                            <el-input v-model="form.nickname"></el-input>
                        </el-form-item>
                        <el-form-item label="生日" prop="birthday">
                            <!-- <el-input type="date" v-model="form.birthday"></el-input> -->

                            <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="性别" prop="sex">
                            <el-switch v-model="form.gender" active-color="#13ce66" inactive-color="#ff4949"
                                active-text="男" inactive-text="女" :active-value="1" :inactive-value="2">
                            </el-switch>
                        </el-form-item>


                    </div>
                    <div class="right">
                        <el-form-item label="用户编号" prop="id">
                            <el-input v-model="form.id" disabled></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="账号" prop="account">
                            <el-input v-model="form.account" disabled></el-input>
                        </el-form-item> -->
                        <el-form-item label="地区" prop="area">
                            <el-input v-model="form.area"></el-input>
                        </el-form-item>
                        <el-form-item label="兴趣爱好" prop="hobby">
                            <el-input v-model="form.hobby"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="职业" prop="work">
                            <el-input v-model="form.work"></el-input>
                        </el-form-item> -->
                        <!-- <el-form-item label="个性签名" prop="design">
                            <el-input v-model="form.design"></el-input>
                        </el-form-item> -->
                        <el-form-item label="手机号码" prop="phone">
                            <el-input v-model="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submit">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getUserInfo, updateUserInfo } from '../api/users';

export default {
    name: "PersonalDia",
    data() {
        return {
            dialogVisible: false,
            form: {
                avatar: "",
                password: "",
                nickname: "",
                birthday: "",
                email: "",
                phone: "",
                gender: Number,
                id: Number,
                account: "",
                area: "",
                hobby: "",
                work: "",
                design: "",
            },
            rules: {
                nickname: [
                    { required: true, message: "昵称不能为空", trigger: "blur" },
                ],
                password: [
                    { required: true, message: "账号密码不能为空", trigger: "blur" },
                ],
            },
        };
    },
    mounted() {
        this.load();
    },
    methods: {
        open() {
            this.dialogVisible = true;
        },
        load() {
            getUserInfo().then(res => {
                let userInfo = res.data;
                this.form.avatar = userInfo.headImg.downloadUrl;
                this.form.nickname = userInfo.nickname;
                this.form.id = userInfo.id
                this.form.gender = userInfo.gender == '未知' ? 0 : userInfo.gender == '男' ? 1 : 2;
                this.form.phone = userInfo.phone;
                this.form.email = userInfo.email;
                this.form.birthday = userInfo.birthday;
            })
        },
        submit() {
            updateUserInfo(this.form).then(res => {
                this.$message.success(res.data);
                this.$emit("flesh");
            })
            getUserInfo().then(res => {
                let userInfo = res.data;
                this.form.avatar = userInfo.headImg.downloadUrl;
                this.form.nickname = userInfo.nickname;
                this.form.id = userInfo.id
                this.form.gender = userInfo.gender == '未知' ? 0 : userInfo.gender == '男' ? 1 : 2;
                this.form.phone = userInfo.phone;
                this.form.email = userInfo.email;
                this.form.birthday = userInfo.birthday;
            })
            this.dialogVisible = false;
        },
        handleClose() {
            this.dialogVisible = false;
            this.$emit("flesh");
        },
    },
};
</script>

<style scoped>
.updateinfo {
    height: 350px;
    overflow: auto;
}

.left {
    /* width: 330px; */
    float: left;
}

.right {
    overflow: hidden;
}
</style>
