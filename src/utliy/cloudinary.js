const cloudinary=require("cloudinary").v2;

cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key:process.env.CLOUD_API_KEY, 
    api_secret:process.env.CLOUD_SECRET// Click 'View Credentials' below to copy your API secret
});

const Uplodfolder = async (localPath,folderName)=>{

    const uploadResult = await cloudinary.uploader.upload(localPath, {
        folder: folderName
    }).catch((error)=>{console.log(error)});

    return uploadResult
}

// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: "dftdcycaq", 
//         api_key: "778464824129547", 
//         api_secret: "<your_api_secret>" // Click 'View Credentials' below to copy your API secret
//     });
    
//     // Upload an image
//     const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
//         public_id: "shoes"
//     }).catch((error)=>{console.log(error)});
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url("shoes", {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url("shoes", {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();
module.exports ={
    Uplodfolder
}