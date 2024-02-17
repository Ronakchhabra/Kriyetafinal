import React from 'react';
const VideoCard = ({ videoTitle, videoUrl }) => {
  return (
    <div className="max-w-md mx-auto mb-4" >
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        {/* Video Embed */}
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            title={videoTitle}
            className="w-full h-full"
            src={videoUrl}
            allowFullScreen
          ></iframe>
        </div>

        {/* Card Content */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{videoTitle}</h2>
          <p className="text-gray-600">Description or additional information about the video.</p>
        </div>
      </div>
      {/* <Button startIcon={<AddBox/>}  variant='contained' >Add Video</Button> */}
    </div>
  );
};

export default VideoCard;