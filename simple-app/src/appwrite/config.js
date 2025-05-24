import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query, Messaging } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;
  messaging;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
    this.messaging = new Messaging(this.client);
  }

  async createPost({ title, featuredImage, content, status, userid, message }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostCollectionId,
        ID.unique(),
        {
          title,
          featuredImage,
          content,
          status,
          userid,
          message,
        }
      );
    } catch (error) {
      console.error("Error creating post:", error);
      return false;
    }
  }

  async updatePost(postId, { title, featuredImage, content, message, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostCollectionId,
        postId,
        {
          title,
          featuredImage,
          content,
          message,
          status,
        }
      );
    } catch (error) {
      console.error("Error updating post:", error);
      return false;
    }
  }

  async deletePost(postId) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostCollectionId,
        postId
      );
    } catch (error) {
      console.error("Error deleting post:", error);
      return false;
    }
  }

  async getPost(postId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritePostCollectionId,
        postId
      );
    } catch (error) {
      console.error("Error getting post:", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePostCollectionId,
        queries
      );
    } catch (error) {
      console.error("Error getting posts:", error);
      return false;
    }
  }

  async createFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Error creating file:", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  }

  async createSubscriber(topicId, subscriberId, targetId) {
    try {
      return await this.messaging.createSubscriber(
        topicId,
        subscriberId,
        targetId
      );
    } catch (error) {
      console.error("Error creating subscriber:", error);
      return false;
    }
  }

  async deleteSubcriber(topicId, subscriberId) {
    try {
      return await this.messaging.deleteSubscriber(topicId, subscriberId);
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      return false;
    }
  }

}

const service = new Service();
export default service;
