import { use } from "react";
import confi from "../confi/confi";
import {Client,ID , Databases ,Storage , Query} from "appwrite"

class Services{

    client  = new Client();
    databases = new Databases();
    bucket = new Storage();

    constructor()
    {
        this.client
    .setEndpoint(confi.appwriteUrl ) // Your API Endpoint
    .setProject(confi.appwriteProjectId); // Your project ID

    this.databases =  new Databases(this.client);
    this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId})
    {
      try {

         const userPost =  await this.databases.createDocument(
            confi.appwriteDatabaseId,
            confi.appwriteCollectionId,
            slug,// you can slug too
            {
                title,
                content,
                image:featuredImage,
                status,
                userid:userId
                // userId
            }
         )

         if(userPost) {
            return userPost;
         }

         else{
            console.log("Error config :: createpost() => userPost is null or undefined")
            return null;
         }
        
      } catch (error) {
        console.log("Error config :: createPost()",error);
        throw error;
      }
    }

    async updatePost(uniqueID,{title,content,featuredImage,status})
    {
        try {
            const updatedPost = await this.databases.updateDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                uniqueID,
                {
                    title,
                    content,
                    image:featuredImage,
                    status
                }
            )
            if(updatedPost) {
                return updatedPost;
            }else{
                console.log("Error config :: updatePost() => updatedPost is null or undefined")
                return null;
            }
        } catch (error) {
            console.log("Error config :: updatePost()",error);
            throw error;
        }
    }

    async deletePost(uniqueID)
    {
        try {

            await this.databases.deleteDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                uniqueID
            )
            return true;
            
        } catch (error) {
            console.log("Error config :: deletePost()",error);
            throw error;
        }
    }
    
    async getPost(slug)
    {
        try {
            const post = await this.databases.getDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug
            )

            if(post) {
                return post;
            }
            
            else{
                console.log("Error config :: getPost() => post is null or undefined")
                return null;
            }

        } catch (error) {
            console.log("Error config :: getPost()",error);
            throw error;
        }
       
    }

    async getAllposts(queries = [Query.equal("status","active")])  // passing default value to queries parameter
    {
        try {

            const allPosts = await this.databases.listDocuments(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                queries //remove queries from here and parameter and write here [Query.equal("statues","active")] but it will be hardcoded and afftect the scalability of the app 
            )

            if(allPosts) {
                return allPosts;
            }else{
                console.log("Error config :: getAllposts() => allPosts is null or undefined")
                return null;
            }
            
        } catch (error) {
            console.log("Error config :: getAllposts()",error);
            throw error;
            
        }
    }

    // file upload methods/services

    async uploadFile(file)
    {
       try {

        const uploadFileInfo = await this.bucket.createFile(
            confi.appwriteBucketId,
            ID.unique(),
            file
        )

        if(uploadFileInfo ) {
            return uploadFileInfo // this will return the fileId and other info of the file uploaded;
        }

         else{
              console.log("Error config :: uploadFile() => fileId is null or undefined")
              return null;
            }
        
       } catch (error) {
        console.log("Error config :: uploadFile()",error);
        throw error;
        
       }
    }

    async deleteFile(fileId)
    {
        try {

            await this.bucket.deleteFile(
                confi.appwriteBucketId,
                fileId
            )
            return true;
            
        } catch (error) {
            console.log("Error config :: deleteFile()",error);
            throw error;
            
        }
    };

    // getFileView(fileId) {
    //     try {
    //       // Use getFileView instead of getFilePreview
    //       const fileUrl = this.bucket.getFileView(
    //         confi.appwriteBucketId, // Your bucket ID
    //         fileId                  // The file ID from your document
    //       );
          
    //       // Return the direct URL string
    //       return fileUrl.href;
          
    //     } catch (error) {
    //       console.error("Failed to get file URL:", {
    //         error: error.message,
    //         fileId,
    //         bucketId: confi.appwriteBucketId
    //       });
    //       return null;
    //     }
    //   }  
    
    // getFileView(fileId) {
    //     console.log('Generating URL for:', { fileId, bucketId: confi.appwriteBucketId });
        
    //     try {
    //       if (!fileId) throw new Error('Missing fileId');
    //       if (!confi.appwriteBucketId) throw new Error('Missing bucketId');
    
    //       const fileUrl = this.bucket.getFileView(
    //         confi.appwriteBucketId,
    //         fileId
    //       );
    
    //       console.log('Generated URL object:', fileUrl); // Debug the full response
          
    //       if (!fileUrl?.href) throw new Error('No href property in response');
    //       return fileUrl.href;
          
    //     } catch (error) {
    //       console.error('File URL generation failed:', {
    //         error: error.message,
    //         stack: error.stack
    //       });
    //       return null;
    //     }
    //   }

    // appwrite/config.js
    getFileView(fileId) {
    try {
      if (!fileId) throw new Error("File ID is required");
      
      // Directly return the URL string
      return `https://fra.cloud.appwrite.io/v1/storage/buckets/${confi.appwriteBucketId}/files/${fileId}/view?project=${confi.appwriteProjectId}`;
      
    } catch (error) {
      console.error("File URL generation failed:", error);
      return null;
    }
  }
    
}

 const services  = new Services()

export default services