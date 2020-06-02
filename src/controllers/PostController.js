import model from './../models';
import { sendErrorResponse, sendSuccessResponse } from './../utils/sendResponse';
import helperMethods from './../utils/helpers';
import uploadImage from './../services/imageuploader';
const { User, Profile, Post, Friend } = model;

const PostController = {
    // create a post 
    async createPost(req, res) {
        try {
          let file = '';
          const { uuid, email, name} = req.userData;
          const { post } = req.body;
          if (!post) return sendErrorResponse(res, 422, 'post body cannot be empty');
          if (req.file) {
            console.log(req.file)
            file = await uploadImage(req.file)
            
          }
          await Post.create({
              user_uuid: uuid,
              owner_name: name,
              post,
              media:file
          });
          return sendSuccessResponse(res, 200, 'post created successfully');
        } catch (error) {
            console.log(error);
            return sendErrorResponse(res, 500, 'An error occurred trying to create a post');
        }
    },

    // delete post 
    async deletePost(req, res) {
        try {
          const { uuid } = req.userData;
          const { post_uuid } = req.query;
          await Post.destroy({
            where: { uuid: post_uuid, user_uuid: uuid }
          });
          return sendSuccessResponse(res, 200, 'post deleted successfully');
        } catch (error) {
            console.log(error);
            return sendErrorResponse(res, 500, 'An error occurred while deleting post');
        }
    },

    // comment to a post
    async commentOnPost(req, res) {
        try {
         const { uuid, name } = req.userData;
         const { comment, post_uuid } = req.body;
         const post = await Post.findOne({
             where:{ uuid: post_uuid}
         });
         if (!post) return sendErrorResponse(res, 404, 'post not found');
         console.log(post)
         await post.comment.push(
             {
           user_uuid: uuid,
           user_name: name,
           date_sent: new Date(),
           comment,
        });
        const postUpdate = await Post.update(
            {
              
              comment: post.comment,
            },
            {
              returning: true,
              where: { uuid: post_uuid },
            },
          );
         return sendSuccessResponse(res, 200, postUpdate);
        } catch (error) {
            console.log(error);
            return sendErrorResponse(res, 500, 'An error occurred commenting on the post');
        }
    },

     // like to a post
     async likePost(req, res) {
        try {
         const { uuid, name } = req.userData;
         const { like, post_uuid } = req.query;
         const post = await Post.findOne({
             where:{ uuid: post_uuid}
         });
         if (!post) return sendErrorResponse(res, 404, 'post not found');
         await post.likes.push(
             {
           user_uuid: uuid,
           user_name: name,
           like,
        });
        const postUpdate = await Post.update(
            {
              
              likes: post.likes,
            },
            {
              returning: true,
              where: { uuid: post_uuid },
            },
          );
         return sendSuccessResponse(res, 200, postUpdate);
        } catch (error) {
            console.log(error);
            return sendErrorResponse(res, 500, 'An error occurred while commenting on the post');
        }
    },

    // list a user's posts

    async listUserPosts(req, res) {
        try {
         const { uuid, email } = req.userData;
         const posts = await Post.findAll({
            where: { user_uuid: uuid}
         });
         return sendSuccessResponse(res, 200, posts);
        } catch (error) {
            console.log(error);
            return sendErrorResponse(res, 500, 'An error occurred while trying to list posts');
        }
    },

    //list platform post
    async listPosts(req, res) {
      try {
        const datas = await helperMethods.listAllDataInTable(Post);
        return sendSuccessResponse(res, 200, datas);
      } catch (error) {
        console.log(error);
        return sendErrorResponse(res, 500, 'Aan error occured!!');
      }
    }
};

export default PostController;
