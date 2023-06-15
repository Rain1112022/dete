import { defineStore } from 'pinia';
// import userAPI from '@/api/user';
import router from '@/router/index';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: sessionStorage.getItem('token'),
    roles: [],
    name: 'Admin',
  }),
  actions: {
    // 登录成功后将返回的 token 存起来
    login({ username, password }: any) {
      return new Promise((resolve, reject) => {
        if (password) {
          this.token = username;
          sessionStorage.setItem('token', username);
          this.roles = ['admin'];
          resolve(1);
        } else {
          reject();
        }
      });
      // return userAPI.login({ username, password }).then((res: any) => {
      //   const { data } = res;
      //   this.token = data;
      //   sessionStorage.setItem('token', data);
      // });
    },

    // getUserInfo() {
    //   return userAPI.getUserInfo(this.token as string).then(({ data }: any) => {
    //     this.roles = data.roles;
    //     this.name = data.name;
    //     return data;
    //   });
    // },

    // 清空 token 和角色并跳转到登录页
    logout() {
      this.token = '';
      this.roles = [];
      sessionStorage.removeItem('token');
      router.push('/login');
    },
  },
});
