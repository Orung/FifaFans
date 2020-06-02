import model from './../models';
import { sendErrorResponse, sendSuccessResponse } from './../utils/sendResponse';
import helperMethods from './../utils/helpers';
import { NewsService } from '../services/newsService';
const { User } = model;


export const NewsController = {
   async getNews(req, res) {
       try {
         const data  = await NewsService.FetchNews();
         return res.render('news', { data });
       } catch (error) {
           console.log(error);
           return sendErrorResponse(res,500, 'Error ocurred while fetching news');
       }
   }
};
