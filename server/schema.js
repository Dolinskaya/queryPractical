'use strict';

const graphql = require('graphql');
const data = require('./data.json');

const userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
        name: {
            type: graphql.GraphQLString
        },
        id: {
            type: graphql.GraphQLInt
        },
        location: {
            type: graphql.GraphQLString
        }
    }
});

const postType = new graphql.GraphQLObjectType({
    name: 'Post',
    fields: {
        title: {
            type: graphql.GraphQLString
        },
        id: {
            type: graphql.GraphQLInt
        },
        body: {
            type: graphql.GraphQLString
        },
        author: {
            type: graphql.GraphQLString
        }
    }
});

const commentType = new graphql.GraphQLObjectType({
    name: 'Comment',
    fields: {
        id: {
            type: graphql.GraphQLInt
        },
        body: {
            type: graphql.GraphQLString
        },
        votes: {
            type: graphql.GraphQLInt
        },
        postId: {
            type: graphql.GraphQLInt
        },
        userId: {
            type: graphql.GraphQLInt
        }
    }
});

const queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            args: {
                id: {
                    type: graphql.GraphQLInt
                }
            },
            resolve: (root, args) => {
                const {users} = data;
                const userData = users.find(user => {
                    return user.id === args.id && user;
                });

                return userData;
            }
        },
        post: {
            type: postType,
            args: {
                id: {
                    type: graphql.GraphQLInt
                }
            },
            resolve: (root, args) => {
                const {posts} = data;
                const postData = posts.find(post => {
                    return post.id === args.id && post;
                });

                return postData;
            }
        },
        comment: {
            type: commentType,
            args: {
                id: {
                    type: graphql.GraphQLInt
                }
            },
            resolve: (root, args) => {
                const {comments} = data;
                const commentData = comments.find(comment => {
                    return comment.id === args.id && comment;
                });

                return commentData;
            }
        }
    }
});


const schema = new graphql.GraphQLSchema({
    query: queryType
});

module.exports = schema;
