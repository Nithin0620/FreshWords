import {create} from "zustand"
import axios from "axios"

const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:4000/api":"/api";

export const useHandlingStore = create((get,set)=>({
   


   summarizeText : async(data)=>{
      try{
         const response = await axios.post(`${BASE_URL}/handling/summarize`,data);
         if(response.data.success){
            return response.data.data;
         }
         else{
            return [];
         }
      }
      catch(e){
         return [];
      }
   },
   humanizeText : async(data)=>{
      try{
         const response = await axios.post(`${BASE_URL}/handling/humanize`,data);
         if(response.data.success){
            return response.data.data;
         }
         else{
            return [];
         }
      }
      catch(e){
         return [];
      }
   },
   simplifyText : async(data)=>{
      try{
         const response = await axios.post(`${BASE_URL}/handling/simplify`,data);
         if(response.data.success){
            return response.data.data;
         }
         else{
            return [];
         }
      }
      catch(e){
         return [];
      }
   },
   recentHistory : async()=>{
      try{
         const response = await axios.get(`${BASE_URL}/history/getrecentrequest`);
         if(response.data.success){
            return response.data.data;
         }
         else{
            return [];
         }
      }
      catch(e){
         return [];
      }
   },
   clearHistory : async()=>{
      try{
         const response = await axios.delete(`${BASE_URL}/history/clearhistory`);
         if(response.data.success){
            return response.data.data;
         }
         else{
            return [];
         }
      }
      catch(e){
         return [];
      }
   },
   isFavorite : async(Id)=>{
      try{
         const response = await axios.put(`${BASE_URL}/history/markasfavorite/${Id}`);
         if(response.data.success){
            return response.data.data;
         }
         else{
            return [];
         }
      }
      catch(e){
         return [];
      }
   }
}))