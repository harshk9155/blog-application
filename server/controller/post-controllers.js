import PostModel from "../model/post.js"

export const createPost = async (request, response) => {
    try {
        const post = await PostModel.create(request.body);
        response.status(201).send({ msg: "Post created successfully", data: post });
    } catch (error) {
        console.log(error);
        response.status(500).send({ msg: "Error in creating post" });
    }
}

export const getAllPosts = async (request, response) => {
    let category = request.query.category;
    try {
        let posts;
        if (category) {
            posts = await PostModel.find({ categories: category });
        } else {
            posts = await PostModel.find({});
        }
        response.status(200).send({ msg: "Posts fetched successfully", data: posts });
    } catch (error) {
        console.log(error);
        response.status(500).send({ msg: "Error in fetching posts" });
    }
}

export const getPost = async (request,response) => {
    try{
        const post = await PostModel.findById(request.params.id);

        return response.status(200).json(post);

    }
    catch(error){
        return response.status(500).json({msg: "Error in fetching post"});

    }
}


export const updatePost = async (request, response) => {
        try {
            const post = await PostModel.findById(request.params.id);

            if(!post){
                return response.status(404).json({msg: "Post not found"});

            }

           await PostModel.findByIdAndUpdate(request.params.id, {$set: request.body});
            return response.status(200).json({msg: "Post updated successfully"});  

        }
        catch (error) {
           
           return response.status(500).json({ error: error.message });
        }

    }



export const deletePost = async (request, response) => {
    try {
        await PostModel.findByIdAndDelete(request.params.id);
        return response.status(200).json({ msg: "Post deleted successfully" });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}





