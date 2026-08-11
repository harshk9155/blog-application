import mongoose from 'mongoose';


 const Connection = async (USERNAME,PASSWORD) => {
   const URL = `mongodb://${USERNAME}:${PASSWORD}@ac-vggrpeb-shard-00-00.v0gtbds.mongodb.net:27017,ac-vggrpeb-shard-00-01.v0gtbds.mongodb.net:27017,ac-vggrpeb-shard-00-02.v0gtbds.mongodb.net:27017/?ssl=true&replicaSet=atlas-1gf77g-shard-0&authSource=admin&appName=blog-app`;
    try {
           await mongoose.connect(URL);
 
           console.log('Database connected successfully');
    }
    catch (error) {
        console.log('Error while connecting with the database', error);
    }
}

export default Connection;
