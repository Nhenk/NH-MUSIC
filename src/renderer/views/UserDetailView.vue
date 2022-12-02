<!-- 用户注册/登录/显示界面 -->
<script setup>
// import ButtonIcon from "../components/ButtonIcon.vue";





</script>

<template>
    <div class="container">
        <div class="login-wrapper">
            <div class="header">Login</div>
            <div class="form-wrapper">
                <input type="text" name="username" placeholder="账号" class="input-item">
                <input type="password" name="password" placeholder="密码" class="input-item">
                <div id="login" class="btn">登录</div>
            </div>
            <div class="msg">
                没有账号？ <a href="">注册</a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    background-image: linear-gradient(to right, #fbc2eb, #a6c1ee) !important;
}

.login-wrapper {
    background-color: #fff;
    width: 250px;
    height: 500px;
    padding: 0 50px;
    position: relative;
    left: 50%;
    border-radius: 15px;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--text-family);
}

.login-wrapper .header {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    line-height: 200px;
}

.login-wrapper .form-wrapper .input-item {
    display: block;
    width: 100%;
    margin-bottom: 20px;
    border: none;
    padding: 10px;
    border-bottom: 2px solid rgb(128, 125, 125);
    font-size: 15px;
    outline: none;
}

.login-wrapper .form-wrapper .input-item::placeholder {
    text-transform: uppercase;
}

.login-wrapper .form-wrapper .btn {
    text-align: center;
    padding: 5px;
    margin-top: 40px;
    background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
    color: #fff;
}

.login-wrapper .msg {
    text-align: center;
    line-height: 80px;
}

.login-wrapper .msg a {
    text-decoration-line: none;
    color: #a6c1ee;
}
</style>