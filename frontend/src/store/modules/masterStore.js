// (c) Waveybits Inc. <2021>
// ALL RIGHTS RESERVED
import Vue from 'vue';
import Vuex from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import { authAPI, baseAPI, usersAPI, projectsAPI, chatAPI } from '@/api/apis';
import { CometChat } from "@cometchat-pro/chat";

Vue.use(Vuex)

    const state = {
        accessToken: null,
        devUsers: null,
        loggedIn: false,
        loggedInUser: null,
        loggedInUserId: 2,
        projects: null
    };

    const getters = {
        getAccessToken: state => state.accessToken,
        getDevUsers: state => state.devUsers,
        getDevUser: state => id => state.devUsers?.find(user => user.id == id),
        getDevUserByUsername: state => username => state.devUsers?.find(user => user.username === username),
        getCurrentUserId: state => state.loggedInUserId,
        isLoggedIn: state => state.loggedIn,
        getLoggedInUser: state => state.loggedInUser,
        getProjects: state => state.projects,

    };

    const mutations = {
        updateAccessToken(state, payload) {
            state.accessToken = payload;
        },
        updateDevUsers(state, users) {
            state.devUsers = users;
        },
        updateIsLoggedIn(state, isLoggedIn) {
            state.loggedIn = isLoggedIn;
            if (!isLoggedIn) state.loggedInUser = null;
        },
        updateUserId(state, id) {
            state.loggedInUserId = id;
        },
        updateLoggedInUser(state, user) {
            state.loggedInUser = user;
        },
        updateProjects(state, projects) {
            state.projects = projects;
        }
    };

    const actions = {
        compareTextToHash(_, payload) {
            let { unhashed_string, hashed_string } = payload
            return new Promise((resolve, reject) => {
                baseAPI.post('/compare-hash-string', { unhashed_string, hashed_string })
                    .then(res => {
                        resolve(res.data)
                    }).catch(error => reject(error));
            })
        },
        computeRating(_, ratings) {
            if (ratings.length == 0) return 0
            
            let sum = 0
            ratings.forEach(r => sum += r.rating)
            return Math.round(sum / ratings.length)
        },
        createProject({ getters }, project) {
            projectsAPI.defaults.headers.common['Authorization'] = `Bearer ${getters.getAccessToken}`;
            return new Promise((resolve, reject) => {
                projectsAPI.post(`/`, { project })
                    .then(res => {
                        resolve(res.data);
                    }).catch(error => reject(error));
            })
        },
        async createTask({dispatch}, payload) {
            const { projectId, message } = payload
            // Fetch projects preexisiting tasks
            const project = await dispatch('fetchProjectById', projectId)
            // Build new task and append it to projects tasks
            const newTask = { id: uuidv4(), message, status: 'active' }
            const tasks = [newTask, ...project.tasks ]
            // Update tasks in project
            await dispatch('updateProjectById', { id: projectId, project: { tasks: JSON.stringify(tasks) } })
        },  
        fetchProjectById(_, id) {
            return new Promise((resolve, reject) => {
                projectsAPI.get(`/${id}`)
                    .then(res => {
                        resolve(res.data);
                    }).catch(error => reject(error));
            })
        },
        fetchDevUsers({commit}) {
            return new Promise((resolve, reject) => {
                usersAPI.get(`/devs`)
                    .then(res => {
                        console.log('fetchDevUsers', res.data)
                        commit("updateDevUsers", res.data);
                        resolve(res.data);
                    }).catch(error => reject(error));
            })
        },
        fetchUserById(_, id) {
            return new Promise((resolve, reject) => {
                usersAPI.get(`/${id}`)
                    .then(res => {
                        resolve(res.data);
                    }).catch(error => reject(error));
            })
        },
        fetchMessages() {
            return new Promise((resolve, reject) => {
                chatAPI.get('/newest-messages')
                    .then(res => {
                        console.log('res', res.data);
                        resolve(res.data);
                    }).catch(error => reject(error));
            })
        },
        fetchProjects({commit}) {
            return new Promise((resolve, reject) => {
                projectsAPI.get(`/`)
                    .then(res => {
                        console.log('fetchProjects', res.data)
                        commit("updateProjects", res.data);
                        resolve(res.data);
                    }).catch(error => reject(error));
            })
        },
        async fetchQuote(_, payload) {
             if (!payload) payload = {}
            let {tag, limit} = payload

            if (!limit) limit = 1

            // All tags on api that would possibly fit our application
            let tags = ['motivational', 'attitude', 'general', 'best']
            if (!tag) {
                tag = tags[Math.floor(Math.random() * tags.length)]
            } else {
                console.log('Payload Tag is not in curated list: ', tag)
                const availableTagsResponse = await fetch('https://goquotes-api.herokuapp.com/api/v1/all/tags')
                const availableTags = await availableTagsResponse.json()
                if (!(availableTags.tags.map(t => t.name).includes(tag))) {
                    console.log('Payload Tag is not an available tag: ', availableTags.tags.map(t => t.name))
                    tag = tags[Math.floor(Math.random() * tags.length)]
                }
            }

            const response = await fetch(`https://goquotes-api.herokuapp.com/api/v1/random/${limit}?type=tag&val=${tag}`)
            const json = await response.json()
            const { quotes } = json
            
            if (limit == 1) return quotes[0]
            else  return quotes
        },
        fetchToast(_, payload) {
            let toast = {
                type: 'info',
                message: [{ text: 'Default Toast Message', emphasis: false }],
                hasAction: false,
                actionRedirect: '',
                isShown: false,
                duration: 5000,
                ...payload
            }

            toast.isShown = true

            return toast
        },
        getDevOptions() {
            return new Promise((resolve, reject) => {
                baseAPI.get('/dev-options')
                    .then(res => {
                        // TODO
                        resolve(res.data)
                    }).catch(error => reject(error));
            })
        },
        getRegions() {
            return new Promise((resolve, reject) => {
                baseAPI.get('/regions')
                    .then(res => {
                        resolve(res.data)
                    }).catch(error => reject(error));
            })
        },
        getFundingTypes() {
            return new Promise((resolve, reject) => {
                baseAPI.get('/funding-types')
                    .then(res => {
                        resolve(res.data)
                    }).catch(error => reject(error));
            })
        },
        getReportOptions() {
            return new Promise((resolve, reject) => {
                baseAPI.get('/report-options')
                    .then(res => {
                        resolve(res.data)
                    }).catch(error => reject(error));
            })
        },
        login({commit}, userLoginInfo) {
            return new Promise((resolve, reject) => {
                authAPI.post(`/login`, userLoginInfo)
                    .then(res => {
                        if (res) {
                            console.log('res', res);
                            commit('updateUserId', res.data.user.id);
                            commit('updateIsLoggedIn', res.data.result);
                            commit('updateLoggedInUser', res.data.user);
                            commit('updateAccessToken', res.data.accessToken);
                            CometChat.login(res.data.user.username, '7550adcf70e27f56b88bf5e46295aabf32f49403').then(
                                user => {
                                  console.log("Login Successful:", { user });
                                },
                                error => {
                                    console.log("Login failed with exception:", { error });
                                }
                            );
                            resolve(res.data);
                        }
                    }).catch(error => reject(error));
            })
        },
        updateProjectById({ getters }, payload) {
            const {id, project} = payload
            projectsAPI.defaults.headers.common['Authorization'] = `Bearer ${getters.getAccessToken}`;
            return new Promise((resolve, reject) => {
                projectsAPI.put(`/${id}`, project)
                    .then(res => {
                        resolve(res.data);
                    }).catch(error => reject(error));
            })
        },
        updateUser(_, payload) {
            let {id, updates, table} = payload
            table = table ? table : 'users'
            return new Promise((resolve, reject) => {
                usersAPI.put(`/${id}`, {updates, table})
                    .then(res => {
                        console.log('res', res.data);
                        resolve(res.data);
                    }).catch(error => {
                        console.log(error)
                        reject(error)
                    });
            })
        },
        updateUserProfileImg(_, payload) {
            const { id, form } = payload
            return new Promise((resolve, reject) => {
                // console.log('masterStore form', ...form)
                baseAPI.patch(`/upload-profile-img/${id}`, form, {
                    headers: {
                      "Content-Type": "multipart/form-data"
                    }
                })
                .then(res => {
                    console.log('res', res.data);
                    resolve(res.data);
                }).catch(error => {
                    console.log(error)
                    reject(error)
                });
            })
        },
        async updateTask({ dispatch }, payload) {
          let { projectId, taskId, updates, isDelete } = payload
          let project = await dispatch('fetchProjectById', projectId)
          let tasks
          if (isDelete) {
            tasks = project.tasks.filter(t => t.id != taskId)
          } else {
            // overwrite the task with the new updates, but prevent id change
            tasks = project.tasks.map(t => {
              if (t.id == taskId) {
                return { ...t, ...updates, id: taskId }
              }
              return t
            })
          }
          // Update task in project
          await dispatch('updateProjectById', {id: projectId, project: { tasks: JSON.stringify(tasks) }})
        },
        retrieveRefreshToken({commit}) {
            return new Promise((resolve, reject) => {
                authAPI.post('/refresh_token')
                .then(res => {
                    console.log(res.data)
                    commit('updateAccessToken', res.data.accessToken);
                    commit('updateIsLoggedIn', !(res.data.accessToken === ""));
                    commit('updateLoggedInUser', res.data.user);
                    commit('updateUserId', res.data.user.id);
                    resolve(res.data);
                }).catch(error => {
                    reject(error)
                });
            })
        },
        logout({commit}) {
            commit('updateAccessToken', "");
            return new Promise((resolve, reject) => {
                authAPI.get('/logout').then(res => resolve(res.data)).catch(err => reject(err));
            })
        },
        async sendNotificationToUser({dispatch}, payload) {
            const { notification, id } = payload
            const { notifications } = await dispatch('fetchUserById', id)
            let hasNotification = false
            notifications.forEach(({senderId, projectId, message, type}) => {
              if (senderId == notification.senderId && projectId == notification.projectId && message == notification.message && type == notification.type) {
                hasNotification = true
              }
            })
            if (!(hasNotification)) {
              const res = await dispatch('updateUser', { id, updates: { notifications: JSON.stringify([notification, ...notifications]) } })
              if (res) return {...res, success: true}
              else return {...res, success: false}
            } else {
              return { message: 'user already has notification', success: false }
            }
        },
        testToken({getters}) {
            usersAPI.defaults.headers.common['Authorization'] = `Bearer ${getters.getAccessToken}`;
            return new Promise((resolve, reject) => {
                usersAPI.get('/test')
                    .then(res => {
                        console.log(res)
                        resolve(res.data)
                    }).catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
    }

export default {
    state,
    getters,
    mutations,
    actions
};
